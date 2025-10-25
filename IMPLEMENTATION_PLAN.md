# Single-Pane Narrative Cockpit: Implementation Plan

**Version:** 2.0.0 (SvelteKit)
**Date:** 2025-10-23
**Optimized For:** AI Agent Development
**Stack:** SvelteKit 2.x + Svelte 5 + Tailwind v4 + TanStack Svelte Query

---

## **Architecture Decision**

### **UI Pattern: Single-Pane + Command Palette**

```
┌─────────────────────────────────────────────┐
│  [🔍 Cmd+K Search] [Industry▾] [Persona▾] [🛒]│
├─────────────────────────────────────────────┤
│                                             │
│         Main Content (Adaptive)             │
│                                             │
│   Traditional (Cook)  │  Agentic (Chef)     │
│   ────────────────────┼─────────────────    │
│   Description         │  Description        │
│   Pain Points         │  Benefits           │
│   Benchmarks          │  Projections        │
│                                             │
│   [Tabs: Functions | Agents | Personas]    │
│                                             │
└─────────────────────────────────────────────┘
```

**Navigation:** Cmd+K palette (like VS Code, Notion, Linear)
**State:** URL params + Svelte stores (`?capability=X&industry=Y&persona=Z`)
**Mobile:** Deferred to v2 (desktop-first for consultants)

---

## **Tech Stack Rationale**

### **Why SvelteKit Over React**

**Evidence from Your Production Apps:**
- ✅ **2 production Svelte apps** (gallery + website, 69 components)
- ✅ **Deliberately migrated FROM React TO Svelte** (gallery app)
- ✅ **60-75% performance improvement** achieved in migration
- ✅ **Agent-OS v3.0.0 optimized** for Svelte ("Direct mode 90%")
- ✅ **Proven stack:** Tailwind v4, TanStack Query, Playwright, @axe-core
- ✅ **AI agents handle Svelte excellently** (contrary to misleading blog posts)

| Choice | Reason |
|--------|--------|
| **SvelteKit 2.x** | File-based routing, built-in URL state, SSR/SSG flexibility |
| **Svelte 5 (Runes)** | Less code than React, proven in your gallery app |
| **Vite** | 100x faster incremental builds, built into SvelteKit |
| **Tailwind v4** | Proven in gallery app, 5x faster builds |
| **TanStack Svelte Query** | Proven in gallery for data fetching/caching |
| **FlexSearch** | Fastest client-side search, simple API |
| **Svelte Stores** | Built-in reactive state, simpler than Zustand |
| **Zod** | Runtime validation at data boundaries |

---

## **Project Structure (Following Gallery App Pattern)**

```
/
├── data/                  # Existing - 143 JSON files
├── docs/                  # Existing - PRD, roadmap, etc.
├── app/                   # NEW - SvelteKit application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   │   ├── command-palette/
│   │   │   │   │   └── CommandPalette.svelte
│   │   │   │   ├── comparison/
│   │   │   │   │   ├── ComparisonView.svelte
│   │   │   │   │   ├── TraditionalColumn.svelte
│   │   │   │   │   └── AgenticColumn.svelte
│   │   │   │   ├── header/
│   │   │   │   │   ├── Header.svelte
│   │   │   │   │   ├── IndustryFilter.svelte
│   │   │   │   │   ├── PersonaFilter.svelte
│   │   │   │   │   └── StoryboardIcon.svelte
│   │   │   │   └── context/
│   │   │   │       ├── ContextTabs.svelte
│   │   │   │       ├── FunctionsTab.svelte
│   │   │   │       ├── AgentsTab.svelte
│   │   │   │       └── PersonasTab.svelte
│   │   │   ├── services/
│   │   │   │   ├── graphDataLoader.ts    # Load domains/capabilities
│   │   │   │   └── searchService.ts      # FlexSearch indexing
│   │   │   ├── stores/
│   │   │   │   ├── uiStore.ts            # Svelte writable stores
│   │   │   │   └── searchStore.ts        # Search state
│   │   │   ├── types/
│   │   │   │   └── index.ts              # Re-export from /data/types
│   │   │   └── utils/
│   │   │       └── urlState.ts           # URL param helpers
│   │   ├── routes/
│   │   │   ├── +layout.svelte            # Root layout
│   │   │   ├── +layout.ts                # Layout load function
│   │   │   ├── +page.svelte              # Main view
│   │   │   └── +page.ts                  # Page load function
│   │   └── app.html                      # HTML template
│   ├── static/
│   │   └── data -> ../../data/           # Symlink to data files
│   ├── package.json
│   ├── svelte.config.js
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── .agent-os/
│   ├── README.md                         # Copy from gallery app
│   └── config.yml                        # Copy from gallery app
└── IMPLEMENTATION_PLAN.md                # This file
```

