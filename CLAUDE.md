# Agentic Commerce Narrator - AI Development Instructions

**Project Type:** Knowledge Graph Dataset
**Focus:** Data Modeling & Content Enrichment
**Stack:** JSON data files (143 files), 7-level node hierarchy

This document provides development instructions for AI coding assistants working on the Agentic Commerce Narrator knowledge graph dataset.

## Project Overview

A comprehensive knowledge graph documenting the transformation from traditional commerce operating models to AI-native agentic commerce models.

**Current Phase:** Data Enrichment
**Goal:** Complete SME review of 253 benchmarks and 475 projections across 125 capabilities

## Agent Operating System

**Version:** 3.0.0
**Framework:** Simplified Two-Mode System for Data Work

### Workflow Modes

**Two-Mode System (simpler than web apps):**

| Mode | Usage | Token Savings | Use For |
|------|-------|---------------|---------|
| **Fast** ⭐ | 95% | 70-80% | Content updates, simple edits (Default) |
| **Careful** | 5% | 0% | Schema changes, graph restructuring |

**Default:** Fast mode for most data work

**See:** `.agent-os/README.md` for complete guide

### Quick Reference

```yaml
# Configuration (.agent-os/config.yml)
workflow:
  default_mode: "fast"  # 95% of work

context:
  total_budget: 60000  # 30% of 200k window (data work needs less)
  tiers:
    core: 20000     # Schema, types, manifest
    domain: 25000   # Specific data area (capabilities, agents, etc.)
    task: 15000     # Individual file being edited
```

## Data Structure

```
/data/
├── capabilities/    20 JSON files (Traditional vs Agentic comparisons)
├── domains/         Business domain definitions
├── functions/       ~100 function-level workflows
├── personas/        12 user role definitions
├── agents/          ~60 agent definitions
├── industries/      5 industry contexts
├── concepts/        Operating model concepts
├── edges/           Graph relationships
└── compiled-graph-data.ts  (4.4MB generated file)
```

## Data Model Version: 2.0.0

**All capabilities use Benchmark-to-Projection model:**
- **Benchmarks:** Provable current-state metrics from traditional approaches
- **Projections:** Future-state improvements from agentic approaches
- **Structure:** 253 benchmarks and 475 projections

## Core Development Standards

### 1. Data Quality Standards

**Required for all JSON files:**
- Valid JSON syntax (no parsing errors)
- Schema version 2.0.0
- All required fields present
- Unique node IDs
- No orphaned references

### 2. Content Standards

**Professional Quality:**
- Clear, professional language
- Quantifiable metrics where possible
- Credible sources for benchmarks
- Logical projections based on benchmarks
- Industry-specific context preserved

### 3. Graph Integrity

**7-Level Node Hierarchy:**
1. Industry
2. Domain
3. Capability
4. Function
5. Persona
6. Agent
7. Concept

**Critical Rules:**
- All nodes have unique IDs
- All edges reference existing nodes
- Domain-to-layer mappings preserved
- No circular dependencies (unless intentional)

## Role-Based Implementation

**4 Data-Focused Roles:**

- `data-engineer` - Schema design, data modeling, graph structure
- `content-writer` - Benchmarks, projections, descriptions
- `data-validator` - Quality checks, validation, integrity
- `graph-architect` - Relationships, hierarchy, optimization

**See:** `.agent-os/roles/` for detailed role definitions

## Common Tasks

### Fast Mode Tasks (95% of work)

```bash
# Add benchmarks to capability
"Add 5 benchmarks to Payment Processing capability with credible sources"

# Update agent descriptions
"Refine all agent descriptions for consistency and clarity"

# Fix validation errors
"Fix JSON syntax errors in retail personas"

# Content refinement
"Improve projection rationales with quantifiable metrics"
```

### Careful Mode Tasks (5% of work)

```bash
# Schema changes
"Add 'impact_score' field to all capability schemas"

# Graph structure
"Redesign edge relationships for bi-directional traversal"

# New node types
"Add 'Concept' as 8th level in node hierarchy"

# Large migrations
"Migrate all capabilities to version 2.1.0"
```

## Quality Gates

### Fast Mode Validations

```bash
JSON syntax check
Basic schema validation
Graph integrity check
```

### Careful Mode Validations

```bash
JSON syntax validation
Full schema compliance
Graph integrity verification
Compilation test
Edge relationship validation
Performance check
```

## File Organization

### Critical Files

- `data/manifest.json` - Node and edge counts
- `data/capabilities/*.json` - 20 capability files
- `data/functions/*.json` - ~100 function definitions
- `data/agents/*.json` - ~60 agent definitions
- `data/compiled-graph-data.ts` - Generated graph (don't edit directly)

### Data Integrity Rules

1. All nodes must have unique IDs
2. All edges must reference existing nodes
3. Capability version must be 2.0.0
4. Benchmarks and projections must have sources
5. Domain-to-layer mappings must be preserved

## Validation Commands

```bash
# JSON syntax validation
jq empty data/**/*.json

# Schema validation (when tooling exists)
npm run validate:schema

# Graph integrity
npm run validate:graph

# Full compilation test
npm run compile:graph
```

## Best Practices

### 1. Always Validate After Changes

Run validations after every data file modification to catch errors early.

### 2. Batch Similar Updates

Group similar content updates together for efficiency:

```
✅ "Add benchmarks to all Payment-related capabilities"
❌ "Add benchmark to payment-1, then schema change, then payment-2"
```

### 3. Preserve Data Model Consistency

- Keep version at 2.0.0 across all capabilities
- Maintain consistent naming conventions
- Use established terminology
- Follow existing patterns

### 4. Document Sources

All benchmarks must have credible sources. All projections must be logically derived from benchmarks.

## Emergency Controls

### Auto-Stop Triggers

- JSON syntax errors (blocking)
- Schema validation failures
- Graph integrity violations
- Large-scale data corruption detected

### Rollback

All data changes are reversible. If validation fails, changes are automatically rolled back.

## Related Documentation

### Agent-OS
- `.agent-os/README.md` - Agent Operating System overview
- `.agent-os/config.yml` - Workflow configuration
- `.agent-os/workflows/workflow-modes.md` - Fast vs Careful modes
- `.agent-os/roles/` - Role definitions

### Project Documentation
- `README.md` - Project overview
- `docs/data/` - Data modeling guides
- `docs/INTENT_DRIVEN_ENGINEERING.md` - Development methodology

---

**Version:** 3.0.0
**Last Updated:** 2025-10-22
**Status:** Active - Data Enrichment Phase
