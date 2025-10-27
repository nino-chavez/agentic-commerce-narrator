# Design System Compliance Instructions

**Version:** 1.0.0
**Date:** 2025-10-25
**Enforcement:** MANDATORY for all UI work
**Source:** `docs/design/VISUAL_DESIGN_SYSTEM.md`

## Purpose

This document provides enforceable validation rules to ensure all UI development follows the established design system. Visual inconsistency will trigger auto-rollback.

---

## Required Reading

**Before ANY UI work, you MUST read:**
- `docs/design/VISUAL_DESIGN_SYSTEM.md` - Complete design system
- `docs/design/UX_STRATEGY.md` - User journey and interaction patterns
- `docs/design/STORYBOARD_UX_SPECIFICATION.md` - Storyboard feature design

---

## Color System (Strictly Enforced)

### Traditional vs Agentic Palette

**MUST USE these exact CSS custom properties:**

#### Traditional Approach Colors
```css
/* Use for left side, neutral, baseline states */
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
```css
/* Use for right side, highlighted, improved states */
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
--success-500: #10b981;
--success-100: #d1fae5;

/* Warning */
--warning-500: #f59e0b;
--warning-100: #fef3c7;

/* Error */
--error-500: #ef4444;
--error-100: #fee2e2;

/* Info */
--info-500: #3b82f6;
--info-100: #dbeafe;
```

#### Semantic Data Visualization Colors
```css
/* For metrics, KPIs, trend indicators */
--semantic-success: #10B981;  /* Growth, positive trends */
--semantic-warning: #F59E0B;  /* Opportunities, caution */
--semantic-error:   #EF4444;  /* Decline, issues */
--semantic-info:    #3B82F6;  /* Neutral information */
--semantic-neutral: #6B7280;  /* No change, baseline */
```

### Color Usage Rules

**✅ ALLOWED:**
```svelte
<!-- Tailwind classes using design system -->
<div class="bg-traditional-100 text-traditional-700">
<button class="bg-agentic-600 hover:bg-agentic-700 text-white">
<span class="text-semantic-success">+42%</span>
```

**❌ FORBIDDEN:**
```svelte
<!-- Random hex colors -->
<div style="background: #abc123">
<div class="bg-blue-500">  <!-- Use agentic-500 instead -->

<!-- Inline styles -->
<button style="color: red">  <!-- Use error-500 class -->
```

---

## Typography System (Enforced)

### Type Scale

**Headings:**
```svelte
<!-- H1 - Page titles -->
<h1 class="text-4xl font-bold tracking-tight text-traditional-900">

<!-- H2 - Section headings -->
<h2 class="text-3xl font-semibold text-traditional-800">

<!-- H3 - Subsection headings -->
<h3 class="text-2xl font-medium text-traditional-700">

<!-- H4 - Card titles -->
<h4 class="text-xl font-medium text-traditional-700">
```

**Body Text:**
```svelte
<!-- Default body -->
<p class="text-base text-traditional-600">

<!-- Large body (emphasis) -->
<p class="text-lg text-traditional-700">

<!-- Small text (metadata, captions) -->
<p class="text-sm text-traditional-500">

<!-- Extra small (footnotes) -->
<p class="text-xs text-traditional-400">
```

**Metrics & Data:**
```svelte
<!-- Large metrics -->
<span class="text-metric-xl text-semantic-success">+42%</span>

<!-- Dashboard numbers -->
<span class="text-metric-lg text-semantic-info">1,234</span>
```

### Font Stack

**MUST USE system fonts only:**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**❌ FORBIDDEN:**
- Custom font imports (Google Fonts, Adobe Fonts)
- Web fonts (performance penalty)

---

## Component Patterns (Required)

### Cards

**Standard Card:**
```svelte
<div class="bg-bg-light rounded-lg shadow-sm p-6 border border-traditional-200">
  <h3 class="text-xl font-medium text-traditional-700 mb-4">Card Title</h3>
  <p class="text-base text-traditional-600">Card content</p>
</div>
```

**Traditional Approach Card:**
```svelte
<div class="bg-traditional-50 border-l-4 border-traditional-400 p-6 rounded-r-lg">
  <h4 class="text-lg font-medium text-traditional-700 mb-2">Traditional</h4>
  <p class="text-sm text-traditional-600">Benchmark content</p>
</div>
```

**Agentic Approach Card:**
```svelte
<div class="bg-agentic-50 border-l-4 border-agentic-500 p-6 rounded-r-lg">
  <h4 class="text-lg font-medium text-agentic-700 mb-2">Agentic</h4>
  <p class="text-sm text-agentic-600">Projection content</p>
