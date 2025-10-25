import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { StoryboardFrame } from '$lib/stores/uiStore.svelte';

// ============================================================================
// URL State Management
// ============================================================================

export interface AppState {
	domain?: string;
	capability?: string;
	mode?: 'side-by-side' | 'traditional-first' | 'agentic-first';
	benchmarks?: boolean;
	projections?: boolean;
	industry?: string;
	persona?: string;
	storyboard?: StoryboardFrame[];
}

/**
 * Read application state from URL search params
 */
export function readStateFromUrl(): AppState {
	const $page = get(page);
	const params = $page.url.searchParams;

	// Parse storyboard frames from URL
	let storyboard: StoryboardFrame[] | undefined;
	const storyboardParam = params.get('storyboard');
	if (storyboardParam) {
		try {
			storyboard = JSON.parse(decodeURIComponent(storyboardParam));
		} catch (e) {
			console.error('Failed to parse storyboard from URL:', e);
		}
	}

	return {
		domain: params.get('domain') || undefined,
		capability: params.get('capability') || undefined,
		mode: (params.get('mode') as AppState['mode']) || undefined,
		benchmarks: params.get('benchmarks') === 'false' ? false : true,
		projections: params.get('projections') === 'false' ? false : true,
		industry: params.get('industry') || undefined,
		persona: params.get('persona') || undefined,
		storyboard
	};
}

/**
 * Update URL with new application state
 */
export function updateUrlState(state: Partial<AppState>, replace = false): void {
	const $page = get(page);
	const params = new URLSearchParams($page.url.searchParams);

	// Update each state field
	if (state.domain !== undefined) {
		if (state.domain) {
			params.set('domain', state.domain);
		} else {
			params.delete('domain');
		}
	}

	if (state.capability !== undefined) {
		if (state.capability) {
			params.set('capability', state.capability);
		} else {
			params.delete('capability');
		}
	}

	if (state.mode !== undefined) {
		if (state.mode && state.mode !== 'side-by-side') {
			params.set('mode', state.mode);
		} else {
			params.delete('mode'); // Default is side-by-side
		}
	}

	if (state.benchmarks !== undefined) {
		if (state.benchmarks === false) {
			params.set('benchmarks', 'false');
		} else {
			params.delete('benchmarks'); // Default is true
		}
	}

	if (state.projections !== undefined) {
		if (state.projections === false) {
			params.set('projections', 'false');
		} else {
			params.delete('projections'); // Default is true
		}
	}

	if (state.industry !== undefined) {
		if (state.industry) {
			params.set('industry', state.industry);
		} else {
			params.delete('industry');
		}
	}

	if (state.persona !== undefined) {
		if (state.persona) {
			params.set('persona', state.persona);
		} else {
			params.delete('persona');
		}
	}

	if (state.storyboard !== undefined) {
		if (state.storyboard && state.storyboard.length > 0) {
			// Serialize storyboard frames to URL
			const storyboardString = encodeURIComponent(JSON.stringify(state.storyboard));
			params.set('storyboard', storyboardString);
		} else {
			params.delete('storyboard');
		}
	}

	// Navigate with updated params
	const newUrl = `${$page.url.pathname}?${params.toString()}`;
	goto(newUrl, { replaceState: replace, noScroll: true, keepFocus: true });
}

/**
 * Clear all state from URL
 */
export function clearUrlState(): void {
	const $page = get(page);
	goto($page.url.pathname, { replaceState: true });
}

/**
 * Generate shareable URL for current state
 */
export function getShareableUrl(state: AppState): string {
	const params = new URLSearchParams();

	if (state.domain) params.set('domain', state.domain);
	if (state.capability) params.set('capability', state.capability);
	if (state.mode && state.mode !== 'side-by-side') params.set('mode', state.mode);
	if (state.benchmarks === false) params.set('benchmarks', 'false');
	if (state.projections === false) params.set('projections', 'false');
	if (state.industry) params.set('industry', state.industry);
	if (state.persona) params.set('persona', state.persona);
	if (state.storyboard && state.storyboard.length > 0) {
		params.set('storyboard', encodeURIComponent(JSON.stringify(state.storyboard)));
	}

	const queryString = params.toString();
	return queryString ? `${window.location.origin}${window.location.pathname}?${queryString}` : window.location.origin;
}
