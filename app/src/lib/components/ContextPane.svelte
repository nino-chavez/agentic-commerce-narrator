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

<div class="h-full flex flex-col border-l border-traditional-200 bg-traditional-50">
	<!-- Header -->
	<div class="p-4 border-b border-traditional-200 bg-white">
		<h3 class="font-semibold text-traditional-900">Context & Details</h3>
		<p class="text-xs text-traditional-600 mt-1">
			Deep dive into implementation
		</p>
	</div>

	<!-- Tabs -->
	<div class="border-b border-traditional-200 bg-white px-4">
		<Tabs {tabs} {activeTab} onTabChange={handleTabChange} />
	</div>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto p-4">
		{#if activeTab === 'functions'}
			<!-- Functions Tab -->
			{#key capability.id}
				<div in:fade={{ duration: 200 }}>
					<div class="mb-3">
						<div class="flex items-center gap-2 mb-2">
							<Badge variant="agentic" size="sm">
								{capability.keyFunctions.length} Key Functions
							</Badge>
						</div>
						<p class="text-xs text-traditional-600">
							Core workflows and tasks within this capability
						</p>
					</div>

					<div class="space-y-2">
						{#each capability.keyFunctions as func}
							<div class="p-3 bg-white border border-traditional-200 rounded-lg hover:border-traditional-300 transition-colors">
								<div class="font-medium text-sm text-traditional-900 mb-1">
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
				<div class="flex items-center justify-center py-8">
					<div class="text-sm text-traditional-500">Loading agents...</div>
				</div>
			{:else if agentsQuery.error}
				<div class="text-center py-8 text-red-600 text-sm">
					Error loading agents: {agentsQuery.error.message}
				</div>
			{:else if agentsQuery.data}
				{#key capability.id}
					<div in:fade={{ duration: 200 }}>
						<div class="mb-3">
							<Badge variant="agentic" size="sm">
								{agentsQuery.data.length} Agents
							</Badge>
							<p class="text-xs text-traditional-600 mt-2">
								AI agents automating this capability
							</p>
						</div>

						{#if agentsQuery.data.length === 0}
							<div class="text-center py-8 text-traditional-500 text-sm">
								No agents defined for this capability
							</div>
						{:else}
							<div class="space-y-3">
								<!-- Orchestrator Agents -->
								{#if agentsByRole.orchestrator.length > 0}
									<div>
										<div class="text-xs font-semibold text-purple-700 mb-2">
											Orchestrators ({agentsByRole.orchestrator.length})
										</div>
										<div class="space-y-2">
											{#each agentsByRole.orchestrator as agent}
												<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg">
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
										<div class="text-xs font-semibold text-green-700 mb-2">
											Super Agents ({agentsByRole.super.length})
										</div>
										<div class="space-y-2">
											{#each agentsByRole.super as agent}
												<div class="p-3 bg-green-50 border border-green-200 rounded-lg">
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
										<div class="text-xs font-semibold text-blue-700 mb-2">
											Utility Agents ({agentsByRole.utility.length})
										</div>
										<div class="grid grid-cols-2 gap-2">
											{#each agentsByRole.utility as agent}
												<div class="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900">
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
				<div class="flex items-center justify-center py-8">
					<div class="text-sm text-traditional-500">Loading personas...</div>
				</div>
			{:else if personasQuery.error}
				<div class="text-center py-8 text-red-600 text-sm">
					Error loading personas: {personasQuery.error.message}
				</div>
			{:else if personasQuery.data}
				{#key capability.id}
					<div in:fade={{ duration: 200 }}>
						<div class="mb-3">
							<Badge variant="info" size="sm">
								{personasQuery.data.length} Personas
							</Badge>
							<p class="text-xs text-traditional-600 mt-2">
								Who uses this capability
							</p>
						</div>

						{#if personasQuery.data.length === 0}
							<div class="text-center py-8 text-traditional-500 text-sm">
								No personas defined for this domain
							</div>
						{:else}
							<div class="space-y-2">
								{#each personasQuery.data as persona}
									<div class="p-3 bg-white border border-traditional-200 rounded-lg hover:border-traditional-300 transition-colors">
										<div class="font-medium text-sm text-traditional-900 mb-1">
											{persona.title}
										</div>
										<div class="text-xs text-traditional-600 mb-2">
											{persona.description}
										</div>
										{#if persona.responsibilities && persona.responsibilities.length > 0}
											<div class="mt-2">
												<div class="text-xs font-semibold text-traditional-700 mb-1">
													Key Responsibilities:
												</div>
												<ul class="space-y-1">
													{#each persona.responsibilities.slice(0, 3) as responsibility}
														<li class="text-xs text-traditional-600">• {responsibility}</li>
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
