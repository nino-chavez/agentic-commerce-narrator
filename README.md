# Agentic Commerce Narrator

A comprehensive knowledge graph dataset documenting the transformation from traditional commerce operating models to AI-native agentic commerce models.

## Project Status

**Planning Stage** - Currently focused on graph data modeling and enrichment. Technology stack has not been selected.

## Data Structure

```
/data/
├── /capabilities/     20 JSON files with Traditional vs Agentic comparisons
├── /domains/          Business domain definitions
├── /functions/        ~100 function-level workflows
├── /personas/         12 user role definitions
├── /agents/           ~60 agent definitions (orchestrator, super, utility)
├── /industries/       5 industry contexts (Retail, Grocery, Travel, QSR, Hospitality)
├── /concepts/         Operating model concepts (Cook vs Chef)
└── /edges/            Graph relationships between nodes
```

## Data Model Version: 2.0.0

All 125 capabilities now use the **Benchmark-to-Projection** model:

- **Benchmarks**: Provable current-state metrics from traditional approaches
- **Projections**: Future-state improvements from agentic approaches
- **Structure**: All capabilities at version 2.0.0 with 253 benchmarks and 475 projections

## Documentation

- `/docs/data/` - Data modeling and enrichment plans
- `/docs/INTENT_DRIVEN_ENGINEERING.md` - Development methodology

## Next Steps

1. Complete SME review of benchmarks and projections
2. Select technology stack for visualization/presentation
3. Design user experience and interaction model
