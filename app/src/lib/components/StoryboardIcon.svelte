<script lang="ts">
	import { Film } from 'lucide-svelte';
	import { uiState } from '$lib/stores/uiStore.svelte';
</script>

<button
	onclick={() => uiState.toggleStoryboard()}
	class="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors group"
	aria-label="Open storyboard"
>
	<Film size={20} />

	{#if uiState.hasFrames}
		<span
			class="absolute -top-1 -right-1 bg-agentic-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
		>
			{uiState.frameCount}
		</span>
	{/if}

	<!-- Tooltip -->
	<div
		class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-traditional-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
		role="tooltip"
	>
		{uiState.hasFrames ? `Presentation Storyboard (${uiState.frameCount})` : 'Presentation Storyboard'}
	</div>
</button>
