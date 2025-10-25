<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';
	import { preloadSearchIndex } from '$lib/services/searchService';
	import '../app.css';

	// Create QueryClient instance
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5, // 5 minutes
				gcTime: 1000 * 60 * 30, // 30 minutes
				refetchOnWindowFocus: false
			}
		}
	});

	// Preload search index on mount
	onMount(() => {
		preloadSearchIndex().catch((err) => {
			console.error('Failed to preload search index:', err);
		});
	});

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	<div class="min-h-screen bg-traditional-50">
		{@render children?.()}
	</div>
</QueryClientProvider>
