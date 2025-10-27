<script lang="ts">
	import { search, type SearchResult } from '$lib/services/searchService';
	import { uiState } from '$lib/stores/uiStore.svelte';

	let query = $state('');
	let searchResults = $state<SearchResult[]>([]);
	let isSearching = $state(false);
	let selectedIndex = $state(0);

	// Debounced search
	let searchTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		query = target.value;

		if (searchTimeout) clearTimeout(searchTimeout);

		if (!query.trim()) {
			searchResults = [];
			return;
		}

		isSearching = true;
		searchTimeout = setTimeout(async () => {
			try {
				searchResults = await search(query);
				selectedIndex = 0;
			} catch (error) {
				console.error('Search error:', error);
				searchResults = [];
			} finally {
				isSearching = false;
			}
		}, 300);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			uiState.closeCommandPalette();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (event.key === 'Enter' && searchResults.length > 0) {
			event.preventDefault();
			selectResult(searchResults[selectedIndex]);
		}
	}

	function selectResult(result: SearchResult) {
		// Navigate to the capability if we have one
		if (result.capabilityId) {
			uiState.selectCapability(result.capabilityId);
			uiState.closeCommandPalette();
		}
	}

	// Focus input when palette opens
	let inputElement: HTMLInputElement | undefined = $state();
	$effect(() => {
		if (uiState.commandPaletteOpen && inputElement) {
			inputElement.focus();
		}
	});

	// Reset state when closing
	$effect(() => {
		if (!uiState.commandPaletteOpen) {
			query = '';
			searchResults = [];
			selectedIndex = 0;
		}
	});
</script>

{#if uiState.commandPaletteOpen}
	<div
		role="dialog"
		aria-modal="true"
		aria-labelledby="command-palette-title"
		tabindex="-1"
		class="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50"
		onclick={() => uiState.closeCommandPalette()}
		onkeydown={(e) => e.key === 'Escape' && uiState.closeCommandPalette()}
	>
		<div
			class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden"
			role="dialog"
			aria-labelledby="command-palette-title"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="p-4 border-b border-traditional-200">
				<h3 id="command-palette-title" class="text-lg font-semibold mb-3">Quick Search</h3>
				<input
					bind:this={inputElement}
					type="text"
					placeholder="Search by capability, metric, or keyword..."
					value={query}
					oninput={handleInput}
					onkeydown={handleKeydown}
					class="w-full px-4 py-2 border border-traditional-300 rounded-lg
						focus:outline-none focus:ring-2 focus:ring-agentic-500"
				/>
			</div>

			<!-- Results -->
			<div class="max-h-96 overflow-y-auto">
				{#if isSearching}
					<div class="p-8 text-center text-traditional-500">Searching...</div>
				{:else if query && searchResults.length === 0}
					<div class="p-8 text-center text-traditional-500">No results found</div>
				{:else if searchResults.length > 0}
					<ul class="divide-y divide-traditional-100">
						{#each searchResults as result, index}
							<li>
								<button
									onclick={() => selectResult(result)}
									class="w-full text-left p-4 hover:bg-traditional-50 transition-colors
										{index === selectedIndex ? 'bg-agentic-50' : ''}"
								>
									<div class="flex items-start justify-between">
										<div class="flex-1">
											<div class="flex items-center gap-2 mb-1">
												<span
													class="text-xs px-2 py-0.5 rounded
														{result.type === 'capability'
														? 'bg-traditional-200 text-traditional-700'
														: result.type === 'benchmark'
															? 'bg-traditional-300 text-traditional-800'
															: 'bg-agentic-200 text-agentic-800'}"
												>
													{result.type}
												</span>
												<span class="text-xs text-traditional-500">{result.domain}</span>
											</div>
											<h4 class="font-medium text-traditional-900 mb-1">{result.title}</h4>
											<p class="text-sm text-traditional-600">{result.description}</p>
										</div>
									</div>
								</button>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="p-8 text-center text-traditional-500">
						Type to search all capabilities, metrics, and transformations
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="p-3 border-t border-traditional-200 bg-traditional-50 flex gap-4 text-xs text-traditional-600">
				<div class="flex items-center gap-1">
					<kbd class="px-2 py-1 bg-white border border-traditional-300 rounded">↑↓</kbd>
					<span>Navigate</span>
				</div>
				<div class="flex items-center gap-1">
					<kbd class="px-2 py-1 bg-white border border-traditional-300 rounded">Enter</kbd>
					<span>Select</span>
				</div>
				<div class="flex items-center gap-1">
					<kbd class="px-2 py-1 bg-white border border-traditional-300 rounded">Esc</kbd>
					<span>Close</span>
				</div>
			</div>
		</div>
	</div>
{/if}
