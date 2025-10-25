<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import MetricDisplay from '$lib/components/ui/MetricDisplay.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import { inView } from '$lib/actions/inView';

	let activeTab = $state('components');

	const tabs = [
		{ id: 'components', label: 'Components' },
		{ id: 'colors', label: 'Colors' },
		{ id: 'typography', label: 'Typography' },
		{ id: 'animations', label: 'Animations' }
	];

	const sampleMetrics = [
		{ label: 'Revenue Growth', value: '+42%', trend: '+12% vs last month', trendDirection: 'up' as const },
		{ label: 'Conversion Rate', value: '-8%', trend: '-3% vs last month', trendDirection: 'down' as const },
		{ label: 'Active Users', value: '1,234', trendDirection: 'neutral' as const },
		{ label: 'Customer Satisfaction', value: '92%', trend: 'Stable', trendDirection: 'neutral' as const }
	];
</script>

<div class="min-h-screen bg-white p-8">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<header class="mb-12">
			<h1 class="text-4xl font-bold text-traditional-900 mb-4">Design System Showcase</h1>
			<p class="text-lg text-traditional-600 prose-blog">
				All components following the Agentic Commerce Narrator visual design system. See{' '}
				<code class="text-sm bg-traditional-200 px-2 py-1 rounded">docs/design/VISUAL_DESIGN_SYSTEM.md</code>{' '}
				for complete documentation.
			</p>
		</header>

		<!-- Navigation Tabs -->
		<div class="mb-8">
			<Tabs {tabs} {activeTab} onTabChange={(id) => (activeTab = id)} />
		</div>

		<!-- Components Tab -->
		{#if activeTab === 'components'}
			<div class="space-y-12">
				<!-- Cards Section -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Cards</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card variant="neutral">
							<h3 class="font-semibold text-traditional-900 mb-2">Neutral Card</h3>
							<p class="text-sm text-traditional-600">
								Default card variant for general content. Includes hover lift animation and shadow
								elevation.
							</p>
						</Card>

						<Card variant="traditional">
							<Badge variant="traditional" size="sm" class="mb-2">Traditional</Badge>
							<h3 class="font-semibold text-traditional-900 mb-2">Traditional Card</h3>
							<p class="text-sm text-traditional-600">
								Used for traditional approach benchmarks and process-driven content.
							</p>
						</Card>

						<Card variant="agentic">
							<Badge variant="agentic" size="sm" class="mb-2">Agentic</Badge>
							<h3 class="font-semibold text-agentic-900 mb-2">Agentic Card</h3>
							<p class="text-sm text-agentic-700">
								Used for agentic approach projections and autonomous workflows.
							</p>
						</Card>
					</div>
				</section>

				<!-- Buttons Section -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Buttons</h2>
					<div class="flex flex-wrap gap-4">
						<Button variant="primary">Primary Button</Button>
						<Button variant="secondary">Secondary Button</Button>
						<Button variant="ghost">Ghost Button</Button>
						<Button variant="primary" size="sm">Small</Button>
						<Button variant="primary" size="lg">Large</Button>
						<Button variant="primary" disabled>Disabled</Button>
					</div>
				</section>

				<!-- Badges Section -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Badges</h2>
					<div class="flex flex-wrap gap-3">
						<Badge variant="traditional">Traditional</Badge>
						<Badge variant="agentic">Agentic</Badge>
						<Badge variant="success">Success</Badge>
						<Badge variant="warning">Warning</Badge>
						<Badge variant="error">Error</Badge>
						<Badge variant="info">Info</Badge>
						<Badge variant="traditional" size="sm">Small</Badge>
					</div>
				</section>

				<!-- Metric Display Section -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Metric Displays</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{#each sampleMetrics as metric}
							<Card variant="neutral" interactive={false}>
								<MetricDisplay
									label={metric.label}
									value={metric.value}
									trend={metric.trend}
									trendDirection={metric.trendDirection}
									size="md"
								/>
							</Card>
						{/each}
					</div>
				</section>

				<!-- Sizes Demonstration -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Metric Sizes</h2>
					<div class="space-y-6">
						<Card variant="neutral" interactive={false}>
							<MetricDisplay label="Small Metric" value="$1.2M" size="sm" semanticColor="success" />
						</Card>
						<Card variant="neutral" interactive={false}>
							<MetricDisplay label="Medium Metric" value="$1.2M" size="md" semanticColor="success" />
						</Card>
						<Card variant="neutral" interactive={false}>
							<MetricDisplay label="Large Metric" value="$1.2M" size="lg" semanticColor="success" />
						</Card>
						<Card variant="neutral" interactive={false}>
							<MetricDisplay label="Extra Large Metric" value="$1.2M" size="xl" semanticColor="success" />
						</Card>
					</div>
				</section>
			</div>
		{/if}

		<!-- Colors Tab -->
		{#if activeTab === 'colors'}
			<div class="space-y-12">
				<!-- Traditional Colors -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Traditional Palette</h2>
					<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-50 border border-traditional-300"></div>
							<p class="text-sm font-medium text-traditional-900">Traditional 50</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-100 border border-traditional-300"></div>
							<p class="text-sm font-medium text-traditional-900">Traditional 100</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-200 border border-traditional-300"></div>
							<p class="text-sm font-medium text-traditional-900">Traditional 200</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-300 border border-traditional-300"></div>
							<p class="text-sm font-medium text-traditional-900">Traditional 300</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-400 border border-traditional-300"></div>
							<p class="text-sm font-medium text-traditional-900">Traditional 400</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-500 border border-traditional-300"></div>
							<p class="text-sm font-medium text-white">Traditional 500</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-600 border border-traditional-300"></div>
							<p class="text-sm font-medium text-white">Traditional 600</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-700 border border-traditional-300"></div>
							<p class="text-sm font-medium text-white">Traditional 700</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-800 border border-traditional-300"></div>
							<p class="text-sm font-medium text-white">Traditional 800</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-traditional-900 border border-traditional-300"></div>
							<p class="text-sm font-medium text-white">Traditional 900</p>
						</div>
					</div>
				</section>

				<!-- Agentic Colors -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Agentic Palette</h2>
					<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-50 border border-agentic-300"></div>
							<p class="text-sm font-medium text-traditional-900">Agentic 50</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-100 border border-agentic-300"></div>
							<p class="text-sm font-medium text-traditional-900">Agentic 100</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-200 border border-agentic-300"></div>
							<p class="text-sm font-medium text-traditional-900">Agentic 200</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-300 border border-agentic-300"></div>
							<p class="text-sm font-medium text-traditional-900">Agentic 300</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-400 border border-agentic-300"></div>
							<p class="text-sm font-medium text-white">Agentic 400</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-500 border border-agentic-300"></div>
							<p class="text-sm font-medium text-white">Agentic 500</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-600 border border-agentic-300"></div>
							<p class="text-sm font-medium text-white">Agentic 600</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-700 border border-agentic-300"></div>
							<p class="text-sm font-medium text-white">Agentic 700</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-800 border border-agentic-300"></div>
							<p class="text-sm font-medium text-white">Agentic 800</p>
						</div>
						<div class="space-y-2">
							<div class="h-24 rounded-lg bg-agentic-900 border border-agentic-300"></div>
							<p class="text-sm font-medium text-white">Agentic 900</p>
						</div>
					</div>
				</section>

				<!-- Semantic Colors -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Semantic Data Colors</h2>
					<div class="grid grid-cols-1 md:grid-cols-5 gap-4">
						<Card variant="neutral" interactive={false}>
							<div class="h-16 bg-green-500 rounded-lg mb-3"></div>
							<p class="font-medium text-traditional-900 mb-1">Success</p>
							<p class="text-xs text-traditional-600">Growth, positive trends</p>
						</Card>
						<Card variant="neutral" interactive={false}>
							<div class="h-16 bg-amber-500 rounded-lg mb-3"></div>
							<p class="font-medium text-traditional-900 mb-1">Warning</p>
							<p class="text-xs text-traditional-600">Caution, opportunities</p>
						</Card>
						<Card variant="neutral" interactive={false}>
							<div class="h-16 bg-red-500 rounded-lg mb-3"></div>
							<p class="font-medium text-traditional-900 mb-1">Error</p>
							<p class="text-xs text-traditional-600">Decline, issues</p>
						</Card>
						<Card variant="neutral" interactive={false}>
							<div class="h-16 bg-blue-500 rounded-lg mb-3"></div>
							<p class="font-medium text-traditional-900 mb-1">Info</p>
							<p class="text-xs text-traditional-600">Neutral, informational</p>
						</Card>
						<Card variant="neutral" interactive={false}>
							<div class="h-16 bg-traditional-500 rounded-lg mb-3"></div>
							<p class="font-medium text-traditional-900 mb-1">Neutral</p>
							<p class="text-xs text-traditional-600">Baseline, no change</p>
						</Card>
					</div>
				</section>
			</div>
		{/if}

		<!-- Typography Tab -->
		{#if activeTab === 'typography'}
			<div class="space-y-12">
				<!-- Headings -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Headings</h2>
					<div class="space-y-4">
						<h1 class="text-3xl font-bold text-traditional-900">Heading 1 - 30px/48px</h1>
						<h2 class="text-2xl font-semibold text-traditional-900">Heading 2 - 24px/36px</h2>
						<h3 class="text-xl font-semibold text-traditional-800">Heading 3 - 20px/32px</h3>
						<h4 class="text-lg font-semibold text-traditional-800">Heading 4 - 18px/28px</h4>
					</div>
				</section>

				<!-- Body Text -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Body Text</h2>
					<div class="space-y-4">
						<p class="text-base text-traditional-600 prose-blog">
							Regular body text (16px) with optimal line length of 65 characters for reading comfort.
							This is the standard text size used throughout the application for paragraph content,
							descriptions, and general information.
						</p>
						<p class="text-sm text-traditional-500 prose-blog">
							Small text (14px) used for captions, metadata, and secondary information that needs to be
							de-emphasized from the primary content flow.
						</p>
						<p class="text-xs text-traditional-400 prose-narrow">
							Extra small text (12px) for labels, timestamps, and fine print. Use sparingly.
						</p>
					</div>
				</section>

				<!-- Metric Typography -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Metric Typography</h2>
					<div class="space-y-6">
						<div>
							<p class="text-metric-2xl text-traditional-900">$1,234,567</p>
							<p class="text-sm text-traditional-500 mt-1">Large metric - 48px (text-metric-2xl)</p>
						</div>
						<div>
							<p class="text-metric-xl text-traditional-900">$1,234,567</p>
							<p class="text-sm text-traditional-500 mt-1">Standard metric - 36px (text-metric-xl)</p>
						</div>
						<div>
							<p class="text-metric-lg text-traditional-900">$1,234,567</p>
							<p class="text-sm text-traditional-500 mt-1">Small metric - 24px (text-metric-lg)</p>
						</div>
					</div>
				</section>
			</div>
		{/if}

		<!-- Animations Tab -->
		{#if activeTab === 'animations'}
			<div class="space-y-12">
				<!-- Staggered Entrance -->
				<section>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Staggered Entrance Animation</h2>
					<p class="text-sm text-traditional-600 mb-6 prose-blog">
						Cards appear sequentially with 50ms delay between each item. Reload the page to see the effect.
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						{#each Array.from({ length: 6 }) as _, index}
							<div class="stagger-item" style="animation-delay: {index * 0.05}s">
								<Card variant="neutral">
									<h3 class="font-semibold text-traditional-900 mb-2">Card {index + 1}</h3>
									<p class="text-sm text-traditional-600">Staggered animation example</p>
								</Card>
							</div>
						{/each}
					</div>
				</section>

				<!-- Scroll-Triggered -->
				<section>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Scroll-Triggered Animations</h2>
					<p class="text-sm text-traditional-600 mb-6 prose-blog">
						Components animate into view as you scroll down the page using Intersection Observer.
					</p>
					{#each Array.from({ length: 4 }) as _, index}
						<div data-in-view use:inView class="mb-6">
							<Card variant={index % 2 === 0 ? 'traditional' : 'agentic'}>
								<h3 class="font-semibold mb-2">Scroll Item {index + 1}</h3>
								<p class="text-sm">This card animates when it enters the viewport.</p>
							</Card>
						</div>
					{/each}
				</section>

				<!-- Hover States -->
				<section data-in-view use:inView>
					<h2 class="text-2xl font-semibold text-traditional-900 mb-6">Hover & Interactive States</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card variant="neutral">
							<h3 class="font-semibold text-traditional-900 mb-2">Card Hover</h3>
							<p class="text-sm text-traditional-600">Hover to see lift animation and shadow increase</p>
						</Card>
						<Card variant="traditional">
							<h3 class="font-semibold text-traditional-900 mb-2">Traditional Hover</h3>
							<p class="text-sm text-traditional-600">Border color changes on hover</p>
						</Card>
						<Card variant="agentic">
							<h3 class="font-semibold text-agentic-900 mb-2">Agentic Hover</h3>
							<p class="text-sm text-agentic-700">Smooth transitions with 200ms duration</p>
						</Card>
					</div>
				</section>
			</div>
		{/if}
	</div>
</div>
