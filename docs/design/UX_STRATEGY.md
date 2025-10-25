# UX Strategy & Design System

**Version:** 1.0.0
**Date:** 2025-10-25
**Status:** Retrospective - Should Have Been Created Before Implementation
**Related:** PRD.md, IMPLEMENTATION_PLAN.md

---

## Executive Summary

**Critical Failure:** This document was created AFTER implementation, when it should have been foundational. The application was built without:
- Visual design system
- Information architecture planning
- Content strategy
- User journey mapping
- Acceptance criteria for UX quality

**Result:** A technically functional but UX-broken application that fails to deliver on the "Narrative Cockpit" vision.

---

## 1. User Journey Mapping

### Primary User: Sarah Chen (Senior Consultant)

**Pre-Presentation (Setup Phase)**
```
Goal: Tailor presentation to client context in < 10 seconds

Journey:
1. Opens app → sees domain grid
2. Selects filters (Industry: Retail, Persona: CMO)
3. Sees filtered domain view
4. Clicks relevant domain (Customer Experience)
5. Sees filtered capabilities for that domain
6. Reviews and selects 3-5 key capabilities to present

UX Requirements:
✅ Filters must be IMMEDIATELY visible
✅ Filter state must be PERSISTENT across navigation
✅ Filtered results must be OBVIOUSLY different from unfiltered
✅ Domain → Capability path must be < 3 clicks
```

**In-Presentation (Live Navigation)**
```
Goal: Respond to client questions in < 5 seconds

Journey:
1. Client asks: "How does this work for payment processing?"
2. Sarah uses Cmd+K search
3. Types "payment" → sees suggestions
4. Selects "Payment Orchestration"
5. Instantly shows Traditional vs Agentic comparison
6. Client asks: "What agents handle this?"
7. Sarah clicks Agents tab
8. Shows 6 agents categorized by role

UX Requirements:
✅ Search must be discoverable (not just keyboard shortcut)
✅ Capability detail must load instantly
✅ Tabs must be obvious and clickable
✅ Current location must be clear (breadcrumbs)
✅ Can return to previous view easily
```

**Post-Presentation (Follow-up)**
```
Goal: Share exact view with client via URL

Journey:
1. Sarah copies URL from browser
2. Sends to client via email
3. Client opens link → sees EXACT same view
4. Client can explore independently

UX Requirements:
✅ URL must capture ALL state (domain, capability, filters, tabs)
✅ URL must be shareable and persistent
✅ Link must work without auth/session
```

---

## 2. Information Architecture

### Navigation Hierarchy

```
Level 0: Home (Domain Selection)
├── Level 1: Domain View (Capability Grid)
│   ├── Level 2: Capability Detail (Comparison View)
│   │   ├── Tab 1: Functions
│   │   ├── Tab 2: Agents
│   │   └── Tab 3: Personas
```

### Breadcrumb Pattern

**REQUIRED on all pages:**
```
Home > Customer Experience & Marketing > Payment Orchestration > Agents
└─┬─┘   └────────────┬────────────────┘   └─────────┬──────────┘   └──┬─┘
  │                  │                                │                  │
  │                  │                                │                  └─ Active Tab
  │                  │                                └─ Current Capability
  │                  └─ Current Domain
  └─ Root (always clickable)
```

### Filter State Visibility

**MUST be visible on ALL pages:**
- Header-level indicator when filters active
- Cannot disappear during navigation
- One-click to clear filters
- Visual distinction between filtered/unfiltered states

---

## 3. Visual Design System

### Typography Scale

```css
/* Primary Heading (Page Title) */
h1: text-2xl font-bold (24px, 700 weight)
Example: "Payment Orchestration"

/* Secondary Heading (Section) */
h2: text-lg font-semibold (18px, 600 weight)
Example: "Traditional Approach"

/* Tertiary Heading (Subsection) */
h3: text-base font-semibold (16px, 600 weight)
Example: "Key Functions"

/* Body Text */
p: text-sm (14px, 400 weight)
Example: Descriptions and explanations

/* Small Text */
small: text-xs (12px, 400 weight)
Example: Metadata, counts, labels

/* Emphasis */
strong: font-medium (500 weight)
Example: Metric labels, call-outs
```

### Color Semantic System

**Status Colors:**
```css
/* Filters Active */
--filter-active-bg: bg-agentic-50
--filter-active-border: border-agentic-200
--filter-active-text: text-agentic-700

/* Warning/Context */
--warning-bg: bg-amber-50
--warning-border: border-amber-200
--warning-text: text-amber-700

/* Success/Confirmation */
--success-bg: bg-green-50
--success-border: border-green-200
--success-text: text-green-700

/* Error/Alert */
--error-bg: bg-red-50
--error-border: border-red-200
--error-text: text-red-600
```