</div>
```

### Buttons

**Primary (Agentic):**
```svelte
<button class="bg-agentic-600 hover:bg-agentic-700 active:bg-agentic-800
               text-white px-4 py-2 rounded-md
               transition-colors duration-150">
  Primary Action
</button>
```

**Secondary (Traditional):**
```svelte
<button class="bg-traditional-100 hover:bg-traditional-200 active:bg-traditional-300
               text-traditional-700 px-4 py-2 rounded-md border border-traditional-300
               transition-colors duration-150">
  Secondary Action
</button>
```

**Tertiary (Ghost):**
```svelte
<button class="text-agentic-600 hover:text-agentic-700 hover:bg-agentic-50
               px-4 py-2 rounded-md transition-colors duration-150">
  Tertiary Action
</button>
```

### Icons

**MUST USE Lucide Svelte icons:**

```svelte
<script>
  import { Search, Filter, Plus } from 'lucide-svelte';
</script>

<!-- Default size: 24px, stroke-width: 2 -->
<Search class="w-6 h-6 text-traditional-600" />
<Filter class="w-5 h-5 text-agentic-600" />
```

**Icon Usage Rules:**
- Default size: `w-6 h-6` (24px)
- Small: `w-5 h-5` (20px)
- Large: `w-8 h-8` (32px)
- Stroke width: 2 (default)

**❌ FORBIDDEN:**
- Emojis (🚀, ✅, ❌) - enterprise professional aesthetic
- Font Awesome
- Custom SVG icons (use Lucide equivalent)
- Colored icons (use monochrome with text color)

---

## Layout & Spacing (Enforced)

### Spacing Scale

**MUST USE Tailwind spacing scale:**

```svelte
<!-- Extra small -->
<div class="p-2">  <!-- 8px -->

<!-- Small -->
<div class="p-3">  <!-- 12px -->

<!-- Medium (default) -->
<div class="p-4">  <!-- 16px -->

<!-- Large -->
<div class="p-6">  <!-- 24px -->

<!-- Extra large -->
<div class="p-8">  <!-- 32px -->

<!-- Section spacing -->
<div class="p-12">  <!-- 48px -->
```

### Container Widths

**Page Layout:**
```svelte
<!-- Full-width container -->
<div class="max-w-screen-2xl mx-auto px-8">

<!-- Content container -->
<div class="max-w-7xl mx-auto px-6">

<!-- Prose (reading) -->
<div class="max-w-3xl mx-auto">  <!-- 65ch -->
```

### Grid System

**Domain Grid:**
```svelte
<div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Domain cards -->
</div>
```

**Comparison View (Side-by-Side):**
```svelte
<div class="grid grid-cols-2 gap-8">
  <div><!-- Traditional --></div>
  <div><!-- Agentic --></div>
</div>
```

---

## Animation & Transitions (Performance Required)

### Timing System

**Athletic/Responsive (< 200ms):**
```svelte
<!-- Button hover -->
<button class="transition-colors duration-150">

<!-- Modal appear -->
<div class="transition-opacity duration-200">
```

**Smooth (200-400ms):**
```svelte
<!-- Panel slide -->
<div class="transition-transform duration-300">

<!-- Card expand -->
<div class="transition-all duration-350">
```

### Easing Functions

**Use Tailwind defaults:**
- `ease-in` - Start slow
- `ease-out` - End slow (preferred for most UI)
- `ease-in-out` - Start and end slow

**❌ FORBIDDEN:**
- `ease-linear` (feels robotic)
- Custom cubic-bezier without justification

### Reduced Motion

**MUST respect user preferences:**
```svelte
<div class="transition-transform duration-300
            motion-reduce:transition-none">
```

---

## Accessibility (WCAG AAA Required)

### Contrast Requirements

**MUST MEET 7:1 ratio minimum:**

✅ **Compliant:**
- `text-traditional-700` on `bg-white` (12.6:1)
- `text-agentic-600` on `bg-white` (4.5:1) ⚠️ Use 700 for body text
- `text-white` on `bg-agentic-600` (4.5:1) ⚠️ Use 700 for AAA

❌ **Non-Compliant:**
- `text-traditional-400` on `bg-white` (3.2:1) - Too low
- `text-agentic-300` on `bg-white` (2.8:1) - Too low

### Keyboard Navigation

**MUST BE FULLY KEYBOARD ACCESSIBLE:**
```svelte
<!-- Focus states required -->
<button class="focus:outline-none focus:ring-2 focus:ring-agentic-500 focus:ring-offset-2">

<!-- Skip to content -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### ARIA Labels

**Required for:**
- Icon-only buttons
- Search inputs
- Filter controls
- Storyboard actions

```svelte
<button aria-label="Add to storyboard">
  <Plus class="w-5 h-5" />
</button>

<input type="search" aria-label="Search capabilities" />
```

