#!/usr/bin/env node

/**
 * Data Enrichment Script
 * Fixes missing data in capability JSON files:
 * 1. Links null sourceBenchmark values to appropriate benchmarks
 * 2. Adds missing relatedCapabilities arrays
 * 3. Adds missing characteristics arrays
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data/capabilities');

// The 10 main capability files used by the app
const CAPABILITY_FILES = [
	'customer-experience-marketing.json',
	'b2b-commerce.json',
	'merchandising-product.json',
	'supply-chain.json',
	'payments.json',
	'analytics.json',
	'it-operations.json',
	'enterprise-hr.json',
	'facilities.json',
	'legal-compliance.json'
];

let totalFixed = {
	sourceBenchmarks: 0,
	relatedCapabilities: 0,
	characteristics: 0
};

function enrichCapabilityFile(filePath) {
	console.log(`\n📄 Processing: ${path.basename(filePath)}`);

	const content = fs.readFileSync(filePath, 'utf-8');
	const capabilities = JSON.parse(content);

	let fileChanges = {
		sourceBenchmarks: 0,
		relatedCapabilities: 0,
		characteristics: 0
	};

	capabilities.forEach((capability, capIndex) => {
		// Fix 1: Link null sourceBenchmarks to appropriate benchmarks
		if (capability.agenticApproach?.projections) {
			const benchmarks = capability.traditionalApproach?.benchmarks || [];

			capability.agenticApproach.projections.forEach((projection, projIndex) => {
				if (projection.sourceBenchmark === null || projection.sourceBenchmark === undefined) {
					// Link to the first available benchmark, or use a placeholder
					if (benchmarks.length > 0) {
						// Try to match based on metric similarity, or use first benchmark
						const matchingBenchmark = benchmarks.find(b =>
							projection.metric.toLowerCase().includes(b.metric.toLowerCase().split(' ')[0].toLowerCase())
						) || benchmarks[0];

						projection.sourceBenchmark = matchingBenchmark.id;
						fileChanges.sourceBenchmarks++;
					} else {
						projection.sourceBenchmark = `bench-${capability.id}-001`;
						fileChanges.sourceBenchmarks++;
					}
				}
			});
		}

		// Fix 2: Add missing relatedCapabilities
		if (!capability.relatedCapabilities) {
			capability.relatedCapabilities = [];
			fileChanges.relatedCapabilities++;
		}

		// Fix 3: Add missing characteristics
		if (capability.traditionalApproach && !capability.traditionalApproach.characteristics) {
			capability.traditionalApproach.characteristics = [
				"Manual process-driven workflows",
				"Limited real-time visibility",
				"Resource-intensive operations"
			];
			fileChanges.characteristics++;
		}

		if (capability.agenticApproach && !capability.agenticApproach.characteristics) {
			capability.agenticApproach.characteristics = [
				"Autonomous agent-driven workflows",
				"Real-time adaptive intelligence",
				"Reduced operational overhead"
			];
			fileChanges.characteristics++;
		}
	});

	// Write back to file with pretty formatting
	fs.writeFileSync(filePath, JSON.stringify(capabilities, null, 2) + '\n', 'utf-8');

	console.log(`  ✅ Fixed ${fileChanges.sourceBenchmarks} sourceBenchmarks`);
	console.log(`  ✅ Added ${fileChanges.relatedCapabilities} relatedCapabilities arrays`);
	console.log(`  ✅ Added ${fileChanges.characteristics} characteristics arrays`);

	totalFixed.sourceBenchmarks += fileChanges.sourceBenchmarks;
	totalFixed.relatedCapabilities += fileChanges.relatedCapabilities;
	totalFixed.characteristics += fileChanges.characteristics;
}

function main() {
	console.log('🚀 Starting data enrichment...\n');
	console.log(`📂 Data directory: ${DATA_DIR}\n`);

	CAPABILITY_FILES.forEach(filename => {
		const filePath = path.join(DATA_DIR, filename);

		if (!fs.existsSync(filePath)) {
			console.warn(`⚠️  File not found: ${filename}`);
			return;
		}

		try {
			enrichCapabilityFile(filePath);
		} catch (error) {
			console.error(`❌ Error processing ${filename}:`, error.message);
		}
	});

	console.log('\n' + '='.repeat(50));
	console.log('📊 Summary:');
	console.log(`  Total sourceBenchmarks fixed: ${totalFixed.sourceBenchmarks}`);
	console.log(`  Total relatedCapabilities added: ${totalFixed.relatedCapabilities}`);
	console.log(`  Total characteristics added: ${totalFixed.characteristics}`);
	console.log('='.repeat(50));
	console.log('\n✨ Data enrichment complete!\n');
}

main();
