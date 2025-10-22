# Data Enrichment Plan: Horizontal & Contextual Optimizations

This plan outlines the steps to implement "Horizontal Enrichment" and "Contextual Enrichment" for the Commerce Transformation Navigator's data, building upon the existing data structure and the insights from the Product Requirements Document (PRD.md).

## Overall Goal

To transform the application's data from siloed lists into an interconnected system, enabling a more sophisticated narrative for consultants and providing highly relevant, context-aware content for client stakeholders.

---

## Phase 1: Horizontal Enrichment (Connectivity)

**Objective:** To establish explicit relationships between capabilities across different domains, allowing for "system-thinking" navigation and narrative pivoting.

### Step 1: Update TypeScript Data Schema ✅

Modified the `Capability` interface in `data/types/graph.ts` to include a new optional field `relatedCapabilities`.

**File:** `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/types/graph.ts`

**Change:** Added the following to the `Capability` interface:

```typescript
export interface Capability {
  // ... existing fields ...
  relatedCapabilities?: string[]; // Array of capability IDs
}
```

### Step 2: Identify and Map Cross-Domain Relationships ✅

This step requires domain expertise and will be performed by the user.

**Action:**
1.  Review all domain-specific JSON files in `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/capabilities/`.
2.  For each capability, identify other capabilities (potentially in different domains) that are directly dependent on, or strongly related to, it.
3.  Record these relationships, noting the `id` of the related capability.

**Example:**
*   `capability-fraud-chargeback-management` (from `b2b-commerce.json`) is related to `capability-real-time-analytics-bi` (from `analytics.json`).

### Step 3: Enrich Domain-Specific JSON Data Files ✅

Added the `relatedCapabilities` array to the relevant capability objects in the domain-specific JSON files.

**Files:** All `*.json` files within `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/capabilities/` that contain capability definitions.

**Example Modification (e.g., in `b2b-commerce.json`):**

```json
{
  "id": "capability-fraud-chargeback-management",
  "type": "capability",
  "label": "Fraud & Chargeback Management",
  // ... existing fields ...
  "relatedCapabilities": [
    "capability-real-time-analytics-bi",
    "capability-customer-identity-access-management"
  ]
}
```

### Step 4: Review `graphDataLoader.ts` for Compatibility ✅

Examined `data/utils/graphDataLoader.ts` to ensure it can correctly load and process the new `relatedCapabilities` field without errors. No explicit changes are anticipated unless the loader has strict schema validation that needs updating.

**File:** `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/utils/graphDataLoader.ts`

**Action:** Read and verified.

### Step 5: (Future UI Enhancement) Display Related Capabilities

Once the data is enriched, UI components can be updated to leverage this new connectivity. This is outside the scope of this data enrichment plan but is the intended next step.

**Potential UI Locations:**
*   `ContextPane`: A new tab or section to display "Related Capabilities."
*   `ComparisonView`: A small section linking to related capabilities.

---

## Phase 2: Contextual Enrichment (Relevance)

**Objective:** To make capability content (constraints, benefits, metrics) dynamic and specific to the active industry filter, significantly enhancing the "Industry" filter's power.

### Step 1: Update TypeScript Data Schema for Contextual Content ✅

Modified the `traditionalApproach` and `agenticApproach` interfaces in `data/types/graph.ts` to support contextual content. This involves replacing single string/array fields with arrays of objects that include an `industry` field.

**File:** `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/types/graph.ts`

**Change:** Introduced new interfaces for contextual content and updated `traditionalApproach` and `agenticApproach`.

```typescript
export interface ContextualContent {
  industry: string; // e.g., "Retail", "Travel", "All"
  content: string; // For descriptions, constraints, benefits
}

export interface ContextualMetric {
  industry: string;
  label: string;
  value: string;
}

export interface TraditionalApproach {
  description?: string; // Keep for fallback/generic
  painPoints?: string[]; // Keep for fallback/generic
  contextualDescriptions?: ContextualContent[];
  contextualPainPoints?: ContextualContent[];
  contextualConstraints?: ContextualContent[]; // New field for constraints
}

export interface AgenticApproach {
  description?: string; // Keep for fallback/generic
  benefits?: string[]; // Keep for fallback/generic
  metrics?: { label: string; value: string }[]; // Keep for fallback/generic
  contextualDescriptions?: ContextualContent[];
  contextualBenefits?: ContextualContent[];
  contextualMetrics?: ContextualMetric[];
}

export interface Capability {
  // ... existing fields ...
  traditionalApproach: TraditionalApproach;
  agenticApproach: AgenticApproach;
}
```

