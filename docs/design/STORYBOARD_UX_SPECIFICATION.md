# Storyboard UX Specification

**Version:** 1.0.0
**Date:** 2025-01-24
**Status:** Active Design Specification
**Related:** [Product Mission v1.1.0](../product/PRODUCT_MISSION.md)

---

## Overview

This document defines the complete UX specification for the **Storyboard** feature—the presentation building tool that allows consultants to sequence capability comparisons into a cohesive transformation narrative.

**Terminology Evolution:**
- ❌ **"Cart"** (v1.0.0) → E-commerce semantics, wrong mental model
- ✅ **"Storyboard"** (v1.1.0) → Film/presentation industry, professional narrative framing

---

## Design Philosophy

### Why "Storyboard"?

**Storyboard** borrows from film production and professional presentation tools (Miro, Figma):
- 🎬 **Visual sequence** of frames that tell a story
- 🎨 **Each frame** represents a key moment/scene
- 🔄 **Reorderable** to craft narrative flow
- 🎯 **Communicates** story arc to stakeholders

**Professional Tool Comparison:**

| Tool | Feature | Our Equivalent |
|------|---------|----------------|
| **Miro** | Presentation frames | Storyboard frames |
| **Figma** | Prototype flow | Storyboard sequence |
| **PowerPoint** | Slide deck | Static (anti-pattern) |
| **Our Tool** | Storyboard | Live, adaptive narrative |

**Mission Alignment:**
- ✅ Consultant as "director" of transformation narrative
- ✅ Each capability comparison = one "frame" in the story
- ✅ Client meeting = "screening" the storyboard
- ✅ Reordering = adjusting narrative emphasis

---

## Professional Design System

### Icon Library: Lucide Svelte

**Why Lucide:**
- ✅ Already installed (`lucide-svelte@^0.546.0`)
- ✅ Professional SVG icons (monochrome, stroke-based)
- ✅ Consistent design language (24px, stroke-width 2)
- ✅ Enterprise aesthetic (no emojis, no consumer styling)

**Icon Inventory:**

```typescript
import {
  Film,           // Storyboard main icon
  SquareStack,    // Frame/layers concept
  Plus,           // Add frame
  X,              // Remove/close
  GripVertical,   // Drag handle
  Play,           // Present mode
  Hash,           // Frame numbers
  Eye,            // Preview frame
  Share2,         // Share URL
  Trash2,         // Clear storyboard
  Check,          // "In storyboard" state
  ArrowLeft,      // Back navigation
  ChevronRight,   // Next frame (presentation)
  ChevronLeft     // Previous frame (presentation)
} from 'lucide-svelte';
```

**Usage Standards:**
- **Default size:** 20px (UI controls), 16px (inline actions), 48px (empty states)
- **Stroke width:** 2 (default), 1.5 (large icons for empty states)
- **Color:** Tailwind classes (`text-gray-600`, `text-agentic-600`, etc.)
- **No emojis:** Enterprise professional aesthetic

---

## Component Architecture

### 1. Storyboard Sidebar (Right Panel)

**Dimensions:**
- **Width:** 400px (wider than previous "cart" to accommodate longer text)
- **Position:** Fixed right, z-index 50
- **Height:** Full viewport
- **Backdrop:** `bg-black/20` when open

**Layout Zones:**

```
┌─────────────────────────────────────────┐
│  HEADER (64px fixed)                    │  ← Title + Count + Close
├─────────────────────────────────────────┤
│                                         │
│  FRAME LIST (flex-1 scrollable)         │  ← Drag-and-drop frame cards
│                                         │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER (auto, up to 120px)             │  ← Present, Share, Clear actions
└─────────────────────────────────────────┘
```

---

### 2. Storyboard Header

**Component:** `StoryboardPane.svelte` (header section)

**Structure:**

