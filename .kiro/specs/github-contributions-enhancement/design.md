# Design Document: GitHub Contributions Enhancement

## Overview

This design enhances the GitHubContributions component to match GitHub's native contribution chart design by adding month labels, day labels, and a custom instant tooltip. The enhancement maintains all existing functionality while improving visual clarity and user experience.

The component currently displays a 53-column by 7-row grid of contribution squares. We'll add:
- Month labels positioned above the grid, aligned with the first column of each month
- Day labels (Mon, Wed, Fri) positioned to the left of the grid, aligned with their respective rows
- A custom tooltip that appears instantly on hover without using external libraries

## Architecture

### Component Structure

The enhanced component follows a layered layout structure:

```
GitHubContributions
├── Header (existing: title + total count)
├── Chart Container
│   ├── Month Labels Row
│   ├── Grid Container (flex row)
│   │   ├── Day Labels Column
│   │   └── Contribution Grid (53x7)
│   └── Legend (existing)
└── Custom Tooltip (portal-style, position: fixed)
```

### Data Flow

```mermaid
graph TD
    A[GitHub API] -->|fetch| B[ContributionDay[]]
    B -->|process| C[Month Grouping Logic]
    B -->|render| D[Contribution Grid]
    C -->|calculate| E[Month Label Positions]
    E -->|render| F[Month Labels]
    D -->|hover event| G[Tooltip State]
    G -->|mouse position| H[Custom Tooltip]
```

### State Management

The component will maintain existing state plus new tooltip state:

```typescript
// Existing state
const [days, setDays] = useState<ContributionDay[]>([]);
const [totalCount, setTotalCount] = useState(0);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

// New tooltip state
const [tooltip, setTooltip] = useState<{
  visible: boolean;
  x: number;
  y: number;
  content: string;
} | null>(null);
```

## Components and Interfaces

### Type Definitions

```typescript
interface ContributionDay {
  date: string;        // ISO format: "YYYY-MM-DD"
  count: number;       // Number of contributions
  level: 0 | 1 | 2 | 3 | 4;  // Intensity level
}

interface MonthLabel {
  name: string;        // Abbreviated month: "Jan", "Feb", etc.
  columnIndex: number; // Grid column position (0-52)
}

interface TooltipState {
  visible: boolean;
  x: number;           // Mouse X position
  y: number;           // Mouse Y position
  content: string;     // Formatted tooltip text
}
```

### Month Label Calculation

The month label positioning algorithm:

1. Iterate through the 371 days (53 weeks × 7 days)
2. Track the current month as we process each day
3. When the month changes, record the column index
4. Store month name and column index for rendering

```typescript
function calculateMonthLabels(days: ContributionDay[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let currentMonth = -1;
  
  days.forEach((day, index) => {
    const date = new Date(day.date);
    const month = date.getMonth();
    const columnIndex = Math.floor(index / 7);
    
    if (month !== currentMonth) {
      currentMonth = month;
      labels.push({
        name: date.toLocaleDateString('en-US', { month: 'short' }),
        columnIndex
      });
    }
  });
  
  return labels;
}
```

### Day Label Configuration

Day labels are static and positioned at rows 1, 3, and 5 (0-indexed):

```typescript
const DAY_LABELS = [
  { name: 'Mon', rowIndex: 0 },
  { name: 'Wed', rowIndex: 2 },
  { name: 'Fri', rowIndex: 4 }
];
```

### Custom Tooltip Implementation

The tooltip uses React state and mouse event handlers:

```typescript
// Event handlers
const handleMouseEnter = (e: React.MouseEvent, day: ContributionDay) => {
  const content = day.count === 0
    ? `No contributions on ${formatDate(day.date)}`
    : `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formatDate(day.date)}`;
  
  setTooltip({
    visible: true,
    x: e.clientX,
    y: e.clientY,
    content
  });
};

const handleMouseMove = (e: React.MouseEvent) => {
  if (tooltip?.visible) {
    setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  }
};

const handleMouseLeave = () => {
  setTooltip(null);
};
```

Tooltip rendering:

```tsx
{tooltip?.visible && (
  <div
    style={{
      position: 'fixed',
      left: tooltip.x + 10,
      top: tooltip.y + 10,
      backgroundColor: '#1A1A1A',
      color: '#F5F0E8',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      padding: '6px 10px',
      borderRadius: 0,
      pointerEvents: 'none',
      zIndex: 99999,
      whiteSpace: 'nowrap'
    }}
  >
    {tooltip.content}
  </div>
)}
```

