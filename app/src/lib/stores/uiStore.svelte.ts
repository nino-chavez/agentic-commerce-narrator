// ============================================================================
// UI State Management using Svelte 5 Runes
// ============================================================================

/**
 * Represents a single frame in the presentation storyboard.
 * Frames are auto-numbered and can be reordered to craft the narrative flow.
 */
export interface StoryboardFrame {
	/** Auto-assigned sequence number (1, 2, 3...). Renumbered on reorder. */
	frameNumber: number;
	/** Unique capability identifier */
	capabilityId: string;
	/** Parent domain identifier */
	domainId: string;
	/** Capability name/title */
	label: string;
	/** Full capability description */
	description: string;
	/** One-line summary of traditional approach (for frame preview) */
	traditionalSummary?: string;
	/** One-line summary of agentic approach (for frame preview) */
	agenticSummary?: string;
	/** Timestamp when frame was added (for analytics) */
	addedAt: number;
}

/**
 * Global UI state for command palette, modals, and UI interactions
 */
class UIState {
	commandPaletteOpen = $state(false);
	selectedDomainId = $state<string | null>(null);
	selectedCapabilityId = $state<string | null>(null);
	comparisonMode = $state<'side-by-side' | 'traditional-first' | 'agentic-first'>(
		'side-by-side'
	);
	showBenchmarks = $state(true);
	showProjections = $state(true);

	// Filters
	selectedIndustry = $state<string>('');
	selectedPersona = $state<string>('');

	// Presentation Storyboard
	storyboardOpen = $state(false);
	storyboardFrames = $state<StoryboardFrame[]>([]);

	// Presentation Mode
	presentationMode = $state(false);
	currentFrameIndex = $state(0);

	// Derived state
	hasSelection = $derived(this.selectedDomainId !== null || this.selectedCapabilityId !== null);
	hasActiveFilters = $derived(this.selectedIndustry !== '' || this.selectedPersona !== '');
	frameCount = $derived(this.storyboardFrames.length);
	hasFrames = $derived(this.storyboardFrames.length > 0);

	// Methods
	openCommandPalette() {
		this.commandPaletteOpen = true;
	}

	closeCommandPalette() {
		this.commandPaletteOpen = false;
	}

	toggleCommandPalette() {
		this.commandPaletteOpen = !this.commandPaletteOpen;
	}

	selectDomain(domainId: string | null) {
		this.selectedDomainId = domainId;
		this.selectedCapabilityId = null; // Clear capability when domain changes
	}

	selectCapability(capabilityId: string | null) {
		this.selectedCapabilityId = capabilityId;
	}

	clearCapability() {
		this.selectedCapabilityId = null;
	}

	clearSelection() {
		this.selectedDomainId = null;
		this.selectedCapabilityId = null;
	}

	setComparisonMode(mode: 'side-by-side' | 'traditional-first' | 'agentic-first') {
		this.comparisonMode = mode;
	}

	toggleBenchmarks() {
		this.showBenchmarks = !this.showBenchmarks;
	}

	toggleProjections() {
		this.showProjections = !this.showProjections;
	}

	setIndustryFilter(industry: string) {
		this.selectedIndustry = industry;
	}

	setPersonaFilter(persona: string) {
		this.selectedPersona = persona;
	}

	clearFilters() {
		this.selectedIndustry = '';
		this.selectedPersona = '';
	}

	// Storyboard methods
	/** Open the storyboard sidebar */
	openStoryboard() {
		this.storyboardOpen = true;
	}

	/** Close the storyboard sidebar */
	closeStoryboard() {
		this.storyboardOpen = false;
	}

	/** Toggle storyboard sidebar visibility */
	toggleStoryboard() {
		this.storyboardOpen = !this.storyboardOpen;
	}

	/**
	 * Add a new frame to the storyboard.
	 * Automatically assigns frame number and timestamp.
	 * Prevents duplicates based on capabilityId.
	 */
	addFrame(frame: Omit<StoryboardFrame, 'frameNumber' | 'addedAt'>) {
		const exists = this.storyboardFrames.some((f) => f.capabilityId === frame.capabilityId);
		if (!exists) {
			const newFrame: StoryboardFrame = {
				...frame,
				frameNumber: this.storyboardFrames.length + 1,
				addedAt: Date.now()
			};
			this.storyboardFrames = [...this.storyboardFrames, newFrame];
		}
	}

	/**
	 * Remove a frame from the storyboard.
	 * Automatically renumbers remaining frames to maintain sequence.
	 */
	removeFrame(capabilityId: string) {
		this.storyboardFrames = this.storyboardFrames
			.filter((frame) => frame.capabilityId !== capabilityId)
			.map((frame, index) => ({
				...frame,
				frameNumber: index + 1
			}));
	}

	/**
	 * Check if a capability is already in the storyboard.
	 */
	isInStoryboard(capabilityId: string): boolean {
		return this.storyboardFrames.some((frame) => frame.capabilityId === capabilityId);
	}

	/**
	 * Reorder frames by moving a frame from one position to another.
	 * Automatically renumbers all frames to maintain sequence.
	 */
	reorderFrames(fromIndex: number, toIndex: number) {
		const frames = [...this.storyboardFrames];
		const [removed] = frames.splice(fromIndex, 1);
		frames.splice(toIndex, 0, removed);

		// Renumber all frames after reordering
		this.storyboardFrames = frames.map((frame, index) => ({
			...frame,
			frameNumber: index + 1
		}));
	}

	/**
	 * Clear all frames from the storyboard.
	 */
	clearStoryboard() {
		this.storyboardFrames = [];
	}

	/**
	 * Set storyboard frames (e.g., from URL state).
	 * Ensures all frames have correct numbering.
	 */
	setFrames(frames: StoryboardFrame[]) {
		this.storyboardFrames = frames.map((frame, index) => ({
			...frame,
			frameNumber: index + 1
		}));
	}

	// Presentation Mode methods
	/**
	 * Enter presentation mode and start from first frame.
	 * Closes storyboard pane if open.
	 */
	enterPresentation() {
		if (this.storyboardFrames.length === 0) return;
		this.presentationMode = true;
		this.currentFrameIndex = 0;
		this.storyboardOpen = false;
	}

	/**
	 * Exit presentation mode.
	 */
	exitPresentation() {
		this.presentationMode = false;
		this.currentFrameIndex = 0;
	}

	/**
	 * Navigate to next frame in presentation.
	 */
	nextFrame() {
		if (this.currentFrameIndex < this.storyboardFrames.length - 1) {
			this.currentFrameIndex++;
		}
	}

	/**
	 * Navigate to previous frame in presentation.
	 */
	previousFrame() {
		if (this.currentFrameIndex > 0) {
			this.currentFrameIndex--;
		}
	}

	/**
	 * Jump to specific frame index.
	 */
	goToFrame(index: number) {
		if (index >= 0 && index < this.storyboardFrames.length) {
			this.currentFrameIndex = index;
		}
	}

	/**
	 * Get current frame being presented.
	 */
	get currentFrame(): StoryboardFrame | null {
		return this.storyboardFrames[this.currentFrameIndex] || null;
	}
}

// Export singleton instance
export const uiState = new UIState();
