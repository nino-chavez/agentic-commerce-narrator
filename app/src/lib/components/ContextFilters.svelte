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

	{#if uiState.hasActiveFilters}
		<button
			onclick={() => uiState.clearFilters()}
			class="text-sm text-traditional-600 hover:text-traditional-900 underline transition-colors"
		>
			Clear filters
		</button>
	{/if}
</div>