---

## **Phase 1: Foundation (Days 1-2)**

### **1.1 Project Initialization**

```bash
# Create app directory
mkdir -p app
cd app

# Initialize SvelteKit project
npm create svelte@latest .
# Choose:
# - Skeleton project
# - Yes, using TypeScript syntax
# - Add ESLint, Prettier, Playwright, Vitest

# Install core dependencies
npm install @tanstack/svelte-query
npm install flexsearch
npm install zod
npm install clsx tailwind-merge
npm install lucide-svelte

# Install dev dependencies
npm install -D @tailwindcss/postcss@next tailwindcss@next
npm install -D @axe-core/playwright
npm install -D svelte-check
```

### **1.2 Configuration Files**

**`app/package.json`:**
```json
{
  "name": "commerce-navigator",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "lint": "eslint ."
  },
  "dependencies": {
    "@tanstack/svelte-query": "^6.0.3",
    "flexsearch": "^0.7.43",
    "zod": "^3.23.8",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "lucide-svelte": "^0.546.0"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.1.0",
    "@sveltejs/adapter-vercel": "^6.0.0",
    "@sveltejs/kit": "^2.43.2",
    "@sveltejs/vite-plugin-svelte": "^6.2.0",
    "@tailwindcss/postcss": "^4.1.14",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "svelte": "^5.39.5",
    "svelte-check": "^4.3.2",
    "tailwindcss": "^4.1.14",
    "typescript": "^5.9.2",
    "vite": "^7.1.7",
    "@axe-core/playwright": "^4.10.2",
    "@playwright/test": "^1.56.1"
  }
}
```

**`app/svelte.config.js`:**
```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $lib: './src/lib',
      $data: '../data'
    }
  }
};

export default config;
```

**`app/vite.config.ts`:**
```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['flexsearch']
  }
});
```

**`app/tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // Traditional (Cook) - Muted/neutral
        traditional: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Agentic (Chef) - Positive/highlight
        agentic: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
```

**`app/tsconfig.json`:**
```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"],
      "$data": ["../data"],
      "$data/*": ["../data/*"]
    }
  }
}
```

**`app/src/app.html`:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

---

## **Phase 2: Core Services (Days 2-3)**

### **2.1 Data Loading Service**

**`app/src/lib/services/graphDataLoader.ts`:**
```typescript
import { z } from 'zod'

// Import types from existing data/types
export type Domain = {
  id: string
  type: 'domain'
  label: string
  description: string
  icon?: string
  color?: string
  capabilityCount: number
}

export type Capability = {
  id: string
  type: 'capability'
  label: string
  description: string
  parentDomain: string
  industries: string[]
  businessModels: string[]
  traditionalApproach: {
    description: string
    characteristics: string[]
    constraints: string[]
    benchmarks: Array<{
      id: string
      metric: string
      value: string
      source: string
    }>
  }
  agenticApproach: {
    description: string
    benefits: string[]
    projections: Array<{
      metric: string
      value: string
      basis: string
      sourceBenchmark: string
    }>
  }
}

// Runtime validation schemas
const DomainSchema = z.object({
  id: z.string(),
  type: z.literal('domain'),
  label: z.string(),
  description: z.string(),
  capabilityCount: z.number(),
})

const DomainsArraySchema = z.array(DomainSchema)

/**
 * Load domains index from /static/data/domains/domains.json
 */
export async function loadDomainsIndex(): Promise<Domain[]> {
  const response = await fetch('/data/domains/domains.json')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return DomainsArraySchema.parse(data)
}

/**
 * Load capability file for specific domain
 * @param domainId - e.g., "domain-payments-finance"
 * @returns Array of capabilities
 */
export async function loadDomainCapabilities(domainId: string): Promise<Capability[]> {
  const fileName = mapDomainToFile(domainId)

  const response = await fetch(`/data/capabilities/${fileName}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  // TODO: Add runtime validation with Zod
  return data
}