### Step 2: Enrich Domain-Specific JSON Data Files with Contextual Content ✅

This step involves a significant data entry effort by the user to define industry-specific content.

**Files:** All `*.json` files within `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/capabilities/` that contain capability definitions.

**Action:**
1.  For each capability, identify content within `traditionalApproach` and `agenticApproach` that can be made industry-specific.
2.  Replace generic `description`, `painPoints`, `benefits`, and `metrics` with their `contextual` counterparts where appropriate. Generic versions can be retained as fallbacks.

**Example Modification (e.g., in `legal-compliance.json` for "Contract Lifecycle Management"):**

```json
{
  "id": "capability-contract-lifecycle-management-legal",
  "label": "Contract Lifecycle Management (CLM)",
  "traditionalApproach": {
    "description": "Generic description of traditional CLM...",
    "painPoints": [
      "No centralized repository",
      "Version control chaos"
    ],
    "contextualConstraints": [
      {
        "industry": "Retail",
        "content": "Massive revenue leakage from missed co-op/vendor rebate terms and store lease renewals."
      },
      {
        "industry": "Travel",
        "content": "Inability to track complex supplier/GDS agreements and commission structures, leading to payment disputes."
      }
    ]
  },
  "agenticApproach": {
    "description": "Generic description of agentic CLM...",
    "benefits": [
      "Automated contract generation",
      "Real-time compliance monitoring"
    ],
    "contextualBenefits": [
      {
        "industry": "Retail",
        "content": "Automated identification of vendor rebate opportunities, increasing profitability by 5%."
      },
      {
        "industry": "Travel",
        "content": "Real-time reconciliation of GDS commissions, reducing payment disputes by 30%."
      }
    ],
    "contextualMetrics": [
      {
        "industry": "Retail",
        "label": "Contract Cycle Time",
        "value": "50% faster"
      },
      {
        "industry": "Travel",
        "label": "Compliance Risk",
        "value": "Reduced by 40%"
      }
    ]
  }
}
```

### Step 3: Update `applyFilters.ts` to Select Contextual Content ✅

Modified the `applyFilters.ts` utility to dynamically select and prioritize contextual content based on the active `industry` filter. If no specific contextual content is found for the active industry, it should fall back to the generic content.

**File:** `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/utils/applyFilters.ts`

**Action:**
1.  Read the `applyFilters.ts` file to understand its current logic.
2.  Implemented logic to check for `contextualDescriptions`, `contextualPainPoints`, `contextualBenefits`, `contextualMetrics`, etc.
3.  If an `industry` filter is active, iterate through the contextual arrays and return the `content` or `label`/`value` that matches the active `industry`.
4.  If no match is found for the active `industry`, or if no `industry` filter is active, fall back to the generic `description`, `painPoints`, `benefits`, or `metrics` fields.

### Step 4: Update UI Components to Render Contextual Content

Modify the `ComparisonView` and any other relevant UI components to display the selected contextual content.

**Files:**
*   `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/components/CommerceCapabilitiesMap.tsx` (or similar components that render capability details)
*   `/Users/nino/Workspace/02-local-dev/sites/agentic-commerce-narrator/data/components/CapabilityExplorer/ComparisonView.tsx`

**Action:**
1.  Update these components to receive and render the new contextual data structures.
2.  Ensure the rendering logic correctly displays the chosen contextual content (or falls back to generic) based on the active filters.

---

## Next Steps After Enrichment

1.  **Data Validation:** Implement scripts or manual checks to ensure the enriched JSON data conforms to the updated TypeScript schemas.
2.  **Testing:** Develop or update unit and integration tests for `applyFilters.ts` and UI components to verify that contextual content is correctly filtered and displayed.
3.  **Performance Testing:** Re-evaluate application performance, especially for initial load and filter application, to ensure the added data complexity does not degrade the user experience.
4.  **User Documentation:** Update any internal documentation for content creators on how to add and manage `relatedCapabilities` and contextual content.