```svelte
<header class="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
  <!-- Left: Icon + Title -->
  <div class="flex items-center gap-2">
    <Film size={20} class="text-gray-600" />
    <h2 class="text-base font-semibold text-gray-900">Storyboard</h2>
  </div>

  <!-- Right: Frame Count + Close -->
  <div class="flex items-center gap-2">
    {#if frameCount > 0}
      <div class="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
        <Hash size={14} />
        <span>{frameCount}</span>
      </div>
    {/if}

    <button onclick={handleClose} aria-label="Close storyboard" class="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors">
      <X size={20} />
    </button>
  </div>
</header>
```

**Styling:**
```css
header {
  @apply sticky top-0 z-10; /* Sticky during scroll */
  @apply bg-white border-b border-gray-200;
  @apply px-4 py-3;
}
```

---

### 3. Frame Card (Individual Frame in List)

**Component:** Reusable frame card within `StoryboardPane.svelte`

**Anatomy:**

```
┌───────────────────────────────────────────────────┐
│ [≡] [#1]                              [👁] [×]    │  ← Drag + Number + Actions
├───────────────────────────────────────────────────┤
│                                                    │
│ Customer Analytics & Real-Time Insights           │  ← Capability name
│ Analytics & Intelligence                          │  ← Domain (muted)
│                                                    │
│ Traditional • Manual reports, 2-week lag          │  ← One-liner summary
│ Agentic • Real-time AI dashboards, instant        │
│                                                    │
└───────────────────────────────────────────────────┘
```

**Svelte Implementation:**

```svelte
<div
  class="frame-card group"
  draggable="true"
  ondragstart={() => handleDragStart(index)}
  ondragend={handleDragEnd}
  ondragover={(e) => handleDragOver(e, index)}
  ondrop={(e) => handleDrop(e, index)}
>
  <div class="flex items-start gap-3">
    <!-- Drag Handle -->
    <button class="drag-handle" aria-label="Reorder frame">
      <GripVertical size={16} class="text-gray-400" />
    </button>

    <!-- Frame Number Badge -->
    <div class="frame-number">
      <Hash size={14} />
      <span>{frame.frameNumber}</span>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <h4 class="capability-name">{frame.label}</h4>
      <p class="domain-context">{domainName}</p>

      <div class="summary">
        <span class="traditional-label">Traditional</span>
        <span class="text-gray-600">• {frame.traditionalSummary}</span>
      </div>
      <div class="summary">
        <span class="agentic-label">Agentic</span>
        <span class="text-gray-600">• {frame.agenticSummary}</span>
      </div>
    </div>

    <!-- Actions (Visible on Hover) -->
    <div class="actions opacity-0 group-hover:opacity-100 transition-opacity">
      <button onclick={() => handlePreview(frame)} aria-label="Preview frame">
        <Eye size={16} class="text-gray-400 hover:text-gray-600" />
      </button>
      <button onclick={() => handleRemove(frame.capabilityId)} aria-label="Remove frame">
        <X size={16} class="text-gray-400 hover:text-red-600" />
      </button>
    </div>
  </div>
</div>
```

**Tailwind Styles:**

```css
.frame-card {
  @apply bg-white border border-gray-200 rounded-lg p-4 mb-3;
  @apply hover:border-gray-300 hover:shadow-sm transition-all duration-150;
  @apply cursor-move; /* Indicates draggable */
}

.drag-handle {
  @apply text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing;
  @apply transition-colors;
}

.frame-number {
  @apply flex items-center gap-1 px-2 py-1;
  @apply bg-gray-100 text-gray-700 rounded text-xs font-mono;
  @apply flex-shrink-0;
}

.capability-name {
  @apply text-sm font-semibold text-gray-900 mb-1 line-clamp-2;
}

.domain-context {
  @apply text-xs text-gray-500 mb-2;
}

.summary {
  @apply flex items-baseline gap-2 text-xs mb-1;
}

.traditional-label {
  @apply font-medium text-traditional-700 flex-shrink-0;
}

.agentic-label {
  @apply font-medium text-agentic-700 flex-shrink-0;
}

.actions {
  @apply flex gap-1;
}
```

