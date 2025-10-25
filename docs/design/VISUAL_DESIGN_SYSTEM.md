# Agentic Commerce Narrator - Visual Design System

**Version:** 1.1.0
**Last Updated:** 2025-10-24
**Status:** Active

**Changelog v1.1.0:**
- Added semantic data visualization colors for analytics/dashboards
- Added metric-specific typography system with tabular numerals
- Added prose max-width standards (65ch, 80ch, 50ch)
- Introduced named animation timing system (Athletic/Responsive)
- Introduced named easing functions (Athletic System)
- Added staggered animation patterns with delay multipliers
- Added intersection observer animation patterns
- Added scroll-driven parallax implementation
- Enhanced accessibility with prefers-reduced-motion support

## Design Philosophy

### Core Principles

1. **Depth-First Visual Hierarchy**
   - Use 3-4 color shades and two-shadow technique for elevation
   - Lighter shades = elevated/interactive elements
   - Darker shades = background/recessed surfaces

2. **Data-Centric Design**
   - UI supports data exploration, never competes with content
   - Clear visual hierarchy guides users through complex comparisons
   - 60%+ whitespace ratio for breathing room

3. **Dual-Mode Narrative**
   - Traditional (Cook) vs. Agentic (Chef) comparison theme
   - Visual distinction between approaches without bias
   - Neutral to positive emotional positioning

4. **Professional Quality Standards**
   - Rivaling Linear, Stripe, Apple for polish
   - WCAG AAA accessibility (7:1 contrast minimum)
   - 60fps animation performance

---

## Color System

### Primary Palette

Based on the Cook (Traditional) vs. Chef (Agentic) metaphor for commerce transformation.

#### Traditional Approach Colors
**Semantic:** Established, process-driven, neutral

```css
--traditional-50:  #f9fafb;  /* Lightest - elevated surfaces */
--traditional-100: #f3f4f6;  /* Very light - card backgrounds */
--traditional-200: #e5e7eb;  /* Light - borders, dividers */
--traditional-300: #d1d5db;  /* Medium-light - disabled states */
--traditional-400: #9ca3af;  /* Medium - placeholders */
--traditional-500: #6b7280;  /* Base - secondary text */
--traditional-600: #4b5563;  /* Medium-dark - body text */
--traditional-700: #374151;  /* Dark - headings */
--traditional-800: #1f2937;  /* Darker - primary text */
--traditional-900: #111827;  /* Darkest - emphasis */
```

#### Agentic Approach Colors
**Semantic:** Innovative, autonomous, progressive

```css
--agentic-50:  #eff6ff;  /* Lightest - elevated surfaces */
--agentic-100: #dbeafe;  /* Very light - card backgrounds */
--agentic-200: #bfdbfe;  /* Light - borders, highlights */
--agentic-300: #93c5fd;  /* Medium-light - accents */
--agentic-400: #60a5fa;  /* Medium - interactive elements */
--agentic-500: #3b82f6;  /* Base - primary actions */
--agentic-600: #2563eb;  /* Medium-dark - hover states */
--agentic-700: #1d4ed8;  /* Dark - active states */
--agentic-800: #1e40af;  /* Darker - pressed states */
--agentic-900: #1e3a8a;  /* Darkest - emphasis */
```

#### Functional Colors

```css
/* Success */
--success-500: #10b981;  /* Green */
--success-100: #d1fae5;

/* Warning */
--warning-500: #f59e0b;  /* Amber */
--warning-100: #fef3c7;

/* Error */
--error-500: #ef4444;    /* Red */
--error-100: #fee2e2;

/* Info */
--info-500: #3b82f6;     /* Blue */
--info-100: #dbeafe;
```

#### Semantic Data Visualization Colors

For analytics dashboards, metrics, and data visualization components:

```css
--semantic-success: #10B981;  /* Growth, positive trends, KPI increases */
--semantic-warning: #F59E0B;  /* Opportunities, caution, stagnation */
--semantic-error:   #EF4444;  /* Decline, issues, KPI decreases */
--semantic-info:    #3B82F6;  /* Neutral information, baseline data */
--semantic-neutral: #6B7280;  /* No change, baseline reference */
```