## Data Models

### Grid Layout Model

The contribution grid uses CSS Grid with specific dimensions:

```css
.contribution-grid {
  display: inline-grid;
  grid-template-columns: repeat(53, 12px);
  grid-template-rows: repeat(7, 12px);
  gap: 3px;
}
```

### Month Label Positioning Model

Month labels use absolute positioning within a relative container:

```css
.month-labels-container {
  position: relative;
  height: 20px;
  width: 100%; /* Matches grid width */
}

.month-label {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(26, 26, 26, 0.5);
  /* left: calculated based on columnIndex */
}
```

### Day Label Layout Model

Day labels use flexbox alignment:

```css
.grid-with-labels {
  display: flex;
  gap: 8px;
}

.day-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%; /* Matches grid height: 7 * 12px + 6 * 3px = 102px */
}

.day-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: rgba(26, 26, 26, 0.5);
  height: 12px;
  line-height: 12px;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, several redundancies were identified:
- Requirements 1.5, 1.6, and 4.3 all test month label alignment - can be combined into one comprehensive property
- Requirements 2.5 and 4.2 both test day label alignment - duplicate
- Requirements 1.2 and 5.3 both test month abbreviation format - duplicate
- Requirements 3.2 and 3.3 can be combined into one property about tooltip content format
- Many styling requirements (fonts, colors, spacing) are better tested as examples rather than properties

The following properties focus on the core behavioral and computational aspects that should hold across all inputs:

### Property 1: Month Label Alignment

*For any* set of contribution data spanning multiple months, each month label should be positioned at the column index corresponding to the first day of that month in the grid.

**Validates: Requirements 1.5, 1.6, 4.3**

### Property 2: Month Abbreviation Format

*For any* date, the month abbreviation should match the standard three-letter format (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec).

**Validates: Requirements 1.2, 5.3**

### Property 3: Tooltip Content Format

*For any* contribution day, the tooltip content should display "No contributions on [formatted date]" when count is 0, or "[count] contribution(s) on [formatted date]" when count is greater than 0.

**Validates: Requirements 3.2, 3.3**

### Property 4: Tooltip Visibility on Hover

*For any* contribution square, hovering over it should immediately make the tooltip visible, and moving the mouse away should immediately hide it.

**Validates: Requirements 3.1, 3.12**

### Property 5: Tooltip Position Tracking

*For any* mouse position while hovering over a contribution square, the tooltip position should update to follow the mouse coordinates.

**Validates: Requirements 3.9**

### Property 6: Date Format Consistency

*For any* date string in ISO format (YYYY-MM-DD), the formatting function should produce output in "MMM DD, YYYY" format.

**Validates: Requirements 5.1**

### Property 7: Color Level Mapping Preservation

*For any* contribution level (0, 1, 2, 3, 4), the color mapping should remain unchanged from the original implementation.

**Validates: Requirements 6.6**


## Error Handling

### API Fetch Errors

The component maintains existing error handling for API failures:

```typescript
try {
  // Primary API call
  const response = await fetch(primaryUrl);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  // Process data
} catch (err) {
  // Fallback API call
  try {
    const fallbackResponse = await fetch(fallbackUrl);
    // Process fallback data
  } catch (fallbackErr) {
    setError(true);
    setLoading(false);
  }
}
```

Error states display: "Contribution data unavailable"

### Invalid Date Handling

Date formatting includes validation:

```typescript
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}
```

### Empty Data Handling

When the API returns empty contribution data:
- Loading state transitions to complete
- Grid is not rendered
- No month or day labels are shown
- Legend is not displayed

### Tooltip Edge Cases

Tooltip positioning handles viewport boundaries:

```typescript
const handleMouseEnter = (e: React.MouseEvent, day: ContributionDay) => {
  const x = e.clientX + 10;
  const y = e.clientY + 10;
  
  // Ensure tooltip stays within viewport
  const adjustedX = x + 200 > window.innerWidth ? e.clientX - 210 : x;
  const adjustedY = y + 50 > window.innerHeight ? e.clientY - 60 : y;
  
  setTooltip({
    visible: true,
    x: adjustedX,
    y: adjustedY,
    content: formatTooltipContent(day)
  });
};
```

## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific examples, edge cases, and integration points:

**Component Rendering Tests:**
- Month labels render with correct text content
- Day labels render exactly three items: Mon, Wed, Fri
- Tooltip styling matches specifications (colors, fonts, padding)
- Layout structure follows correct order: month labels → grid with day labels → legend

**Integration Tests:**
- API fetch continues to work with existing endpoints
- Loading state displays during data fetch
- Error state displays on fetch failure
- Total contribution count displays correctly
- Legend renders with all five color levels
- Contribution squares animate on initial render
- Contribution squares scale on hover

**Edge Case Tests:**
- Empty contribution data (0 days)
- Single month of data
- Date formatting with invalid date strings
- Tooltip positioning near viewport edges
- Specific date example: "2025-03-25" formats as "Mar 25, 2025"

### Property-Based Testing Approach

Property tests will verify universal behaviors across randomized inputs using a property-based testing library (e.g., fast-check for TypeScript/JavaScript).

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: github-contributions-enhancement, Property {number}: {property_text}**

**Property Test Suite:**

1. **Month Label Alignment Property**
   - Generate: Random contribution data spanning 1-12 months
   - Test: Each month label's column index matches the first occurrence of that month
   - Tag: **Feature: github-contributions-enhancement, Property 1: Month label alignment**

2. **Month Abbreviation Format Property**
   - Generate: Random dates across all months
   - Test: Month abbreviation matches expected three-letter format
   - Tag: **Feature: github-contributions-enhancement, Property 2: Month abbreviation format**

3. **Tooltip Content Format Property**
   - Generate: Random contribution days with counts from 0 to 100
   - Test: Tooltip content matches format based on count (zero vs non-zero)
   - Tag: **Feature: github-contributions-enhancement, Property 3: Tooltip content format**

4. **Tooltip Visibility Property**
   - Generate: Random contribution squares
   - Test: Hover shows tooltip, mouse leave hides tooltip
   - Tag: **Feature: github-contributions-enhancement, Property 4: Tooltip visibility on hover**

5. **Tooltip Position Tracking Property**
   - Generate: Random mouse coordinates within viewport
   - Test: Tooltip position updates to follow mouse
   - Tag: **Feature: github-contributions-enhancement, Property 5: Tooltip position tracking**

6. **Date Format Consistency Property**
   - Generate: Random ISO date strings
   - Test: Output matches "MMM DD, YYYY" format
   - Tag: **Feature: github-contributions-enhancement, Property 6: Date format consistency**

7. **Color Level Mapping Property**
   - Generate: Random contribution levels (0-4)
   - Test: Color mapping matches original implementation
   - Tag: **Feature: github-contributions-enhancement, Property 7: Color level mapping preservation**

### Testing Balance

- Unit tests focus on specific examples, styling requirements, and integration points
- Property tests handle comprehensive input coverage through randomization
- Together they provide complete coverage: unit tests catch concrete bugs, property tests verify general correctness

### Recommended Testing Library

For property-based testing in TypeScript/React:
- **fast-check**: Mature property-based testing library for JavaScript/TypeScript
- Integrates with Jest or Vitest
- Supports custom generators for complex data structures

Example property test structure:

```typescript
import fc from 'fast-check';

