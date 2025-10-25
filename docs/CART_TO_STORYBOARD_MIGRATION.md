# Cart-to-Storyboard Migration Plan

**Version:** 1.0.0
**Date:** 2025-01-24
**Status:** Implementation Plan
**Estimated Effort:** 11 hours (~1.5 days)
**Related:** [Storyboard UX Specification](./design/STORYBOARD_UX_SPECIFICATION.md)

---

## Overview

This document provides a detailed, step-by-step implementation plan for migrating from "Cart" terminology and semantics to the professional "Storyboard" concept.

**What's Changing:**
- ❌ **Shopping cart** mental model → ✅ **Film storyboard** mental model
- ❌ **E-commerce** semantics → ✅ **Presentation/narrative** semantics
- ❌ **Emoji icons** → ✅ **Lucide SVG icons** (professional design system)

**What's NOT Changing:**
- Core functionality (add, remove, reorder)
- URL state persistence
- Drag-and-drop interactions
- Data structure (with enhancements)

---

## Phase 1: TypeScript Type System (2 hours)

### 1.1 Update Interface Definition

**File:** `app/src/lib/stores/uiStore.svelte.ts`

**Before:**
```typescript
export interface CartItem {
  capabilityId: string;
  domainId: string;
  label: string;
  description: string;
}
```

**After:**
```typescript
export interface StoryboardFrame {
  frameNumber: number;          // NEW: Auto-assigned sequence
  capabilityId: string;
  domainId: string;
  label: string;
  description: string;
  traditionalSummary?: string;  // NEW: One-line traditional approach
  agenticSummary?: string;      // NEW: One-line agentic approach
  addedAt: number;              // NEW: Timestamp for analytics
}
```

**Tasks:**
- [ ] Define `StoryboardFrame` interface
- [ ] Add JSDoc comments explaining new fields
- [ ] Export from `uiStore.svelte.ts`

---

### 1.2 Update State Properties

**File:** `app/src/lib/stores/uiStore.svelte.ts`

**Before:**
```typescript
class UIState {
  cartOpen = $state(false);
  cartItems = $state<CartItem[]>([]);
  cartCount = $derived(this.cartItems.length);
  hasCartItems = $derived(this.cartItems.length > 0);
}
```

**After:**
```typescript
class UIState {
  storyboardOpen = $state(false);
  storyboardFrames = $state<StoryboardFrame[]>([]);
  frameCount = $derived(this.storyboardFrames.length);
  hasFrames = $derived(this.storyboardFrames.length > 0);
}
```

**Tasks:**
- [ ] Rename all cart-related state properties
- [ ] Update derived states
- [ ] Run `pnpm run check` to find all broken references

---

### 1.3 Update State Methods

**File:** `app/src/lib/stores/uiStore.svelte.ts`

**Before:**
```typescript
openCart() { this.cartOpen = true; }
closeCart() { this.cartOpen = false; }
toggleCart() { this.cartOpen = !this.cartOpen; }
addToCart(item: CartItem) { /* ... */ }
removeFromCart(capabilityId: string) { /* ... */ }
isInCart(capabilityId: string): boolean { /* ... */ }
reorderCart(fromIndex: number, toIndex: number) { /* ... */ }
clearCart() { this.cartItems = []; }
setCartItems(items: CartItem[]) { this.cartItems = items; }
```

**After:**
```typescript
// Storyboard visibility toggles
openStoryboard() {
  this.storyboardOpen = true;
}

closeStoryboard() {
  this.storyboardOpen = false;
}

toggleStoryboard() {
  this.storyboardOpen = !this.storyboardOpen;
}

// Frame management
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

removeFrame(capabilityId: string) {
  this.storyboardFrames = this.storyboardFrames.filter(
    frame => frame.capabilityId !== capabilityId
  );
  // Renumber remaining frames
  this.storyboardFrames = this.storyboardFrames.map((frame, index) => ({
    ...frame,
    frameNumber: index + 1
  }));
}

isInStoryboard(capabilityId: string): boolean {
  return this.storyboardFrames.some(frame => frame.capabilityId === capabilityId);
}

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

clearStoryboard() {
  this.storyboardFrames = [];
}

setFrames(frames: StoryboardFrame[]) {
  // Ensure all frames have correct numbering
  this.storyboardFrames = frames.map((frame, index) => ({
    ...frame,
    frameNumber: index + 1
  }));
}
```

