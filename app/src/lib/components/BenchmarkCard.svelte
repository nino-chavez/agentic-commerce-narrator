<script lang="ts">
	import type { Benchmark } from '$lib/services/graphDataLoader';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import MetricDisplay from '$lib/components/ui/MetricDisplay.svelte';

	interface Props {
		benchmark: Benchmark;
	}

	let { benchmark }: Props = $props();
</script>

<Card variant="traditional" interactive={false}>
	<div class="flex items-start justify-between mb-3">
		<div class="flex-1">
			<Badge variant="traditional" size="sm" class="mb-2">Traditional</Badge>
			<h4 class="font-semibold text-traditional-900">{benchmark.metric}</h4>
		</div>
		<MetricDisplay value={benchmark.value} size="sm" />
	</div>

	<div class="flex items-center gap-2">
		<span class="text-xs text-traditional-500">Source:</span>
		<span class="text-xs text-traditional-600">
			{benchmark.source}
		</span>
	</div>
</Card>
