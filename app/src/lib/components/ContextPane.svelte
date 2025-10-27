<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { fade, fly } from 'svelte/transition';
	import type { Capability } from '$lib/services/graphDataLoader';
	import { getAgentsForCapability, loadDomainPersonas } from '$lib/services/graphDataLoader';
	import Tabs from './ui/Tabs.svelte';
	import Badge from './ui/Badge.svelte';

	interface Props {
		capability: Capability;
	}

	let { capability }: Props = $props();

	let activeTab = $state('functions');

	const tabs = [
		{ id: 'functions', label: 'Functions' },
		{ id: 'agents', label: 'Agents' },
		{ id: 'personas', label: 'Personas' }
	];

	function handleTabChange(tabId: string) {
		activeTab = tabId;
	}

	// Load agents for this capability
	const agentsQuery = createQuery(() => ({
		queryKey: ['agents', capability.id],
		queryFn: () => getAgentsForCapability(capability.id),
		staleTime: 5 * 60 * 1000 // 5 minutes - agents don't change frequently
	}));

	// Load personas for this capability's domain
	const personasQuery = createQuery(() => ({
		queryKey: ['personas', capability.parentDomain],
		queryFn: () => loadDomainPersonas(capability.parentDomain),
		staleTime: 5 * 60 * 1000 // 5 minutes - personas don't change frequently
	}));

	// Group agents by role
	const agentsByRole = $derived.by(() => {
		if (!agentsQuery.data) return { orchestrator: [], super: [], utility: [] };
		return {
			orchestrator: agentsQuery.data.filter(a => a.role === 'orchestrator'),
			super: agentsQuery.data.filter(a => a.role === 'super'),
			utility: agentsQuery.data.filter(a => a.role === 'utility')
		};
	});
</script>