**Tasks:**
- [ ] Rename all methods
- [ ] Implement auto-numbering logic in `addFrame`
- [ ] Implement renumbering logic in `removeFrame` and `reorderFrames`
- [ ] Add JSDoc comments explaining behavior
- [ ] Run `pnpm run check` to validate type safety

**Validation:**
```bash
cd app && pnpm run check
```

Expected output: TypeScript errors showing all files that reference old cart methods.

---

## Phase 2: Component Renaming (1 hour)

### 2.1 Rename Component Files

**Commands:**
```bash
cd app/src/lib/components

# Rename files
mv CartIcon.svelte StoryboardIcon.svelte
mv CartPane.svelte StoryboardPane.svelte
```

**Tasks:**
- [ ] Rename `CartIcon.svelte` → `StoryboardIcon.svelte`
- [ ] Rename `CartPane.svelte` → `StoryboardPane.svelte`
- [ ] Update imports in `+page.svelte`

---

### 2.2 Update Import Statements

**File:** `app/src/routes/+page.svelte`

**Before:**
```typescript
import CartIcon from '$lib/components/CartIcon.svelte';
import CartPane from '$lib/components/CartPane.svelte';
```

**After:**
```typescript
import StoryboardIcon from '$lib/components/StoryboardIcon.svelte';
import StoryboardPane from '$lib/components/StoryboardPane.svelte';
```

**Tasks:**
- [ ] Update imports in `+page.svelte`
- [ ] Search for any other files importing cart components:
  ```bash
  cd app && grep -r "CartIcon\|CartPane" src/
  ```

---

## Phase 3: Icon Updates (1 hour)

### 3.1 Replace Shopping Cart Icon

**File:** `app/src/lib/components/StoryboardIcon.svelte`

**Before:**
```svelte
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
  ></path>
</svg>
```

**After:**
```svelte
<script lang="ts">
  import { Film } from 'lucide-svelte';
  import { uiState } from '$lib/stores/uiStore.svelte';
</script>

<button
  onclick={() => uiState.toggleStoryboard()}
  class="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
  aria-label="Open storyboard"
>
  <Film size={20} />

  {#if uiState.hasFrames}
    <span class="absolute -top-1 -right-1 bg-agentic-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
      {uiState.frameCount}
    </span>
  {/if}
</button>
```

**Tasks:**
- [ ] Import `Film` from `lucide-svelte`
- [ ] Replace SVG with `<Film size={20} />`
- [ ] Update badge to show `frameCount`
- [ ] Update aria-label

---

### 3.2 Update StoryboardPane Icons

**File:** `app/src/lib/components/StoryboardPane.svelte`

**Import Lucide Icons:**
```svelte
<script lang="ts">
  import {
    Film,
    Hash,
    X,
    GripVertical,
    Eye,
    Plus,
    Play,
    Share2,
    Trash2
  } from 'lucide-svelte';
  import { uiState } from '$lib/stores/uiStore.svelte';
  // ... rest of imports
</script>
```

**Tasks:**
- [ ] Import all required Lucide icons
- [ ] Replace all inline SVG with Lucide components
- [ ] Update sizes: 20px (headers), 16px (actions), 48px (empty state)

---

## Phase 4: UI Copy Updates (2 hours)

### 4.1 StoryboardPane Header

**File:** `app/src/lib/components/StoryboardPane.svelte`

**Before:**
```svelte
<h2 class="text-xl font-bold text-traditional-900">Presentation Cart</h2>
<p class="text-sm text-traditional-600 mt-1">
  {uiState.cartCount} {uiState.cartCount === 1 ? 'capability' : 'capabilities'}
</p>
```

**After:**
```svelte
<header class="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
  <div class="flex items-center gap-2">
    <Film size={20} class="text-gray-600" />
    <h2 class="text-base font-semibold text-gray-900">Storyboard</h2>
  </div>

  <div class="flex items-center gap-2">
    {#if uiState.frameCount > 0}
      <div class="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono">
        <Hash size={14} />
        <span>{uiState.frameCount}</span>
      </div>
    {/if}

    <button onclick={() => uiState.closeStoryboard()} aria-label="Close storyboard">
      <X size={20} />
    </button>
  </div>
</header>
```

**Tasks:**
- [ ] Update header structure
- [ ] Add Film icon
- [ ] Update count display with Hash icon
- [ ] Update all aria-labels

---

### 4.2 Empty State Copy

