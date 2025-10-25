<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { loadDomainsIndex, loadDomainCapabilities } from '$lib/services/graphDataLoader';
	import { uiState } from '$lib/stores/uiStore.svelte';
	import { readStateFromUrl, updateUrlState } from '$lib/utils/urlState';
	import ComparisonView from '$lib/components/ComparisonView.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import GlobalSearch from '$lib/components/GlobalSearch.svelte';
	import ContextFilters from '$lib/components/ContextFilters.svelte';
	import StoryboardIcon from '$lib/components/StoryboardIcon.svelte';
	import StoryboardPane from '$lib/components/StoryboardPane.svelte';
	import PresentationMode from '$lib/components/PresentationMode.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';

	// Load domains index
	const domainsQuery = createQuery(() => ({
		queryKey: ['domains'],
		queryFn: loadDomainsIndex,
		staleTime: Infinity // Domain list never changes during a session
	}));

	// Sync URL state to UI state on mount and page changes
	$effect(() => {
		const urlState = readStateFromUrl();
		if (urlState.domain) uiState.selectDomain(urlState.domain);
		if (urlState.capability) uiState.selectCapability(urlState.capability);
		if (urlState.mode) uiState.setComparisonMode(urlState.mode);
		if (urlState.benchmarks !== undefined) uiState.showBenchmarks = urlState.benchmarks;
		if (urlState.projections !== undefined) uiState.showProjections = urlState.projections;
		if (urlState.industry) uiState.setIndustryFilter(urlState.industry);
		if (urlState.persona) uiState.setPersonaFilter(urlState.persona);
		if (urlState.storyboard) uiState.setFrames(urlState.storyboard);
	});

	// Sync UI state changes back to URL
	$effect(() => {
		updateUrlState({
			domain: uiState.selectedDomainId || undefined,
			capability: uiState.selectedCapabilityId || undefined,
			mode: uiState.comparisonMode,
			benchmarks: uiState.showBenchmarks,
			projections: uiState.showProjections,
			industry: uiState.selectedIndustry || undefined,
			persona: uiState.selectedPersona || undefined,
			storyboard: uiState.storyboardFrames.length > 0 ? uiState.storyboardFrames : undefined
		}, true);
	});

	// Build breadcrumb navigation
	const breadcrumbItems = $derived(() => {
		const items = [
			{
				label: 'Home',
				onClick: () => uiState.clearSelection(),
				isActive: !uiState.selectedDomainId
			}
		];

		if (uiState.selectedDomainId && domainsQuery.data) {
			const domain = domainsQuery.data.find((d) => d.id === uiState.selectedDomainId);
			if (domain) {
				items.push({
					label: domain.label,
					onClick: () => uiState.clearCapability(),
					isActive: !uiState.selectedCapabilityId
				});
			}
		}

		// Capability name will be added by ComparisonView

		return items;
	});

	// Keyboard shortcut for command palette (Cmd+K / Ctrl+K)
	onMount(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				uiState.toggleCommandPalette();
			}
		};

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="flex flex-col h-screen">
	<!-- Header -->
	<header class="border-b border-traditional-200 bg-white px-6 py-4">
		<!-- Top Row: Title, Search, Command Palette -->
		<div class="flex items-center justify-between gap-6 mb-4">
			<div class="flex-shrink-0">
				<h1 class="text-2xl font-bold text-traditional-900">
					Commerce Transformation Navigator
				</h1>
				<p class="text-sm text-traditional-600 mt-1">
					Traditional Operating Models → Agentic Commerce
				</p>
			</div>

			<!-- Global Search -->
			<div class="flex-1 max-w-xl">
				<GlobalSearch />
			</div>

			<div class="flex items-center gap-2">
				<StoryboardIcon />
				<Button variant="secondary" size="sm" onclick={() => uiState.openCommandPalette()}>
					<span class="flex items-center gap-2">
						<kbd class="px-2 py-1 text-xs bg-traditional-200 rounded">⌘K</kbd>
					</span>
				</Button>
			</div>
		</div>

		<!-- Bottom Row: Context Filters and Breadcrumbs -->
		<div class="flex items-center justify-between">
			<ContextFilters />

			{#if breadcrumbItems().length > 1}
				<Breadcrumbs items={breadcrumbItems()} />
			{/if}
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1 overflow-auto p-6">
		{#if domainsQuery.isLoading}
			<div class="flex items-center justify-center h-full">
				<div class="text-traditional-500">Loading domains...</div>
			</div>
		{:else if domainsQuery.error}
			<div class="flex items-center justify-center h-full">
				<div class="text-red-600">Error: {domainsQuery.error.message}</div>
			</div>
		{:else if domainsQuery.data}
			<div class="max-w-6xl mx-auto">
				{#if !uiState.selectedDomainId}
					<!-- Domain Selection View -->
					<div>
						<h2 class="text-xl font-semibold text-traditional-800 mb-4">
							Select a Domain to Begin
						</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{#each domainsQuery.data as domain, index}
								<div
									class="stagger-item"
									style="animation-delay: {index * 0.05}s"
								>
									<Card
										variant="neutral"
										interactive={true}
										class="cursor-pointer"
									>
										<button onclick={() => uiState.selectDomain(domain.id)} class="text-left w-full">
											<h3 class="font-semibold text-traditional-900 mb-2">{domain.label}</h3>
											<p class="text-sm text-traditional-600">{domain.description}</p>
											<div class="mt-3 flex items-center gap-2">
												<Badge variant="info" size="sm">{domain.capabilityCount} capabilities</Badge>
											</div>
										</button>
									</Card>
								</div>
							{/each}
						</div>
					</div>
				{:else}
					<!-- Selected Domain View -->
					<div>
						<div class="mb-6">
							<Button variant="ghost" size="sm" onclick={() => uiState.clearSelection()}>
								← Back to Domains
							</Button>
						</div>

						<ComparisonView
							domainId={uiState.selectedDomainId}
							domainName={domainsQuery.data.find((d) => d.id === uiState.selectedDomainId)?.label || ''}
							breadcrumbItems={breadcrumbItems()}
						/>
					</div>
				{/if}
			</div>
		{/if}
	</main>
</div>

<!-- Command Palette -->
<CommandPalette />

<!-- Storyboard Pane -->
<StoryboardPane />

<!-- Presentation Mode -->
<PresentationMode />
