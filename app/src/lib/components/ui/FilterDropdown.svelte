<script lang="ts">
	import { onMount } from 'svelte';

	interface FilterOption {
		value: string;
		label: string;
	}

	interface Props {
		label: string;
		options: FilterOption[];
		selected?: string;
		onSelect: (value: string) => void;
		placeholder?: string;
		class?: string;
	}

	let {
		label,
		options,
		selected = $bindable(''),
		onSelect,
		placeholder = 'All',
		class: className = ''
	}: Props = $props();

	let isOpen = $state(false);
	let dropdownRef: HTMLDivElement;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(value: string) {
		selected = value;
		onSelect(value);
		isOpen = false;
	}

	function clearFilter() {
		selected = '';
		onSelect('');
		isOpen = false;
	}

	// Close dropdown when clicking outside
	onMount(() => {
		function handleClickOutside(e: MouseEvent) {
			if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
				isOpen = false;
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	// Get display label
	const displayLabel = $derived(
		selected ? options.find((opt) => opt.value === selected)?.label || placeholder : placeholder
	);
</script>

<div bind:this={dropdownRef} class="relative {className}">
	<!-- Filter Button -->
	<button
		onclick={toggleDropdown}
		class="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors
			{selected
			? 'border-agentic-500 bg-agentic-50 text-agentic-700'
			: 'border-traditional-300 bg-white text-traditional-700 hover:bg-traditional-50'}"
	>
		<span class="font-medium">{label}:</span>
		<span class={selected ? 'text-agentic-900 font-semibold' : 'text-traditional-500'}>
			{displayLabel}
		</span>
		<svg
			class="w-4 h-4 transition-transform {isOpen ? 'rotate-180' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute top-full left-0 mt-2 w-56 bg-white border border-traditional-200
				rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
		>
			<div class="py-2">
				<!-- All/Clear Option -->
				<button
					onclick={clearFilter}
					class="w-full px-4 py-2 text-left text-sm hover:bg-agentic-50 transition-colors
						{!selected ? 'bg-agentic-100 text-agentic-700 font-medium' : 'text-traditional-700'}"
				>
					{placeholder}
				</button>

				<!-- Divider -->
				<div class="border-t border-traditional-100 my-2"></div>

				<!-- Options -->
				{#each options as option (option.value)}
					<button
						onclick={() => selectOption(option.value)}
						class="w-full px-4 py-2 text-left text-sm hover:bg-agentic-50 transition-colors
							{selected === option.value
							? 'bg-agentic-100 text-agentic-700 font-medium'
							: 'text-traditional-700'}"
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