**Before:**
```svelte
<h3 class="text-lg font-semibold text-traditional-700 mb-2">Cart is empty</h3>
<p class="text-sm text-traditional-500">
  Add capabilities to build your presentation
</p>
```

**After:**
```svelte
<div class="empty-state flex flex-col items-center justify-center h-full py-20 px-6">
  <Film size={48} class="text-gray-300" strokeWidth={1.5} />
  <h3 class="text-base font-semibold text-gray-700 mt-4">
    No frames yet
  </h3>
  <p class="text-sm text-gray-500 mt-2 text-center max-w-xs">
    Add capability comparisons to build your transformation narrative
  </p>
</div>
```

**Tasks:**
- [ ] Update empty state icon to Film
- [ ] Update heading copy
- [ ] Update body copy with narrative framing

---

### 4.3 Footer Actions Copy

**Before:**
```svelte
<Button variant="primary" size="lg" onclick={() => {}} class="w-full">
  Export Presentation ({uiState.cartCount})
</Button>
<Button variant="ghost" size="sm" onclick={() => uiState.clearCart()} class="w-full">
  Clear Cart
</Button>
```

**After:**
```svelte
<footer class="border-t border-gray-200 p-4 space-y-2 bg-white">
  {#if uiState.hasFrames}
    <button class="btn-primary w-full" onclick={handlePresent}>
      <Play size={16} />
      <span>Present ({uiState.frameCount} frames)</span>
    </button>

    <button class="btn-secondary w-full" onclick={handleShare}>
      <Share2 size={16} />
      <span>Share Storyboard</span>
    </button>

    <button class="btn-ghost w-full" onclick={handleClearStoryboard}>
      <Trash2 size={16} />
      <span>Clear Storyboard</span>
    </button>
  {/if}
</footer>
```

**Tasks:**
- [ ] Update button copy
- [ ] Add Lucide icons to all buttons
- [ ] Update onClick handlers to use storyboard methods

---

### 4.4 Frame Card Structure

**New Addition:** Add frame number badge and summaries

**After:**
```svelte
<div class="frame-card group bg-white border border-gray-200 rounded-lg p-4 mb-3">
  <div class="flex items-start gap-3">
    <!-- Drag Handle -->
    <button class="drag-handle" aria-label="Reorder frame">
      <GripVertical size={16} class="text-gray-400" />
    </button>

    <!-- Frame Number Badge -->
    <div class="frame-number flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
      <Hash size={14} />
      <span>{frame.frameNumber}</span>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <h4 class="text-sm font-semibold text-gray-900 mb-1">{frame.label}</h4>
      <p class="text-xs text-gray-500 mb-2">{domainName}</p>

      <!-- NEW: Quick Summaries -->
      {#if frame.traditionalSummary}
        <div class="flex items-baseline gap-2 text-xs mb-1">
          <span class="font-medium text-traditional-700">Traditional</span>
          <span class="text-gray-600">• {frame.traditionalSummary}</span>
        </div>
      {/if}

      {#if frame.agenticSummary}
        <div class="flex items-baseline gap-2 text-xs mb-1">
          <span class="font-medium text-agentic-700">Agentic</span>
          <span class="text-gray-600">• {frame.agenticSummary}</span>
        </div>
      {/if}
    </div>

    <!-- Actions (Show on Hover) -->
    <div class="actions flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onclick={() => handlePreview(frame)} aria-label="Preview frame">
        <Eye size={16} class="text-gray-400 hover:text-gray-600" />
      </button>
      <button onclick={() => uiState.removeFrame(frame.capabilityId)} aria-label="Remove frame">
        <X size={16} class="text-gray-400 hover:text-red-600" />
      </button>
    </div>
  </div>
</div>
```

**Tasks:**
- [ ] Add frame number badge with Hash icon
- [ ] Add traditional/agentic summary lines
- [ ] Add Eye icon for preview action
- [ ] Update remove button to use `uiState.removeFrame`

---

## Phase 5: URL State Management (1 hour)

### 5.1 Update URL Parameter Name

**File:** `app/src/lib/utils/urlState.ts`

**Before:**
```typescript
// Serialize cart items
if (state.cart && state.cart.length > 0) {
  params.set('cart', state.cart.map(item => item.capabilityId).join(','));
} else {
  params.delete('cart');
}
```

**After:**
```typescript
// Serialize storyboard frames
if (state.storyboard && state.storyboard.length > 0) {
  params.set('storyboard', state.storyboard.map(frame => frame.capabilityId).join(','));
} else {
  params.delete('storyboard');
}
```