---

### 4. Empty State

**Component:** `StoryboardPane.svelte` (conditional render when `frameCount === 0`)

**Design Pattern:** Minimal, professional (matches Miro/Figma empty states)

```svelte
<div class="empty-state">
  <Film size={48} class="text-gray-300" strokeWidth={1.5} />
  <h3 class="text-base font-semibold text-gray-700 mt-4">
    No frames yet
  </h3>
  <p class="text-sm text-gray-500 mt-2 text-center max-w-xs">
    Add capability comparisons to build your transformation narrative
  </p>
</div>
```

**Styling:**

```css
.empty-state {
  @apply flex flex-col items-center justify-center;
  @apply h-full py-20 px-6 text-center;
}
```

---

### 5. Footer Actions

**Component:** `StoryboardPane.svelte` (footer section)

**Three-Button Pattern:**

```svelte
<footer class="storyboard-footer border-t border-gray-200 p-4 space-y-2 bg-white">
  {#if hasFrames}
    <!-- Primary Action: Present -->
    <button class="btn-primary w-full" onclick={handlePresent}>
      <Play size={16} />
      <span>Present ({frameCount} frames)</span>
    </button>

    <!-- Secondary Action: Share -->
    <button class="btn-secondary w-full" onclick={handleShare}>
      <Share2 size={16} />
      <span>Share Storyboard</span>
    </button>

    <!-- Destructive Action: Clear -->
    <button class="btn-ghost w-full" onclick={handleClear}>
      <Trash2 size={16} />
      <span>Clear Storyboard</span>
    </button>
  {/if}
</footer>
```

**Button Styles:**

```css
.btn-primary {
  @apply flex items-center justify-center gap-2 px-4 py-3;
  @apply bg-agentic-600 text-white rounded-lg;
  @apply hover:bg-agentic-700 active:bg-agentic-800;
  @apply font-medium text-sm transition-colors;
}

.btn-secondary {
  @apply flex items-center justify-center gap-2 px-4 py-2.5;
  @apply bg-gray-100 text-gray-700 rounded-lg;
  @apply hover:bg-gray-200 active:bg-gray-300;
  @apply font-medium text-sm transition-colors;
}

.btn-ghost {
  @apply flex items-center justify-center gap-2 px-4 py-2.5;
  @apply text-red-600 rounded-lg;
  @apply hover:bg-red-50 active:bg-red-100;
  @apply font-medium text-sm transition-colors;
}
```

---

### 6. Storyboard Icon (Header Trigger)

**Component:** `StoryboardIcon.svelte` (replaces `CartIcon.svelte`)

**Implementation:**

```svelte
<script lang="ts">
  import { Film } from 'lucide-svelte';
  import { uiState } from '$lib/stores/uiStore.svelte';
</script>

<button
  onclick={() => uiState.toggleStoryboard()}
  class="storyboard-trigger"
  aria-label="Open storyboard"
>
  <Film size={20} class="text-gray-600" />

  {#if uiState.hasFrames}
    <span class="frame-count-badge">
      {uiState.frameCount}
    </span>
  {/if}
</button>

<style>
  .storyboard-trigger {
    @apply relative p-2 text-gray-600 hover:text-gray-900;
    @apply rounded-lg hover:bg-gray-100 transition-colors;
  }

  .frame-count-badge {
    @apply absolute -top-1 -right-1;
    @apply bg-agentic-500 text-white text-xs font-semibold;
    @apply rounded-full w-5 h-5 flex items-center justify-center;
  }
</style>
```

---

### 7. Add Frame Button (Comparison View)

**Component:** `ComparisonView.svelte` (integration point)

**Location:** Below capability heading, next to comparison mode toggles

**Design Pattern:** Similar to Figma's "Add to Prototype" button

