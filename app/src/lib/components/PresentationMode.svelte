<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { createQuery } from '@tanstack/svelte-query';
	import { X, ChevronLeft, ChevronRight, Hash } from 'lucide-svelte';
	import { uiState } from '$lib/stores/uiStore.svelte';
	import { loadDomainCapabilities } from '$lib/services/graphDataLoader';
	import BenchmarkCard from './BenchmarkCard.svelte';
	import ProjectionCard from './ProjectionCard.svelte';

	// Load capability data for current frame
	const currentCapability = $derived.by(() => {
		const frame = uiState.currentFrame;
		if (!frame) return null;

		// Create query for the domain's capabilities
		const query = createQuery(() => ({
			queryKey: ['capabilities', frame.domainId],
			queryFn: () => loadDomainCapabilities(frame.domainId),
			enabled: !!frame.domainId
		}));

		// Find the specific capability within the loaded data
		return query.data?.find((cap) => cap.id === frame.capabilityId) || null;
	});

	// Keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (!uiState.presentationMode) return;

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				uiState.exitPresentation();
				break;
			case 'ArrowLeft':
				e.preventDefault();
				uiState.previousFrame();
				break;
			case 'ArrowRight':
				e.preventDefault();
				uiState.nextFrame();
				break;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	// Computed navigation state
	const canGoNext = $derived(uiState.currentFrameIndex < uiState.frameCount - 1);
	const canGoPrevious = $derived(uiState.currentFrameIndex > 0);
	const frameProgress = $derived(`${uiState.currentFrameIndex + 1} / ${uiState.frameCount}`);
</script>

{#if uiState.presentationMode && uiState.currentFrame}
	<!-- Full-screen overlay -->
	<div
		class="fixed inset-0 bg-white z-50 flex flex-col"
		role="dialog"
		aria-modal="true"
		aria-label="Presentation Mode"
	>
		<!-- Header: Frame counter + Exit -->
		<header class="flex items-center justify-between px-8 py-4 border-b border-gray-200">
			<div class="flex items-center gap-3">
				<Hash size={20} class="text-gray-600" />
				<span class="text-sm font-mono text-gray-700">{frameProgress}</span>
				<span class="text-sm text-gray-500">•</span>
				{#key uiState.currentFrameIndex}
					<h1 class="text-lg font-semibold text-gray-900" in:fade={{ duration: 200 }}>{uiState.currentFrame.label}</h1>
				{/key}
			</div>

			<button
				onclick={() => uiState.exitPresentation()}
				class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
				aria-label="Exit presentation (ESC)"
			>
				<X size={24} />
			</button>
		</header>

		<!-- Main content area -->
		<main class="flex-1 overflow-y-auto p-8">
			{#if currentCapability}
				{#key uiState.currentFrameIndex}
					<div class="max-w-7xl mx-auto" in:fly={{ x: 200, duration: 250 }} out:fly={{ x: -200, duration: 250 }}>
						<!-- Capability description -->
						<p class="text-traditional-600 mb-8 text-lg">{currentCapability.description}</p>

						<!-- Side-by-side comparison -->
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<!-- Traditional Approach -->
						<div>
							<div class="mb-6">
								<h2 class="text-2xl font-semibold text-traditional-800 mb-3">
									Traditional Approach
								</h2>
								<p class="text-traditional-600 mb-4">
									{currentCapability.traditionalApproach.description}
								</p>
								<div class="mb-4">
									<span class="text-sm font-semibold text-traditional-700">Constraints:</span>
									<ul class="mt-2 space-y-2">
										{#each currentCapability.traditionalApproach.constraints as constraint}
											<li class="text-sm text-traditional-600">• {constraint}</li>
										{/each}
									</ul>
								</div>
							</div>
							<div class="space-y-4">
								{#each currentCapability.traditionalApproach.benchmarks as benchmark}
									<BenchmarkCard {benchmark} />
								{/each}
							</div>
						</div>

						<!-- Agentic Approach -->
						<div>
							<div class="mb-6">
								<h2 class="text-2xl font-semibold text-agentic-800 mb-3">Agentic Approach</h2>
								<p class="text-agentic-700 mb-4">
									{currentCapability.agenticApproach.description}
								</p>
								<div class="mb-4">
									<span class="text-sm font-semibold text-agentic-700">Benefits:</span>
									<ul class="mt-2 space-y-2">
										{#each currentCapability.agenticApproach.benefits as benefit}
											<li class="text-sm text-agentic-600">• {benefit}</li>
										{/each}
									</ul>
								</div>
							</div>
							<div class="space-y-4">
								{#each currentCapability.agenticApproach.projections as projection}
									<ProjectionCard {projection} />
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/key}
			{:else}
				<div class="flex items-center justify-center h-full">
					<p class="text-gray-500">Loading capability data...</p>
				</div>
			{/if}
		</main>

		<!-- Footer: Navigation controls -->
		<footer class="flex items-center justify-between px-8 py-4 border-t border-gray-200">
			<button
				onclick={() => uiState.previousFrame()}
				disabled={!canGoPrevious}
				class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors
					{canGoPrevious
						? 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
						: 'text-gray-400 cursor-not-allowed'}"
				aria-label="Previous frame (Left arrow)"
			>
				<ChevronLeft size={20} />
				<span>Previous</span>
			</button>

			<div class="flex items-center gap-4 text-sm text-gray-600">
				<kbd class="px-2 py-1 bg-gray-100 rounded border border-gray-300">←</kbd>
				<span>Previous</span>
				<kbd class="px-2 py-1 bg-gray-100 rounded border border-gray-300">→</kbd>
				<span>Next</span>
				<kbd class="px-2 py-1 bg-gray-100 rounded border border-gray-300">ESC</kbd>
				<span>Exit</span>
			</div>

			<button
				onclick={() => uiState.nextFrame()}
				disabled={!canGoNext}
				class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors
					{canGoNext
						? 'bg-agentic-600 text-white hover:bg-agentic-700 active:bg-agentic-800'
						: 'bg-gray-200 text-gray-400 cursor-not-allowed'}"
				aria-label="Next frame (Right arrow)"
			>
				<span>Next</span>
				<ChevronRight size={20} />
			</button>
		</footer>
	</div>
{/if}
