<script lang="ts">
	interface Props {
		items: string[];
		maxVisibleItems?: number;
		label?: string;
		bulletColor?: string;
	}

	let { items, maxVisibleItems = 3, label, bulletColor = 'text-traditional-600' }: Props = $props();

	let expanded = $state(false);

	const visibleItems = $derived(expanded ? items : items.slice(0, maxVisibleItems));
	const hasMore = $derived(items.length > maxVisibleItems);
	const remainingCount = $derived(items.length - maxVisibleItems);
</script>

{#if label}
	<span class="text-xs font-semibold {bulletColor}">{label}</span>
{/if}

<ul class="mt-2 space-y-2">
	{#each visibleItems as item}
		<li class="text-xs {bulletColor} leading-relaxed">• {item}</li>
	{/each}
</ul>

{#if hasMore}
	<button
		onclick={() => (expanded = !expanded)}
		class="mt-3 text-xs font-medium text-agentic-600 hover:text-agentic-700 underline transition-colors"
	>
		{expanded ? 'Show less' : `Show ${remainingCount} more`}
	</button>
{/if}