**Usage Guidelines:**
- Use for metrics, KPIs, trend indicators, and data visualizations
- Apply to numeric values that convey status or change
- Combine with metric typography for dashboard numbers
- Maintain semantic meaning across all data displays

**Examples:**
```tsx
// Positive metric (revenue growth)
<span className="text-semantic-success text-metric-xl">+42%</span>

// Warning metric (approaching threshold)
<span className="text-semantic-warning text-metric-lg">85%</span>

// Negative metric (decline)
<span className="text-semantic-error text-metric-xl">-12%</span>
```

### Background & Surface Layers

Following the depth-first principle with 4 distinct layers:

```css
/* Light Theme */
--bg-page:    hsl(210 20% 96%);  /* Page background (deepest) */
--bg-dark:    hsl(210 20% 92%);  /* Secondary containers */
--bg:         hsl(210 20% 98%);  /* Primary cards & content */
--bg-light:   hsl(0 0% 100%);    /* Elevated interactive elements */

/* Dark Theme */
--bg-page-dark:  hsl(210 20% 8%);   /* Page background (deepest) */
--bg-dark-dark:  hsl(210 20% 12%);  /* Secondary containers */
--bg-dark:       hsl(210 20% 16%);  /* Primary cards & content */
--bg-light-dark: hsl(210 20% 20%);  /* Elevated interactive elements */

/* Text */
--text-primary:   hsl(210 20% 12%);  /* Primary text */
--text-secondary: hsl(210 10% 40%);  /* Secondary text */
--text-muted:     hsl(210 10% 60%);  /* Muted/disabled text */

/* Dark Theme Text */
--text-primary-dark:   hsl(210 20% 94%);
--text-secondary-dark: hsl(210 10% 70%);
--text-muted-dark:     hsl(210 10% 50%);
```

---

## Typography

### Font Stack

```css
--font-family-base: 'Inter Variable', ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-family-mono: ui-monospace, 'SF Mono', 'Cascadia Code', 'Source Code Pro', monospace;
```

**Rationale:** Inter Variable provides excellent readability and professional polish across all weights.

### Type Scale

```css
/* Display & Headings */
--text-xs:   0.75rem;   /* 12px - Labels, meta */
--text-sm:   0.875rem;  /* 14px - Small body, captions */
--text-base: 1rem;      /* 16px - Body text */
--text-lg:   1.125rem;  /* 18px - Large body */
--text-xl:   1.25rem;   /* 20px - H3 */
--text-2xl:  1.5rem;    /* 24px - H2 */
--text-3xl:  1.875rem;  /* 30px - H1 */
--text-4xl:  2.25rem;   /* 36px - Display */
--text-5xl:  3rem;      /* 48px - Large display */

/* Line Heights */
--leading-tight:  1.2;  /* Headings */
--leading-normal: 1.5;  /* Body text */
--leading-loose:  1.75; /* Large paragraphs */

/* Font Weights */
--font-normal:    400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;
```

### Typography Hierarchy

```css
/* Page Title */
h1 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

/* Section Heading */
h2 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

/* Subsection Heading */
h3 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
}

/* Body Text */
p {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

/* Small Text */
.text-small {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
}
```

### Metric-Specific Typography

For dashboards, analytics, and KPI displays where numeric values need special emphasis:

```css
/* Large Dashboard Numbers */
.text-metric-2xl {
  font-size: 3rem;           /* 48px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  font-variant-numeric: tabular-nums;  /* Fixed-width numbers */
}

/* Standard Metrics */
.text-metric-xl {
  font-size: 2.25rem;        /* 36px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  font-variant-numeric: tabular-nums;
}

/* Small Metrics */
.text-metric-lg {
  font-size: 1.5rem;         /* 24px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  font-variant-numeric: tabular-nums;
}

/* Metric Labels */
.text-metric-md {
  font-size: 1.125rem;       /* 18px */
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
}
```

**Key Features:**
- `tabular-nums` ensures numbers align vertically in tables and dashboards
- Tighter line-height for compact metric displays
- Designed to pair with semantic data visualization colors
- Optimized for readability at a glance

