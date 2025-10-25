<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	// Base styles for all buttons
	const baseStyles =
		'font-semibold rounded-md transition-all focus:outline-none focus:ring-3 focus:ring-agentic-100 disabled:opacity-50 disabled:cursor-not-allowed';

	// Variant-specific styles
	const variantStyles = {
		primary:
			'bg-agentic-500 text-white shadow-sm hover:bg-agentic-600 hover:shadow-md hover:-translate-y-px active:bg-agentic-700 active:shadow-sm active:translate-y-0',
		secondary:
			'bg-traditional-100 text-traditional-700 shadow-sm hover:bg-traditional-200 hover:shadow-md active:bg-traditional-300',
		ghost:
			'text-traditional-700 hover:text-traditional-900 hover:bg-traditional-100 active:bg-traditional-200'
	};

	// Size-specific styles
	const sizeStyles = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	const buttonClasses =
		`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

	function handleClick(event: MouseEvent) {
		if (!disabled && onclick) {
			onclick(event);
		}
	}
</script>

<button class={buttonClasses} {disabled} onclick={handleClick}>
	{@render children?.()}
</button>
