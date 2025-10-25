# Visual Design System - Quick Reference

**For:** Developers implementing UI components
**Source:** `docs/design/VISUAL_DESIGN_SYSTEM.md`

## Common Patterns

### Cards

```tsx
// Traditional Benchmark Card
<div className="bg-traditional-50 border border-traditional-300 rounded-lg p-4 shadow-sm
                hover:border-traditional-400 hover:shadow-md hover:-translate-y-0.5
                transition-all duration-200">
  {/* Content */}
</div>

// Agentic Projection Card
<div className="bg-agentic-50 border border-agentic-300 rounded-lg p-4 shadow-sm
                hover:border-agentic-400 hover:shadow-md hover:-translate-y-0.5
                transition-all duration-200">
  {/* Content */}
</div>
```

### Buttons

```tsx
// Primary (Agentic) Action
<button className="bg-agentic-500 text-white font-semibold px-6 py-3 rounded-md
                   shadow-sm hover:bg-agentic-600 hover:shadow-md hover:-translate-y-px
                   active:bg-agentic-700 active:shadow-sm active:translate-y-0
                   transition-all duration-200">
  Action Label
</button>

// Secondary (Traditional) Action
<button className="bg-traditional-100 text-traditional-700 font-semibold px-6 py-3 rounded-md
                   shadow-sm hover:bg-traditional-200 hover:shadow-md
                   transition-all duration-200">
  Action Label
</button>

// Ghost Button
<button className="text-traditional-700 hover:text-traditional-900 hover:bg-traditional-100
                   font-medium px-4 py-2 rounded-md transition-all duration-200">
  Link Action
</button>
```

### Inputs

```tsx
<input
  type="text"
  className="w-full bg-white border border-traditional-300 rounded-md px-4 py-3
             text-base text-traditional-900 placeholder:text-traditional-400
             shadow-inner
             focus:outline-none focus:border-agentic-500 focus:ring-3 focus:ring-agentic-100
             transition-all duration-200"
  placeholder="Enter value..."
/>
```

### Tabs

```tsx
<div className="bg-traditional-100 p-1 rounded-md inline-flex gap-1">
  <button className="px-4 py-2 rounded-sm font-medium text-sm
                     bg-white text-traditional-900 shadow-sm">  {/* Active */}
    Active Tab
  </button>
  <button className="px-4 py-2 rounded-sm font-medium text-sm
                     text-traditional-600 hover:text-traditional-900 hover:bg-white/50
                     transition-all duration-200">
    Inactive Tab
  </button>
</div>
```

### Badges

```tsx
// Traditional
<span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium
                 bg-traditional-100 text-traditional-800">
  Traditional
</span>

// Agentic
<span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium
                 bg-agentic-100 text-agentic-800">
  Agentic
</span>

// Success
<span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium
                 bg-green-100 text-green-800">
  Active
</span>
```

---

## Color Quick Reference

### When to Use Each Color

| Use Case | Color | Class Example |
|----------|-------|---------------|
| Traditional approach content | Traditional grays | `bg-traditional-50` `text-traditional-800` |
| Agentic approach content | Agentic blues | `bg-agentic-50` `text-agentic-800` |
| Primary actions | Agentic 500 | `bg-agentic-500 text-white` |
| Secondary actions | Traditional 100-200 | `bg-traditional-100 text-traditional-700` |
| Success states | Green | `bg-green-100 text-green-800` |
| Errors | Red | `bg-red-100 text-red-800` |
| Warnings | Amber | `bg-amber-100 text-amber-800` |
| Info | Blue | `bg-blue-100 text-blue-800` |

### Semantic Data Visualization Colors

For metrics, KPIs, trend indicators, and data visualizations:

| Use Case | Color | Class Example |
|----------|-------|---------------|
| Growth, positive trends, KPI increases | Success Green | `text-semantic-success` |
| Opportunities, caution, stagnation | Warning Amber | `text-semantic-warning` |
| Decline, issues, KPI decreases | Error Red | `text-semantic-error` |
| Neutral information, baseline data | Info Blue | `text-semantic-info` |
| No change, baseline reference | Neutral Gray | `text-semantic-neutral` |

