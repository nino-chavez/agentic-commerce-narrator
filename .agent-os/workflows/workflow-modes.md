# Agentic Commerce Narrator - Workflow Modes

**Version:** 3.0.0
**Last Updated:** 2025-10-22
**Project Type:** Data Modeling & Knowledge Graph

This document explains the two workflow modes for data-focused development.

## Overview

Since this is a data modeling project (not a web application), we use a simplified **two-mode system**:

- **Fast Mode** (95% of work) - Quick data updates, content enrichment
- **Careful Mode** (5% of work) - Complex schema changes, graph restructuring

## Mode Comparison

| Aspect | Fast | Careful |
|--------|------|---------|
| **Usage** | 95% of work | 5% of work |
| **Token Budget** | 1,000 tokens | 5,000 tokens |
| **Time** | 5-15 minutes | 30-60 minutes |
| **Verification** | Self-check | Comprehensive |
| **Delegation** | No | Conditional |

---

## Fast Mode (Default)

**Token Budget:** 1,000 tokens
**Time:** 5-15 minutes
**Usage:** 95% of data modeling work

### When to Use

✅ **Use Fast Mode for:**
- Updating JSON data files (capabilities, agents, personas)
- Adding benchmarks and projections
- Fixing data validation errors
- Content refinement and copy editing
- Documentation updates
- Simple metadata changes

❌ **Don't Use Fast Mode for:**
- Graph structure changes
- Schema modifications
- Edge relationship updates
- Large-scale data migrations

### Validations

```bash
JSON syntax validation
Data schema validation
Graph integrity check (basic)
```

### Example Tasks

```
"Add 5 benchmarks to the Payment Processing capability"
"Update agent descriptions for consistency"
"Fix JSON syntax error in retail-persona.json"
"Refine projection rationales for Order Fulfillment"
```

---

## Careful Mode

**Token Budget:** 5,000 tokens
**Time:** 30-60 minutes
**Usage:** 5% of complex work

### When to Use

✅ **Use Careful Mode for:**
- Graph data model changes (7-level hierarchy)
- Edge relationship modifications
- Data schema updates
- Large-scale data migrations
- Performance-critical data structures
- New node type additions

❌ **Don't Use Careful Mode for:**
- Simple content updates (use Fast)
- Individual file edits (use Fast)
- Documentation (use Fast)

### Validations

```bash
JSON syntax validation
Data schema validation
Schema version validation
Graph integrity check (comprehensive)
Full graph compilation test
Edge relationship validation
```

### Required Reviews

- `data-architect` - For schema changes
- `content-strategist` - For large content updates

### Example Tasks

```
"Add new 'Concept' node level to 7-level hierarchy"
"Redesign edge relationships for capability-agent links"
"Migrate all capabilities to version 2.1.0 schema"
"Restructure graph for better query performance"
```

---

## Role-Based Implementation

### Fast Mode Roles

**Typical roles:**
- `content-writer` - Simple content updates
- `data-engineer` - Single file schema updates

**Verification:**
- Self-check only
- Basic validations

### Careful Mode Roles

**Typical roles:**
- `graph-architect` - Relationship design
- `data-engineer` - Large schema changes
- `data-validator` - Comprehensive checks

**Verification:**
- Full verifier invocation
- Comprehensive validation suite

---

## Token Optimization

### Fast Mode Example

**Task:** "Add 3 benchmarks to Order Management capability"

**Token Usage:**
- Load Tier 3 context (specific file) - ~500 tokens
- Read order-management.json - ~200 tokens
- Add content - ~200 tokens
- Validate - ~100 tokens
- **Total: ~1,000 tokens**

### Careful Mode Example

**Task:** "Add new edge type: capability-depends-on"

**Token Usage:**
- Load Tier 2 + 3 context - ~3,000 tokens
- Read edge schemas and docs - ~1,000 tokens
- Implement edge type - ~1,500 tokens
- Update graph compilation - ~1,000 tokens
- Comprehensive validation - ~1,500 tokens
- **Total: ~8,000 tokens** (but critical work)

---

## Quality Gates

### Fast Mode Gates

**Pre-flight:**
- Git status clean

**Post-flight:**
- JSON syntax valid
- Basic schema compliance
- No broken references

### Careful Mode Gates

**Pre-flight:**
- Git status clean
- All existing validations passing

**Post-flight:**
- JSON syntax valid
- Full schema compliance
- Graph integrity verified
- Compilation test passes
- Edge relationships valid
- Performance targets met

---

## Best Practices

### 1. Default to Fast Mode

Most data work is content enrichment and simple updates. Fast mode is sufficient for 95% of tasks.

### 2. Escalate to Careful When Needed

If Fast mode encounters complexity (schema changes, graph structure), escalate to Careful mode automatically.

### 3. Batch Similar Updates

Group similar data file updates together:

```
✅ Good:
"Fast Mode batch: Add benchmarks to all Payment capabilities"

❌ Bad:
"Add benchmark to payment-1.json, then update schema, then add to payment-2.json"
```

### 4. Validate After Every Change

Always run validations after modifying data files:

```bash
# JSON syntax
jq empty data/**/*.json

# Schema validation (if tooling exists)
npm run validate:schema

# Graph integrity
npm run validate:graph
```

---

## Configuration

Default settings in `.agent-os/config.yml`:

```yaml
workflow:
  default_mode: "fast"  # 95% of work

  modes:
    fast:
      token_budget: 1000
      time_estimate: "5-15 minutes"
      validations: ["lint", "type-check", "data-validation"]

    careful:
      token_budget: 5000
      time_estimate: "30-60 minutes"
      validations: ["lint", "type-check", "data-validation",
                    "schema-validation", "graph-integrity-check"]
```

---

## Mode Selection Examples

### Scenario 1: Content Update

**Request:** "Add 10 benchmarks to Inventory Management capability"

**Mode Selected:** Fast
**Reason:** Simple content addition, no schema changes
**Estimated Time:** 10 minutes
**Token Usage:** ~800 tokens

### Scenario 2: Schema Change

**Request:** "Add 'impact_score' field to all capability schemas"

**Mode Selected:** Careful
**Reason:** Schema modification affecting all 20 capabilities
**Estimated Time:** 45 minutes
**Token Usage:** ~4,000 tokens

### Scenario 3: Graph Restructure

**Request:** "Redesign edge relationships to support bi-directional traversal"

**Mode Selected:** Careful
**Reason:** Major graph structure change
**Estimated Time:** 60 minutes
**Token Usage:** ~5,000 tokens

---

## Summary

**Use Fast Mode when:**
- Updating content in data files
- Adding/editing benchmarks and projections
- Fixing simple validation errors
- Refining existing content
- No structural changes

**Use Careful Mode when:**
- Modifying data schemas
- Changing graph structure
- Adding new node types
- Updating edge relationships
- Large-scale data migrations

**When in doubt:** Start with Fast mode. It will escalate to Careful if complexity detected.

---

**See:** `.agent-os/config.yml` for configuration details
**See:** `.agent-os/roles/` for role definitions
