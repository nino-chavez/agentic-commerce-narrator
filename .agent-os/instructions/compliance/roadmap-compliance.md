# Roadmap & Milestone Compliance Instructions

**Version:** 1.0.0
**Date:** 2025-10-25
**Enforcement:** MANDATORY for all development work
**Source:** `docs/product/IMPLEMENTATION_ROADMAP.md`

## Purpose

This document ensures all development work aligns with the current milestone scope, respects phase dependencies, and updates roadmap progress appropriately. Out-of-scope work will trigger auto-rollback.

---

## Required Reading

**Before starting ANY task:**
- `docs/product/IMPLEMENTATION_ROADMAP.md` - Complete roadmap with milestones
- Check current milestone status
- Verify dependencies from previous phases complete

---

## Current Milestone Status

**Last Verified:** 2025-10-25

### Milestone 1: The Core Narrative (MVP)
**Theme:** Prove core narrative flow and progressive loading architecture
**Timeline:** 3-4 weeks
**Status:** In Progress
**Risk Level:** High (foundational architecture)
**Workflow Mode:** Careful Mode

---

## Milestone Scope Enforcement

### Phase 1.1: Data Architecture Foundation
**Status:** Check roadmap for current status
**Deliverables:**
- Progressive loading data structure (domains.json + domain-specific files)
- Progressive data loader service
- TypeScript types and validation
- Data integrity checks

**✅ ALLOWED in this phase:**
- Creating domain-specific JSON files
- Implementing data loader service
- Adding TypeScript types
- Building validation scripts

**❌ FORBIDDEN in this phase:**
- UI component development (Phase 1.2+)
- Navigation implementation (Phase 1.2+)
- Search functionality (Phase 1.3+)
- Storyboard features (Milestone 2+)

### Phase 1.2: Navigation Hierarchy
**Status:** Check roadmap for current status
**Deliverables:**
- Domain grid view
- Capability grid (nested under domains)
- Breadcrumb navigation
- URL state management

**✅ ALLOWED in this phase:**
- Building navigation components
- Implementing domain → capability hierarchy
- URL param synchronization
- Breadcrumb components

**❌ FORBIDDEN in this phase:**
- Comparison view (Phase 1.3)
- Search functionality (Phase 1.3)
- Filters (Phase 1.3)
- Storyboard (Milestone 2)

### Phase 1.3: Application Shell
**Status:** Check roadmap for current status
**Deliverables:**
- Cmd+K global search
- Context filters (Industry + Persona)
- Search index preloading
- Filter state management

**✅ ALLOWED in this phase:**
- Building search interface
- Implementing FlexSearch indexing
- Creating filter UI
- State management for filters

**❌ FORBIDDEN in this phase:**
- Storyboard functionality (Milestone 2)
- Presentation mode (Milestone 2)
- Data visualization (Milestone 3)
- Analytics (Out of scope)

---

## Dependency Tracking

### Phase Dependencies

**Phase 1.2 depends on:**
- ✅ Phase 1.1: Progressive data loader complete
- ✅ Phase 1.1: Domain JSON files exist
- ✅ Phase 1.1: TypeScript types defined

**Phase 1.3 depends on:**
- ✅ Phase 1.2: Navigation hierarchy complete
- ✅ Phase 1.2: URL state management working
- ✅ Phase 1.1: All domain data available

**Milestone 2 depends on:**
- ✅ Milestone 1: Complete navigation flow works
- ✅ Milestone 1: Search and filters functional
- ✅ Milestone 1: URL state serializable

### Blocking Issues

**Before starting work, verify no blockers:**
- [ ] Previous phase deliverables complete
- [ ] Dependencies available (data files, types, services)
- [ ] No open critical bugs in dependent phases

---

## Pre-Implementation Validation

**Before writing code for ANY task:**

### Scope Verification
- [ ] Task is listed in current milestone deliverables
- [ ] Task is NOT listed in future milestones
- [ ] Task is NOT listed in "Out of Scope" (PRD)
- [ ] Current phase allows this work

### Dependency Verification
- [ ] All prerequisite phases complete
- [ ] Required data structures exist
- [ ] Required services implemented
- [ ] Required types defined

### Roadmap Alignment
- [ ] Task follows specified workflow mode (Fast/Careful)
- [ ] Task estimated time aligns with phase timeline
- [ ] Task risk level appropriate for current phase

---

## During Implementation

### Progress Tracking
- [ ] Update milestone status when starting phase
- [ ] Document blockers immediately when encountered
- [ ] Track actual time vs estimated time
- [ ] Note any scope creep or deviation

### Scope Discipline
- [ ] No "while we're here" additions
- [ ] No future features implemented early
- [ ] No refactoring outside current task scope
- [ ] Stick to minimal viable deliverable

---

## Post-Implementation Validation

**After completing deliverable:**

### Completion Verification
- [ ] All deliverable checklist items complete
- [ ] Acceptance criteria met
- [ ] No regressions in previous phases
- [ ] Performance targets met

### Roadmap Update
- [ ] Mark deliverable as complete in roadmap
- [ ] Update phase status
- [ ] Document any scope changes
- [ ] Update dependency status for next phase

### Documentation
- [ ] Commit message cites milestone/phase
- [ ] Audit log documents deliverable completion
- [ ] Any deviations from roadmap documented
- [ ] Next phase unblocked (if applicable)

---

## Milestone Acceptance Criteria

### Milestone 1 Completion Requires:

