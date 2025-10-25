import { z } from 'zod';

// ============================================================================
// Zod Schemas for Runtime Validation
// ============================================================================

const BenchmarkSchema = z.object({
	id: z.string(),
	metric: z.string(),
	value: z.string(),
	source: z.string()
});

const ProjectionSchema = z.object({
	metric: z.string(),
	value: z.string(),
	basis: z.string(),
	sourceBenchmark: z.string().nullable().optional()
});

const TraditionalApproachSchema = z.object({
	description: z.string(),
	characteristics: z.array(z.string()).optional(),
	constraints: z.array(z.string()),
	benchmarks: z.array(BenchmarkSchema),
	contextualConstraints: z.array(z.object({
		industry: z.string(),
		content: z.string()
	})).optional()
});

const AgenticApproachSchema = z.object({
	description: z.string(),
	characteristics: z.array(z.string()).optional(),
	benefits: z.array(z.string()),
	projections: z.array(ProjectionSchema)
});

const CapabilitySchema = z.object({
	id: z.string(),
	type: z.string(),
	level: z.number(),
	label: z.string(),
	description: z.string(),
	parentDomain: z.string(),
	industries: z.array(z.string()),
	businessModels: z.array(z.string()),
	functionCount: z.number(),
	keyFunctions: z.array(z.string()),
	relatedCapabilities: z.array(z.string()).optional(),
	traditionalApproach: TraditionalApproachSchema,
	agenticApproach: AgenticApproachSchema
});

const DomainSchema = z.object({
	id: z.string(),
	type: z.string(),
	level: z.number(),
	label: z.string(),
	description: z.string(),
	icon: z.string(),
	color: z.string(),
	parentConcept: z.string(),
	industries: z.array(z.string()),
	capabilityCount: z.number(),
	keyMetrics: z.array(z.string()),
	createdAt: z.string(),
	updatedAt: z.string(),
	version: z.string()
});

const DomainsIndexSchema = z.array(DomainSchema);

// ============================================================================
// Types
// ============================================================================

export type Benchmark = z.infer<typeof BenchmarkSchema>;
export type Projection = z.infer<typeof ProjectionSchema>;
export type TraditionalApproach = z.infer<typeof TraditionalApproachSchema>;
export type AgenticApproach = z.infer<typeof AgenticApproachSchema>;
export type Capability = z.infer<typeof CapabilitySchema>;
export type Domain = z.infer<typeof DomainSchema>;
export type DomainsIndex = Domain[]; // Array of domains

// ============================================================================
// Domain-to-File Mapping
// ============================================================================

const DOMAIN_FILE_MAP: Record<string, string> = {
	'domain-customer-experience': 'customer-experience-marketing.json',
	'domain-sales-commerce': 'b2b-commerce.json',
	'domain-merchandising-product': 'merchandising-product.json',
	'domain-supply-chain': 'supply-chain.json',
	'domain-payments-finance': 'payments.json',
	'domain-data-analytics': 'analytics.json',
	'domain-technology-platform': 'it-operations.json',
	'domain-human-capital': 'enterprise-hr.json',
	'domain-enterprise-support': 'facilities.json',
	'domain-governance-risk': 'legal-compliance.json'
};

// ============================================================================
// Data Loading Functions
// ============================================================================

/**
 * Load the domains index from domains.json
 */
export async function loadDomainsIndex(): Promise<DomainsIndex> {
	const response = await fetch('/data/domains/domains.json');
	if (!response.ok) {
		throw new Error(`Failed to load domains index: ${response.statusText}`);
	}
	const data = await response.json();
	return DomainsIndexSchema.parse(data);
}

/**
 * Load all capabilities for a specific domain
 */
export async function loadDomainCapabilities(domainId: string): Promise<Capability[]> {
	const fileName = DOMAIN_FILE_MAP[domainId];
	if (!fileName) {
		throw new Error(`Unknown domain ID: ${domainId}`);
	}

	const response = await fetch(`/data/capabilities/${fileName}`);
	if (!response.ok) {
		throw new Error(`Failed to load capabilities for ${domainId}: ${response.statusText}`);
	}

	const data = await response.json();

	// The capability files are arrays directly
	if (!Array.isArray(data)) {
		throw new Error(`Invalid capability file format for ${domainId}: expected array, got ${typeof data}`);
	}

	return data.map((cap: unknown) => CapabilitySchema.parse(cap));
}

/**
 * Get a specific capability by ID
 * Searches across all domains (inefficient for large datasets, consider caching)
 */
export async function getCapabilityById(capabilityId: string): Promise<Capability | null> {
	const domainsIndex = await loadDomainsIndex();

	for (const domain of domainsIndex) {
		const capabilities = await loadDomainCapabilities(domain.id);
		const capability = capabilities.find((cap) => cap.id === capabilityId);
		if (capability) {
			return capability;
		}
	}

	return null;
}

/**
 * Get domain by ID
 */
export async function getDomainById(domainId: string): Promise<Domain | null> {
	const domainsIndex = await loadDomainsIndex();
	return domainsIndex.find((domain) => domain.id === domainId) || null;
}