**Content Colors:**
```css
/* Traditional Approach */
--traditional-bg: bg-traditional-50
--traditional-border: border-traditional-200
--traditional-text: text-traditional-900

/* Agentic Approach */
--agentic-bg: bg-agentic-50
--agentic-border: border-agentic-200
--agentic-text: text-agentic-900
```

### Spacing System

```css
/* Component Internal Padding */
--space-tight: p-2 (8px)
--space-normal: p-4 (16px)
--space-relaxed: p-6 (24px)

/* Component Gap/Margin */
--gap-tight: gap-2 (8px)
--gap-normal: gap-4 (16px)
--gap-relaxed: gap-6 (24px)

/* Section Spacing */
--section-gap: mb-6 (24px)
```

### Component States

**ALL interactive elements must have:**

```css
/* Default State */
Base styling with clear affordance

/* Hover State */
:hover {
  background: lightened/colored
  border: emphasized
  cursor: pointer
  transition: 150ms ease
}

/* Active/Selected State */
:active, .selected {
  background: brand color
  text: white or high contrast
  border: brand color darker
}

/* Focus State (Keyboard Navigation) */
:focus-visible {
  outline: 2px solid brand
  outline-offset: 2px
}

/* Disabled State */
:disabled {
  opacity: 0.5
  cursor: not-allowed
  background: gray-100
}

/* Loading State */
.loading {
  spinner visible
  content semi-transparent
  user interaction blocked
}
```

---

## 4. Content Strategy

### Voice & Tone

**Personality:**
- Expert but approachable
- Confident without arrogance
- Action-oriented
- Clear over clever

**Writing Principles:**
1. **Active voice:** "You can filter..." NOT "Capabilities can be filtered..."
2. **Specific numbers:** "15-25% cost reduction" NOT "significant savings"
3. **Action-oriented:** "Add to presentation" NOT "Can be added"
4. **Conversational:** "Let's explore" NOT "One may explore"

### Microcopy Standards

**Empty States:**
```
❌ "No agents defined for this capability"
✅ "No agents mapped yet. Agent mapping is in progress."

❌ "No results"
✅ "No capabilities match your filters. Try clearing filters or selecting a different domain."
```

**Error Messages:**
```
❌ "Error loading data"
✅ "Failed to load agents. This might be a temporary issue. [Try again]"

❌ "404 Not Found"
✅ "This capability doesn't exist or has been moved. [Back to domains]"
```

**Success Confirmations:**
```
❌ "Added"
✅ "Added to presentation. You now have 4 slides. [View presentation]"

❌ "Saved"
✅ "Presentation saved. Share this link with your client: [copy URL]"
```

**Button Labels:**
```
❌ "Submit"
✅ "Add to Presentation"

❌ "Back"
✅ "← Back to Capabilities"

❌ "Clear"
✅ "Clear All Filters"
```

### Call-to-Action Hierarchy

**Primary CTA** (most important action on page):
- Prominent button
- Brand color background
- High contrast text
- Clear action verb
- Example: "Add to Presentation"

**Secondary CTA** (supporting action):
- Outlined button or subtle background
- Lower visual weight than primary
- Example: "View Details"

**Tertiary CTA** (utility action):
- Text link with underline
- Minimal visual weight
- Example: "Clear filters"

---

## 5. Interaction Patterns

### Search

**Visibility:**
- ✅ Search bar ALWAYS visible in header
- ✅ Placeholder text: "Search capabilities, benchmarks, projections..."
- ✅ Cmd+K shortcut shown in UI
- ✅ Results appear as-you-type

**Behavior:**
- Minimum 2 characters before search
- Debounce: 150ms
- Highlight matching terms
- Show result categories (Capabilities, Domains)
- Keyboard navigation (↑↓ to select, Enter to navigate)

### Filters

**Placement:**
- Header-level (global scope)
- Always visible
- Sticky on scroll

**Visual States:**
```
Inactive: Dropdown shows "All Industries"
Active: Dropdown shows "Retail" + Prominent badge "Filters Active [Clear]"
```

**Behavior:**
- Instant filtering (no "Apply" button)
- Clear visual feedback when filters change results
- Persistent across navigation
- URL state synced

### Tabs

**Visual Design:**
```css
/* Inactive Tab */
background: transparent
text: text-traditional-600
border-bottom: 2px transparent

/* Hover Tab */
background: bg-traditional-50
text: text-traditional-900
cursor: pointer

/* Active Tab */
background: bg-white
text: text-agentic-700
border-bottom: 2px solid agentic-600
font-weight: font-semibold
```