---

## Pre-Implementation Validation Checklist

**Before writing UI code:**

### Design Review
- [ ] Read relevant VISUAL_DESIGN_SYSTEM.md section
- [ ] Identified which component patterns apply
- [ ] Color selections made from design system palette
- [ ] Typography scale selections made
- [ ] Icon selections made from Lucide library

### Accessibility Review
- [ ] Contrast ratios verified (7:1 minimum)
- [ ] Keyboard navigation planned
- [ ] ARIA labels identified for icon buttons
- [ ] Focus states designed
- [ ] Reduced motion fallbacks planned

### Performance Review
- [ ] Animations < 200ms for UI feedback
- [ ] No custom font imports
- [ ] Lucide icons optimized (tree-shaken)
- [ ] Tailwind classes (no inline styles)

---

## Post-Implementation Validation Checklist

**After UI implementation:**

### Visual Compliance
- [ ] All colors from design system palette (no random hex)
- [ ] All typography from defined scale
- [ ] All icons from Lucide library
- [ ] All spacing from Tailwind scale (4, 6, 8, 12, 16, 24)
- [ ] No emojis in production UI

### Component Compliance
- [ ] Cards follow standard patterns
- [ ] Buttons use defined variants (Primary, Secondary, Tertiary)
- [ ] Layouts use established grid patterns
- [ ] Comparison views use side-by-side pattern

### Accessibility Compliance
- [ ] Contrast ratios pass WCAG AAA (7:1)
- [ ] Keyboard navigation works
- [ ] ARIA labels on icon-only buttons
- [ ] Focus states visible and styled
- [ ] Reduced motion respected

### Performance Compliance
- [ ] Animations < 200ms
- [ ] No layout shift (CLS = 0)
- [ ] No custom fonts loaded
- [ ] Tailwind purge optimized

---

## Auto-Rejection Triggers

**The following will trigger auto-rollback:**

### ❌ Color Violations
- Random hex colors in code (`#abc123`)
- Inline color styles
- Non-design-system Tailwind colors (`bg-blue-500`)
- Emojis as visual elements

### ❌ Typography Violations
- Custom font imports
- Inline font styles
- Non-scale font sizes (`text-[17px]`)
- Missing semantic heading hierarchy

### ❌ Component Violations
- Custom button styles (not using patterns)
- Card components without design system classes
- Icon libraries other than Lucide
- Emoji icons in professional UI

### ❌ Accessibility Violations
- Contrast ratios below 7:1
- Missing keyboard navigation
- Icon-only buttons without ARIA labels
- No focus states

### ❌ Performance Violations
- Animations > 400ms
- Custom font file imports
- Inline styles (not using Tailwind)

---

## Example: Compliant Component

```svelte
<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';

  export let title: string;
  export let description: string;
  export let onClick: () => void;
</script>

<!--
  Compliance:
  - Colors: traditional-700, traditional-600, agentic-600 from design system
  - Typography: text-xl, text-base from scale
  - Spacing: p-6, mb-4, gap-2 from Tailwind scale
  - Icon: Lucide ArrowRight
  - Accessibility: ARIA label, focus state, keyboard accessible
  - Performance: transition-colors 150ms
-->
<button
  on:click={onClick}
  class="w-full bg-traditional-50 hover:bg-traditional-100
         border border-traditional-200 rounded-lg p-6
         transition-colors duration-150
         focus:outline-none focus:ring-2 focus:ring-agentic-500 focus:ring-offset-2"
  aria-label={`View ${title} capability`}
>
  <div class="flex items-start justify-between gap-2">
    <div class="text-left">
      <h4 class="text-xl font-medium text-traditional-700 mb-2">
        {title}
      </h4>
      <p class="text-base text-traditional-600">
        {description}
      </p>
    </div>
    <ArrowRight class="w-5 h-5 text-agentic-600 flex-shrink-0 mt-1" />
  </div>
</button>
```

---

## Quick Reference: Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `traditional-700` | `#374151` | Headings (Traditional side) |
| `traditional-600` | `#4b5563` | Body text (Traditional side) |
| `agentic-600` | `#2563eb` | Primary actions |
| `agentic-500` | `#3b82f6` | Highlights, active states |
| `semantic-success` | `#10B981` | Positive metrics (+42%) |
| `text-xl` | `20px` | Card titles (h4) |
| `text-base` | `16px` | Body text default |
| `p-6` | `24px` | Card padding default |
| `gap-4` | `16px` | Element spacing default |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-25 | Initial design system compliance |

---

**Status:** Active Enforcement Document
**Source of Truth:** `docs/design/VISUAL_DESIGN_SYSTEM.md`
**Feedback:** Report design inconsistencies to `.agent-os/audit-logs/`
