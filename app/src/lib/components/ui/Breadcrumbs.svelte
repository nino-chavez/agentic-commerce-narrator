<script lang="ts">
	interface BreadcrumbItem {
		label: string;
		onClick?: () => void;
		isActive?: boolean;
	}

	interface Props {
		items: BreadcrumbItem[];
		class?: string;
	}

	let { items, class: className = '' }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm {className}">
	{#each items as item, index}
		{#if index > 0}
			<svg
				class="w-4 h-4 text-traditional-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"
				/>
			</svg>
		{/if}

		{#if item.isActive}
			<span class="text-traditional-900 font-medium" aria-current="page">
				{item.label}
			</span>
		{:else if item.onClick}
			<button
				onclick={item.onClick}
				class="text-traditional-600 hover:text-agentic-600 hover:underline transition-colors duration-150"
			>
				{item.label}
			</button>
		{:else}
			<span class="text-traditional-600">
				{item.label}
			</span>
		{/if}
	{/each}
</nav>
