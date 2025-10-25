<script lang="ts">
	import type { Projection } from '$lib/services/graphDataLoader';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import MetricDisplay from '$lib/components/ui/MetricDisplay.svelte';

	interface Props {
		projection: Projection;
	}

	let { projection }: Props = $props();
</script>

<Card variant="agentic" interactive={false}>
	<div class="flex items-start justify-between mb-3">
		<div class="flex-1">
			<Badge variant="agentic" size="sm" class="mb-2">Agentic</Badge>
			<h4 class="font-semibold text-agentic-900">{projection.metric}</h4>
		</div>
		<MetricDisplay value={projection.value} size="sm" semanticColor="info" />
	</div>

	<p class="text-sm text-agentic-700 mb-3">{projection.basis}</p>

	<div class="flex items-center gap-2">
		<span class="text-xs text-agentic-600">Source Benchmark:</span>
		<span class="text-xs font-medium text-agentic-800">{projection.sourceBenchmark}</span>
	</div>
</Card>