```svelte
<button
  onclick={handleAddFrame}
  class="add-frame-btn"
  disabled={isInStoryboard}
>
  {#if isInStoryboard}
    <Check size={16} />
    <span>In Storyboard</span>
  {:else}
    <Plus size={16} />
    <span>Add Frame</span>
  {/if}
</button>
```

**Styling:**

```css
.add-frame-btn {
  @apply flex items-center gap-2 px-4 py-2;
  @apply border border-gray-300 rounded-lg;
  @apply text-sm font-medium text-gray-700;
  @apply hover:bg-gray-50 transition-colors;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.add-frame-btn:not(:disabled):hover {
  @apply border-agentic-500 text-agentic-700 bg-agentic-50;
}

.add-frame-btn:disabled {
  @apply border-gray-200 bg-gray-50 text-gray-500;
}
```

---

## Data Model

### TypeScript Interfaces

**Before (CartItem):**
```typescript
export interface CartItem {
  capabilityId: string;
  domainId: string;
  label: string;
  description: string;
}
```

**After (StoryboardFrame):**
```typescript
export interface StoryboardFrame {
  frameNumber: number;          // Auto-assigned sequence (1, 2, 3...)
  capabilityId: string;          // Unique capability ID
  domainId: string;              // Parent domain ID
  label: string;                 // Capability name
  description: string;           // Full description
  traditionalSummary?: string;   // One-line traditional approach
  agenticSummary?: string;       // One-line agentic approach
  addedAt: number;               // Timestamp (Date.now()) for analytics
}
```

**Why New Fields:**
- `frameNumber` → Visual sequence indicator, auto-renumbered on reorder
- `traditionalSummary` / `agenticSummary` → Quick preview in frame card
- `addedAt` → Track consultant behavior for future analytics

---

## State Management

### UIStore Updates

**File:** `src/lib/stores/uiStore.svelte.ts`

**Before (Cart State):**
```typescript
cartOpen = $state(false);
cartItems = $state<CartItem[]>([]);
cartCount = $derived(this.cartItems.length);
hasCartItems = $derived(this.cartItems.length > 0);
```

**After (Storyboard State):**
```typescript
storyboardOpen = $state(false);
storyboardFrames = $state<StoryboardFrame[]>([]);
frameCount = $derived(this.storyboardFrames.length);
hasFrames = $derived(this.storyboardFrames.length > 0);
```

### Method Signatures

**Adding Frames (with Auto-Numbering):**
```typescript
addFrame(frame: Omit<StoryboardFrame, 'frameNumber' | 'addedAt'>) {
  const exists = this.storyboardFrames.some(f => f.capabilityId === frame.capabilityId);
  if (!exists) {
    const newFrame: StoryboardFrame = {
      ...frame,
      frameNumber: this.storyboardFrames.length + 1,
      addedAt: Date.now()
    };
    this.storyboardFrames = [...this.storyboardFrames, newFrame];
  }
}
```

**Reordering Frames (with Renumbering):**
```typescript
reorderFrames(fromIndex: number, toIndex: number) {
  const frames = [...this.storyboardFrames];
  const [removed] = frames.splice(fromIndex, 1);
  frames.splice(toIndex, 0, removed);

  // Renumber all frames after reordering
  this.storyboardFrames = frames.map((frame, index) => ({
    ...frame,
    frameNumber: index + 1
  }));
}
```

**Full Method List:**
```typescript
// State toggles
openStoryboard()
closeStoryboard()
toggleStoryboard()

// Frame management
addFrame(frame: Omit<StoryboardFrame, 'frameNumber' | 'addedAt'>)
removeFrame(capabilityId: string)
reorderFrames(fromIndex: number, toIndex: number)
clearStoryboard()
setFrames(frames: StoryboardFrame[])

// Queries
isInStoryboard(capabilityId: string): boolean
```

---

## URL State Management

### URL Parameter Changes

**Before:**
```
?cart=cap1,cap2,cap3
```

**After:**
```
?storyboard=cap1,cap2,cap3
```