/**
 * Get single capability by ID
 */
export async function getCapabilityById(
  capabilityId: string,
  domainId: string
): Promise<Capability | null> {
  const capabilities = await loadDomainCapabilities(domainId)
  return capabilities.find(cap => cap.id === capabilityId) ?? null
}

/**
 * Map domain ID to capability file name
 */
function mapDomainToFile(domainId: string): string {
  const mapping: Record<string, string> = {
    'domain-customer-experience': 'customer-experience.json',
    'domain-sales-commerce': 'conversational-commerce.json',
    'domain-merchandising': 'merchandising-product.json',
    'domain-supply-chain': 'supply-chain.json',
    'domain-payments-finance': 'payments.json',
    'domain-data-analytics': 'analytics.json',
    'domain-technology': 'it-operations.json',
    'domain-hr': 'enterprise-hr.json',
    'domain-enterprise-support': 'facilities.json',
    'domain-governance': 'legal-compliance.json',
  }

  const fileName = mapping[domainId]
  if (!fileName) {
    throw new Error(`Unknown domain ID: ${domainId}`)
  }

  return fileName
}
```

### **2.2 Search Service**

**`app/src/lib/services/searchService.ts`:**
```typescript
import FlexSearch from 'flexsearch'

export type SearchableItem = {
  id: string
  type: 'capability' | 'function' | 'agent'
  label: string
  description: string
  domainId: string
  domainLabel: string
}

class SearchService {
  private index: FlexSearch.Index
  private items: Map<string, SearchableItem>

  constructor() {
    this.index = new FlexSearch.Index({
      tokenize: 'forward',
      cache: true,
    })
    this.items = new Map()
  }

  indexCapabilities(
    capabilities: Array<{
      id: string
      label: string
      description: string
      parentDomain: string
    }>,
    domainLabel: string
  ): void {
    capabilities.forEach(cap => {
      const item: SearchableItem = {
        id: cap.id,
        type: 'capability',
        label: cap.label,
        description: cap.description,
        domainId: cap.parentDomain,
        domainLabel,
      }

      const searchText = `${cap.label} ${cap.description}`
      this.index.add(cap.id, searchText)
      this.items.set(cap.id, item)
    })
  }

  search(query: string, limit = 10): SearchableItem[] {
    if (!query || query.length < 2) {
      return []
    }

    const resultIds = this.index.search(query, limit) as string[]

    return resultIds
      .map(id => this.items.get(id))
      .filter((item): item is SearchableItem => item !== undefined)
  }

  clear(): void {
    this.index.clear()
    this.items.clear()
  }
}

export const searchService = new SearchService()
```

---

## **Phase 3: State Management (Day 3)**

### **3.1 Svelte Stores**

**`app/src/lib/stores/uiStore.ts`:**
```typescript
import { writable, derived } from 'svelte/store'

// Command Palette
export const commandPaletteOpen = writable(false)

export function toggleCommandPalette() {
  commandPaletteOpen.update(open => !open)
}

// Filters
export type Industry = 'All' | 'Retail' | 'Grocery' | 'Travel' | 'QSR' | 'Hospitality'
export type Persona = 'All' | 'CMO' | 'CTO' | 'COO' | 'CFO' | 'VP Operations'

export const selectedIndustry = writable<Industry>('All')
export const selectedPersona = writable<Persona>('All')

// Storyboard
export const storyboardFrames = writable<StoryboardFrame[]>([])

