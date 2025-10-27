<script lang="ts">
	import { onMount } from 'svelte';
	import { search, type SearchResult } from '$lib/services/searchService';
	import { uiState } from '$lib/stores/uiStore.svelte';
	import SearchInput from './ui/SearchInput.svelte';

	let searchQuery = $state('');
	let searchResults = $state<SearchResult[]>([]);
	let showResults = $state(false);
	let selectedIndex = $state(0);
	let isSearching = $state(false);

	// Perform search
	async function handleSearch(query: string) {
		searchQuery = query;

		if (!query || query.trim().length < 2) {
			searchResults = [];
			showResults = false;
			return;
		}

		isSearching = true;
		try {
			const results = await search(query, 10);
			searchResults = results;
			showResults = results.length > 0;
			selectedIndex = 0;
		} catch (error) {
			console.error('Search error:', error);
			searchResults = [];
		} finally {
			isSearching = false;
		}
	}

	// Handle result selection
	function selectResult(result: SearchResult) {
		if (result.capabilityId) {
			// Navigate to the capability
			const capability = result.capabilityId;

			// Extract domain from capability ID (format: capability-{domain}-{name})
			const parts = capability.split('-');
			if (parts.length >= 3) {
				const domainId = `domain-${parts[1]}-${parts[2]}`;
				uiState.selectDomain(domainId);
				uiState.selectCapability(capability);
			} else {
				// Fallback: just select the capability
				uiState.selectCapability(capability);
			}
		}

		// Clear search
		searchQuery = '';
		searchResults = [];
		showResults = false;
	}

	// Keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (!showResults || searchResults.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = (selectedIndex + 1) % searchResults.length;
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = (selectedIndex - 1 + searchResults.length) % searchResults.length;
				break;
			case 'Enter':
				e.preventDefault();
				if (searchResults[selectedIndex]) {
					selectResult(searchResults[selectedIndex]);
				}
				break;
			case 'Escape':
				e.preventDefault();
				showResults = false;
				searchQuery = '';
				break;
		}
	}

	// Handle clear
	function handleClear() {
		searchResults = [];
		showResults = false;
		selectedIndex = 0;
	}

	// Close results when clicking outside
	let containerRef: HTMLDivElement;

	onMount(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef && !containerRef.contains(e.target as Node)) {
				showResults = false;
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div bind:this={containerRef} class="relative w-full max-w-md">
	<SearchInput
		bind:value={searchQuery}
		placeholder="Search by capability, metric, or keyword..."
		onSearch={handleSearch}
		onClear={handleClear}
		debounceMs={150}
	/>

	{#if showResults}
		<div
			class="absolute top-full left-0 right-0 mt-2 bg-white border border-traditional-200
				rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
		>
			{#if isSearching}
				<div class="p-4 text-center text-traditional-500 text-sm">Searching...</div>
			{:else if searchResults.length === 0}
				<div class="p-4 text-center text-traditional-500 text-sm">
					No results found for "{searchQuery}"
				</div>
			{:else}
				<div class="py-2">
					{#each searchResults as result, index (result.id)}
						<button
							onclick={() => selectResult(result)}
							class="w-full px-4 py-3 text-left hover:bg-agentic-50 transition-colors
								{index === selectedIndex ? 'bg-agentic-100' : ''}"
						>
							<div class="flex items-start gap-3">
								<!-- Type Badge -->
								<div class="flex-shrink-0 mt-0.5">
									{#if result.type === 'capability'}
										<div
											class="px-2 py-0.5 text-xs font-medium rounded bg-agentic-100 text-agentic-700"
										>
											Capability
										</div>
									{:else if result.type === 'benchmark'}
										<div
											class="px-2 py-0.5 text-xs font-medium rounded bg-traditional-100 text-traditional-700"
										>
											Benchmark
										</div>
									{:else}
										<div
											class="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700"
										>
											Projection
										</div>
									{/if}
								</div>

								<!-- Content -->
								<div class="flex-1 min-w-0">
									<div class="font-medium text-traditional-900 text-sm mb-0.5">
										{result.title}
									</div>
									<div class="text-xs text-traditional-600 mb-1 line-clamp-2">
										{result.description}
									</div>
									<div class="text-xs text-traditional-500">
										{result.domain}
									</div>
								</div>
							</div>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