<div class="h-full flex flex-col border-l-2 border-traditional-300 bg-gradient-to-b from-white to-traditional-50">
	<!-- Header -->
	<div class="px-6 py-5 border-b-2 border-traditional-200 bg-white">
		<h3 class="text-base font-bold text-traditional-900">Context & Details</h3>
		<p class="text-xs text-traditional-600 mt-1.5">
			Deep dive into implementation
		</p>
	</div>

	<!-- Tabs -->
	<div class="border-b border-traditional-200 bg-white px-6 pt-3">
		<Tabs {tabs} {activeTab} onTabChange={handleTabChange} />
	</div>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto px-6 py-5">
		{#if activeTab === 'functions'}
			<!-- Functions Tab -->
			{#key capability.id}
				<div in:fade={{ duration: 200 }}>
					<div class="mb-6">
						<p class="text-sm text-traditional-600 leading-relaxed">
							Core workflows and tasks within this capability
						</p>
					</div>

					<div class="space-y-4">
						{#each capability.keyFunctions as func}
							<div class="p-5 bg-white border-2 border-traditional-200 rounded-lg hover:border-agentic-400 hover:shadow-md transition-all">
								<div class="font-semibold text-traditional-900 mb-2">
									{func}
								</div>
								<div class="text-xs text-traditional-500">
									Traditional → Agentic transformation
								</div>
							</div>
						{/each}
					</div>

					{#if capability.keyFunctions.length === 0}
						<div class="text-center py-8 text-traditional-500 text-sm">
							No functions defined for this capability
						</div>
					{/if}
				</div>
			{/key}
		{:else if activeTab === 'agents'}
			<!-- Agents Tab -->
			{#if agentsQuery.isLoading}
				<div class="flex flex-col items-center justify-center py-8 gap-2">
					<div class="animate-spin h-5 w-5 border-2 border-traditional-300 border-t-agentic-600 rounded-full"></div>
					<div class="text-sm text-traditional-500">Loading agents...</div>
				</div>
			{:else if agentsQuery.error}
				<div class="flex flex-col items-center justify-center py-8 text-center px-4">
					<div class="text-red-600 text-sm font-medium mb-2">
						Failed to load agents
					</div>
					<div class="text-xs text-traditional-600 mb-3">
						{agentsQuery.error.message}
					</div>
					<button
						onclick={() => agentsQuery.refetch()}
						class="text-xs text-agentic-600 hover:text-agentic-700 underline"
					>
						Try again
					</button>
				</div>
			{:else if agentsQuery.data}
				{#key capability.id}
					<div in:fade={{ duration: 200 }}>
						<div class="mb-6">
							<p class="text-sm text-traditional-600 leading-relaxed">
								AI agents automating this capability
							</p>
						</div>

						{#if agentsQuery.data.length === 0}
							<div class="flex flex-col items-center justify-center py-8 text-center px-4">
								<div class="text-traditional-500 text-sm mb-2">
									No agents defined yet
								</div>
								<div class="text-xs text-traditional-400">
									This capability hasn't been mapped to agents yet. Agent mapping is in progress.
								</div>
							</div>
						{:else}
							<div class="space-y-5">
								<!-- Orchestrator Agents -->
								{#if agentsByRole.orchestrator.length > 0}
									<div>
										<div class="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
											<span>Orchestrators</span>
											<span class="text-xs font-normal bg-purple-100 px-2 py-0.5 rounded-full">
												{agentsByRole.orchestrator.length}
											</span>
										</div>
										<div class="space-y-3">
											{#each agentsByRole.orchestrator as agent}
												<div class="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:shadow-sm transition-all">
													<div class="font-medium text-sm text-purple-900">
														{agent.label}
													</div>
													{#if agent.description}
														<div class="text-xs text-purple-700 mt-1">
															{agent.description}
														</div>
													{/if}
												</div>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Super Agents -->
								{#if agentsByRole.super.length > 0}
									<div>
										<div class="text-sm font-bold text-green-700 mb-3 flex items-center gap-2">
											<span>Super Agents</span>
											<span class="text-xs font-normal bg-green-100 px-2 py-0.5 rounded-full">
												{agentsByRole.super.length}
											</span>
										</div>
										<div class="space-y-3">
											{#each agentsByRole.super as agent}
												<div class="p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:border-green-400 hover:shadow-sm transition-all">
													<div class="font-medium text-sm text-green-900">
														{agent.label}
													</div>
													{#if agent.description}
														<div class="text-xs text-green-700 mt-1">
															{agent.description}
														</div>
													{/if}
												</div>
											{/each}
										</div>
									</div>
								{/if}

								<!-- Utility Agents -->
								{#if agentsByRole.utility.length > 0}
									<div>
										<div class="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2">
											<span>Utility Agents</span>
											<span class="text-xs font-normal bg-blue-100 px-2 py-0.5 rounded-full">
												{agentsByRole.utility.length}
											</span>
										</div>
										<div class="grid grid-cols-2 gap-2.5">
											{#each agentsByRole.utility as agent}
												<div class="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg text-sm text-blue-900 font-medium hover:border-blue-300 hover:shadow-sm transition-all">
													{agent.label}
												</div>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/key}
			{/if}
		{:else if activeTab === 'personas'}
			<!-- Personas Tab -->
			{#if personasQuery.isLoading}
				<div class="flex flex-col items-center justify-center py-8 gap-2">
					<div class="animate-spin h-5 w-5 border-2 border-traditional-300 border-t-agentic-600 rounded-full"></div>
					<div class="text-sm text-traditional-500">Loading personas...</div>
				</div>
			{:else if personasQuery.error}
				<div class="flex flex-col items-center justify-center py-8 text-center px-4">
					<div class="text-red-600 text-sm font-medium mb-2">
						Failed to load personas
					</div>
					<div class="text-xs text-traditional-600 mb-3">
						{personasQuery.error.message}
					</div>
					<button
						onclick={() => personasQuery.refetch()}
						class="text-xs text-agentic-600 hover:text-agentic-700 underline"
					>
						Try again
					</button>
				</div>
			{:else if personasQuery.data}
				{#key capability.id}
					<div in:fade={{ duration: 200 }}>
						<div class="mb-5">
							<div class="flex items-center gap-2 mb-2.5">
								<Badge variant="info" size="sm">
									{personasQuery.data.length} Personas
								</Badge>
							</div>
							<p class="text-sm text-traditional-600 leading-relaxed">
								Who uses this capability
							</p>
						</div>

						{#if personasQuery.data.length === 0}
							<div class="flex flex-col items-center justify-center py-8 text-center px-4">
								<div class="text-traditional-500 text-sm mb-2">
									No personas defined yet
								</div>
								<div class="text-xs text-traditional-400">
									Persona definitions for this domain are being developed.
								</div>
							</div>
						{:else}
							<div class="space-y-3">
								{#each personasQuery.data as persona}
									<div class="p-4 bg-white border-2 border-traditional-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all">
										<div class="font-semibold text-sm text-traditional-900 mb-2">
											{persona.title}
										</div>
										<div class="text-sm text-traditional-600 mb-3 leading-relaxed">
											{persona.description}
										</div>
										{#if persona.responsibilities && persona.responsibilities.length > 0}
											<div class="mt-3 pt-3 border-t border-traditional-100">
												<div class="text-xs font-bold text-traditional-700 mb-2">
													Key Responsibilities:
												</div>
												<ul class="space-y-1.5">
													{#each persona.responsibilities.slice(0, 3) as responsibility}
														<li class="text-xs text-traditional-600 leading-relaxed">• {responsibility}</li>
													{/each}
													{#if persona.responsibilities.length > 3}
														<li class="text-xs text-traditional-500 italic">
															+ {persona.responsibilities.length - 3} more
														</li>
													{/if}
												</ul>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/key}
			{/if}
		{/if}
	</div>
</div>
