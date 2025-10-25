# Product Requirements Document (PRD)

## Commerce Transformation Navigator

**Version:** 1.0.0
**Date:** 2025-10-21
**Status:** Active Development
**Owner:** Product Management
**Related Documents:** [PRODUCT_MISSION.md](./PRODUCT_MISSION.md), [CLAUDE.md](./CLAUDE.md)

---

## 1. Product Vision & User Problem

### Product Vision

The **Commerce Transformation Navigator** is a **Narrative Cockpit** — a dynamic, interactive presentation tool designed for expert consultants to pilot live transformation narratives in front of client stakeholders. It replaces static PowerPoint presentations with a responsive, real-time storytelling platform that adapts to client questions and concerns as they arise.

**Core Concept: Narrative Cockpit vs. Data Explorer**

- **Data Explorer (Anti-Pattern):** Exposes the full database (1,292 nodes), asks "What do you want to find?", creates decision fatigue, surfaces noise.
- **Narrative Cockpit (Our Approach):** Exposes the story (Cook vs. Chef transformation), asks "What part of the story do you want to tell?", hides complexity, surfaces signal.

### User Problem

**The Consultant's Challenge:**

Enterprise digital transformation consultants face a critical presentation problem:

1. **Static PowerPoints Fail in Dynamic Conversations:**
   - Pre-built slide decks cannot adapt to live client questions
   - "Let me get back to you on that" kills momentum
   - Building custom decks for each client takes 4-8 hours
   - Can't show different industry/persona perspectives on the fly

2. **Complexity Creates Confusion:**
   - Transformation concepts are inherently complex (1,292 interconnected components)
   - Clients need to see "what changes" not "how it all works"
   - Technical explanations lose business stakeholders
   - Too much detail obscures the core value proposition

3. **Lack of Narrative Control:**
   - Presenters are locked into linear slide progression
   - Can't drill down into details when client shows interest
   - Can't skip irrelevant sections when client is disengaged
   - Can't build custom narrative arc based on room dynamics

**The Solution:**

A live, interactive presentation cockpit that:
- Loads instantly with just the essential context (10 domains)
- Allows instant filtering by industry and persona
- Enables consultants to navigate to any business capability in < 5 seconds
- Shows clear before/after comparisons (Traditional vs. Agentic)
- Provides drill-down context (Functions, Agents) on demand
- Builds custom presentation flows in real-time via "cart"
- Shares entire view state via URL (no file attachments)

---

## 2. User Personas

### Primary Persona: The Consultant / Pilot

**Profile:**
- **Name:** Sarah Chen
- **Role:** Senior Digital Transformation Consultant, Accenture
- **Experience:** 8 years in enterprise consulting, 3 years focused on AI/automation
- **Technical Proficiency:** High (understands technology but not a developer)
- **Presentation Frequency:** 3-5 client presentations per week

**Context:**
- Presents to C-suite and VP-level stakeholders
- Needs to demonstrate ROI of agentic transformation
- Must adapt to diverse industries (Retail, Travel, Hospitality, etc.)
- Faces unexpected questions requiring instant, credible answers
- Limited prep time (often < 2 hours before presentation)

**Goals:**
1. Quickly tailor presentation to client's industry and stakeholder role
2. Navigate to relevant business capabilities without fumbling
3. Show clear, compelling before/after comparisons
4. Answer drill-down questions about implementation details
5. Build trust through responsive, knowledgeable answers
6. Create custom presentation flow that tells coherent story
7. Share exact view with colleagues and clients for follow-up

