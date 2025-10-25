<script lang="ts">
	interface Props {
		value: string | number;
		label?: string;
		trend?: string;
		trendDirection?: 'up' | 'down' | 'neutral';
		semanticColor?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	}

	let {
		value,
		label,
		trend,
		trendDirection,
		semanticColor,
		size = 'md',
		class: className = ''
	}: Props = $props();

	// Determine semantic color from trend direction if not explicitly set
	const computedSemanticColor = $derived.by(() => {
		if (semanticColor) return semanticColor;
		if (!trendDirection) return 'neutral';

		switch (trendDirection) {
			case 'up':
				return 'success';
			case 'down':
				return 'error';
			default:
				return 'neutral';
		}
	});

	// Size-specific styles for the metric value
	const sizeStyles = {
		sm: 'text-metric-lg',
		md: 'text-metric-xl',
		lg: 'text-metric-2xl',
		xl: 'text-metric-2xl'
	};

	// Semantic color styles
	const colorStyles = {
		success: 'text-semantic-success',
		warning: 'text-semantic-warning',
		error: 'text-semantic-error',
		info: 'text-semantic-info',
		neutral: 'text-traditional-900'
	};

	const metricClasses = $derived(`${sizeStyles[size]} ${colorStyles[computedSemanticColor]} ${className}`.trim());
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<span class="text-metric-md text-traditional-600">{label}</span>
	{/if}

	<div class="flex items-baseline gap-2">
		<span class={metricClasses}>
			{value}
		</span>

		{#if trend}
			<span class="text-sm {colorStyles[computedSemanticColor]}">
				{trend}
			</span>
		{/if}
	</div>
</div>