**Usage Examples:**
```tsx
// KPI Card
<div className="metric-card">
  <span className="text-metric-md text-traditional-600">Revenue</span>
  <span className="text-metric-2xl text-semantic-success">$1.2M</span>
  <span className="text-sm text-semantic-success">+24% vs last month</span>
</div>

// Analytics Dashboard
<div className="dashboard-stat">
  <h4 className="text-metric-md">Active Users</h4>
  <p className="text-metric-xl text-traditional-900">42,156</p>
</div>
```

### Prose Max-Widths

For optimal reading comfort and content hierarchy:

```css
--prose-width-blog:      65ch;  /* Blog posts, standard reading */
--prose-width-editorial: 80ch;  /* Editorial content, wider format */
--prose-width-narrow:    50ch;  /* Captions, sidebars, annotations */
```

**Guidelines:**
- Use `ch` units for content-aware width constraints
- 65ch is optimal for most body text (45-75 characters per line)
- 80ch for technical documentation or editorial content
- 50ch for supplementary content like captions or sidebars

**Usage:**
```tsx
// Blog post
<article className="prose-blog">
  <p>Long-form content with optimal line length...</p>
</article>

// Technical documentation
<div className="prose-editorial">
  <p>Wider format for code examples and technical details...</p>
</div>
```

---

## Spacing System

Consistent spacing scale using 4px base unit:

```css
--space-0:   0;
--space-1:   0.25rem;  /* 4px */
--space-2:   0.5rem;   /* 8px */
--space-3:   0.75rem;  /* 12px */
--space-4:   1rem;     /* 16px */
--space-5:   1.25rem;  /* 20px */
--space-6:   1.5rem;   /* 24px */
--space-8:   2rem;     /* 32px */
--space-10:  2.5rem;   /* 40px */
--space-12:  3rem;     /* 48px */
--space-16:  4rem;     /* 64px */
--space-20:  5rem;     /* 80px */
--space-24:  6rem;     /* 96px */
```

**Usage Guidelines:**
- **Component padding:** 12px (space-3) to 24px (space-6)
- **Section spacing:** 48px (space-12) to 64px (space-16)
- **Element gaps:** 8px (space-2) to 16px (space-4)

---

## Shadow System

Two-shadow technique for realistic depth perception.

### Elevation Scale

```css
/* Flat - No elevation */
--shadow-none: none;

/* Subtle - Slight elevation (inputs, inactive cards) */
--shadow-sm:
  inset 0 1px 0 hsl(0 0% 100% / 0.4),
  0 1px 2px hsl(0 0% 0% / 0.06);

/* Medium - Standard elevation (cards, dropdowns) */
--shadow-md:
  inset 0 1px 0 hsl(0 0% 100% / 0.5),
  0 2px 4px hsl(0 0% 0% / 0.08),
  0 4px 8px hsl(0 0% 0% / 0.06);

/* Large - Prominent elevation (modals, popovers) */
--shadow-lg:
  inset 0 1px 0 hsl(0 0% 100% / 0.6),
  0 6px 12px hsl(0 0% 0% / 0.10),
  0 12px 24px hsl(0 0% 0% / 0.12);

/* Extra Large - Maximum elevation (command palette) */
--shadow-xl:
  inset 0 2px 0 hsl(0 0% 100% / 0.7),
  0 12px 24px hsl(0 0% 0% / 0.12),
  0 24px 48px hsl(0 0% 0% / 0.16);

/* Recessed - Sunken effect (inputs, tables) */
--shadow-inset:
  inset 0 2px 4px hsl(0 0% 0% / 0.12),
  inset 0 -2px 3px hsl(0 0% 100% / 0.40);
```

### Application Guidelines

- **Layer 1 (Deepest):** Inputs, tables, data displays - use `--shadow-inset`
- **Layer 2 (Base):** Page sections, card containers - use `--shadow-none` or `--shadow-sm`
- **Layer 3 (Elevated):** Metric cards, selected tabs - use `--shadow-md`
- **Layer 4 (Most Elevated):** Buttons, hover states, modals - use `--shadow-lg` or `--shadow-xl`