**Pain Points:**
- PowerPoint forces linear narrative (can't adapt to client interest)
- Building custom decks takes hours (unsustainable for 3-5 presentations/week)
- Client questions derail presentation flow ("Let me get back to you...")
- Hard to show industry-specific examples on the fly
- Sending decks via email feels impersonal and static

**Success Criteria:**
- Can filter to client's context (Industry + Persona) in < 10 seconds
- Can navigate to any business capability in < 5 seconds
- Can answer 95% of client questions without leaving the tool
- Can build 8-10 slide custom presentation in < 5 minutes
- Client walks away saying "This is exactly what we need"

**Behavioral Patterns:**
- Arrives early to set up and test technology
- Watches client body language to gauge interest
- Pivots narrative based on room dynamics
- Takes notes on client questions for follow-up
- Shares resources immediately (URLs, not attachments)

**Quotes:**
- "I need to be able to pivot on a dime when the CFO says 'What about supply chain?'"
- "PowerPoint makes me feel trapped. I need fluid navigation."
- "Half my job is reading the room and adjusting the story."

---

### Secondary Persona: The Client / Passenger

**Profile:**
- **Name:** Marcus Johnson
- **Role:** Chief Marketing Officer, Major Retail Chain
- **Experience:** 15 years in retail marketing, new to AI/automation
- **Technical Proficiency:** Low to Medium (business-focused, not technical)
- **Decision Authority:** High (budget owner for digital transformation initiatives)

**Context:**
- Evaluating digital transformation ROI and vendor partners
- Skeptical of "AI hype" but open to proven solutions
- Needs to understand impact on his team and customers
- Must present findings to CEO and Board
- Time-constrained (45-60 minute meeting windows)

**Goals:**
1. Understand what changes for his team (practical impact)
2. See clear business value (ROI, efficiency gains, customer benefits)
3. Validate applicability to retail industry specifically
4. Get answers to "how does it work" without overwhelming technical detail
5. Identify quick wins and long-term strategic initiatives
6. Take actionable next steps with confidence

**Pain Points:**
- Most vendor presentations are too technical or too generic
- Hard to see relevance to retail vs. generic "enterprise"
- Can't tell if this is proven or just "PowerPoint innovation"
- Needs to justify budget to CEO (requires concrete metrics)
- Worried about implementation disruption to current operations

**Success Criteria:**
- Sees examples specific to retail and marketing domain
- Understands before/after comparison without technical jargon
- Gets concrete metrics (10x faster, 90% cost reduction, etc.)
- Leaves with clear next steps (pilot, POC, or pass)
- Can explain the value to CEO in 2 minutes

**Behavioral Patterns:**
- Asks probing questions to test depth of knowledge
- Looks for proof points and case studies
- Mentally translates concepts to his team's workflows
- Takes notes on metrics and benefits
- Shares promising solutions with peers

**Quotes:**
- "Show me how this changes our customer personalization process, not how the AI works."
- "What's the ROI? I need numbers, not buzzwords."
- "Does this work for retail, or is this another generic enterprise pitch?"

---

### Supporting Persona: The Solution Architect

**Profile:**
- **Name:** Priya Patel
- **Role:** Enterprise Architect, Client Organization
- **Experience:** 10 years in enterprise architecture, technical implementation lead
- **Technical Proficiency:** Very High (deep technical expertise)
- **Involvement:** Evaluates technical feasibility, estimates implementation complexity

**Context:**
- Joins presentations to assess technical viability
- Must map business vision to technical reality
- Responsible for implementation roadmap
- Reports to CTO on feasibility and risk

**Goals:**
1. Understand agent orchestration patterns and workflows
2. Identify integration points with existing systems
3. Assess implementation complexity and risk
4. Validate technical claims (can this actually work?)
5. Estimate timeline and resource requirements

**Pain Points:**
- Business presentations often lack technical depth
- Needs to drill into Functions and Agents (not just Capabilities)
- Must validate data sources and integration patterns
- Concerned about vendor lock-in and platform dependencies

**Success Criteria:**
- Can access detailed agent workflow information
- Sees clear integration architecture
- Understands data sources and API requirements
- Can estimate implementation effort accurately

**Quotes:**
- "I need to see the actual agent workflows, not just the benefits."
- "What systems does this integrate with? Where's the data coming from?"

---

## 3. Foundational Principles

These principles are **non-negotiable architectural constraints** that define the product's DNA. All feature decisions must align with these principles.

### Principle 1: Signal Over Noise

**Definition:** The 1,292-node knowledge graph is noise. The A-vs-B comparison (Traditional vs. Agentic) is signal.

**Implementation Requirements:**
- **Primary Real Estate (80%):** Dedicated to `traditionalApproach` vs. `agenticApproach` comparison
- **Visual Hierarchy:** Traditional approach (left, neutral/muted) vs. Agentic approach (right, highlighted/positive)
- **Content Priority:** Benefits, metrics, and outcomes emphasized over technical implementation
- **Secondary Context (20%):** Functions, Agents, Personas available as optional drill-down

**Acceptance Criteria:**
- [ ] Main content pane shows two-column comparison as default view
- [ ] Comparison view occupies ≥80% of viewport width on desktop
- [ ] Traditional approach visually de-emphasized (grayscale or muted colors)
- [ ] Agentic approach visually emphasized (brand colors, positive indicators)
- [ ] Metrics displayed prominently (large font, visual indicators)
- [ ] Technical details (Functions, Agents) behind tabs or accordions

**Anti-Patterns to Avoid:**
- Node detail pages as primary view
- Graph visualizations as landing page
- "Browse all capabilities" list views
- Technical architecture diagrams in primary real estate

---

### Principle 2: Narrative IS Navigation

**Definition:** The data has an inherent narrative hierarchy (Concept → Domain → Capability). The UI must follow this exact structure.

**Implementation Requirements:**
- **Navigation Structure:** Literal 1:1 mapping to data hierarchy
  - Top Level: Concept context (Cook vs. Chef theme)
  - Level 1: 10 Domains as primary navigation
  - Level 2: Capabilities nested under domains
  - Level 3+: Functions/Agents/Personas as contextual panels
- **No Abstract Modes:** Eliminate "Browse," "Visualize," "Wizard," "Present" mode switchers
- **Single Path:** One canonical way to reach any capability: Domain → Capability
- **Breadcrumb Trail:** Always show: Domain > Capability (current location)

**Acceptance Criteria:**
- [ ] Navigation pane displays 10 domains on initial load
- [ ] Clicking domain expands to show child capabilities (in-place expansion)
- [ ] Clicking capability loads comparison in main pane
- [ ] Breadcrumb shows current path (e.g., "Payments & Finance > Buy Now, Pay Later")
- [ ] No mode switcher UI elements (tabs, dropdown, etc.)
- [ ] URL structure reflects hierarchy: `?domain=payments&capability=bnpl`

**Anti-Patterns to Avoid:**
- Modal windows for navigation
- Multi-level dropdown menus
- "View as: List / Grid / Graph" toggles
- Disconnected search results page
- Abstract taxonomy separate from data model

---

### Principle 3: Progressive Disclosure IS Mandatory

**Definition:** Users must never be exposed to full graph complexity (1,292 nodes). UI must reveal depth incrementally.

**Implementation Requirements:**
- **Initial Load:** Show only 10 domains (~10 items, minimal payload)
- **First Interaction:** User clicks domain → Show ~9 capabilities for that domain
- **Second Interaction:** User clicks capability → Show comparison + context tabs
- **On-Demand Depth:** Functions, Agents, Personas behind tabs (collapsed by default)
- **Never Expose:** Full graph visualization, "all capabilities" list, node relationship explorer

**Acceptance Criteria:**
- [ ] Initial page load displays ≤10 top-level items (domains)
- [ ] No data fetched until user interaction (lazy loading)
- [ ] Domain expansion shows ≤15 capabilities (typical case ~9)
- [ ] Context pane tabs collapsed by default
- [ ] Maximum visible items at any time: <50
- [ ] Performance: Initial load <1s, domain expansion <500ms

**Anti-Patterns to Avoid:**
- "Show all 90 capabilities" button
- Graph visualization with all 1,292 nodes
- Data table with pagination (implies "browse all")
- "Explore relationships" mode

---

## 4. Functional Requirements (User Stories)

### 4.1 The Application Shell (Global Controls)

The persistent header/sidebar providing cockpit controls across all views.

---

#### Feature 4.1.1: Global NLP Search

**User Story 1: Instant Capability Search**

**As a** consultant presenting to a client,
**I want to** search for capabilities using natural language,
**So that** I can instantly respond to client questions like "What about inventory management?" without navigating manually.

**Acceptance Criteria:**
- [ ] Search input is persistently visible in application header
- [ ] Search activates on typing (no "submit" button required)
- [ ] Search queries all node properties: `label`, `description`, `traditionalApproach.description`, `agenticApproach.description`
- [ ] Results appear as dropdown list within 200ms of keystroke
- [ ] Results grouped by type: Capabilities (primary), Functions (secondary)
- [ ] Clicking result navigates to that capability's comparison view
- [ ] Search supports synonyms (e.g., "stock" matches "inventory")
- [ ] Empty search shows no results (not all items)
- [ ] Escape key clears search and closes results

**Technical Notes:**
- Leverage existing `nlpService.ts` for query processing
- Client-side search (no backend API)
- Debounce input by 150ms
- Highlight matching terms in results

---

**User Story 2: Contextual Search with Filters**

**As a** consultant,
**I want** search results to respect my active context filters (Industry, Persona),
**So that** I only see capabilities relevant to the current client conversation.

**Acceptance Criteria:**
- [ ] Search results filtered by active Industry filter (if set)
- [ ] Search results filtered by active Persona filter (if set)
- [ ] Filter pills displayed above search results to show active context
- [ ] Clicking filter pill in search results clears that filter
- [ ] Search with no results shows "No results for [industry] [persona]" message
- [ ] Clearing all filters re-runs search with full dataset

---

#### Feature 4.1.2: Global Context Filters

**User Story 1: Industry Filtering**

**As a** consultant presenting to a Retail CMO,
**I want to** filter the entire application to show only Retail-relevant content,
**So that** every capability, function, and example is tailored to the client's industry.

**Acceptance Criteria:**
- [ ] Industry filter dropdown in application header
- [ ] Dropdown populated from data: Retail, Grocery, Travel, QSR, Hospitality, All
- [ ] Selecting industry filters all content globally (navigation, comparison, context)
- [ ] Navigation pane hides domains with zero applicable capabilities for selected industry
- [ ] Capability list shows only capabilities tagged with selected industry
- [ ] "All" option shows all content (default state)
- [ ] Selected industry persisted in URL: `?industry=retail`
- [ ] Industry filter pill displayed when active (with clear "X")
- [ ] Changing industry updates all panes in <300ms

**Technical Notes:**
- Use existing `applyFilters()` function from `data/utils/applyFilters.ts`
- Filter applied to entire dataset before rendering
- Industries sourced from `data/types/graph.ts` Industry enum

---

**User Story 2: Persona Filtering**

**As a** consultant,
**I want to** filter content by stakeholder persona (CMO, CTO, COO, etc.),
**So that** I show capabilities most relevant to the client's role and responsibilities.

**Acceptance Criteria:**
- [ ] Persona filter dropdown in application header
- [ ] Dropdown populated from data: CMO, CTO, COO, CFO, VP Operations, etc.
- [ ] Selecting persona filters capabilities by relevance to that role
- [ ] Context pane prioritizes personas matching the filter
- [ ] "All" option shows all content (default)
- [ ] Selected persona persisted in URL: `?persona=cmo`
- [ ] Persona filter pill displayed when active
- [ ] Can apply both Industry + Persona simultaneously
- [ ] Combined filters use AND logic (must match both)

---

#### Feature 4.1.3: Presentation Cart

**User Story 1: Adding Capabilities to Cart**

**As a** consultant,
**I want to** add compelling capabilities to a "cart" as I navigate,
**So that** I can build a custom presentation flow tailored to this client conversation.

**Acceptance Criteria:**
- [ ] "Add to Cart" button visible on each capability comparison view
- [ ] Clicking "Add to Cart" adds current capability to cart
- [ ] Cart icon in header shows count badge (e.g., "5")
- [ ] Cart contents persisted in localStorage (survives page refresh)
- [ ] Cart contents persisted in URL for sharing: `?cart=cap1,cap2,cap3`
- [ ] Adding duplicate capability shows "Already in cart" message
- [ ] Maximum cart size: 20 items (UX constraint for focused presentation)
- [ ] Cart full message when attempting to add 21st item

**Technical Notes:**
- Cart state managed via React Context
- Stored as array of capability IDs
- URL encoding: comma-separated list of IDs

---

**User Story 2: Managing Cart Contents**

**As a** consultant,
**I want to** view, reorder, and remove items from my cart,
**So that** I can refine my presentation narrative before entering full-screen mode.

**Acceptance Criteria:**
- [ ] Clicking cart icon opens cart drawer (slide-in from right)
- [ ] Cart drawer shows all added capabilities with titles
- [ ] Each cart item displays: Capability name, Domain label, Remove button
- [ ] Drag-and-drop to reorder cart items
- [ ] Remove button deletes item from cart (with confirmation)
- [ ] "Clear All" button empties entire cart (with confirmation)
- [ ] Cart drawer shows "Empty cart" state when no items
- [ ] "Start Presentation" button launches full-screen mode (if cart has ≥1 item)
- [ ] Cart drawer closable via "X" button or clicking outside

**UI Specifications:**
- Cart drawer width: 400px
- Cart item height: 80px
- Drag handle icon on left of each item
- Remove button: red X icon on right

---

### 4.2 Pane 1: Navigation Pane (The "Narrative")

The vertical list providing the primary navigation structure.

---

#### Feature 4.2.1: Domain List Display

**User Story 1: Initial Domain List**

**As a** consultant loading the application,
**I want to** see the 10 high-level business domains immediately,
**So that** I can quickly orient to the overall transformation landscape.

**Acceptance Criteria:**
- [ ] On initial page load, navigation pane displays 10 domains
- [ ] Domains displayed as vertical list (accordion-style)
- [ ] Each domain shows: Icon, Label, Capability count
- [ ] Domains loaded from `domains.json` (single fetch, ~5KB)
- [ ] Load time: <500ms for initial render
- [ ] Domains sorted in logical business order (predefined, not alphabetical)
- [ ] Active filters reduce visible domain count (hide domains with 0 applicable capabilities)
- [ ] Empty state shown if all domains filtered out: "No domains match [filters]"

**Visual Specifications:**
- Domain item height: 60px
- Icon size: 24px (left-aligned)
- Label: 16px bold
- Capability count: 14px gray (e.g., "9 capabilities")
- Hover state: Light background highlight
- Collapsed state: Chevron-down icon (right-aligned)

---

#### Feature 4.2.2: Progressive Loading of Capabilities

**User Story 1: Expand Domain to Show Capabilities**

**As a** consultant,
**I want to** click a domain to see its child capabilities without leaving the page,
**So that** I can progressively navigate the hierarchy without overwhelming the client.

**Acceptance Criteria:**
- [ ] Clicking collapsed domain expands it in-place
- [ ] Expanded domain fetches `[domain-name].json` (e.g., `payments.json`)
- [ ] Fetch time: <500ms for typical domain file (~50KB)
- [ ] Capabilities rendered as nested list under domain
- [ ] Each capability shows: Label, Brief description (1 line)
- [ ] Loading spinner shown during fetch
- [ ] Error state shown if fetch fails: "Unable to load capabilities"
- [ ] Clicking expanded domain collapses it (accordion behavior)
- [ ] Only one domain expanded at a time (expanding Domain B collapses Domain A)
- [ ] Expanded state persisted in URL: `?domain=payments`

**Technical Notes:**
- Map domain ID to filename: `domain-payments-finance` → `payments.json`
- Store fetched data in component state (cache for session)
- Use React Suspense for loading state

---

**User Story 2: Navigate to Capability Comparison**

**As a** consultant,
**I want to** click a capability to see its Traditional vs. Agentic comparison,
**So that** I can show the client the transformation value for that specific capability.

**Acceptance Criteria:**
- [ ] Clicking capability updates main content pane (Pane 2)
- [ ] Clicking capability updates context pane (Pane 3)
- [ ] Selected capability highlighted in navigation (distinct background color)
- [ ] Breadcrumb updates: "Domain Name > Capability Name"
- [ ] URL updates: `?domain=payments&capability=bnpl`
- [ ] No additional data fetch (capability data already in domain JSON)
- [ ] Transition animation: 200ms fade-in for new content
- [ ] Previous capability de-selected (only one active at a time)

**Visual Specifications:**
- Capability item height: 80px
- Label: 14px semibold
- Description: 12px gray, truncated to 1 line
- Active state: Blue left border (4px), light blue background
- Hover state: Light gray background

---

### 4.3 Pane 2: Content Pane (The "Signal")

The primary content area displaying the A-vs-B comparison.

---

#### Feature 4.3.1: Traditional vs. Agentic Comparison View

**User Story 1: Display Side-by-Side Comparison**

**As a** client stakeholder,
**I want to** see a clear before/after comparison of the selected capability,
**So that** I understand exactly what changes and why it's better.

**Acceptance Criteria:**
- [ ] Content pane displays two-column layout (50/50 split)
- [ ] Left column: Traditional approach (labeled "The Cook Model")
- [ ] Right column: Agentic approach (labeled "The Chef Model")
- [ ] Traditional column shows:
  - `traditionalApproach.description` (2-3 paragraphs)
  - `traditionalApproach.painPoints` (bulleted list)
  - Visual indicator: Neutral/muted color scheme (grays)
- [ ] Agentic column shows:
  - `agenticApproach.description` (2-3 paragraphs)
  - `agenticApproach.benefits` (bulleted list)
  - `agenticApproach.metrics` (highlighted metrics, e.g., "10x faster")
  - Visual indicator: Positive color scheme (blues/greens)
- [ ] Metrics displayed prominently: Large font (24px), colored backgrounds
- [ ] No data state: "Select a capability to see the comparison"
- [ ] Responsive: Stacks to single column on screens <1024px

**Visual Specifications:**
- Column padding: 32px
- Heading: 20px bold
- Description: 16px line-height 1.6
- Pain points/benefits: 14px bulleted list
- Metrics: 24px bold, colored background pill
- Divider: 1px vertical line between columns

---

**User Story 2: Quick Actions on Capability**

**As a** consultant,
**I want** quick actions on the comparison view,
**So that** I can add to cart or share without interrupting my flow.

**Acceptance Criteria:**
- [ ] "Add to Cart" button in top-right of comparison view
- [ ] "Share" button copies current URL to clipboard
- [ ] "View Functions" button scrolls to/opens context pane Functions tab
- [ ] Button click feedback: Success toast message
- [ ] Disabled state for "Add to Cart" if already in cart
- [ ] Keyboard shortcuts: "C" for cart, "S" for share

---

### 4.4 Pane 3: Context Pane (The "System")

The right sidebar providing optional drill-down context.

---

#### Feature 4.4.1: Tabbed Context Interface

**User Story 1: Access Related Functions**

**As a** solution architect,
**I want to** see the specific functions (tasks) within a capability,
**So that** I can understand the implementation details and agent workflows.

**Acceptance Criteria:**
- [ ] Context pane displays tabbed interface: Functions, Agents, Personas
- [ ] Functions tab active by default when capability selected
- [ ] Functions tab shows list of function nodes linked to current capability
- [ ] Each function displays:
  - Function label
  - Brief description
  - "View Details" expand/collapse button
- [ ] Expanded function shows:
  - Traditional workflow
  - Agentic workflow (orchestrator, super agents, utility agents)
  - HITL (Human-in-the-Loop) gates
- [ ] No functions state: "No functions defined for this capability"
- [ ] Functions filtered by active Industry/Persona filters

**Technical Notes:**
- Functions data already loaded in domain JSON (no additional fetch)
- Use `isFunctionNode()` type guard from `graph.ts`
- Filter functions where `parentCapability` matches current capability ID

---

**User Story 2: Access Related Agents**

**As a** technical stakeholder,
**I want to** see the AI agents involved in this capability,
**So that** I understand the automation architecture and orchestration patterns.

**Acceptance Criteria:**
- [ ] Agents tab shows agents linked to current capability
- [ ] Agents grouped by role: Orchestrator, Super Agents, Utility Agents
- [ ] Each agent displays:
  - Agent label
  - Role badge (color-coded)
  - Capabilities list
- [ ] Click agent to expand details:
  - Description
  - Data sources
  - Integrations
- [ ] Visual hierarchy: Orchestrator > Super Agents > Utility Agents
- [ ] No agents state: "No agents defined for this capability"

**Visual Specifications:**
- Role badges:
  - Orchestrator: Purple
  - Super Agent: Green
  - Utility Agent: Blue
- Hierarchical indentation for agent levels

---

**User Story 3: Access Related Personas**

**As a** consultant,
**I want to** see which personas (roles) use this capability,
**So that** I can relate the transformation to specific team members the client knows.

**Acceptance Criteria:**
- [ ] Personas tab shows personas linked to current capability
- [ ] Each persona displays:
  - Persona title (e.g., "Chief Marketing Officer")
  - Role type badge (customer-facing, enterprise-support, b2b)
  - Key responsibilities (3-5 bullets)
- [ ] Click persona to expand:
  - Traditional workflow for this persona
  - Agentic workflow for this persona
  - KPIs impacted
- [ ] Personas highlighted if matching active Persona filter
- [ ] No personas state: "No personas defined for this capability"

---

### 4.5 Presentation Mode

**User Story 1: Full-Screen Presentation Mode**

**As a** consultant,
**I want to** enter a full-screen presentation mode with my cart items,
**So that** I can walk through selected capabilities with the client without distractions.

**Acceptance Criteria:**
- [ ] "Start Presentation" button in cart drawer launches full-screen mode
- [ ] Full-screen mode hides application shell (search, filters, navigation)
- [ ] Displays first cart item in full-screen comparison view
- [ ] Navigation controls: Previous, Next buttons (bottom of screen)
- [ ] Progress indicator: "3 of 8" (current position / total items)
- [ ] Keyboard navigation: Arrow keys for prev/next, Escape to exit
- [ ] Clicking outside comparison area shows navigation controls
- [ ] Exit button returns to normal view (top-right)
- [ ] Presentation mode URL: `?mode=present&cart=cap1,cap2,cap3&slide=2`

**Visual Specifications:**
- Background: Dark gray (#1a1a1a) for focus
- Comparison view: White card, centered, max-width 1400px
- Navigation buttons: 48px circular, semi-transparent
- Progress indicator: 14px, bottom-center

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

#### 5.1.1 Progressive Loading Strategy

**Requirement:** The application must be "presentation-fast" — instant perceived responsiveness for client-facing use.

**Specifications:**

| Load Stage | Payload | Target Time | Max Time |
|------------|---------|-------------|----------|
| Initial Page Load (Shell + Domains) | ~50KB | <500ms | <1s |
| Domain Expansion (Fetch domain JSON) | ~50KB | <300ms | <500ms |
| Capability Selection (Render comparison) | 0KB (cached) | <100ms | <200ms |
| Search Results | 0KB (client-side) | <100ms | <200ms |
| Filter Application | 0KB (client-side) | <100ms | <300ms |

**Implementation Strategy:**

1. **Code Splitting:**
   - Main bundle: Shell components, navigation, search
   - Lazy load: Comparison view components, context pane components
   - Separate chunk for presentation mode

2. **Data Loading:**
   - **Initial:** Fetch `domains.json` (10 items, ~5KB)
   - **On-Demand:** Fetch `[domain].json` only when domain expanded
   - **Cache:** Store fetched domain data in memory (session-level cache)
   - **Prefetch:** Preload adjacent domain files on idle

3. **Rendering Optimizations:**
   - Virtual scrolling for lists >20 items
   - Memoize filter/search functions
   - Debounce search input (150ms)
   - Throttle scroll events (16ms)

4. **Bundle Size Targets:**
   - Main bundle: <200KB (gzipped)
   - Lazy chunks: <100KB each
   - Total initial load: <300KB
   - Each domain JSON: <50KB

**Acceptance Criteria:**
- [ ] Lighthouse Performance score ≥90
- [ ] First Contentful Paint <1s
- [ ] Time to Interactive <2s
- [ ] Largest Contentful Paint <2.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] No UI jank (60fps scrolling)

---

### 5.2 State Management Requirements

#### 5.2.1 URL-Based State Persistence

**Requirement:** All application state (filters, selections, cart) must be serializable in the URL for sharing and bookmarking.

**URL Schema:**

```
Base URL: https://app.example.com/navigator

Query Parameters:
?industry={industry}          # Selected industry filter
&persona={persona}            # Selected persona filter
&domain={domainId}            # Expanded domain
&capability={capabilityId}    # Selected capability
&cart={cap1,cap2,cap3}        # Comma-separated capability IDs in cart
&mode={present}               # Presentation mode flag
&slide={3}                    # Current slide in presentation mode
&tab={functions}              # Active context pane tab
```

**Example URLs:**

```
# Retail CMO viewing Buy Now, Pay Later capability
https://app.example.com/navigator?industry=retail&persona=cmo&domain=payments&capability=bnpl

# Presentation mode with 5 cart items, on slide 3
https://app.example.com/navigator?mode=present&cart=bnpl,fraud,loyalty,personalization,inventory&slide=3

# Shared view with filters and capability
https://app.example.com/navigator?industry=travel&persona=cto&domain=customer-experience&capability=personalization
```

**Implementation Requirements:**

1. **URL Synchronization:**
   - Update URL on every state change (filters, navigation, cart)
   - Use `history.pushState()` for navigation (no page reload)
   - Parse URL on initial load to restore state
   - Validate URL parameters (fallback to defaults for invalid values)

2. **State Restoration:**
   - Parse query parameters on mount
   - Fetch required domain data if capability specified in URL
   - Apply filters before rendering
   - Expand domain and select capability if specified
   - Populate cart from URL
   - Enter presentation mode if `mode=present`

3. **Share Functionality:**
   - "Share" button copies current URL to clipboard
   - URL includes all active filters, selection, and cart
   - Shortened URLs (optional): Use URL shortener service for long cart lists

**Acceptance Criteria:**
- [ ] Refreshing page restores exact view state
- [ ] Sharing URL allows recipient to see identical view
- [ ] Browser back/forward buttons work correctly
- [ ] Bookmarking URL works (state persists across sessions)
- [ ] Invalid URL parameters handled gracefully (fallback to defaults)
- [ ] URL updates within 100ms of user interaction
- [ ] Maximum URL length <2000 characters (browser compatibility)

---

### 5.3 Data Integrity Requirements

#### 5.3.1 TypeScript Type Safety

**Requirement:** 100% TypeScript strict mode compliance with runtime type validation.

**Specifications:**

1. **Compile-Time Safety:**
   - `strict: true` in `tsconfig.json`
   - No `any` types (use `unknown` if necessary)
   - No type assertions (`as Type`) — use type guards
   - All function parameters and return types explicitly typed

2. **Runtime Validation:**
   - Validate fetched JSON against TypeScript types
   - Use type guards from `data/types/graph.ts`
   - Graceful handling of malformed data

3. **Data Model Validation:**
   - Validate all domain JSON files against schema
   - Check for missing required fields
   - Validate edge references (capability IDs exist)

**Acceptance Criteria:**
- [ ] Zero TypeScript compilation errors
- [ ] Zero ESLint type-related warnings
- [ ] All fetched data validated with type guards
- [ ] Error boundaries catch runtime type errors
- [ ] Detailed error messages for validation failures

---

### 5.4 Accessibility Requirements

**Requirement:** WCAG 2.1 Level AA compliance for enterprise accessibility standards.

**Specifications:**

1. **Keyboard Navigation:**
   - All interactive elements accessible via Tab
   - Logical tab order (left-to-right, top-to-bottom)
   - Escape closes modals/drawers
   - Arrow keys navigate lists
   - Enter/Space activates buttons

2. **Screen Reader Support:**
   - Semantic HTML (nav, main, aside, article)
   - ARIA labels for icons and actions
   - Live regions for dynamic content updates
   - Heading hierarchy (h1 > h2 > h3)

3. **Visual Accessibility:**
   - Color contrast ratio ≥4.5:1 for text
   - Focus indicators visible (2px outline)
   - No color-only information conveyance
   - Resizable text (up to 200%)

**Acceptance Criteria:**
- [ ] Passes axe DevTools automated scan
- [ ] Keyboard-only navigation possible
- [ ] Screen reader announces all state changes
- [ ] Focus trapping in modals
- [ ] Skip navigation link present

---

### 5.5 Browser Compatibility

**Requirement:** Support modern browsers used in enterprise environments.

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Not Supported:**
- Internet Explorer (any version)
- Mobile browsers (v1.0 scope)

---

### 5.6 Error Handling Requirements

**Requirement:** Graceful degradation and informative error messages.

**Specifications:**

1. **Network Errors:**
   - Retry failed fetches (3 attempts, exponential backoff)
   - Show error toast: "Unable to load data. Retrying..."
   - Fallback to cached data if available
   - Offline detection and messaging

2. **Data Errors:**
   - Validate JSON structure
   - Show missing field warnings
   - Render with partial data when possible
   - Log errors to console (dev mode)

3. **User Errors:**
   - Validation messages for invalid input
   - Confirmation dialogs for destructive actions
   - Clear error recovery paths

**Acceptance Criteria:**
- [ ] No silent failures (all errors surfaced to user)
- [ ] Error messages actionable (tell user what to do)
- [ ] Error boundaries prevent white screen crashes
- [ ] Network errors auto-retry
- [ ] Errors logged for debugging

---

## 6. Technical Architecture

### 6.1 Data Architecture

**Data Source Files:**

```
public/data/
├── domains.json              # 10 domains (initial load)
├── customer-experience.json  # Domain-specific data
├── sales-commerce.json
├── merchandising-product.json
├── supply-chain.json
├── payments-finance.json
├── data-analytics.json
├── technology-platform.json
├── human-capital.json
├── enterprise-support.json
└── governance-risk.json
```

**Data Schema (domains.json):**

```json
[
  {
    "id": "domain-payments-finance",
    "label": "Payments & Financial Operations",
    "icon": "credit-card",
    "capabilityCount": 9,
    "description": "Modern payment processing and financial automation"
  }
]
```

**Data Schema (domain-specific JSON, e.g., payments.json):**

```json
{
  "domainId": "domain-payments-finance",
  "domainLabel": "Payments & Financial Operations",
  "capabilities": [
    {
      "id": "capability-bnpl",
      "type": "capability",
      "label": "Buy Now, Pay Later",
      "description": "Flexible payment options...",
      "industries": ["Retail", "Grocery", "All"],
      "businessModels": ["B2C", "Hybrid"],
      "traditionalApproach": {
        "description": "Manual credit checks...",
        "painPoints": [
          "Slow approval times",
          "High abandonment rates"
        ]
      },
      "agenticApproach": {
        "description": "AI-powered instant approval...",
        "benefits": [
          "90% faster approval",
          "50% lower abandonment"
        ],
        "metrics": [
          { "label": "Approval Time", "value": "10x faster" },
          { "label": "Conversion", "value": "+40%" }
        ]
      },
      "functions": [ /* Function objects */ ],
      "agents": [ /* Agent objects */ ],
      "personas": [ /* Persona objects */ ]
    }
  ]
}
```

---

### 6.2 State Management Architecture

**State Layers:**

1. **URL State (Single Source of Truth):**
   - Filters (industry, persona)
   - Navigation (domain, capability)
   - Cart (capability IDs)
   - Presentation mode (mode, slide)

2. **React Context (UI State):**
   - Theme (light/dark)
   - Cart drawer open/closed
   - Navigation pane expanded domains
   - Toast notifications

3. **Component State (Local UI):**
   - Search input value
   - Hover states
   - Accordion expand/collapse
   - Tab selection

**State Flow:**

```
User Action
  ↓
Update URL (pushState)
  ↓
URL Change Listener
  ↓
Parse New URL State
  ↓
Update React Context/State
  ↓
Re-render Components
```

---

### 6.3 Component Architecture

**Component Hierarchy:**

```
<App>
├── <ThemeProvider>
├── <CartProvider>
├── <ApplicationShell>
│   ├── <GlobalSearch>
│   ├── <ContextFilters>
│   └── <PresentationCart>
├── <MainView>
│   ├── <NavigationPane>
│   │   ├── <DomainList>
│   │   └── <CapabilityList>
│   ├── <ContentPane>
│   │   └── <ComparisonView>
│   │       ├── <TraditionalColumn>
│   │       └── <AgenticColumn>
│   └── <ContextPane>
│       ├── <FunctionsTab>
│       ├── <AgentsTab>
│       └── <PersonasTab>
└── <PresentationMode> (conditional)
```

**Key Component Responsibilities:**

- **ApplicationShell:** Global controls, URL state management
- **NavigationPane:** Progressive data loading, domain/capability lists
- **ComparisonView:** A-vs-B display, data-agnostic rendering
- **ContextPane:** Tabbed drill-down, related node display
- **PresentationMode:** Full-screen mode, cart walkthrough

---

## 7. Success Metrics & KPIs

### 7.1 User Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to First Insight | <10s | From page load to first capability comparison visible |
| Context Switch Time | <2s | From changing industry/persona filter to updated view |
| Presentation Build Time | <5 min | From starting cart to 8-item presentation ready |
| Client Question Response Time | <5s | From client question to showing relevant capability |
| Shared URL Click Rate | >60% | % of generated URLs that are opened by recipients |

### 7.2 System Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial Page Load | <1s | LCP (Largest Contentful Paint) |
| Domain Data Fetch | <500ms | Time from click to capabilities rendered |
| UI Interaction Latency | <200ms | Time from click to visual feedback |
| Search Results Display | <200ms | Time from keystroke to results shown |
| Filter Application | <300ms | Time from filter change to updated view |

### 7.3 Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| TypeScript Compile Errors | 0 | CI/CD pipeline check |
| ESLint Warnings | 0 | CI/CD pipeline check |
| Accessibility Score | AA | WCAG 2.1 Level AA compliance |
| Lighthouse Performance | ≥90 | Automated Lighthouse CI |
| Error Rate | <0.1% | Sentry error tracking |

---

## Appendix A: Glossary

**Capability:** A business capability (e.g., "Buy Now, Pay Later") representing a discrete transformation opportunity.

**Domain:** A high-level business area (e.g., "Payments & Financial Operations") containing multiple capabilities.

**Function:** A specific task or workflow within a capability.

**Agent:** An AI agent (Orchestrator, Super, or Utility) that performs work in the agentic model.

**Persona:** A stakeholder role (e.g., "CMO," "CTO") with specific responsibilities and concerns.

**Traditional Approach:** The "Cook Model" — manual, reactive, rule-based operations.

**Agentic Approach:** The "Chef Model" — autonomous, proactive, AI-driven operations.

**Signal:** The A-vs-B comparison (Traditional vs. Agentic) showing transformation value.

**Noise:** The complex 1,292-node knowledge graph that must be hidden from primary view.

**Progressive Disclosure:** UI pattern that reveals complexity incrementally, only on user demand.

**Presentation Cart:** A collection of capabilities selected during navigation for building custom presentations.

---

**Document Status:** Ready for development kickoff.

**Next Steps:**
1. Review and approve PRD with stakeholders
2. Create implementation roadmap
3. Set up development environment with Agent OS workflow
4. Begin Phase 1: Foundation (progressive loading architecture)