export const frameCount = derived(storyboardFrames, $frames => $frames.length)

export function addFrame(frame: Omit<StoryboardFrame, 'frameNumber' | 'addedAt'>) {
  storyboardFrames.update(frames => {
    const exists = frames.some(f => f.capabilityId === frame.capabilityId)
    if (exists) return frames
    const newFrame = {
      ...frame,
      frameNumber: frames.length + 1,
      addedAt: Date.now()
    }
    return [...frames, newFrame]
  })
}

export function removeFrame(capabilityId: string) {
  storyboardFrames.update(frames =>
    frames
      .filter(f => f.capabilityId !== capabilityId)
      .map((f, index) => ({ ...f, frameNumber: index + 1 }))
  )
}

export function clearStoryboard() {
  storyboardFrames.set([])
}

export const isInStoryboard = derived(
  storyboardFrames,
  $frames => (capabilityId: string) => $frames.some(f => f.capabilityId === capabilityId)
)

// Theme
export const theme = writable<'light' | 'dark'>('light')

export function toggleTheme() {
  theme.update(t => t === 'light' ? 'dark' : 'light')
}
```

### **3.2 URL State Helpers**

**`app/src/lib/utils/urlState.ts`:**
```typescript
import { goto } from '$app/navigation'
import type { Industry, Persona } from '$lib/stores/uiStore'

export function updateUrlParams(params: {
  capability?: string
  domain?: string
  industry?: Industry
  persona?: Persona
  storyboard?: StoryboardFrame[]
  tab?: 'functions' | 'agents' | 'personas'
}) {
  const url = new URL(window.location.href)

  if (params.capability) url.searchParams.set('capability', params.capability)
  if (params.domain) url.searchParams.set('domain', params.domain)
  if (params.industry) url.searchParams.set('industry', params.industry)
  if (params.persona) url.searchParams.set('persona', params.persona)
  if (params.storyboard && params.storyboard.length > 0) {
    url.searchParams.set('storyboard', encodeURIComponent(JSON.stringify(params.storyboard)))
  }
  if (params.tab) url.searchParams.set('tab', params.tab)

  goto(url.toString(), { replaceState: true, keepFocus: true })
}
```

---

## **Phase 4: Routes Setup (Day 4)**

### **4.1 Layout**

**`app/src/routes/+layout.svelte`:**
```svelte
<script lang="ts">
  import '../app.css'
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  })
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>

<style>
  :global(body) {
    @apply min-h-screen bg-gray-50 text-gray-900;
  }
</style>
```

**`app/src/routes/+layout.ts`:**
```typescript
export const prerender = true
export const ssr = false // Client-side only for now
```

### **4.2 Main Page**

**`app/src/routes/+page.svelte`:**
```svelte
<script lang="ts">
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { createQuery } from '@tanstack/svelte-query'
  import { loadDomainsIndex, loadDomainCapabilities, getCapabilityById } from '$lib/services/graphDataLoader'
  import CommandPalette from '$lib/components/command-palette/CommandPalette.svelte'
  import Header from '$lib/components/header/Header.svelte'
  import ComparisonView from '$lib/components/comparison/ComparisonView.svelte'

  // Extract URL params
  $: capabilityId = $page.url.searchParams.get('capability')
  $: domainId = $page.url.searchParams.get('domain')
  $: industry = $page.url.searchParams.get('industry') || 'All'
  $: persona = $page.url.searchParams.get('persona') || 'All'

  // Load domains
  const domainsQuery = createQuery({
    queryKey: ['domains'],
    queryFn: loadDomainsIndex
  })

  // Load capability if selected
  $: capabilityQuery = capabilityId && domainId
    ? createQuery({
        queryKey: ['capability', capabilityId, domainId],
        queryFn: () => getCapabilityById(capabilityId!, domainId!)
      })
    : null

  // Keyboard shortcut for Cmd+K
  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        import('$lib/stores/uiStore').then(({ toggleCommandPalette }) => {
          toggleCommandPalette()
        })
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  })
</script>