**Behavior:**
- Click to switch
- URL state synced (?tab=agents)
- Content transitions smoothly (200ms fade)

### Hover Affordances

**ALL clickable elements:**
- Cards: border color change + subtle lift
- Buttons: background darken + cursor pointer
- Links: underline + color change
- Domain cards: border + slight scale (102%)

---

## 6. Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

**Keyboard Navigation:**
- All interactive elements focusable
- Focus indicators visible (2px outline)
- Tab order logical
- Skip links for major sections

**Screen Reader Support:**
- Semantic HTML (nav, main, aside)
- ARIA labels on icon buttons
- ARIA live regions for dynamic content
- Alt text on all images/icons

**Motion:**
- Respect prefers-reduced-motion
- No auto-playing animations
- Transitions < 300ms

---

## 7. UX Acceptance Criteria

### Page Load

- [ ] User sees domain grid in < 1 second
- [ ] Filters visible immediately
- [ ] Search bar has helpful placeholder
- [ ] All interactive elements have hover states

### Navigation

- [ ] Breadcrumbs show current location
- [ ] Can return to previous view in 1 click
- [ ] Filter state persists across navigation
- [ ] URL captures all state

### Filters

- [ ] Active filters have prominent visual indicator
- [ ] Filtered results visibly different from unfiltered
- [ ] Can clear filters in 1 click
- [ ] Filter changes update results instantly

### Search

- [ ] Search bar always visible
- [ ] Placeholder explains what's searchable
- [ ] Results appear in < 100ms
- [ ] Can navigate with keyboard

### Content

- [ ] All text readable (contrast, size)
- [ ] Empty states helpful and actionable
- [ ] Error messages clear and recoverable
- [ ] Numbers specific and credible

### Interaction

- [ ] All clickable elements have hover states
- [ ] Focus states visible for keyboard nav
- [ ] Loading states shown during data fetch
- [ ] Disabled states clearly indicated

### Mobile (Future)

- [ ] Responsive layout for tablets
- [ ] Touch-friendly targets (44px minimum)
- [ ] Readable text without zoom
- [ ] Simplified navigation for small screens

---

## 8. Component Library

### Core Components

**Cards:**
```tsx
<Card
  variant="neutral" | "traditional" | "agentic"
  interactive={boolean}
  hover={boolean}
  padding="tight" | "normal" | "relaxed"
/>
```

**Buttons:**
```tsx
<Button
  variant="primary" | "secondary" | "tertiary" | "ghost"
  size="sm" | "md" | "lg"
  icon={IconComponent}
  loading={boolean}
  disabled={boolean}
/>
```

**Badges:**
```tsx
<Badge
  variant="neutral" | "info" | "success" | "warning" | "error" | "agentic"
  size="sm" | "md"
/>
```

**Tabs:**
```tsx
<Tabs
  items={TabItem[]}
  active={string}
  onChange={(tabId) => void}
/>
```

---

## 9. Lessons Learned

### What Went Wrong

1. **No UX phase before coding** → Generic data browser instead of Narrative Cockpit
2. **No visual design system** → Inconsistent spacing, unclear hierarchy
3. **No content strategy** → Confusing copy, weak CTAs
4. **No user journey mapping** → Lost context, unclear navigation
5. **No acceptance criteria** → "Working code" ≠ "good UX"

### What Should Have Happened

**Week 1: UX Foundation**
- User journey mapping
- Information architecture
- Wireframes (lo-fi)
- Content strategy
- Visual design system

**Week 2: Visual Design**
- Hi-fi mockups
- Interactive prototype
- User testing (5 participants)
- Iterate based on feedback

**Week 3+: Implementation**
- Build with design system
- Test against UX acceptance criteria
- Screenshot review after each feature
- Continuous user validation

### Process Improvements

**Going Forward:**

1. **No code until wireframes approved**
2. **Screenshot review after every feature**
3. **UX acceptance criteria in every PR**
4. **Weekly user testing sessions**
5. **Design system as source of truth**

---

## 10. Next Steps

### Immediate (This Week)

1. Add breadcrumb navigation
2. Enhance search bar visibility
3. Add hover states to all interactive elements
4. Improve Context Pane spacing

### Short-term (Next 2 Weeks)

1. Improve copy and microcopy
2. Add tooltips to icon buttons
3. Enhance empty states
4. Visual design polish

### Long-term (Month 2)

1. User testing sessions
2. Accessibility audit
3. Mobile responsive design
4. Animation and transitions

---

**Document Owner:** UX Team (Should Have Been)
**Last Updated:** 2025-10-25
**Status:** Retrospective Analysis & Forward-Looking Strategy
