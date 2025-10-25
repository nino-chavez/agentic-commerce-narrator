import { Document } from 'flexsearch';
import type { Capability, Domain, DomainsIndex } from './graphDataLoader';
import { loadDomainsIndex, loadDomainCapabilities } from './graphDataLoader';

// ============================================================================
// Search Result Types
// ============================================================================

export interface SearchResult {
	id: string;
	type: 'capability' | 'benchmark' | 'projection';
	title: string;
	description: string;
	domain: string;
	capabilityId?: string;
	score: number;
}

// ============================================================================
// FlexSearch Index
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let searchIndex: Document<any, true> | null = null;
let isIndexing = false;
let indexPromise: Promise<void> | null = null;

/**
 * Initialize FlexSearch index with all capabilities
 */
async function initializeIndex(): Promise<void> {
	if (searchIndex) return;
	if (isIndexing && indexPromise) return indexPromise;

	isIndexing = true;
	indexPromise = (async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		searchIndex = new Document<any, true>({
			document: {
				id: 'id',
				index: ['title', 'description'],
				store: ['type', 'title', 'description', 'domain', 'capabilityId', 'score']
			},
			tokenize: 'forward',
			context: true
		});

		const domainsIndex = await loadDomainsIndex();

		for (const domain of domainsIndex) {
			try {
				const capabilities = await loadDomainCapabilities(domain.id);

				for (const capability of capabilities) {
					// Index the capability itself
					searchIndex.add({
						id: `cap-${capability.id}`,
						type: 'capability',
						title: capability.label,
						description: capability.description,
						domain: domain.label,
						capabilityId: capability.id,
						score: 0
					});

					// Index each benchmark
					capability.traditionalApproach.benchmarks.forEach((benchmark, idx) => {
						searchIndex!.add({
							id: `bench-${capability.id}-${idx}`,
							type: 'benchmark',
							title: `${benchmark.metric}: ${benchmark.value}`,
							description: `Source: ${benchmark.source} (${capability.label})`,
							domain: domain.label,
							capabilityId: capability.id,
							score: 0
						});
					});

					// Index each projection
					capability.agenticApproach.projections.forEach((projection, idx) => {
						searchIndex!.add({
							id: `proj-${capability.id}-${idx}`,
							type: 'projection',
							title: `${projection.metric}: ${projection.value}`,
							description: `${projection.basis} (${capability.label})`,
							domain: domain.label,
							capabilityId: capability.id,
							score: 0
						});
					});
				}
			} catch (error) {
				console.error(`Error indexing domain ${domain.id}:`, error);
			}
		}

		isIndexing = false;
	})();

	return indexPromise;
}

/**
 * Search across all capabilities, benchmarks, and projections
 */
export async function search(query: string, limit = 20): Promise<SearchResult[]> {
	await initializeIndex();

	if (!searchIndex || !query.trim()) {
		return [];
	}

	const results = await searchIndex.search(query, limit, {
		enrich: true,
		suggest: true
	});

	// FlexSearch returns results grouped by field, flatten them
	const flatResults: SearchResult[] = [];
	const seenIds = new Set<string>();

	for (const fieldResults of results) {
		if (Array.isArray(fieldResults.result)) {
			for (const item of fieldResults.result) {
				const doc = item as unknown as SearchResult;
				if (!seenIds.has(doc.id)) {
					seenIds.add(doc.id);
					flatResults.push(doc);
				}
			}
		}
	}

	return flatResults.slice(0, limit);
}

/**
 * Preload search index (call on app initialization)
 */
export async function preloadSearchIndex(): Promise<void> {
	await initializeIndex();
}

/**
 * Clear search index (useful for testing or reloading data)
 */
export function clearSearchIndex(): void {
	searchIndex = null;
	isIndexing = false;
	indexPromise = null;
}
