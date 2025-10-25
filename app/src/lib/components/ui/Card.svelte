<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		variant?: 'traditional' | 'agentic' | 'neutral';
		elevated?: boolean;
		interactive?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { variant = 'neutral', elevated = false, interactive = true, class: className = '', children }: Props = $props();

	// Determine card styles based on variant
	const baseStyles = 'rounded-lg p-6 border transition-all duration-200';

	const variantStyles = {
		traditional: 'bg-traditional-50 border-traditional-300',
		agentic: 'bg-agentic-50 border-agentic-300',
		neutral: 'bg-white border-traditional-200'
	};

	const shadowStyles = elevated ? 'shadow-md-elevated' : 'shadow-sm';

	const hoverStyles = interactive
		? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
		: '';

	const borderHoverStyles = {
		traditional: interactive ? 'hover:border-traditional-400' : '',
		agentic: interactive ? 'hover:border-agentic-400' : '',
		neutral: interactive ? 'hover:border-traditional-300' : ''
	};

	const cardClasses = `${baseStyles} ${variantStyles[variant]} ${shadowStyles} ${hoverStyles} ${borderHoverStyles[variant]} ${className}`.trim();
</script>

<div class={cardClasses}>
	{@render children?.()}
</div>
