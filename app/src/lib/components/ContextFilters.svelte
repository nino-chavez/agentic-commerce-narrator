<script lang="ts">
	import { uiState } from '$lib/stores/uiStore.svelte';
	import FilterDropdown from './ui/FilterDropdown.svelte';

	// Industry options from the data model
	const industryOptions = [
		{ value: 'Retail', label: 'Retail' },
		{ value: 'Grocery', label: 'Grocery' },
		{ value: 'Travel', label: 'Travel' },
		{ value: 'QSR', label: 'Quick Service Restaurant (QSR)' },
		{ value: 'Hospitality', label: 'Hospitality' }
	];

	// Persona options (common C-level and VP roles)
	const personaOptions = [
		{ value: 'CMO', label: 'Chief Marketing Officer (CMO)' },
		{ value: 'CTO', label: 'Chief Technology Officer (CTO)' },
		{ value: 'COO', label: 'Chief Operating Officer (COO)' },
		{ value: 'CFO', label: 'Chief Financial Officer (CFO)' },
		{ value: 'CEO', label: 'Chief Executive Officer (CEO)' },
		{ value: 'VP-Operations', label: 'VP of Operations' },
		{ value: 'VP-Supply-Chain', label: 'VP of Supply Chain' },
		{ value: 'VP-Merchandising', label: 'VP of Merchandising' },
		{ value: 'VP-Sales', label: 'VP of Sales' },
		{ value: 'VP-Customer-Experience', label: 'VP of Customer Experience' }
	];

	function handleIndustryChange(value: string) {
		uiState.setIndustryFilter(value);
	}

	function handlePersonaChange(value: string) {
		uiState.setPersonaFilter(value);
	}
</script>

<div class="flex items-center gap-3">
	<div class="flex items-center gap-2">
		<FilterDropdown
			label="Industry"
			options={industryOptions}
			bind:selected={uiState.selectedIndustry}
			onSelect={handleIndustryChange}
			placeholder="All Industries"
		/>

		<FilterDropdown
			label="Persona"
			options={personaOptions}
			bind:selected={uiState.selectedPersona}
			onSelect={handlePersonaChange}
			placeholder="All Personas"
		/>
	</div>

	{#if uiState.hasActiveFilters}
		<div class="flex items-center gap-2 px-3 py-1.5 bg-agentic-50 border border-agentic-200 rounded-lg">
			<div class="flex items-center gap-1.5">
				<svg class="w-3.5 h-3.5 text-agentic-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
				<span class="text-xs font-medium text-agentic-700">Filters Active</span>
			</div>
			<button
				onclick={() => uiState.clearFilters()}
				class="text-xs text-agentic-600 hover:text-agentic-800 font-medium underline"
			>
				Clear
			</button>
		</div>
	{/if}
</div>
