<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus, Check } from 'lucide-svelte';
	import type { Capability } from '$lib/services/graphDataLoader';
	import { loadDomainCapabilities } from '$lib/services/graphDataLoader';
	import { uiState } from '$lib/stores/uiStore.svelte';
	import BenchmarkCard from './BenchmarkCard.svelte';
	import ProjectionCard from './ProjectionCard.svelte';
	import ContextPane from './ContextPane.svelte';
	import Breadcrumbs from './ui/Breadcrumbs.svelte';

	interface BreadcrumbItem {
		label: string;
		onClick?: () => void;
		isActive?: boolean;
	}

	interface Props {
		domainId: string;
		domainName: string;
		breadcrumbItems: BreadcrumbItem[];
	}

	let { domainId, domainName, breadcrumbItems }: Props = $props();

	// Load capabilities for the selected domain
	const capabilitiesQuery = createQuery(() => ({
		queryKey: ['capabilities', domainId],
		queryFn: () => loadDomainCapabilities(domainId),
		enabled: !!domainId,
		staleTime: 10 * 60 * 1000 // 10 minutes - capability data is static
	}));

	// Filter capabilities based on active filters
	const filteredCapabilities = $derived.by(() => {
		if (!capabilitiesQuery.data) return [];

		let capabilities = capabilitiesQuery.data;

		// Filter by industry
		if (uiState.selectedIndustry) {
			capabilities = capabilities.filter((cap) =>
				cap.industries.includes(uiState.selectedIndustry)
			);
		}

		// Filter by persona (check businessModels)
		// Persona filter works by matching business models in capability data
		// Each persona is associated with certain business contexts (B2B, B2C, D2C, etc.)
		if (uiState.selectedPersona) {
			// Map personas to expected business model patterns
			const personaBusinessModelMap: Record<string, string[]> = {
				'CMO': ['B2C', 'D2C', 'B2B'],
				'CTO': ['B2B', 'B2C', 'D2C'],
				'COO': ['B2B', 'B2C', 'Omnichannel'],
				'CFO': ['B2B', 'B2C', 'D2C'],
				'CEO': ['B2B', 'B2C', 'D2C', 'Omnichannel'],
				'VP-Operations': ['B2B', 'B2C', 'Omnichannel'],
				'VP-Supply-Chain': ['B2B', 'B2C', 'Omnichannel'],
				'VP-Merchandising': ['B2C', 'Omnichannel'],
				'VP-Sales': ['B2B', 'B2C', 'D2C'],
				'VP-Customer-Experience': ['B2C', 'D2C', 'Omnichannel']
			};

			const relevantModels = personaBusinessModelMap[uiState.selectedPersona] || [];

			// If persona has associated business models, filter by them
			if (relevantModels.length > 0) {
				capabilities = capabilities.filter((cap) =>
					cap.businessModels.some((model: string) => relevantModels.includes(model))
				);
			}
		}

		return capabilities;
	});

	// Get selected capability if one is selected
	const selectedCapability = $derived(
		filteredCapabilities.find((cap) => cap.id === uiState.selectedCapabilityId)
	);

	// Build complete breadcrumbs including capability if selected
	const completeBreadcrumbs = $derived.by(() => {
		const crumbs = [...breadcrumbItems];
		if (selectedCapability) {
			crumbs.push({
				label: selectedCapability.name,
				isActive: true
			});
		}
		return crumbs;
	});
</script>

