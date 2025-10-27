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
		traditional: 'bg-traditional-100 border-traditional-300',
		agentic: 'bg-agentic-100 border-agentic-300',
		neutral: 'bg-white border-traditional-200'
	};

	const shadowStyles = elevated ? 'shadow-md-elevated' : 'shadow-sm';

	const hoverStyles = interactive
		? 'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] cursor-pointer'
		: '';

	const borderHoverStyles = {
		traditional: interactive ? 'hover:border-traditional-500' : '',
		agentic: interactive ? 'hover:border-agentic-500' : '',
		neutral: interactive ? 'hover:border-agentic-300 hover:bg-gray-50' : ''
	};

	const cardClasses = `${baseStyles} ${variantStyles[variant]} ${shadowStyles} ${hoverStyles} ${borderHoverStyles[variant]} ${className}`.trim();
</script>

<div class={cardClasses}>
	{@render children?.()}
</div>
