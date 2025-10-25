<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus, Check } from 'lucide-svelte';
	import type { Capability } from '$lib/services/graphDataLoader';
	import { loadDomainCapabilities } from '$lib/services/graphDataLoader';
	import { uiState } from '$lib/stores/uiStore.svelte';
	import BenchmarkCard from './BenchmarkCard.svelte';
	import ProjectionCard from './ProjectionCard.svelte';
	import ContextPane from './ContextPane.svelte';

	interface Props {
		domainId: string;
		domainName: string;
	}

	let { domainId, domainName }: Props = $props();

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

		// Filter by persona (check if businessModels match persona context)
		// For now, we'll show all capabilities if persona is selected
		// This can be enhanced with more specific persona-to-capability mapping

		return capabilities;
	});

	// Get selected capability if one is selected
	const selectedCapability = $derived(
		filteredCapabilities.find((cap) => cap.id === uiState.selectedCapabilityId)
	);
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
					<h3 class="text-lg font-semibold text-traditional-800">
						Select a Capability from {domainName}
					</h3>
					{#if uiState.hasActiveFilters}
						<div class="text-sm text-traditional-600">
							Showing {filteredCapabilities.length} of {capabilitiesQuery.data?.length || 0} capabilities
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
					<!-- Header -->
					<div class="mb-6">
						<button
							onclick={() => uiState.selectCapability(null)}
							class="text-sm text-agentic-600 hover:text-agentic-700 mb-2"
						>
							← Back to Capabilities
						</button>
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