---

## Border Radius

```css
--radius-sm:  0.375rem;  /* 6px - Tags, badges */
--radius-md:  0.5rem;    /* 8px - Buttons, inputs */
--radius-lg:  0.75rem;   /* 12px - Cards */
--radius-xl:  1rem;      /* 16px - Large containers */
--radius-2xl: 1.5rem;    /* 24px - Hero sections */
--radius-full: 9999px;   /* Circular */
```

**Usage:**
- Small elements (badges, tags): `--radius-sm`
- Interactive elements (buttons, inputs): `--radius-md`
- Content cards: `--radius-lg`
- Section containers: `--radius-xl`

---

## Component Specifications

### Buttons

#### Primary Button (Agentic Action)

```css
.btn-primary {
  background: var(--agentic-500);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--agentic-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--agentic-700);
  box-shadow: var(--shadow-sm);
  transform: translateY(0);
}
```

#### Secondary Button (Traditional/Neutral Action)

```css
.btn-secondary {
  background: var(--traditional-100);
  color: var(--traditional-700);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--traditional-200);
  box-shadow: var(--shadow-md);
}
```

### Cards

#### Benchmark Card (Traditional Approach)

```css
.card-benchmark {
  background: var(--traditional-50);
  border: 1px solid var(--traditional-200);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.card-benchmark:hover {
  border-color: var(--traditional-300);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

#### Projection Card (Agentic Approach)

```css
.card-projection {
  background: var(--agentic-50);
  border: 1px solid var(--agentic-200);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.card-projection:hover {
  border-color: var(--agentic-300);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  background: var(--bg);
  border: 1px solid var(--traditional-300);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-size: var(--text-base);
  color: var(--text-primary);
  box-shadow: var(--shadow-inset);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--agentic-500);
  box-shadow:
    var(--shadow-inset),
    0 0 0 3px var(--agentic-100);
}
```

### Tabs

```css
.tabs-container {
  background: var(--bg-dark);
  padding: var(--space-1);
  border-radius: var(--radius-md);
  display: flex;
  gap: var(--space-1);
}