// Feature: github-contributions-enhancement, Property 6: Date format consistency
test('date formatting produces MMM DD, YYYY format', () => {
  fc.assert(
    fc.property(
      fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
      (date) => {
        const isoString = date.toISOString().split('T')[0];
        const formatted = formatDate(isoString);
        const regex = /^[A-Z][a-z]{2} \d{1,2}, \d{4}$/;
        expect(formatted).toMatch(regex);
      }
    ),
    { numRuns: 100 }
  );
});
```

## Implementation Notes

### Maintaining Existing Functionality

All existing features are preserved:
- API fetching logic remains unchanged
- Loading and error states use existing state management
- Contribution square rendering, colors, and animations are untouched
- Legend rendering is unchanged
- The title attribute on squares will be removed (replaced by custom tooltip)

### Performance Considerations

- Month label calculation runs once per data load (O(n) where n = 371 days)
- Tooltip state updates on mouse move are throttled by React's batching
- No external libraries added for tooltip functionality
- Grid rendering performance unchanged (existing motion animations)

### Accessibility Considerations

- Month and day labels use semantic HTML with appropriate ARIA labels if needed
- Tooltip content is descriptive and includes full date information
- Color contrast maintained for all text elements
- Keyboard navigation support can be added in future iterations

### Browser Compatibility

- CSS Grid is well-supported in all modern browsers
- position: fixed for tooltips works universally
- Date formatting uses standard Intl.DateTimeFormat APIs
- No browser-specific CSS needed