**Implementation (`src/lib/utils/urlState.ts`):**

```typescript
export function updateUrlState(state: Partial<UIState>, replace = false) {
  const params = new URLSearchParams(window.location.search);

  // Storyboard: Serialize as comma-separated capability IDs
  if (state.storyboard !== undefined) {
    if (state.storyboard && state.storyboard.length > 0) {
      params.set('storyboard', state.storyboard.map(f => f.capabilityId).join(','));
    } else {
      params.delete('storyboard');
    }
  }

  // Update URL without page reload
  const method = replace ? 'replaceState' : 'pushState';
  window.history[method]({}, '', `?${params.toString()}`);
}

export function readStateFromUrl(): Partial<UIState> {
  const params = new URLSearchParams(window.location.search);

  return {
    storyboard: params.get('storyboard')?.split(',').filter(Boolean) || []
  };
}
```

---

## Interaction Patterns

### Drag-and-Drop Reordering

**Pattern:** Vertical list drag-and-drop (matches Figma prototype panel)

**States:**
1. **Idle:** Frame cards are static
2. **Dragging:** `cursor-grabbing`, opacity 50%, show drop zones
3. **Drop Target:** Highlight target position with border animation
4. **Drop Complete:** Renumber all frames, smooth transition

**Implementation:**

```svelte
<script>
  let draggedIndex = $state<number | null>(null);
  let dropTargetIndex = $state<number | null>(null);

  function handleDragStart(index: number) {
    draggedIndex = index;
  }

  function handleDragEnd() {
    draggedIndex = null;
    dropTargetIndex = null;
  }

  function handleDragOver(e: DragEvent, index: number) {
    e.preventDefault();
    dropTargetIndex = index;
  }

  function handleDrop(e: DragEvent, index: number) {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      uiState.reorderFrames(draggedIndex, index);
    }
    handleDragEnd();
  }
</script>
```

**Visual Feedback:**

```css
/* Card being dragged */
.frame-card[data-dragging="true"] {
  @apply opacity-50;
}

/* Drop target highlight */
.frame-card[data-drop-target="true"] {
  @apply border-agentic-400 border-2;
  @apply shadow-lg;
}
```

---

### Keyboard Navigation

**Shortcuts:**
- **Cmd/Ctrl + K** → Open search (existing)
- **Cmd/Ctrl + B** → Toggle storyboard sidebar
- **Escape** → Close storyboard sidebar
- **Tab** → Navigate through frame actions (Preview, Remove)
- **Enter** → Activate focused button

**Implementation:**

```typescript
onMount(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    // Toggle storyboard
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      uiState.toggleStoryboard();
    }

    // Close storyboard
    if (e.key === 'Escape' && uiState.storyboardOpen) {
      uiState.closeStoryboard();
    }
  };

  window.addEventListener('keydown', handleKeydown);
  return () => window.removeEventListener('keydown', handleKeydown);
});
```

---

## Accessibility (WCAG 2.1 AA)

### ARIA Labels

```svelte
<button aria-label="Open storyboard">
<button aria-label="Close storyboard">
<button aria-label="Add frame">
<button aria-label="Remove frame">
<button aria-label="Reorder frame" role="button" aria-grabbed="false">
<button aria-label="Preview frame">
<button aria-label="Present storyboard">
<button aria-label="Share storyboard">
<button aria-label="Clear storyboard">
```

### Focus Management

```typescript
// When storyboard opens, focus first interactive element
$effect(() => {
  if (uiState.storyboardOpen) {
    const firstButton = document.querySelector('.storyboard-pane button');
    (firstButton as HTMLButtonElement)?.focus();
  }
});
```

### Keyboard Trap Prevention

```typescript
// Allow Escape to close even when focused inside storyboard
onkeydown={(e) => {
  if (e.key === 'Escape') {
    uiState.closeStoryboard();
  }
}}
```

---

## Terminology Reference

### UI Copy Table