<div class="min-h-screen bg-gray-50">
  <Header />

  <main class="max-w-7xl mx-auto px-6 py-8">
    {#if $domainsQuery.isLoading}
      <div class="text-center py-20">
        <p class="text-gray-500">Loading domains...</p>
      </div>
    {:else if $domainsQuery.error}
      <div class="text-center py-20">
        <p class="text-red-600">Error loading domains: {$domainsQuery.error.message}</p>
      </div>
    {:else if capabilityQuery && $capabilityQuery.data}
      <ComparisonView capability={$capabilityQuery.data} />
    {:else}
      <div class="text-center py-20">
        <h1 class="text-4xl font-bold text-gray-900">Commerce Transformation Navigator</h1>
        <p class="mt-4 text-lg text-gray-600">
          Press <kbd class="px-2 py-1 bg-gray-200 rounded">Cmd+K</kbd> to search capabilities
        </p>
        <p class="mt-2 text-sm text-gray-500">
          {$domainsQuery.data?.length} domains loaded
        </p>
      </div>
    {/if}
  </main>

  <CommandPalette />
</div>
```

---

## **Phase 5: Components (Days 5-7)**

### **5.1 Command Palette (Cmd+K)**

**`app/src/lib/components/command-palette/CommandPalette.svelte`:**
```svelte
<script lang="ts">
  import { goto } from '$app/navigation'
  import { commandPaletteOpen, toggleCommandPalette } from '$lib/stores/uiStore'
  import { searchService, type SearchableItem } from '$lib/services/searchService'

  let query = $state('')
  let results = $state<SearchableItem[]>([])

  // Search on query change (debounced)
  $effect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        results = searchService.search(query, 10)
      } else {
        results = []
      }
    }, 150)

    return () => clearTimeout(timer)
  })

  function handleSelect(item: SearchableItem) {
    goto(`/?capability=${item.id}&domain=${item.domainId}`)
    toggleCommandPalette()
    query = ''
  }

  function handleClose() {
    toggleCommandPalette()
    query = ''
  }
</script>