.tab {
  background: transparent;
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.tab:hover {
  background: var(--bg);
  color: var(--text-primary);
}

.tab.active {
  background: var(--bg-light);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}
```

---

## Motion & Animation

### Named Duration System (Athletic/Responsive)

Semantic naming for animation timing that communicates intent:

```css
/* Named Durations */
--duration-flash:      0.06s;   /* 60ms  - Instant feedback, micro-interactions */
--duration-reaction:   0.12s;   /* 120ms - Quick response, button presses */
--duration-quick-snap: 0.09s;   /* 90ms  - Snappy transitions */
--duration-transition: 0.16s;   /* 160ms - Standard state changes */
--duration-sequence:   0.22s;   /* 220ms - Sequential animations */
--duration-flow:       0.3s;    /* 300ms - Smooth movements, page transitions */
--duration-power:      0.4s;    /* 400ms - Dramatic effects, emphasis */

/* Legacy Durations (Preserved for Compatibility) */
--duration-fast:   0.15s;
--duration-normal: 0.25s;
--duration-slow:   0.4s;
```

**Usage Guidelines:**
- **flash**: Instant visual feedback on clicks, taps
- **reaction**: Button state changes, immediate responses
- **quick-snap**: Snappy micro-interactions, icon animations
- **transition**: Standard hover states, color changes
- **sequence**: Staggered list items, sequential reveals
- **flow**: Smooth page transitions, modal appearances
- **power**: Dramatic reveals, feature introductions

### Named Easing Functions (Athletic System)

Semantic easing functions inspired by athletic movement:

```css
/* Athletic Easing */
--athletic-snap:   cubic-bezier(0.4, 0, 0.2, 1);      /* Quick, responsive */
--athletic-flow:   cubic-bezier(0.25, 0.1, 0.25, 1);  /* Smooth, natural */
--athletic-power:  cubic-bezier(0.4, 0, 0.6, 1);      /* Powerful, decisive */
--athletic-sprint: cubic-bezier(0.55, 0, 0.1, 1);     /* Fast exit */
--athletic-glide:  cubic-bezier(0.25, 0, 0.75, 1);    /* Graceful movement */
--modern-ease:     cubic-bezier(0.16, 1, 0.3, 1);     /* Contemporary smooth */

/* Legacy Easing Functions (Preserved for Compatibility) */
--ease-in:     cubic-bezier(0.4, 0, 1, 1);
--ease-out:    cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Usage Guidelines:**
- **athletic-snap**: Button clicks, quick state changes
- **athletic-flow**: Card hovers, smooth transitions
- **athletic-power**: Page transitions, important reveals
- **athletic-sprint**: Exit animations, dismissals
- **athletic-glide**: Scrolling effects, parallax
- **modern-ease**: Contemporary UI, sophisticated feel

### Animation Principles

1. **Purposeful Motion**
   - Every animation serves a functional purpose
   - Never animate for decoration alone

2. **Performance First**
   - Use `transform` and `opacity` only (GPU-accelerated)
   - Avoid animating `width`, `height`, `top`, `left`
   - Maintain 60fps minimum

3. **Micro-interactions**
   - Button hover: `translateY(-1px)` + shadow expansion
   - Card hover: `translateY(-2px)` + shadow elevation
   - Focus states: border color + ring shadow
   - Loading states: subtle pulse or skeleton screens

### Common Transitions

```css
/* Standard hover/interaction */
.interactive {
  transition: all var(--duration-normal) var(--ease-out);
}

/* Button press feedback */
.btn:active {
  transition: all var(--duration-fast) var(--ease-in);
}

/* Card lift effect */
.card {
  transition:
    transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}
```

### Staggered Animations

For sequential entrance animations that guide user attention:

```css
/* Staggered Animation Delays */
--stagger-delay-base: 0.05s;   /* 50ms between items - standard */
--stagger-delay-fast: 0.03s;   /* 30ms between items - faster */
--stagger-delay-slow: 0.08s;   /* 80ms between items - more dramatic */
```

**Implementation Pattern:**
```tsx
// Svelte component with staggered entrance
{#each items as item, index}
  <div
    class="stagger-item"
    style="animation-delay: {index * 0.05}s"
  >
    {item.content}
  </div>
{/each}
```

**CSS:**
```css
.stagger-item {
  opacity: 0;
  transform: translateY(20px);
  animation: stagger-fade-in var(--duration-flow) var(--athletic-flow) forwards;
}

@keyframes stagger-fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Best Practices:**
- Use 50ms (0.05s) base delay for standard lists (3-8 items)
- Use 30ms (0.03s) for longer lists (9+ items) to avoid cumulative delay
- Use 80ms (0.08s) for dramatic reveals (hero sections, feature highlights)
- Maximum total delay should not exceed 400ms

### Intersection Observer Animations

For scroll-triggered animations that enhance discovery:

**Pattern 1: Fade-in on Scroll**
```typescript
// actions/inView.ts
export function inView(node: HTMLElement, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        node.classList.add('in-view');
        observer.unobserve(node);
      }
    });
  }, { threshold: 0.1, ...options });

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
```

**CSS:**
```css
[data-in-view] {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity var(--duration-flow) var(--athletic-flow),
    transform var(--duration-flow) var(--athletic-flow);
}

[data-in-view].in-view {
  opacity: 1;
  transform: translateY(0);
}
```

**Usage:**
```svelte
<section data-in-view use:inView>
  <h2>Appears on scroll</h2>
