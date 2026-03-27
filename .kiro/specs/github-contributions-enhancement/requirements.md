# Requirements Document

## Introduction

This document specifies requirements for enhancing the GitHub Contributions Chart component to match the original GitHub design more closely. The enhancements include adding month labels above the grid, day labels on the left side, implementing a fast custom tooltip, and improving the overall layout alignment.

## Glossary

- **Contribution_Grid**: The 53x7 grid of squares displaying GitHub contribution data
- **Month_Label**: Text label displaying abbreviated month name above the contribution grid
- **Day_Label**: Text label displaying day name (Mon, Wed, Fri) on the left side of the contribution grid
- **Contribution_Square**: Individual cell in the contribution grid representing one day
- **Tooltip**: Custom div element that appears on hover showing contribution details
- **Component**: The GitHubContributions.tsx React component

## Requirements

### Requirement 1: Display Month Labels

**User Story:** As a user, I want to see month labels above the contribution grid, so that I can quickly identify which time period each column represents.

#### Acceptance Criteria

1. THE Component SHALL display month labels above the Contribution_Grid
2. THE Component SHALL show abbreviated month names: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
3. THE Month_Label SHALL use monospace font at 11px size
4. THE Month_Label SHALL use color #1A1A1A with opacity 0.5
5. THE Month_Label SHALL align with the first column of its corresponding month in the Contribution_Grid
6. WHEN the Contribution_Grid contains 53 columns, THE Component SHALL group columns by month and position Month_Labels accordingly

### Requirement 2: Display Day Labels

**User Story:** As a user, I want to see day labels on the left side of the contribution grid, so that I can identify which row represents which day of the week.

#### Acceptance Criteria

1. THE Component SHALL display Day_Labels on the left side of the Contribution_Grid
2. THE Component SHALL show only three day names: Mon, Wed, Fri
3. THE Day_Label SHALL use monospace font at 11px size
4. THE Day_Label SHALL use color #1A1A1A with opacity 0.5
5. THE Day_Label SHALL vertically align with its corresponding row in the Contribution_Grid
6. THE Component SHALL NOT display labels for Sun, Tue, Thu, Sat

### Requirement 3: Implement Fast Custom Tooltip

**User Story:** As a user, I want to see contribution details instantly when hovering over a square, so that I can quickly understand the data without delay.

#### Acceptance Criteria

1. WHEN a user hovers over a Contribution_Square, THE Component SHALL immediately display the Tooltip with no delay
2. THE Tooltip SHALL display "No contributions on [date]" when count is 0
3. THE Tooltip SHALL display "[count] contributions on [date]" when count is greater than 0
4. THE Tooltip SHALL use background color #1A1A1A
5. THE Tooltip SHALL use text color #F5F0E8
6. THE Tooltip SHALL use monospace font at 11px size
7. THE Tooltip SHALL use padding of 6px vertical and 10px horizontal
8. THE Tooltip SHALL use border-radius of 0
9. THE Tooltip SHALL use position fixed to follow mouse position
10. THE Tooltip SHALL use pointer-events none to prevent interaction
11. THE Tooltip SHALL use z-index 99999 to appear above all other elements
12. WHEN a user moves the mouse away from a Contribution_Square, THE Component SHALL immediately hide the Tooltip
13. THE Component SHALL NOT use the title attribute for tooltips
14. THE Component SHALL NOT use any external tooltip library

### Requirement 4: Arrange Layout Structure

**User Story:** As a user, I want the chart layout to match GitHub's design, so that the interface feels familiar and professional.

#### Acceptance Criteria

1. THE Component SHALL arrange elements in this order from top to bottom: Month_Labels, Day_Labels with Contribution_Grid, Legend
2. THE Day_Label SHALL vertically align with the Contribution_Grid rows
3. THE Month_Label SHALL horizontally align with the Contribution_Grid columns
4. THE Component SHALL maintain proper spacing between Month_Labels and Contribution_Grid
5. THE Component SHALL maintain proper spacing between Day_Labels and Contribution_Grid

### Requirement 5: Format Dates in Tooltip

**User Story:** As a developer, I want dates formatted consistently in tooltips, so that users see readable date information.

#### Acceptance Criteria

1. THE Component SHALL format dates in the Tooltip as "MMM DD, YYYY" format
2. WHEN a Contribution_Square has date "2025-03-25", THE Tooltip SHALL display "Mar 25, 2025"
3. THE Component SHALL use abbreviated month names in date formatting

### Requirement 6: Maintain Existing Functionality

**User Story:** As a user, I want all existing features to continue working, so that the enhancement doesn't break current functionality.

#### Acceptance Criteria

1. THE Component SHALL continue to fetch contribution data from the GitHub API
2. THE Component SHALL continue to display loading state while fetching data
3. THE Component SHALL continue to display error state when data fetch fails
4. THE Component SHALL continue to display the contribution count total
5. THE Component SHALL continue to display the legend with color levels
6. THE Component SHALL continue to use the existing color scheme for Contribution_Squares
7. THE Component SHALL continue to animate Contribution_Squares on initial render
8. THE Component SHALL continue to scale Contribution_Squares on hover
