import { Capability, ContextualContent, ContextualMetric } from '../types/graph';

export interface FilterOptions {
  industry?: string;
  domain?: string;
  businessModel?: string;
  maturityLevel?: number;
}

export function applyFilters(capabilities: Capability[], filters: FilterOptions): Capability[] {
  return capabilities.filter(capability => {
    // Industry filter
    if (filters.industry && !capability.industries.includes(filters.industry)) {
      return false;
    }

    // Domain filter
    if (filters.domain && capability.parentDomain !== filters.domain) {
      return false;
    }

    // Business model filter
    if (filters.businessModel && !capability.businessModels.includes(filters.businessModel)) {
      return false;
    }

    // Maturity level filter
    if (filters.maturityLevel !== undefined) {
      const agenticMaturity = capability.maturityIndicators?.agentic || 0;
      if (agenticMaturity < filters.maturityLevel) {
        return false;
      }
    }

    return true;
  }).map(capability => {
    // Apply contextual content selection based on active industry filter
    return selectContextualContent(capability, filters.industry);
  });
}

function selectContextualContent(capability: Capability, activeIndustry?: string): Capability {
  const selectedCapability = { ...capability };

  // Select contextual content for traditional approach
  if (selectedCapability.traditionalApproach) {
    selectedCapability.traditionalApproach = {
      ...selectedCapability.traditionalApproach,
      description: selectContextualString(
        selectedCapability.traditionalApproach.contextualDescriptions,
        selectedCapability.traditionalApproach.description,
        activeIndustry
      ),
      painPoints: selectContextualArray(
        selectedCapability.traditionalApproach.contextualPainPoints,
        selectedCapability.traditionalApproach.painPoints,
        activeIndustry
      ),
      constraints: selectContextualArray(
        selectedCapability.traditionalApproach.contextualConstraints,
        selectedCapability.traditionalApproach.constraints,
        activeIndustry
      )
    };
  }

  // Select contextual content for agentic approach
  if (selectedCapability.agenticApproach) {
    selectedCapability.agenticApproach = {
      ...selectedCapability.agenticApproach,
      description: selectContextualString(
        selectedCapability.agenticApproach.contextualDescriptions,
        selectedCapability.agenticApproach.description,
        activeIndustry
      ),
      benefits: selectContextualArray(
        selectedCapability.agenticApproach.contextualBenefits,
        selectedCapability.agenticApproach.benefits,
        activeIndustry
      ),
      metrics: selectContextualMetrics(
        selectedCapability.agenticApproach.contextualMetrics,
        selectedCapability.agenticApproach.metrics,
        activeIndustry
      )
    };
  }

  return selectedCapability;
}

function selectContextualString(
  contextualContent: ContextualContent[] | undefined,
  fallback: string | undefined,
  activeIndustry?: string
): string | undefined {
  if (!activeIndustry || !contextualContent) {
    return fallback;
  }

  const matchingContent = contextualContent.find(content => content.industry === activeIndustry);
  return matchingContent ? matchingContent.content : fallback;
}

function selectContextualArray(
  contextualContent: ContextualContent[] | undefined,
  fallback: string[] | undefined,
  activeIndustry?: string
): string[] | undefined {
  if (!activeIndustry || !contextualContent) {
    return fallback;
  }

  const matchingContent = contextualContent.find(content => content.industry === activeIndustry);
  return matchingContent ? [matchingContent.content] : fallback;
}

function selectContextualMetrics(
  contextualMetrics: ContextualMetric[] | undefined,
  fallback: { label: string; value: string }[] | undefined,
  activeIndustry?: string
): { label: string; value: string }[] | undefined {
  if (!activeIndustry || !contextualMetrics) {
    return fallback;
  }

  const matchingMetrics = contextualMetrics.filter(metric => metric.industry === activeIndustry);
  return matchingMetrics.length > 0
    ? matchingMetrics.map(metric => ({ label: metric.label, value: metric.value }))
    : fallback;
}
