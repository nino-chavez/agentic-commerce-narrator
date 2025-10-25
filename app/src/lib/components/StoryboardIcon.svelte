<script lang="ts">
	import { Film } from 'lucide-svelte';
	import { uiState } from '$lib/stores/uiStore.svelte';
</script>

<button
	onclick={() => uiState.toggleStoryboard()}
	class="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
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
</button>
