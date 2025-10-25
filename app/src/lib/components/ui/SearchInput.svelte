<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		onSearch: (query: string) => void;
		onClear?: () => void;
		debounceMs?: number;
		class?: string;
	}

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		onSearch,
		onClear,
		debounceMs = 150,
		class: className = ''
	}: Props = $props();

	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	let inputElement: HTMLInputElement;

	// Debounced search handler
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(() => {
			onSearch(value);
		}, debounceMs);
	}

	// Clear search
	function handleClear() {
		value = '';
		onSearch('');
		if (onClear) onClear();
		inputElement?.focus();
	}

	// Cleanup on unmount
	onMount(() => {
		return () => {
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
		};
	});
</script>

<div class="relative {className}">
	<div class="relative">
		<!-- Search Icon -->
		<div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
			<svg
				class="w-5 h-5 text-traditional-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>

		<!-- Input -->
		<input
			bind:this={inputElement}
			type="text"
			{value}
			{placeholder}
			oninput={handleInput}
			class="w-full pl-10 pr-10 py-2 text-sm border border-traditional-300 rounded-lg
				focus:outline-none focus:ring-2 focus:ring-agentic-500 focus:border-transparent
				transition-shadow"
		/>

		<!-- Clear Button -->
		{#if value}
			<button
				onclick={handleClear}
				class="absolute right-3 top-1/2 -translate-y-1/2 text-traditional-400
					hover:text-traditional-600 transition-colors"
				aria-label="Clear search"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/if}
	</div>
</div>