**Tasks:**
- [ ] Update `updateUrlState` to use `storyboard` param
- [ ] Update `readStateFromUrl` to read `storyboard` param
- [ ] Add backward compatibility (optional):
  ```typescript
  // Support legacy 'cart' param for old URLs
  const storyboardParam = params.get('storyboard') || params.get('cart');
  if (storyboardParam) {
    state.storyboard = storyboardParam.split(',').filter(Boolean);
  }
  ```

---

### 5.2 Update Route Integration

**File:** `app/src/routes/+page.svelte`

**Before:**
```typescript
if (urlState.cart) uiState.setCartItems(urlState.cart);
```

**After:**
```typescript
if (urlState.storyboard) uiState.setFrames(urlState.storyboard);
```

**Tasks:**
- [ ] Update URL sync logic in `$effect`
- [ ] Test URL persistence: Add frames → Refresh page → Verify frames restored

---

## Phase 6: ComparisonView Integration (1 hour)

### 6.1 Update "Add to Cart" Button

**File:** `app/src/lib/components/ComparisonView.svelte`

**Before:**
```svelte
<button onclick={handleAddToCart}>
  Add to Cart
</button>
```

**After:**
```svelte
<script lang="ts">
  import { Plus, Check } from 'lucide-svelte';

  const isInStoryboard = $derived(
    uiState.isInStoryboard(capability.id)
  );

  function handleAddFrame() {
    uiState.addFrame({
      capabilityId: capability.id,
      domainId: domain.id,
      label: capability.label,
      description: capability.description,
      traditionalSummary: capability.traditionalApproach?.summary,
      agenticSummary: capability.agenticApproach?.summary
    });
  }
</script>

<button
  onclick={handleAddFrame}
  class="add-frame-btn flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  class:in-storyboard={isInStoryboard}
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

<style>
  .add-frame-btn:not(:disabled):hover {
    @apply border-agentic-500 text-agentic-700 bg-agentic-50;
  }

  .add-frame-btn.in-storyboard {
    @apply border-gray-200 bg-gray-50 text-gray-500;
  }
</style>
```

**Tasks:**
- [ ] Import Plus and Check icons
- [ ] Update button copy
- [ ] Add disabled state for frames already in storyboard
- [ ] Extract `traditionalSummary` and `agenticSummary` from capability data

---

### 6.2 Extract Summaries from Capability Data

**If summaries don't exist in data model:**

**Option 1: Generate on the fly**
```typescript
function generateSummary(approach: TraditionalApproach | AgenticApproach, maxLength = 50): string {
  // Use first benchmark/projection or description
  const text = approach.benchmarks?.[0]?.description || approach.description || '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
```

**Option 2: Add to capability JSON files** (recommended for better control)
```json
{
  "traditionalApproach": {
    "summary": "Manual reports, 2-week lag",
    "description": "...",
    "benchmarks": [...]
  },
  "agenticApproach": {
    "summary": "Real-time AI dashboards, instant insights",
    "description": "...",
    "projections": [...]
  }
}
```

**Tasks:**
- [ ] Decide on summary strategy (generate vs manual)
- [ ] Implement summary extraction in `handleAddFrame`
- [ ] Test with multiple capabilities

---

## Phase 7: Styling Updates (2 hours)

### 7.1 Professional Color Palette

**File:** `app/tailwind.config.ts` (verify existing colors)

**Required Colors:**
```typescript
colors: {
  traditional: {
    50: '#f9fafb',
    100: '#f3f4f6',
    // ... existing palette
  },
  agentic: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... existing palette
  },
  gray: {
    // Use Tailwind default grays for monochrome design
  }
}
```

**Tasks:**
- [ ] Verify Traditional/Agentic palettes exist
- [ ] Add any missing gray shades (50-900)

---

### 7.2 Component-Specific Styles

**Add to StoryboardPane.svelte:**

```css
<style>
  .frame-card {
    @apply bg-white border border-gray-200 rounded-lg p-4 mb-3;
    @apply hover:border-gray-300 hover:shadow-sm transition-all duration-150;
    @apply cursor-move;
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

  .empty-state {
    @apply flex flex-col items-center justify-center;
    @apply h-full py-20 px-6 text-center;
  }

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
</style>
```

**Tasks:**
- [ ] Add all component-specific styles
- [ ] Test hover states
- [ ] Verify transitions are smooth

---

