<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		variant?: 'traditional' | 'agentic' | 'success' | 'warning' | 'error' | 'info';
		size?: 'sm' | 'md';
		class?: string;
		children?: Snippet;
	}

	let { variant = 'traditional', size = 'md', class: className = '', children }: Props = $props();

	// Base styles
	const baseStyles = 'inline-flex items-center rounded-sm font-medium';

	// Variant-specific styles
	const variantStyles = {
		traditional: 'bg-traditional-100 text-traditional-800',
		agentic: 'bg-agentic-100 text-agentic-800',
		success: 'bg-green-100 text-green-800',
		warning: 'bg-amber-100 text-amber-800',
		error: 'bg-red-100 text-red-800',
		info: 'bg-blue-100 text-blue-800'
	};

	// Size-specific styles
	const sizeStyles = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-0.5 text-sm'
	};

	const badgeClasses =
		`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
</script>

<span class={badgeClasses}>
	{@render children?.()}
</span>
