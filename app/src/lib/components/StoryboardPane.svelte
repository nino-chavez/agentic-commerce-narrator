<script lang="ts">
	import { Film, Hash, X, GripVertical, Eye, Play, Share2, Trash2 } from 'lucide-svelte';
	import { uiState } from '$lib/stores/uiStore.svelte';
	import Badge from './ui/Badge.svelte';
	import Button from './ui/Button.svelte';

	let draggedIndex = $state<number | null>(null);
	let dropTargetIndex = $state<number | null>(null);

	function handleDragStart(index: number) {
		draggedIndex = index;
	}

	function handleDragEnd() {
		draggedIndex = null;
		dropTargetIndex = null;
	}

	function handleDragOver(e: DragEvent, index: number) {
		e.preventDefault();
		dropTargetIndex = index;
	}

	function handleDrop(e: DragEvent, index: number) {
		e.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			uiState.reorderFrames(draggedIndex, index);
		}
		draggedIndex = null;
		dropTargetIndex = null;
	}

	function handleRemove(capabilityId: string) {
		uiState.removeFrame(capabilityId);
	}

	function handleViewCapability(domainId: string, capabilityId: string) {
		uiState.selectDomain(domainId);
		uiState.selectCapability(capabilityId);
		uiState.closeStoryboard();
	}

	function handleShare() {
		// Copy current URL to clipboard
		navigator.clipboard.writeText(window.location.href);
		// TODO: Add toast notification
	}
</script>

<!-- Backdrop -->
{#if uiState.storyboardOpen}
	<div
		class="fixed inset-0 bg-black/20 z-40 transition-opacity"
		onclick={() => uiState.closeStoryboard()}
		role="button"
		tabindex="-1"
		onkeydown={(e) => e.key === 'Escape' && uiState.closeStoryboard()}
	></div>
{/if}

<!-- Storyboard Sidebar -->
<div
	class="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col
		{uiState.storyboardOpen ? 'translate-x-0' : 'translate-x-full'}"
>
	<!-- Header -->
	<header class="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
		<div class="flex items-center gap-2">
			<Film size={20} class="text-gray-600" />
			<h2 class="text-base font-semibold text-gray-900">Storyboard</h2>
		</div>

		<div class="flex items-center gap-2">
			{#if uiState.frameCount > 0}
				<div
					class="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono"
				>
					<Hash size={14} />
					<span>{uiState.frameCount}</span>
				</div>
			{/if}

			<button
				onclick={() => uiState.closeStoryboard()}
				class="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
				aria-label="Close storyboard"
			>
				<X size={20} />
			</button>
		</div>
	</header>

	<!-- Frame List -->
	<div class="flex-1 overflow-y-auto p-4">
		{#if !uiState.hasFrames}
			<!-- Empty State -->
			<div class="flex flex-col items-center justify-center h-full text-center py-20 px-6">
				<Film size={48} class="text-gray-300" strokeWidth={1.5} />
				<h3 class="text-base font-semibold text-gray-700 mt-4">No frames yet</h3>
				<p class="text-sm text-gray-500 mt-2 max-w-xs">
					Add capability comparisons to build your transformation narrative
				</p>
			</div>
		{:else}
			<!-- Frame Cards -->
			<div class="space-y-3">
				{#each uiState.storyboardFrames as frame, index (frame.capabilityId)}
					<div
						draggable="true"
						ondragstart={() => handleDragStart(index)}
						ondragend={handleDragEnd}
						ondragover={(e) => handleDragOver(e, index)}
						ondrop={(e) => handleDrop(e, index)}
						role="article"
						class="group bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:border-gray-300 hover:shadow-sm transition-all duration-150
							{draggedIndex === index ? 'opacity-50' : ''}
							{dropTargetIndex === index && draggedIndex !== index
							? 'border-agentic-400 border-2 shadow-lg'
							: ''}"
					>
						<div class="flex items-start gap-3">
							<!-- Drag Handle -->
							<button
								class="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition-colors"
								aria-label="Reorder frame"
								tabindex="-1"
							>
								<GripVertical size={16} />
							</button>

							<!-- Frame Number Badge -->
							<div
								class="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono flex-shrink-0"
							>
								<Hash size={14} />
								<span>{frame.frameNumber}</span>
							</div>

							<!-- Content -->
							<div class="flex-1 min-w-0">
								<h4 class="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
									{frame.label}
								</h4>
								<p class="text-xs text-gray-500 mb-2">
									{frame.description ? frame.description.slice(0, 60) + '...' : ''}
								</p>

								<!-- TODO: Add traditional/agentic summaries when available in data -->
							</div>

							<!-- Actions (Show on Hover) -->
							<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									onclick={() => handleViewCapability(frame.domainId, frame.capabilityId)}
									class="p-1 text-gray-400 hover:text-gray-600 rounded"
									aria-label="Preview frame"
								>
									<Eye size={16} />
								</button>
								<button
									onclick={() => handleRemove(frame.capabilityId)}
									class="p-1 text-gray-400 hover:text-red-600 rounded"
									aria-label="Remove frame"
								>
									<X size={16} />
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Footer Actions -->
	{#if uiState.hasFrames}
		<footer class="border-t border-gray-200 p-4 space-y-2 bg-white">
			<!-- Primary Action: Present -->
			<button
				class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-agentic-600 text-white rounded-lg hover:bg-agentic-700 active:bg-agentic-800 font-medium text-sm transition-colors"
				onclick={() => {
					/* TODO: Implement presentation mode */
				}}
			>
				<Play size={16} />
				<span>Present ({uiState.frameCount} frames)</span>
			</button>

			<!-- Secondary Action: Share -->
			<button
				class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 font-medium text-sm transition-colors"
				onclick={handleShare}
			>
				<Share2 size={16} />
				<span>Share Storyboard</span>
			</button>

			<!-- Destructive Action: Clear -->
			<button
				class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 rounded-lg hover:bg-red-50 active:bg-red-100 font-medium text-sm transition-colors"
				onclick={() => {
					if (confirm(`Clear all ${uiState.frameCount} frames?`)) {
						uiState.clearStoryboard();
					}
				}}
			>
				<Trash2 size={16} />
				<span>Clear Storyboard</span>
			</button>
		</footer>
	{/if}
</div>
