# Implementation Plan: GitHub Contributions Enhancement

## Overview

Enhance `GitHubContributions.tsx` with month labels, day labels, a custom instant tooltip, and an improved layout structure — all within the single existing component file.

## Tasks

- [x] 1. Add utility functions and configuration constants
  - [x] 1.1 Add `formatDate()` utility function
    - Implement date formatting with try/catch for invalid dates
    - Output format: "MMM DD, YYYY" (e.g. "Mar 25, 2025")
    - Return original string as fallback on invalid input
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 1.2 Write property test for `formatDate()` — Property 6
    - **Property 6: Date Format Consistency**
    - **Validates: Requirements 5.1**
    - Generate random ISO date strings; assert output matches `/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/`

  - [x] 1.3 Add `DAY_LABELS` constant and `MonthLabel` / `TooltipState` type definitions
    - `DAY_LABELS`: `[{ name: 'Mon', rowIndex: 0 }, { name: 'Wed', rowIndex: 2 }, { name: 'Fri', rowIndex: 4 }]`
    - Add `MonthLabel` and `TooltipState` interfaces
    - _Requirements: 2.2, 2.6_

  - [x] 1.4 Add `calculateMonthLabels()` function
    - Iterate days array, detect month changes, record `columnIndex = Math.floor(index / 7)`
    - Return `MonthLabel[]` with abbreviated month name and column index
    - _Requirements: 1.5, 1.6_

  - [ ]* 1.5 Write property test for `calculateMonthLabels()` — Property 1
    - **Property 1: Month Label Alignment**
    - **Validates: Requirements 1.5, 1.6, 4.3**
    - Generate random contribution data spanning 1–12 months; assert each label's `columnIndex` matches the first occurrence of that month

  - [ ]* 1.6 Write property test for month abbreviation format — Property 2
    - **Property 2: Month Abbreviation Format**
    - **Validates: Requirements 1.2, 5.3**
    - Assert each label name matches `/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/`

- [x] 2. Add tooltip state and event handlers
  - [x] 2.1 Add `tooltip` state (`TooltipState | null`) to component
    - Initialize as `null`
    - _Requirements: 3.1, 3.12_

  - [x] 2.2 Implement `handleMouseEnter`, `handleMouseMove`, and `handleMouseLeave` handlers
    - `handleMouseEnter`: compute viewport-adjusted x/y, build content string, set tooltip state
    - `handleMouseMove`: update x/y while tooltip is visible
    - `handleMouseLeave`: set tooltip to `null`
    - _Requirements: 3.1, 3.2, 3.3, 3.9, 3.12_

  - [ ]* 2.3 Write property test for tooltip content format — Property 3
    - **Property 3: Tooltip Content Format**
    - **Validates: Requirements 3.2, 3.3**
    - Generate random `ContributionDay` with count 0–100; assert content matches expected string pattern

  - [ ]* 2.4 Write property test for tooltip position tracking — Property 5
    - **Property 5: Tooltip Position Tracking**
    - **Validates: Requirements 3.9**
    - Generate random mouse coordinates; assert tooltip x/y updates accordingly

- [ ] 3. Checkpoint — Ensure utility functions and handlers are correct
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Restructure the contribution grid layout
  - [x] 4.1 Replace the flat `inline-grid` wrapper with the new three-part layout
    - Outer: `overflow-x-auto` scroll container
    - Row 1: month labels container (relative-positioned, height 20px)
    - Row 2: flex row containing day labels column + contribution grid
    - Row 3: existing legend (moved inside the new structure)
    - _Requirements: 4.1, 4.4, 4.5_

  - [x] 4.2 Render month labels row
    - Call `calculateMonthLabels(days)` and map to absolutely-positioned `<span>` elements
    - `left` = `columnIndex * (12 + 3)` px (cell width + gap)
    - Apply monospace font, 11px, color `rgba(26,26,26,0.5)`
    - _Requirements: 1.1, 1.3, 1.4, 1.5_

  - [x] 4.3 Render day labels column
    - Map `DAY_LABELS` to `<span>` elements in a flex-column container
    - Use `justify-content: space-around`, height matching grid (102px)
    - Apply monospace font, 11px, color `rgba(26,26,26,0.5)`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 4.4 Wire mouse event handlers onto each `motion.div` contribution square
    - Add `onMouseEnter`, `onMouseMove`, `onMouseLeave` props
    - Remove `title` attribute
    - _Requirements: 3.1, 3.9, 3.12, 3.13_

  - [ ]* 4.5 Write property test for tooltip visibility on hover — Property 4
    - **Property 4: Tooltip Visibility on Hover**
    - **Validates: Requirements 3.1, 3.12**
    - Simulate mouseenter/mouseleave on a square; assert tooltip visible/hidden state

  - [ ]* 4.6 Write property test for color level mapping — Property 7
    - **Property 7: Color Level Mapping Preservation**
    - **Validates: Requirements 6.6**
    - For each level 0–4, assert `getLevelColor(level)` returns the original hex value

- [x] 5. Render the custom tooltip element
  - [x] 5.1 Add tooltip `<div>` to JSX (rendered when `tooltip?.visible` is true)
    - `position: fixed`, `left: tooltip.x`, `top: tooltip.y`
    - Background `#1A1A1A`, color `#F5F0E8`, monospace font, 11px, padding `6px 10px`
    - `borderRadius: 0`, `pointerEvents: 'none'`, `zIndex: 99999`, `whiteSpace: 'nowrap'`
    - _Requirements: 3.4, 3.5, 3.6, 3.7, 3.8, 3.10, 3.11_

- [ ] 6. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All changes are confined to `src/app/components/GitHubContributions.tsx`
- Property tests require `fast-check` (`npm install --save-dev fast-check`)
- Each task references specific requirements for traceability
