<script lang="ts">
	interface Tab {
		id: string;
		label: string;
	}

	interface Props {
		tabs: Tab[];
		activeTab: string;
		onTabChange: (tabId: string) => void;
		class?: string;
	}

	let { tabs, activeTab, onTabChange, class: className = '' }: Props = $props();
</script>

<div class="bg-traditional-100 p-1 rounded-md inline-flex gap-1 {className}">
	{#each tabs as tab}
		<button
			onclick={() => onTabChange(tab.id)}
			class="px-4 py-2 rounded-sm font-medium text-sm transition-all duration-200
				{activeTab === tab.id
				? 'bg-white text-traditional-900 shadow-sm'
				: 'text-traditional-600 hover:text-traditional-900 hover:bg-white/50'}"
		>
			{tab.label}
		</button>
	{/each}
</div>