| Context | Term | Example |
|---------|------|---------|
| **Feature Name** | Storyboard | "Open storyboard" |
| **Individual Items** | Frames | "5 frames" |
| **Add Action** | Add Frame | "Add frame to storyboard" |
| **Remove Action** | Remove Frame | "Remove frame from storyboard" |
| **Reorder Action** | Reorder Frames | "Drag to reorder frames" |
| **Present Action** | Present Storyboard | "Present (5 frames)" |
| **Share Action** | Share Storyboard | "Share storyboard URL" |
| **Clear Action** | Clear Storyboard | "Clear all frames" |
| **Empty State** | No frames yet | "Add comparisons to build narrative" |
| **Count Display** | N frames | "8 frames in storyboard" |
| **Success Toast** | Frame added | "Frame added to storyboard" |

### Microcopy Standards

**Empty State:**
```
No frames yet

Add capability comparisons to build your transformation narrative
```

**Success Toast (Add):**
```
Frame added to storyboard
```

**Success Toast (Remove):**
```
Frame removed
```

**Confirmation Modal (Clear):**
```
Clear storyboard?

This will remove all 8 frames. You can always add them back.

[Cancel] [Clear Storyboard]
```

---

## Animation & Transitions

### Sidebar Slide-In

```css
.storyboard-pane {
  @apply transform transition-transform duration-300 ease-in-out;
  @apply translate-x-full; /* Hidden by default */
}

.storyboard-pane[data-open="true"] {
  @apply translate-x-0; /* Slide in from right */
}
```

### Frame Card Hover

```css
.frame-card {
  @apply transition-all duration-150;
}

.frame-card:hover {
  @apply border-gray-300 shadow-sm;
}
```

### Button States

```css
button {
  @apply transition-colors duration-150;
}

button:hover {
  @apply bg-opacity-90;
}

button:active {
  @apply scale-95;
  @apply transition-transform duration-100;
}
```

---

## Implementation Checklist

**Phase 1: Core Rename (Estimated: 4 hours)**
- [ ] Rename `CartIcon.svelte` → `StoryboardIcon.svelte`
- [ ] Rename `CartPane.svelte` → `StoryboardPane.svelte`
- [ ] Update `uiStore.svelte.ts`:
  - [ ] `CartItem` → `StoryboardFrame` interface
  - [ ] All cart methods → storyboard methods
  - [ ] Add `frameNumber` auto-numbering logic
- [ ] Update `urlState.ts`: `cart` param → `storyboard` param
- [ ] Update `+page.svelte`: Import paths and component references

**Phase 2: UI Refinements (Estimated: 3 hours)**
- [ ] Replace shopping cart icon with `Film` icon
- [ ] Update all UI copy (Cart → Storyboard, Items → Frames)
- [ ] Implement frame number badges
- [ ] Add traditional/agentic summaries to frame cards
- [ ] Update empty state with professional design

**Phase 3: UX Enhancements (Estimated: 2 hours)**
- [ ] Improve drag-and-drop visual feedback
- [ ] Add keyboard shortcuts (Cmd+B toggle)
- [ ] Implement ARIA labels for accessibility
- [ ] Add success/error toast notifications

**Phase 4: Testing (Estimated: 2 hours)**
- [ ] TypeScript type checking (`pnpm run check`)
- [ ] Manual QA: Add/remove/reorder frames
- [ ] Test URL state persistence and sharing
- [ ] Test keyboard navigation
- [ ] Test empty states and error states

**Total Estimated Effort: ~11 hours (~1.5 days)**

---

## Document History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-01-24 | Initial UX specification for Storyboard feature | Mission-to-Implementation Task Force |

---

**Status:** Active Design Specification
**Implementation Status:** Pending (Cart exists, Storyboard rename/enhancement required)
**Related Documents:**
- [Product Mission v1.1.0](../product/PRODUCT_MISSION.md)
- [Cart-to-Storyboard Migration Plan](./CART_TO_STORYBOARD_MIGRATION.md) (Next document)