**Examples:**
```tsx
// Positive metric
<div className="flex items-baseline gap-2">
  <span className="text-metric-2xl text-semantic-success">+42%</span>
  <span className="text-sm text-semantic-success">Revenue Growth</span>
</div>

// Negative metric
<div className="flex items-baseline gap-2">
  <span className="text-metric-xl text-semantic-error">-12%</span>
  <span className="text-sm text-semantic-error">Conversion Rate</span>
</div>

// Warning metric
<div className="flex items-baseline gap-2">
  <span className="text-metric-lg text-semantic-warning">85%</span>
  <span className="text-sm text-semantic-warning">Approaching Threshold</span>
</div>

// Neutral/baseline metric
<div className="flex items-baseline gap-2">
  <span className="text-metric-xl text-semantic-neutral">0%</span>
  <span className="text-sm text-semantic-neutral">No Change</span>
</div>
```

---

## Shadow Quick Reference

```css
/* Component Shadows */
shadow-sm     /* Subtle elevation - inactive cards, inputs */
shadow-md     /* Standard elevation - active cards, dropdowns */
shadow-lg     /* Prominent elevation - modals, popovers */
shadow-xl     /* Maximum elevation - command palette */

/* Utility Classes (from tokens.css) */
.shadow-sm-elevated      /* Small shadow with inset highlight */
.shadow-md-elevated      /* Medium shadow with inset highlight */
.shadow-lg-elevated      /* Large shadow with inset highlight */
.shadow-inset-recessed   /* Sunken effect for inputs/tables */
```

---

## Spacing Quick Reference

```css
/* Common Patterns */
p-4      /* Standard card padding (16px) */
p-6      /* Comfortable card padding (24px) */
gap-4    /* Standard flex/grid gap (16px) */
space-y-4  /* Standard vertical spacing (16px) */
mb-6     /* Section bottom margin (24px) */
mt-8     /* Large section spacing (32px) */
```

---

## Typography Quick Reference

### Standard Text Styles

```tsx
/* Headings */
<h1 className="text-3xl font-bold text-traditional-900">
  Page Title
</h1>

<h2 className="text-2xl font-semibold text-traditional-900">
  Section Heading
</h2>

<h3 className="text-xl font-semibold text-traditional-800">
  Subsection Heading
</h3>

/* Body Text */
<p className="text-base text-traditional-600">
  Regular paragraph text with good readability.
</p>

/* Small Text */
<span className="text-sm text-traditional-500">
  Captions, metadata, secondary information
</span>

/* Extra Small */
<span className="text-xs text-traditional-400">
  Labels, timestamps, fine print
</span>
```

### Metric Typography (Dashboards & Analytics)

```tsx
/* Large Dashboard Number */
<span className="text-metric-2xl text-semantic-success">
  $1.2M
</span>

/* Standard Metric */
<div className="metric-card">
  <span className="text-metric-md text-traditional-600">Revenue</span>
  <span className="text-metric-xl text-traditional-900">42,156</span>
  <span className="text-sm text-semantic-success">+24%</span>
</div>

/* Small Metric */
<span className="text-metric-lg text-traditional-900">
  1,234
</span>

/* KPI Card Pattern */
<div className="bg-white rounded-lg p-6 border border-traditional-200">
  <h4 className="text-metric-md text-traditional-600 mb-2">Active Users</h4>
  <p className="text-metric-2xl text-semantic-success mb-1">+42%</p>
  <p className="text-sm text-traditional-500">vs last month</p>
</div>
```

**Key Features:**
- `tabular-nums` applied automatically for number alignment
- Tight line-height for compact displays
- Pairs perfectly with semantic data colors

### Prose Max-Widths

```tsx
/* Blog Post (65ch optimal) */
<article className="prose-blog mx-auto px-4">
  <p>Long-form content with optimal line length...</p>
</article>

/* Technical Documentation (80ch wider) */
<div className="prose-editorial mx-auto px-6">
  <p>Wider format for code examples and technical details...</p>
</div>

/* Sidebar/Caption (50ch narrow) */
<aside className="prose-narrow">
  <p>Supplementary content...</p>
</aside>
```