## Phase 8: Testing & Validation (2 hours)

### 8.1 TypeScript Type Checking

```bash
cd app && pnpm run check
```

**Expected:** 0 errors

**Tasks:**
- [ ] Fix all TypeScript errors
- [ ] Verify no `any` types introduced
- [ ] Check all imports resolve correctly

---

### 8.2 Manual QA Checklist

**Storyboard Sidebar:**
- [ ] Toggle sidebar open/close
- [ ] Sidebar slides in from right smoothly
- [ ] Backdrop appears when open
- [ ] Click backdrop to close

**Adding Frames:**
- [ ] Click "Add Frame" from capability comparison
- [ ] Frame appears in storyboard with correct data
- [ ] Frame number badge shows correct sequence (1, 2, 3...)
- [ ] Button changes to "In Storyboard" (disabled state)
- [ ] Count badge updates in header icon

**Removing Frames:**
- [ ] Click remove (X) button on frame card
- [ ] Frame is removed from list
- [ ] Remaining frames renumber correctly (1, 2, 3...)
- [ ] Button in comparison view changes back to "Add Frame"

**Reordering Frames:**
- [ ] Drag frame card by drag handle
- [ ] Drop zone highlights during drag
- [ ] Frame moves to new position
- [ ] All frames renumber correctly after drop

**Empty State:**
- [ ] Remove all frames
- [ ] Empty state appears with Film icon
- [ ] Copy reads correctly ("No frames yet")

**Footer Actions:**
- [ ] Present button shows correct count
- [ ] Share button copies URL to clipboard
- [ ] Clear button removes all frames (with confirmation?)

**URL State:**
- [ ] Add 3 frames
- [ ] Copy URL from browser
- [ ] Open URL in new tab
- [ ] Verify storyboard restores with all 3 frames

**Keyboard Navigation:**
- [ ] Cmd/Ctrl + B toggles storyboard
- [ ] Escape closes storyboard
- [ ] Tab navigates through frame actions

**Accessibility:**
- [ ] All buttons have aria-labels
- [ ] Screen reader announces frame count
- [ ] Keyboard navigation works throughout

---

### 8.3 Visual Regression Testing

**Manual Screenshots:**
- [ ] Empty storyboard state
- [ ] Storyboard with 1 frame
- [ ] Storyboard with 5 frames
- [ ] Storyboard with 10 frames (scrolling)
- [ ] Drag-in-progress state
- [ ] Hover state on frame card

**Compare Against:**
- Figma prototype panel (professional reference)
- Miro presentation builder (professional reference)

---

## Phase 9: Documentation Updates (1 hour)

### 9.1 Update CLAUDE.md

**File:** `CLAUDE.md`

**Search for:** "cart", "Cart", "presentation cart"

**Replace with:** "storyboard", "Storyboard", "presentation storyboard"

**Specific Updates:**
```markdown
# Before
- Presentation Cart: Build flight plan in real-time

# After
- Storyboard: Build narrative sequence in real-time
```

**Tasks:**
- [ ] Update all feature descriptions
- [ ] Update example user flows
- [ ] Update component inventory

---

### 9.2 Update README.md

**File:** `README.md`

**Before:**
```markdown
- Add capabilities to cart
- Export presentation
```

**After:**
```markdown
- Add frames to storyboard
- Present storyboard in full-screen mode
```

**Tasks:**
- [ ] Update feature list
- [ ] Update screenshots (if any)
- [ ] Update example workflows

---

### 9.3 Update IMPLEMENTATION_PLAN.md

**File:** `IMPLEMENTATION_PLAN.md`

**Tasks:**
- [ ] Search and replace "Cart" → "Storyboard"
- [ ] Update component architecture diagrams
- [ ] Update state management examples

---

## Phase 10: Final Cleanup (1 hour)

### 10.1 Remove Legacy Code

**Search for remnants:**
```bash
cd app && grep -r "cart\|Cart" src/ --exclude-dir=node_modules
```

**Expected:** No matches (except in comments or strings that are intentional)

**Tasks:**
- [ ] Remove any unused cart-related code
- [ ] Remove old interface exports
- [ ] Clean up comments referencing "cart"

---

### 10.2 Git Commit Strategy

**Recommended Commits:**

