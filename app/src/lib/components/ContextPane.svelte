<script lang="ts">
	import type { Capability } from '$lib/services/graphDataLoader';
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

	// Extract agent information from the capability
	const agentInfo = $derived.by(() => {
		const agents = capability.agenticApproach;
		// For now, we'll show the key functions which often reference agents
		return {
			total: capability.keyFunctions.length,
			functions: capability.keyFunctions
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
			<div>
				<div class="mb-3">
					<div class="flex items-center gap-2 mb-2">
						<Badge variant="agentic" size="sm">
							{agentInfo.total} Key Functions
						</Badge>
					</div>
					<p class="text-xs text-traditional-600">
						Core workflows and tasks within this capability
					</p>
				</div>

				<div class="space-y-2">
					{#each agentInfo.functions as func}
						<div class="p-3 bg-white border border-traditional-200 rounded-lg">
							<div class="font-medium text-sm text-traditional-900 mb-1">
								{func}
							</div>
							<div class="text-xs text-traditional-500">
								Traditional → Agentic transformation
							</div>
						</div>
					{/each}
				</div>

				{#if agentInfo.total === 0}
					<div class="text-center py-8 text-traditional-500 text-sm">
						No functions defined for this capability
					</div>
				{/if}
			</div>
		{:else if activeTab === 'agents'}
			<!-- Agents Tab -->
			<div>
				<div class="mb-3">
					<Badge variant="agentic" size="sm">
						Agentic Architecture
					</Badge>
					<p class="text-xs text-traditional-600 mt-2">
						AI agents automating this capability
					</p>
				</div>

				<div class="space-y-3">
					<!-- Orchestrator -->
					<div>
						<div class="text-xs font-semibold text-purple-700 mb-2">
							Orchestrator
						</div>
						<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg">
							<div class="font-medium text-sm text-purple-900">
								{capability.label} Orchestration Agent
							</div>
							<div class="text-xs text-purple-700 mt-1">
								Coordinates all agents within this capability
							</div>
						</div>
					</div>

					<!-- Super Agents (from key functions) -->
					<div>
						<div class="text-xs font-semibold text-green-700 mb-2">
							Super Agents
						</div>
						<div class="space-y-2">
							{#each agentInfo.functions.slice(0, 3) as func}
								<div class="p-3 bg-green-50 border border-green-200 rounded-lg">
									<div class="font-medium text-sm text-green-900">
										{func} Agent
									</div>
									<div class="text-xs text-green-700 mt-1">
										Automates {func.toLowerCase()}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Utility Agents -->
					<div>
						<div class="text-xs font-semibold text-blue-700 mb-2">
							Utility Agents
						</div>
						<div class="grid grid-cols-2 gap-2">
							{#each ['Analytics Engine', 'Data Platform', 'Notification System', 'Integration Hub'] as utility}
								<div class="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900">
									{utility}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{:else if activeTab === 'personas'}
			<!-- Personas Tab -->
			<div>
				<div class="mb-3">
					<Badge variant="info" size="sm">
						Stakeholder Roles
					</Badge>
					<p class="text-xs text-traditional-600 mt-2">
						Who uses this capability
					</p>
				</div>

				<div class="space-y-2">
					<!-- Infer personas from business models -->
					{#each capability.businessModels as model}
						<div class="p-3 bg-white border border-traditional-200 rounded-lg">
							<div class="font-medium text-sm text-traditional-900 mb-1">
								{model === 'B2C' ? 'Consumer-Facing Teams' :
								 model === 'B2B' ? 'Enterprise Sales Teams' :
								 'Cross-Functional Teams'}
							</div>
							<div class="text-xs text-traditional-600 mb-2">
								{model} business model stakeholders
							</div>
							<div class="flex flex-wrap gap-1">
								{#if model === 'B2C'}
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">CMO</div>
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">VP Marketing</div>
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">VP Customer Experience</div>
								{:else if model === 'B2B'}
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">VP Sales</div>
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">Account Manager</div>
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">CFO</div>
								{:else}
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">COO</div>
									<div class="px-2 py-1 bg-agentic-100 text-agentic-700 text-xs rounded">CTO</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				{#if capability.businessModels.length === 0}
					<div class="text-center py-8 text-traditional-500 text-sm">
						No personas defined for this capability
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
