export interface ContextualContent {
  industry: string; // e.g., "Retail", "Travel", "All"
  content: string; // For descriptions, constraints, benefits
}

export interface ContextualMetric {
  industry: string;
  label: string;
  value: string;
}

export interface ImplementationPhase {
  phase: string; // e.g., "Crawl", "Walk", "Run"
  duration: string; // e.g., "3-6 months"
  activities: string[]; // Key activities for this phase
  outcomes: string[]; // Expected outcomes
  prerequisites?: string[]; // Optional prerequisites
}

export interface TechnologyPartner {
  name: string; // e.g., "DataRobot", "Salesforce"
  category: string; // e.g., "ML Platform", "CRM", "Analytics"
  useCase: string; // How it's used in this capability
  phase?: string; // Optional: which implementation phase it's relevant for
}

export interface TraditionalApproach {
  description?: string; // Keep for fallback/generic
  painPoints?: string[]; // Keep for fallback/generic
  constraints?: string[]; // Add constraints field
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

export interface TransformationGuidance {
  quickWins: string[];
  investmentRequired: string;
  timeToValue: string;
  prerequisites: string[];
  implementationPathways?: ImplementationPhase[]; // New: phased implementation roadmap
  keyTechnologyPartners?: TechnologyPartner[]; // New: recommended technology partners
}

export interface Capability {
  id: string;
  type: string;
  level: number;
  label: string;
  description: string;
  parentDomain: string;
  industries: string[];
  businessModels: string[];
  functionCount: number;
  keyFunctions: string[];
  relatedCapabilities?: string[]; // Array of capability IDs
  traditionalApproach: TraditionalApproach;
  agenticApproach: AgenticApproach;
  maturityIndicators?: {
    traditional: number;
    agentic: number;
  };
  transformationGuidance?: TransformationGuidance;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  version: string;
}