```bash
# Commit 1: Type system updates
git add app/src/lib/stores/uiStore.svelte.ts
git commit -m "refactor(storyboard): update type system from CartItem to StoryboardFrame

- Add StoryboardFrame interface with frameNumber, summaries, addedAt
- Rename all cart state properties to storyboard
- Implement auto-numbering logic for frames
- Add JSDoc comments for all new methods

BREAKING CHANGE: CartItem interface removed, replaced with StoryboardFrame"

# Commit 2: Component renaming
git add app/src/lib/components/
git commit -m "refactor(storyboard): rename Cart components to Storyboard

- Rename CartIcon.svelte → StoryboardIcon.svelte
- Rename CartPane.svelte → StoryboardPane.svelte
- Update all imports in routes"

# Commit 3: Icon updates
git add app/src/lib/components/Storyboard*.svelte
git commit -m "feat(storyboard): replace cart icons with professional Lucide icons

- Replace shopping cart SVG with Film icon
- Add GripVertical, Hash, Eye, Play, Share2, Trash2 icons
- Remove all emoji icons
- Implement monochrome professional design system"

# Commit 4: UI copy updates
git add app/src/lib/components/StoryboardPane.svelte
git commit -m "feat(storyboard): update UI copy for narrative framing

- Change 'Cart is empty' → 'No frames yet'
- Update button labels: 'Add to Cart' → 'Add Frame'
- Update footer actions with narrative language
- Add frame number badges and summaries"

# Commit 5: URL state management
git add app/src/lib/utils/urlState.ts app/src/routes/+page.svelte
git commit -m "refactor(storyboard): update URL state from cart to storyboard

- Change URL param: ?cart= → ?storyboard=
- Maintain backward compatibility for legacy URLs
- Update route integration"

# Commit 6: Documentation updates
git add CLAUDE.md README.md IMPLEMENTATION_PLAN.md docs/
git commit -m "docs: update all documentation for Storyboard terminology

- Update CLAUDE.md feature descriptions
- Update README.md with new terminology
- Add Storyboard UX Specification
- Add Cart-to-Storyboard Migration Plan"
```

---

## Rollback Plan

If critical issues arise during migration:

**Option 1: Incremental Rollback**
```bash
# Revert specific commits
git revert <commit-hash>
```

**Option 2: Full Rollback**
```bash
# Create rollback branch
git checkout -b rollback/storyboard-migration

# Reset to pre-migration commit
git reset --hard <pre-migration-commit-hash>
```

**Option 3: Feature Flag**
Add temporary feature flag:
```typescript
const USE_STORYBOARD = false; // Toggle to revert UI

{#if USE_STORYBOARD}
  <StoryboardIcon />
{:else}
  <CartIcon />
{/if}
```

---

## Post-Migration Validation

### Success Criteria

**Functional:**
- [ ] All cart functionality works as storyboard
- [ ] Auto-numbering works correctly
- [ ] Drag-and-drop renumbers frames
- [ ] URL state persists and shares correctly

**Visual:**
- [ ] No emoji icons visible anywhere
- [ ] All Lucide icons render correctly
- [ ] Professional monochrome design system
- [ ] Matches Figma/Miro professional aesthetic

**Performance:**
- [ ] No TypeScript errors
- [ ] No console warnings/errors
- [ ] Smooth animations (60fps)
- [ ] Fast sidebar toggle (< 300ms)

**Documentation:**
- [ ] All docs updated with "Storyboard" terminology
- [ ] Migration plan archived for reference
- [ ] UX specification complete

---

## Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: TypeScript Types | 2 hours | None |
| Phase 2: Component Renaming | 1 hour | Phase 1 |
| Phase 3: Icon Updates | 1 hour | Phase 2 |
| Phase 4: UI Copy | 2 hours | Phase 3 |
| Phase 5: URL State | 1 hour | Phase 1, 2 |
| Phase 6: ComparisonView | 1 hour | Phase 1 |
| Phase 7: Styling | 2 hours | Phase 2, 3, 4 |
| Phase 8: Testing | 2 hours | All above |
| Phase 9: Documentation | 1 hour | Phase 8 |
| Phase 10: Cleanup | 1 hour | Phase 9 |
| **Total** | **11 hours** | **~1.5 days** |

---

## Document History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-01-24 | Initial migration plan | Mission-to-Implementation Task Force |

---

**Status:** Ready for Implementation
**Approval Required:** Product Owner sign-off before starting Phase 1
**Related Documents:**
- [Product Mission v1.1.0](./product/PRODUCT_MISSION.md)
- [Storyboard UX Specification](./design/STORYBOARD_UX_SPECIFICATION.md)