{#if $commandPaletteOpen}
  <div
    class="fixed inset-0 z-50 bg-black/50"
    onclick={handleClose}
    onkeydown={(e) => e.key === 'Escape' && handleClose()}
    role="dialog"
    aria-modal="true"
  >
    <div
      class="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-2xl"
      onclick={(e) => e.stopPropagation()}
      role="search"
    >
      <div class="p-4">
        <input
          type="text"
          placeholder="Search capabilities... (Cmd+K)"
          bind:value={query}
          class="w-full px-4 py-3 text-lg border-0 focus:outline-none"
          autofocus
        />
      </div>

      {#if results.length > 0}
        <div class="border-t border-gray-200 max-h-96 overflow-y-auto">
          {#each results as item (item.id)}
            <button
              onclick={() => handleSelect(item)}
              class="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-start gap-3"
            >
              <div class="flex-1">
                <div class="font-medium">{item.label}</div>
                <div class="text-sm text-gray-500">{item.domainLabel}</div>
              </div>
              <div class="text-xs text-gray-400 uppercase">{item.type}</div>
            </button>
          {/each}
        </div>
      {/if}

      {#if query.length >= 2 && results.length === 0}
        <div class="p-8 text-center text-gray-500">
          No results found for "{query}"
        </div>
      {/if}
    </div>
  </div>
{/if}
```

### **5.2 Header Component**

**`app/src/lib/components/header/Header.svelte`:**
```svelte
<script lang="ts">
  import { Search } from 'lucide-svelte'
  import { toggleCommandPalette } from '$lib/stores/uiStore'
  import IndustryFilter from './IndustryFilter.svelte'
  import PersonaFilter from './PersonaFilter.svelte'
  import StoryboardIcon from './StoryboardIcon.svelte'
</script>

<header class="sticky top-0 z-40 bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-6 py-4">
    <div class="flex items-center justify-between gap-4">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold text-gray-900">
          Commerce Navigator
        </h1>
      </div>

      <!-- Search trigger -->
      <button
        onclick={toggleCommandPalette}
        class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Search size={18} />
        <span class="text-sm text-gray-600">Search...</span>
        <kbd class="px-2 py-0.5 text-xs bg-white rounded border border-gray-300">
          ⌘K
        </kbd>
      </button>

      <!-- Filters and Storyboard -->
      <div class="flex items-center gap-3">
        <IndustryFilter />
        <PersonaFilter />
        <StoryboardIcon />
      </div>
    </div>
  </div>
</header>
```

### **5.3 Comparison View**

**`app/src/lib/components/comparison/ComparisonView.svelte`:**
```svelte
<script lang="ts">
  import type { Capability } from '$lib/services/graphDataLoader'
  import TraditionalColumn from './TraditionalColumn.svelte'
  import AgenticColumn from './AgenticColumn.svelte'

  interface Props {
    capability: Capability
  }

  let { capability }: Props = $props()
</script>

<div class="max-w-7xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">
      {capability.label}
    </h1>
    <p class="mt-2 text-lg text-gray-600">
      {capability.description}
    </p>
  </div>

  <!-- Two-column comparison -->
  <div class="grid grid-cols-2 gap-8">
    <TraditionalColumn approach={capability.traditionalApproach} />
    <AgenticColumn approach={capability.agenticApproach} />
  </div>
</div>
```

**`app/src/lib/components/comparison/TraditionalColumn.svelte`:**
```svelte
<script lang="ts">
  interface Props {
    approach: {
      description: string
      characteristics: string[]
      constraints: string[]
      benchmarks: Array<{
        metric: string
        value: string
        source: string
      }>
    }
  }

  let { approach }: Props = $props()
</script>

<div class="bg-traditional-50 border-2 border-traditional-200 rounded-lg p-6">
  <h2 class="text-xl font-semibold text-traditional-800 mb-4">
    🔪 The Cook Model (Traditional)
  </h2>

  <div class="prose prose-sm">
    <p class="text-traditional-700">
      {approach.description}
    </p>
  </div>

  <!-- Pain Points -->
  <div class="mt-6">
    <h3 class="font-medium text-traditional-800 mb-2">
      Pain Points:
    </h3>
    <ul class="space-y-2">
      {#each approach.constraints as constraint}
        <li class="text-sm text-traditional-600 flex items-start gap-2">
          <span class="text-red-500">⚠️</span>
          <span>{constraint}</span>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Benchmarks -->
  <div class="mt-6">
    <h3 class="font-medium text-traditional-800 mb-2">
      Current Metrics:
    </h3>
    <div class="space-y-2">
      {#each approach.benchmarks as bench}
        <div class="bg-white rounded p-3 text-sm">
          <div class="font-medium text-traditional-900">
            {bench.metric}
          </div>
          <div class="text-traditional-700 mt-1">
            {bench.value}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
```

**`app/src/lib/components/comparison/AgenticColumn.svelte`:**
```svelte
<script lang="ts">
  interface Props {
    approach: {
      description: string
      benefits: string[]
      projections: Array<{
        metric: string
        value: string
        basis: string
      }>
    }
  }

  let { approach }: Props = $props()
</script>

<div class="bg-agentic-50 border-2 border-agentic-300 rounded-lg p-6">
  <h2 class="text-xl font-semibold text-agentic-900 mb-4">
    👨‍🍳 The Chef Model (Agentic)
  </h2>

  <div class="prose prose-sm">
    <p class="text-agentic-800">
      {approach.description}
    </p>
  </div>

  <!-- Benefits -->
  <div class="mt-6">
    <h3 class="font-medium text-agentic-900 mb-2">
      Key Benefits:
    </h3>
    <ul class="space-y-2">
      {#each approach.benefits as benefit}
        <li class="text-sm text-agentic-700 flex items-start gap-2">
          <span class="text-green-500">✓</span>
          <span>{benefit}</span>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Projections -->
  <div class="mt-6">
    <h3 class="font-medium text-agentic-900 mb-2">
      Performance Improvements:
    </h3>
    <div class="space-y-2">
      {#each approach.projections as proj}
        <div class="bg-agentic-100 rounded p-3 text-sm border border-agentic-300">
          <div class="font-medium text-agentic-900">
            {proj.metric}
          </div>
          <div class="text-2xl font-bold text-agentic-700 mt-1">
            {proj.value}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
```

---

## **Agent-OS Integration**

### **Copy Configuration from Gallery App**

```bash
# Copy Agent-OS config
cp -r ../nino-chavez-gallery/.agent-os ./app/

# Update config for commerce navigator
# Edit .agent-os/config.yml and README.md
```

**`.agent-os/config.yml`:**
```yaml
project:
  name: "commerce-navigator"
  type: "sveltekit-spa"
  framework: "SvelteKit 2.x + Svelte 5"

workflow:
  default_mode: "direct"  # 90% of work (UI components)

context:
  total_budget: 60000  # 30% of 200k window
  tiers:
    core: 20000     # SvelteKit config, types, stores
    domain: 25000   # Routes, components, services
    task: 15000     # Individual component work
```

---

## **Acceptance Criteria**

### **Phase 1: Foundation**
- ✅ `npm run dev` starts SvelteKit dev server on port 3000
- ✅ TypeScript strict mode with zero errors
- ✅ Tailwind CSS v4 working with custom colors
- ✅ Static data symlink accessible at `/data/`

### **Phase 2: Data Loading**
- ✅ `loadDomainsIndex()` fetches domains.json successfully
- ✅ Returns 10 domains with correct structure
- ✅ `loadDomainCapabilities()` loads capability files
- ✅ Zod validation catches malformed data

### **Phase 3: State Management**
- ✅ Svelte stores accessible and reactive
- ✅ Command palette opens/closes
- ✅ Storyboard add/remove frames works
- ✅ Filters update state

### **Phase 4: Routing**
- ✅ URL updates when navigating: `?capability=X&domain=Y`
- ✅ Browser back/forward works
- ✅ Refresh preserves state
- ✅ SvelteKit page store reactive to URL changes

### **Phase 5: Components**
- ✅ Cmd+K opens command palette
- ✅ Search returns results in <200ms
- ✅ Clicking result navigates to capability
- ✅ ComparisonView renders traditional vs agentic
- ✅ Responsive layout works on desktop

---

## **Performance Targets**

Based on your gallery app achieving **60-75% performance improvement**:

| Metric | Target | Strategy |
|--------|--------|----------|
| Initial Load | <800ms | Svelte's 1.6KB bundle vs React's 40KB |
| Domain Fetch | <300ms | TanStack Query caching |
| Search Results | <100ms | FlexSearch indexing |
| Lighthouse | ≥95 | Svelte compilation + Tailwind v4 |
| Bundle Size | <80KB | Code splitting, Svelte efficiency |

---

## **Next Steps**

1. **Execute Phase 1** (SvelteKit initialization)
2. **Execute Phase 2** (Data services)
3. **Execute Phase 3** (Svelte stores)
4. **Execute Phase 4** (Routes + URL state)
5. **Execute Phase 5** (Svelte 5 Runes components)
6. **Add remaining features** (Filters, Storyboard, Context tabs)
7. **Performance optimization** (Lighthouse ≥95)
8. **Accessibility audit** (WCAG 2.1 AA)
9. **Production deployment** (Vercel)

---

## **Estimated Timeline**

Based on your gallery app migration experience:

- Phase 1-2: Days 1-2 (Setup + Services)
- Phase 3-4: Days 3-4 (State + Routes)
- Phase 5: Days 5-7 (Components using Svelte 5 Runes)
- **Total: ~1 week for MVP**

**Advantage over React:** Svelte 5 Runes (`$state`, `$derived`, `$effect`) require less boilerplate than React hooks, making AI agent code generation faster and cleaner.

---

**Document Version:** 2.0.0 (SvelteKit)
**Last Updated:** 2025-10-23
**Status:** Ready for execution
**Evidence:** Based on 2 production Svelte apps (69 components, Agent-OS v3.0.0)
