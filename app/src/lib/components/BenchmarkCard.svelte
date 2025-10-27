<script lang="ts">
	import type { Benchmark } from '$lib/services/graphDataLoader';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import MetricDisplay from '$lib/components/ui/MetricDisplay.svelte';
	import TruncatableText from '$lib/components/ui/TruncatableText.svelte';

	interface Props {
		benchmark: Benchmark;
	}

	let { benchmark }: Props = $props();
</script>

<Card variant="traditional" interactive={false} class="border-l-4 border-l-traditional-500">
	<div class="flex items-start justify-between mb-4">
		<div class="flex-1">
			<Badge variant="traditional" size="sm" class="mb-3">Traditional</Badge>
			<h4 class="font-semibold text-traditional-900 text-base mb-4">{benchmark.metric}</h4>
		</div>
	</div>

	<div class="mb-4">
		<MetricDisplay value={benchmark.value} size="lg" />
	</div>

	<div class="pt-3 border-t border-traditional-200">
		<div class="flex items-start gap-2">
			<span class="text-xs font-medium text-traditional-600 flex-shrink-0">Source:</span>
			<TruncatableText
				text={benchmark.source}
				maxLength={100}
				class="text-xs text-traditional-700"
			/>
		</div>
	</div>
</Card>