---

## Icons (Lucide React)

```tsx
import { ChevronRight, Check, X, Search, Filter, Settings } from 'lucide-react';

// Standard size (20px)
<Search size={20} strokeWidth={2} className="text-traditional-600" />

// Small size (16px)
<Check size={16} strokeWidth={2} className="text-green-600" />

// Large size (24px)
<Settings size={24} strokeWidth={2} className="text-traditional-700" />
```

**Icon Colors:**
- Match surrounding text color
- Use `text-traditional-600` for neutral icons
- Use `text-agentic-600` for agentic-themed icons
- Use semantic colors for status (green/red/amber)

---

## Animation Patterns

### Named Animation Timing

```tsx
// Flash - Instant feedback (60ms)
<button style="transition: background var(--duration-flash) var(--athletic-snap)">

// Reaction - Quick response (120ms)
<button style="transition: all var(--duration-reaction) var(--athletic-snap)">

// Transition - Standard (160ms)
<div style="transition: all var(--duration-transition) var(--athletic-flow)">

// Sequence - Sequential animations (220ms)
<div style="animation: fadeIn var(--duration-sequence) var(--athletic-flow)">

// Flow - Smooth movements (300ms)
<div style="transition: all var(--duration-flow) var(--athletic-flow)">

// Power - Dramatic effects (400ms)
<div style="animation: reveal var(--duration-power) var(--athletic-power)">
```

### Standard Patterns

```tsx
// Standard hover lift
<div className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

// Button press feedback
<button className="transition-all duration-200
                   hover:-translate-y-px hover:shadow-md
                   active:translate-y-0 active:shadow-sm">

// Smooth color transitions
<div className="transition-colors duration-200 hover:bg-traditional-100">

// Fade in/out
<div className="transition-opacity duration-300 opacity-0 hover:opacity-100">
```

### Staggered Animations

```tsx
// List with staggered entrance
{#each items as item, index}
  <div
    class="stagger-item"
    style="animation-delay: {index * 0.05}s"
  >
    {item.content}
  </div>
{/each}

// CSS for staggered items
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

### Intersection Observer Animations

```typescript
// Svelte action for scroll-triggered animations
export function inView(node: HTMLElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        node.classList.add('in-view');
        observer.unobserve(node);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}

// Usage
<section data-in-view use:inView>
  <h2>Appears on scroll</h2>
</section>
```

**Duration Guidelines:**
- Flash (60ms): Instant visual feedback
- Reaction (120ms): Button presses, immediate feedback
- Transition (160ms): Hover states, color changes
- Sequence (220ms): Staggered animations
- Flow (300ms): Smooth page transitions
- Power (400ms): Large layout changes, dramatic reveals

---

## Accessibility Checklist

- [ ] Color contrast ratio 7:1 minimum (WCAG AAA)
- [ ] All interactive elements keyboard-accessible
- [ ] Focus indicators visible (2px outline)
- [ ] Touch targets minimum 44x44px
- [ ] Semantic HTML (`<button>`, `<nav>`, `<main>`)
- [ ] ARIA labels on complex components
- [ ] Alt text on meaningful images
- [ ] Logical heading structure (h1-h6)

---

## Common Mistakes to Avoid

❌ **Don't:**
- Use emojis (use Lucide icons instead)
- Hardcode colors (use Tailwind classes or CSS variables)
- Skip hover/focus states
- Create tiny touch targets (<44px)
- Mix traditional and agentic colors in same component
- Animate `width`, `height`, or `top`/`left` (poor performance)

✅ **Do:**
- Use design tokens exclusively
- Add smooth transitions (200-250ms)
- Maintain consistent spacing
- Test on mobile screens
- Verify color contrast
- Use semantic HTML elements
- Animate `transform` and `opacity` only

---

## Need More Details?

See full documentation: `docs/design/VISUAL_DESIGN_SYSTEM.md`
