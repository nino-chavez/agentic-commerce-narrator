<script lang="ts">
	interface Props {
		text: string;
		maxLength?: number;
		class?: string;
	}

	let { text, maxLength = 120, class: className = '' }: Props = $props();

	let expanded = $state(false);

	const needsTruncation = $derived(text.length > maxLength);
	const displayText = $derived(
		expanded || !needsTruncation ? text : text.slice(0, maxLength) + '...'
	);
</script>

<div class={className}>
	<span class="leading-relaxed">
		{displayText}
	</span>
	{#if needsTruncation}
		<button
			onclick={() => (expanded = !expanded)}
			class="ml-1 text-xs font-medium text-agentic-600 hover:text-agentic-700 underline transition-colors inline-block"
		>
			{expanded ? 'Show less' : 'Read more'}
		</button>
	{/if}
</div>
