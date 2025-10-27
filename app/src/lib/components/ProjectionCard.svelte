<script lang="ts">
	import type { Projection } from '$lib/services/graphDataLoader';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import MetricDisplay from '$lib/components/ui/MetricDisplay.svelte';
	import TruncatableText from '$lib/components/ui/TruncatableText.svelte';

	interface Props {
		projection: Projection;
	}

	let { projection }: Props = $props();
</script>

<Card variant="agentic" interactive={false} class="border-l-4 border-l-agentic-500">
	<div class="flex items-start justify-between mb-4">
		<div class="flex-1">
			<Badge variant="agentic" size="sm" class="mb-3">Agentic</Badge>
			<h4 class="font-semibold text-agentic-900 text-base mb-4">{projection.metric}</h4>
		</div>
	</div>

	<div class="mb-4">
		<MetricDisplay value={projection.value} size="lg" semanticColor="info" />
	</div>

	<div class="mb-4">
		<TruncatableText
			text={projection.basis}
			maxLength={120}
			class="text-sm text-agentic-700"
		/>
	</div>

	{#if projection.sourceBenchmark}
		<div class="pt-3 border-t border-agentic-200">
			<div class="flex items-start gap-2">
				<span class="text-xs font-medium text-agentic-600 flex-shrink-0">Source Benchmark:</span>
				<TruncatableText
					text={projection.sourceBenchmark}
					maxLength={80}
					class="text-xs text-agentic-800 font-medium"
				/>
			</div>
		</div>
	{/if}
</Card>