**Phase 1.1: Data Architecture**
- [ ] All 10 domain JSON files exist and valid
- [ ] Progressive data loader service functional
- [ ] TypeScript types complete and validated
- [ ] Data integrity checks passing

**Phase 1.2: Navigation Hierarchy**
- [ ] Domain grid view displays 10 domains
- [ ] Capability grid expands under selected domain
- [ ] Breadcrumb navigation shows current location
- [ ] URL state captures domain + capability selection

**Phase 1.3: Application Shell**
- [ ] Cmd+K search opens and searches all nodes
- [ ] Industry + Persona filters functional
- [ ] Search index preloaded in background
- [ ] Filter state persisted in URL

**Phase 1.4: Comparison View**
- [ ] Traditional vs Agentic side-by-side comparison
- [ ] Context tabs (Functions, Agents, Personas) working
- [ ] Performance < 200ms for capability load
- [ ] URL state includes active tab

**Overall Success Criteria:**
- [ ] Time to first insight < 10 seconds
- [ ] Domain → Capability navigation < 5 seconds
- [ ] Search response < 5 seconds
- [ ] Initial page load < 1 second
- [ ] TypeScript: 0 errors
- [ ] Build successful

---

## Out of Scope Enforcement

**These features are EXPLICITLY out of v1.0 scope:**

### ❌ Milestone 2+ Features
- Storyboard functionality
- Presentation mode
- Storyboard persistence (localStorage)
- Frame reordering

### ❌ Milestone 3+ Features
- Dark mode toggle
- Print/export views
- Performance optimizations (unless blocking)
- Advanced filtering

### ❌ Future Phases (Explicitly Rejected)
- Graph visualization
- Multi-user collaboration
- PowerPoint export
- Custom branding
- Analytics dashboard
- CRM integration
- Mobile responsive (desktop 1280px+ only)
- User authentication

**Attempting to implement out-of-scope features will trigger auto-rollback.**

---

## Example: Compliant Commit Message

```
feat(Phase 1.2): Implement domain-to-capability navigation hierarchy

Milestone: Milestone 1 - The Core Narrative (MVP)
Phase: Phase 1.2 - Navigation Hierarchy
Deliverable: Domain grid view + capability nested grid

Dependencies Satisfied:
- ✅ Phase 1.1: Progressive data loader complete
- ✅ Phase 1.1: Domain JSON files exist
- ✅ Phase 1.1: TypeScript types defined

Acceptance Criteria Met:
- ✅ Domain grid displays 10 domains
- ✅ Capability grid expands under selected domain
- ✅ Breadcrumb shows current location
- ✅ URL state captures selection

Performance:
- Navigation completes in 120ms (target: < 200ms)
- Initial domain grid load: 45ms

Next Phase Unblocked: Phase 1.3 (Application Shell) can now begin

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Example: Rejected Commit (Out of Scope)

```
feat: Add storyboard with frame reordering
```

**Rejection Reason:**
- Storyboard is Milestone 2 feature
- Current milestone is Milestone 1
- Attempting future feature early
- Violates roadmap scope discipline

**Required Action:** Rollback and focus on Milestone 1 deliverables

---

## Workflow Mode Guidance

### When to Use Careful Mode

**Required for:**
- Phase 1.1: Data Architecture Foundation (foundational)
- Any schema changes
- Any graph structure modifications
- Performance-critical implementations

**Characteristics:**
- Comprehensive validation
- Architecture reviews required
- Token budget: 5,000
- Time: 30-60 minutes

### When to Use Fast Mode

**Allowed for:**
- Phase 1.2+: UI component development
- Simple bug fixes
- Documentation updates
- Minor refinements

**Characteristics:**
- Self-check validation
- No architecture review
- Token budget: 1,000
- Time: 5-15 minutes

---

## Progress Tracking Template

**Current Phase:** [Insert current phase]
**Status:** [Not Started | In Progress | Blocked | Complete]

### Deliverables Checklist
- [ ] Deliverable 1
- [ ] Deliverable 2
- [ ] Deliverable 3

### Blockers
- None / [List blockers]

### Next Phase Dependencies
- [ ] Dependency 1
- [ ] Dependency 2

### Actual vs Estimated
- Estimated: X hours
- Actual: Y hours
- Variance: Z hours (+/-)

---

## Quick Reference: Milestone Timeline

| Milestone | Theme | Timeline | Status |
|-----------|-------|----------|--------|
| **M1: Core Narrative** | Progressive loading + navigation | 3-4 weeks | In Progress |
| **M2: Presentation Tools** | Storyboard + presentation mode | 2-3 weeks | Not Started |
| **M3: Polish & Performance** | Dark mode + optimization | 1-2 weeks | Not Started |

---

## Quick Reference: Current Milestone Phases

| Phase | Deliverables | Dependencies | Status |
|-------|-------------|--------------|--------|
| **1.1** | Data architecture | None | Check roadmap |
| **1.2** | Navigation hierarchy | 1.1 complete | Check roadmap |
| **1.3** | Application shell | 1.2 complete | Check roadmap |
| **1.4** | Comparison view | 1.3 complete | Check roadmap |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-25 | Initial roadmap compliance framework |

---

**Status:** Active Enforcement Document
**Source of Truth:** `docs/product/IMPLEMENTATION_ROADMAP.md`
**Update Frequency:** Check before starting any task
**Feedback:** Report scope violations to `.agent-os/audit-logs/`