</section>
```

**Pattern 2: Scroll-Driven Parallax**
```typescript
// Subtle parallax effect
export function parallax(node: HTMLElement, speed: number = 0.5) {
  const handleScroll = () => {
    const rect = node.getBoundingClientRect();
    const offset = (window.scrollY - rect.top) * speed;
    node.style.transform = `translateY(${offset}px)`;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return {
    destroy() {
      window.removeEventListener('scroll', handleScroll);
    }
  };
}
```

**Accessibility:**
```css
/* Respect user preferences for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .stagger-item,
  [data-in-view] {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## Iconography

### Icon System: Lucide React

**Rationale:** Consistent, professional, semantic icon set.

```tsx
import { ChevronRight, Check, X, Search, Filter } from 'lucide-react';

// Usage
<ChevronRight size={20} strokeWidth={2} />
```

### Size Scale

```css
--icon-xs: 14px;  /* Inline text icons */
--icon-sm: 16px;  /* Small UI elements */
--icon-md: 20px;  /* Standard buttons/inputs */
--icon-lg: 24px;  /* Large actions */
--icon-xl: 32px;  /* Feature highlights */
```

### Guidelines

- **NO EMOJIS** - Use Lucide icons exclusively
- Consistent stroke width: 2px (Lucide default)
- Semantic usage only (enhance clarity, not decoration)
- Match icon color to surrounding text
- Use ARIA labels for accessibility

---

## Accessibility Standards

### WCAG AAA Compliance

**Minimum Contrast Ratios:**
- Normal text: 7:1
- Large text (18px+): 4.5:1
- UI components: 3:1

### Keyboard Navigation

- All interactive elements must be keyboard-accessible
- Visible focus indicators with 2px outline
- Logical tab order
- Escape key closes modals/overlays

### Screen Readers

- Semantic HTML elements (`<nav>`, `<main>`, `<button>`)
- Descriptive ARIA labels for complex components
- Alt text for all meaningful images
- Form labels properly associated

### Touch Targets

- Minimum 44x44px tap target size
- 8px spacing between interactive elements
- No hover-only interactions (mobile consideration)

---

## Responsive Design

### Breakpoints

```css
--screen-sm:  640px;   /* Mobile landscape */
--screen-md:  768px;   /* Tablet portrait */
--screen-lg:  1024px;  /* Tablet landscape */
--screen-xl:  1280px;  /* Desktop */
--screen-2xl: 1536px;  /* Large desktop */
```

### Mobile-First Approach

Design for smallest screen first, enhance for larger viewports.

```css
/* Mobile (default) */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Content Priority

- Essential content visible on mobile
- Progressive disclosure for secondary info
- Collapsible sections on smaller screens
- Sticky navigation for context retention

---

## Implementation Checklist

### Before Starting a Component

- [ ] Defined clear purpose and user need
- [ ] Reviewed similar components for consistency
- [ ] Selected appropriate color tokens (Traditional vs Agentic)
- [ ] Planned responsive behavior
- [ ] Considered accessibility requirements

### During Development

- [ ] Using design tokens exclusively (no hardcoded values)
- [ ] Implementing proper shadow elevation
- [ ] Adding smooth transitions for interactions
- [ ] Following typography hierarchy
- [ ] Using Lucide icons consistently
- [ ] Testing keyboard navigation

### Before Merging

- [ ] Verified contrast ratios (WCAG AAA)
- [ ] Tested across breakpoints (mobile, tablet, desktop)
- [ ] Checked focus indicators are visible
- [ ] Validated with screen reader
- [ ] Confirmed 60fps animations
- [ ] Reviewed with design system documentation

---

## Design Token Implementation

All design tokens are defined in `tailwind.config.ts` and available as CSS custom properties.

```tsx
// Tailwind class usage
<div className="bg-traditional-50 text-traditional-800 rounded-lg shadow-md p-4">

// CSS custom property usage
<div style={{
  background: 'var(--traditional-50)',
  color: 'var(--traditional-800)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-md)',
  padding: 'var(--space-4)'
}}>
```

---

## References

**Source Documentation:**
- nino-chavez-gallery Design Brief: Premium quality standards, motion design
- SemantIQ Design Guide: Depth/layering system, shadow techniques
- Tailwind CSS v4: Utility-first framework
- WCAG 2.1 AAA: Accessibility guidelines
- Inter Font Family: Typography system

**Version History:**
- v1.0.0 (2025-01-24): Initial unified design system

---

**Questions or Feedback?**
This is a living document. Propose changes via pull requests to improve consistency and usability.