<div>
	{#if capabilitiesQuery.isLoading}
		<div class="flex items-center justify-center py-12">
			<div class="text-traditional-500">Loading capabilities...</div>
		</div>
	{:else if capabilitiesQuery.error}
		<div class="flex items-center justify-center py-12">
			<div class="text-red-600">Error: {capabilitiesQuery.error.message}</div>
		</div>
	{:else if capabilitiesQuery.data}
		{#if !uiState.selectedCapabilityId}
			<!-- Capability Selection Grid -->
			<div>
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center gap-3">
						<h3 class="text-lg font-semibold text-traditional-800">
							Select a Capability from {domainName}
						</h3>
						{#if uiState.hasActiveFilters}
							<div class="px-3 py-1 bg-agentic-100 text-agentic-700 text-xs font-medium rounded-full border border-agentic-300">
								{filteredCapabilities.length} of {capabilitiesQuery.data?.length || 0} capabilities
							</div>
						{/if}
					</div>
					{#if !uiState.hasActiveFilters && capabilitiesQuery.data}
						<div class="text-sm text-traditional-500">
							{capabilitiesQuery.data.length} capabilities
						</div>
					{/if}
				</div>

				{#if filteredCapabilities.length === 0}
					<div class="flex flex-col items-center justify-center py-12 text-center">
						<div class="text-traditional-500 mb-2">
							No capabilities match the selected filters
						</div>
						<button
							onclick={() => uiState.clearFilters()}
							class="text-sm text-agentic-600 hover:text-agentic-700 underline"
						>
							Clear filters to see all capabilities
						</button>
					</div>
				{:else}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each filteredCapabilities as capability}
						<div class="relative group">
							<button
								onclick={() => uiState.selectCapability(capability.id)}
								class="w-full p-5 border border-traditional-200 rounded-lg hover:border-agentic-400
									hover:bg-agentic-50 transition-colors text-left"
							>
								<h4 class="font-semibold text-traditional-900 mb-2">{capability.label}</h4>
								<p class="text-sm text-traditional-600 mb-3">{capability.description}</p>
								<div class="flex gap-4 text-xs text-traditional-500">
									<span>{capability.traditionalApproach.benchmarks.length} benchmarks</span>
									<span>{capability.agenticApproach.projections.length} projections</span>
								</div>
							</button>

							<!-- Add to Storyboard Button -->
							<button
								onclick={(e) => {
									e.stopPropagation();
									uiState.addFrame({
										capabilityId: capability.id,
										domainId: domainId,
										label: capability.label,
										description: capability.description,
										traditionalSummary: capability.traditionalApproach.description,
										agenticSummary: capability.agenticApproach.description
									});
								}}
								disabled={uiState.isInStoryboard(capability.id)}
								class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity
									px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5
									{uiState.isInStoryboard(capability.id)
										? 'bg-green-100 text-green-700 cursor-not-allowed'
										: 'bg-agentic-500 text-white hover:bg-agentic-600'}"
								aria-label="Add to storyboard"
							>
								{#if uiState.isInStoryboard(capability.id)}
									<Check size={14} />
									<span>In Storyboard</span>
								{:else}
									<Plus size={14} />
									<span>Add Frame</span>
								{/if}
							</button>
						</div>
						{/each}
					</div>
				{/if}
			</div>
		{:else if selectedCapability}
			<!-- Capability Comparison View with Context Pane -->
			<div class="flex gap-6 h-[calc(100vh-250px)]">
				<!-- Main Comparison Area -->
				<div class="flex-1 overflow-y-auto">
					<!-- Breadcrumbs -->
					<div class="mb-4">
						<Breadcrumbs items={completeBreadcrumbs} />
					</div>

					<!-- Header -->
					<div class="mb-6">
						<div class="flex items-center justify-between mb-2">
							<button
								onclick={() => uiState.selectCapability(null)}
								class="text-sm text-agentic-600 hover:text-agentic-700"
							>
								← Back to Capabilities
							</button>
							{#if uiState.hasActiveFilters}
								<div class="flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-md">
									<svg class="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<span class="text-xs text-amber-700 font-medium">Viewing filtered capability</span>
								</div>
							{/if}
						</div>
						<h3 class="text-2xl font-bold text-traditional-900 mb-2">
							{selectedCapability.label}
						</h3>
						<p class="text-traditional-600">{selectedCapability.description}</p>
					</div>

					<!-- Controls -->
				<div class="flex gap-4 mb-6 flex-wrap">
					<button
						onclick={() => uiState.setComparisonMode('side-by-side')}
						class="px-4 py-2 text-sm rounded-lg transition-colors
							{uiState.comparisonMode === 'side-by-side'
								? 'bg-agentic-500 text-white'
								: 'bg-traditional-100 text-traditional-700 hover:bg-traditional-200'}"
					>
						Side by Side
					</button>
					<button
						onclick={() => uiState.setComparisonMode('traditional-first')}
						class="px-4 py-2 text-sm rounded-lg transition-colors
							{uiState.comparisonMode === 'traditional-first'
								? 'bg-agentic-500 text-white'
								: 'bg-traditional-100 text-traditional-700 hover:bg-traditional-200'}"
					>
						Traditional First
					</button>
					<button
						onclick={() => uiState.setComparisonMode('agentic-first')}
						class="px-4 py-2 text-sm rounded-lg transition-colors
							{uiState.comparisonMode === 'agentic-first'
								? 'bg-agentic-500 text-white'
								: 'bg-traditional-100 text-traditional-700 hover:bg-traditional-200'}"
					>
						Agentic First
					</button>

					<div class="ml-auto flex gap-3">
						<label class="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={uiState.showBenchmarks}
								onchange={() => uiState.toggleBenchmarks()}
								class="rounded"
							/>
							<span>Show Benchmarks</span>
						</label>
						<label class="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={uiState.showProjections}
								onchange={() => uiState.toggleProjections()}
								class="rounded"
							/>
							<span>Show Projections</span>
						</label>
					</div>
				</div>

				<!-- Comparison Content -->
				{#if uiState.comparisonMode === 'side-by-side'}
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<!-- Traditional Approach -->
						{#if uiState.showBenchmarks}
							<div>
								<div class="mb-4">
									<h4 class="text-lg font-semibold text-traditional-800 mb-2">
										Traditional Approach
									</h4>
									<p class="text-sm text-traditional-600 mb-3">
										{selectedCapability.traditionalApproach.description}
									</p>
									<div class="mb-3">
										<span class="text-xs font-semibold text-traditional-700">Constraints:</span>
										<ul class="mt-1 space-y-1">
											{#each selectedCapability.traditionalApproach.constraints as constraint}
												<li class="text-xs text-traditional-600">• {constraint}</li>
											{/each}
										</ul>
									</div>
								</div>
								<div class="space-y-3">
									{#each selectedCapability.traditionalApproach.benchmarks as benchmark}
										<BenchmarkCard {benchmark} />
									{/each}
								</div>
							</div>
						{/if}

						<!-- Agentic Approach -->
						{#if uiState.showProjections}
							<div>
								<div class="mb-4">
									<h4 class="text-lg font-semibold text-agentic-800 mb-2">Agentic Approach</h4>
									<p class="text-sm text-agentic-700 mb-3">
										{selectedCapability.agenticApproach.description}
									</p>
									<div class="mb-3">
										<span class="text-xs font-semibold text-agentic-700">Benefits:</span>
										<ul class="mt-1 space-y-1">
											{#each selectedCapability.agenticApproach.benefits as benefit}
												<li class="text-xs text-agentic-600">• {benefit}</li>
											{/each}
										</ul>
									</div>
								</div>
								<div class="space-y-3">
									{#each selectedCapability.agenticApproach.projections as projection}
										<ProjectionCard {projection} />
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{:else if uiState.comparisonMode === 'traditional-first'}
					<!-- Traditional First (Stacked) -->
					{#if uiState.showBenchmarks}
						<div class="mb-8">
							<h4 class="text-lg font-semibold text-traditional-800 mb-2">Traditional Approach</h4>
							<p class="text-sm text-traditional-600 mb-3">
								{selectedCapability.traditionalApproach.description}
							</p>
							<div class="mb-4">
								<span class="text-xs font-semibold text-traditional-700">Constraints:</span>
								<ul class="mt-1 space-y-1">
									{#each selectedCapability.traditionalApproach.constraints as constraint}
										<li class="text-xs text-traditional-600">• {constraint}</li>
									{/each}
								</ul>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								{#each selectedCapability.traditionalApproach.benchmarks as benchmark}
									<BenchmarkCard {benchmark} />
								{/each}
							</div>
						</div>
					{/if}

					{#if uiState.showProjections}
						<div>
							<h4 class="text-lg font-semibold text-agentic-800 mb-2">Agentic Approach</h4>
							<p class="text-sm text-agentic-700 mb-3">
								{selectedCapability.agenticApproach.description}
							</p>
							<div class="mb-4">
								<span class="text-xs font-semibold text-agentic-700">Benefits:</span>
								<ul class="mt-1 space-y-1">
									{#each selectedCapability.agenticApproach.benefits as benefit}
										<li class="text-xs text-agentic-600">• {benefit}</li>
									{/each}
								</ul>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								{#each selectedCapability.agenticApproach.projections as projection}
									<ProjectionCard {projection} />
								{/each}
							</div>
						</div>
					{/if}
				{:else}
					<!-- Agentic First (Stacked) -->
					{#if uiState.showProjections}
						<div class="mb-8">
							<h4 class="text-lg font-semibold text-agentic-800 mb-2">Agentic Approach</h4>
							<p class="text-sm text-agentic-700 mb-3">
								{selectedCapability.agenticApproach.description}
							</p>
							<div class="mb-4">
								<span class="text-xs font-semibold text-agentic-700">Benefits:</span>
								<ul class="mt-1 space-y-1">
									{#each selectedCapability.agenticApproach.benefits as benefit}
										<li class="text-xs text-agentic-600">• {benefit}</li>
									{/each}
								</ul>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								{#each selectedCapability.agenticApproach.projections as projection}
									<ProjectionCard {projection} />
								{/each}
							</div>
						</div>
					{/if}

					{#if uiState.showBenchmarks}
						<div>
							<h4 class="text-lg font-semibold text-traditional-800 mb-2">Traditional Approach</h4>
							<p class="text-sm text-traditional-600 mb-3">
								{selectedCapability.traditionalApproach.description}
							</p>
							<div class="mb-4">
								<span class="text-xs font-semibold text-traditional-700">Constraints:</span>
								<ul class="mt-1 space-y-1">
									{#each selectedCapability.traditionalApproach.constraints as constraint}
										<li class="text-xs text-traditional-600">• {constraint}</li>
									{/each}
								</ul>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
								{#each selectedCapability.traditionalApproach.benchmarks as benchmark}
									<BenchmarkCard {benchmark} />
								{/each}
							</div>
						</div>
					{/if}
				{/if}
				</div>

				<!-- Context Pane (Right Sidebar) -->
				<div class="w-80 flex-shrink-0">
					<ContextPane capability={selectedCapability} />
				</div>
			</div>
		{/if}
	{/if}
</div>
