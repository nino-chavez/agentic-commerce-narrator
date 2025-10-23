# Agentic Commerce Narrator - Agent Operating System

**Version:** 3.0.0
**Framework:** Simplified Two-Mode System for Data Work
**Last Updated:** 2025-10-22

This directory contains the Agent Operating System (Agent-OS) configuration for autonomous AI development on the Agentic Commerce Narrator knowledge graph dataset.

## Purpose

The Agent-OS provides:
- **Token-optimized workflows** (70-80% savings in Fast mode)
- **Autonomous operation** for data modeling work
- **Role-based implementation** (data-engineer, content-writer, data-validator, graph-architect)
- **Quality assurance** (automated validation gates)
- **Traceability** (audit logs, evidence-based status)

## Quick Start

### For AI Assistants

1. **Read configuration:** `.agent-os/config.yml`
2. **Understand workflows:** `.agent-os/workflows/workflow-modes.md`
3. **Know your roles:** `.agent-os/roles/implementers.yml` and `.agent-os/roles/verifiers.yml`
4. **Check project context:** `../CLAUDE.md`
5. **Start working:** Fast mode (default) for 95% of data work

### For Humans

1. **Prompt normally:** Agent-OS works transparently
2. **Fast mode default:** Most data work uses Fast mode automatically
3. **Careful mode when needed:** Schema changes and graph restructuring
4. **Review results:** Validation results shown after completion

## Directory Structure

```
.agent-os/
├── README.md                   # This file
├── config.yml                  # Core configuration
├── roles/                      # Role definitions
│   ├── implementers.yml        # data-engineer, content-writer, etc.
│   └── verifiers.yml           # data-quality, graph-integrity
├── workflows/                  # Workflow guides
│   └── workflow-modes.md       # Fast vs Careful mode guide
└── audit-logs/                 # Session records
    └── YYYY-MM-DD-task.md      # Timestamped audit logs
```

## Workflow Modes

### Two-Mode System

Since this is a **data modeling project** (not a web application), we use a simpler two-mode system:

| Mode | Usage | Token Budget | Use For |
|------|-------|--------------|---------|
| **Fast** ⭐ | 95% | 1,000 | Content updates, simple edits |
| **Careful** | 5% | 5,000 | Schema changes, graph restructuring |

**Default:** Fast mode

**See:** `.agent-os/workflows/workflow-modes.md` for detailed guide

## Role-Based Implementation

### Data-Focused Roles

**4 Implementer Roles:**
- `data-engineer` - Schema design, data modeling, graph structure
- `content-writer` - Benchmarks, projections, descriptions, use cases
- `data-validator` - Quality checks, validation rules, integrity verification
- `graph-architect` - Relationships, hierarchy, optimization

**2 Verifier Roles:**
- `data-quality-verifier` - Schema and content validation
- `graph-integrity-verifier` - Relationship and structure validation

**See:** `.agent-os/roles/` for detailed definitions

## Token Optimization

### Context Loading (60k total budget)

**Tier 1 - Core (20k):** Schema, types, manifest (load once)
**Tier 2 - Domain (25k):** Specific data area (capabilities, agents, etc.)
**Tier 3 - Task (15k):** Individual file being edited

**Strategy:** Load only what's needed for current task

### Mode-Based Budgets

- **Fast:** 1,000 tokens max (95% of work)
- **Careful:** 5,000 tokens max (5% of complex work)

## Quality Gates

### Fast Mode Validations

```bash
JSON syntax check
Basic schema validation
Graph integrity check (basic)
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

## Traceability

### Audit Logging

**Location:** `.agent-os/audit-logs/YYYY-MM-DD-task.md`

**Required Sections:**
- Primary Request and Intent
- Workflow Mode Selected
- Data Files Modified
- Validation Results
- Token Usage

### Evidence-Based Status

Document **what EXISTS**, not what's planned:

```markdown
✅ Good:
- [x] Added 10 benchmarks to Payment Processing (data/capabilities/payment-processing.json)
- [x] Validation passing (JSON syntax, schema 2.0.0)
- [x] Committed: abc1234

❌ Bad:
- [ ] Will add benchmarks
- [ ] Plan to validate
```

## Common Tasks

### Fast Mode Examples (Default)

```
"Add 5 benchmarks to Order Management capability"
"Update agent descriptions for consistency"
"Fix JSON syntax error in retail personas"
"Refine projection rationales with quantifiable metrics"
```

### Careful Mode Examples

```
"Add 'impact_score' field to all capability schemas"
"Redesign edge relationships for bi-directional traversal"
"Add 'Concept' as 8th level in node hierarchy"
"Migrate all capabilities to version 2.1.0"
```

## Data Model Overview

**7-Level Node Hierarchy:**
1. Industry → 2. Domain → 3. Capability → 4. Function → 5. Persona → 6. Agent → 7. Concept

**143 JSON Files:**
- 20 capabilities
- ~100 functions
- ~60 agents
- 12 personas
- 5 industries

**Data Model Version:** 2.0.0 (Benchmark-to-Projection model)

## Configuration

### Default Settings

```yaml
# .agent-os/config.yml
workflow:
  default_mode: "fast"  # 95% of data work

context:
  total_budget: 60000  # 30% of 200k window
```

### Customization

Edit `.agent-os/config.yml` to adjust:
- Workflow mode defaults
- Token budgets
- Validation requirements
- Data integrity rules

## Best Practices

### 1. Fast Mode for Most Work

95% of data modeling is content enrichment and simple updates. Fast mode is sufficient.

### 2. Validate After Every Change

Always run validations after modifying data files to catch errors early.

### 3. Batch Similar Updates

```
✅ "Add benchmarks to all Payment-related capabilities"
❌ "Add to payment-1, schema change, add to payment-2"
```

### 4. Preserve Data Integrity

- Maintain version 2.0.0
- Keep unique node IDs
- Validate all edge references
- Document benchmark sources

## Emergency Controls

### Auto-Stop Triggers

- JSON syntax errors (blocking)
- Schema validation failures
- Graph integrity violations
- Data corruption detected

### Rollback

All changes are automatically rolled back if validation fails.

## Performance Metrics

### Targets

- Fast mode: 5-15 min per file
- Token savings: 70-80% vs baseline
- Data quality: 100% schema compliance
- Validation pass rate: >95%

## Integration with Claude Code

The Agent-OS works **transparently** - you don't need to explicitly invoke it.

**You prompt normally:**
```
"Add benchmarks to Order Management"
```

**Agent auto-selects mode:**
```
"Using Fast Mode for content update.
[implements change]
✅ Complete - 8 minutes, ~750 tokens used"
```

## Related Documentation

### Agent-OS Files
- `config.yml` - Core configuration
- `roles/implementers.yml` - Implementation roles
- `roles/verifiers.yml` - Verification roles
- `workflows/workflow-modes.md` - Mode guide
- `audit-logs/` - Session records

### Project Files
- `../CLAUDE.md` - AI development instructions
- `../README.md` - Project overview
- `../docs/data/` - Data modeling guides
- `../docs/INTENT_DRIVEN_ENGINEERING.md` - Methodology

---

**Built for Data Modeling Work**
**Optimized for Content Enrichment**
**Transparent and Efficient**
