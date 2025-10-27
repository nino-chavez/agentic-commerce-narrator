# Mission & PRD Compliance Instructions

**Version:** 1.0.0
**Date:** 2025-10-25
**Enforcement:** MANDATORY
**Applies To:** All workflow modes (Fast, Careful)

## Purpose

This document provides enforceable validation checklists to ensure all development work aligns with the Product Mission, PRD, and Implementation Roadmap. Non-compliance will trigger auto-rollback.

---

## Core Strategic Documents (MUST READ)

Before implementing ANY feature, you MUST verify alignment with:

### 1. Product Mission (`docs/product/PRODUCT_MISSION.md`)

**Four Foundational Principles (Non-Negotiable):**

1. **Signal Over Noise**
   - 80% of UI real estate dedicated to Traditional vs. Agentic comparison
   - No node-centric views, relationship graphs, or exploration interfaces
   - Every view must answer: "What changes? Why is it better?"

2. **The Narrative IS the Navigation**
   - Navigation structure follows data hierarchy: Concept → Domain → Capability
   - No abstract modes like "Browse," "Visualize," "Wizard"
   - One path: Concept → Domain → Capability → Comparison

3. **Progressive Disclosure is Mandatory**
   - Initial load shows only 10 domains
   - User must never see full 1,292-node graph complexity
   - Functions, agents, personas behind tabs/accordions only

4. **The Consultant is the "Pilot"**
   - Global controls: Search (Cmd+K), Filters (Industry + Persona), Storyboard
   - All interactions < 200ms
   - URL captures entire view configuration (100% shareable)
   - Presentation mode: full-screen, distraction-free

**Success Criteria (Performance Requirements):**
- Time to first insight: < 10 seconds
- Context switch time (change filters): < 2 seconds
- Time to build 8-frame storyboard: < 5 minutes
- Client question response time: < 5 seconds
- Initial page load: < 1 second
- Domain data fetch: < 500ms
- UI interaction latency: < 200ms

### 2. PRD (`docs/product/PRD.md`)

**Primary User Persona: The Consultant / Pilot**
- Must adapt presentation to client questions in real-time
- Needs instant filtering by industry and persona
- Builds custom storyboard flow during presentation
- Shares exact view via URL

**User Goals (Must Map To):**
1. Filter to client's context in < 10 seconds
2. Navigate to business capability in < 5 seconds
3. Answer 95% of client questions without leaving tool
4. Build 8-10 frame custom presentation in < 5 minutes
5. Share exact view with colleagues and clients

### 3. Implementation Roadmap (`docs/product/IMPLEMENTATION_ROADMAP.md`)

**Current Milestone Status:**
- Check roadmap for current phase deliverables
- Verify task is within current milestone scope
- Respect phase dependencies

---

## Pre-Implementation Validation Checklist

**Before writing any code, you MUST verify:**

### Mission Alignment
- [ ] Feature implements at least ONE of the four foundational principles
- [ ] Feature does NOT violate any foundational principle
- [ ] Feature meets at least ONE success criteria metric
- [ ] Feature follows the data hierarchy (not custom navigation)

### PRD Alignment
- [ ] Feature maps to at least ONE user goal from primary persona
- [ ] Feature is explicitly listed in "In Scope (v1.0)" section
- [ ] Feature is NOT listed in "Out of Scope" or "Explicitly Rejected"
- [ ] Feature supports the "Narrative Cockpit" vision (not "Data Explorer")

### Roadmap Alignment
- [ ] Task is part of current milestone deliverables
- [ ] All dependencies from previous phases are complete
- [ ] Implementation follows the specified workflow mode (Fast/Careful)

### Design Alignment
- [ ] Reviewed relevant sections in VISUAL_DESIGN_SYSTEM.md
- [ ] Identified which design patterns apply
- [ ] Color palette selections made (Traditional/Agentic)
- [ ] Component patterns identified

---

## During Implementation Checklist

### Code Quality
- [ ] No code violates "Progressive Disclosure" principle
- [ ] No "Data Explorer" anti-patterns (graph viz, browse all, node-centric)
- [ ] Performance meets success criteria (< 200ms interactions)
- [ ] URL state preserved for shareability

### UX Quality
- [ ] Navigation follows data hierarchy (no custom modes)
- [ ] Search is globally accessible (Cmd+K)
- [ ] Filters are persistent across navigation
- [ ] Storyboard functionality preserved

### Technical Quality
- [ ] TypeScript strict mode compliance
- [ ] Zero compilation errors
- [ ] Zero ESLint warnings
- [ ] All tests passing

---

## Post-Implementation Validation Checklist

### Documentation
- [ ] Commit message cites which Mission principle implemented
- [ ] Commit message references which PRD user goal addressed
- [ ] Commit message confirms design system compliance
- [ ] Feature added to current milestone completion tracker

### Testing
- [ ] Feature tested against success criteria metrics
- [ ] Performance validated (< 200ms interactions)
- [ ] URL state shareable and persistent
- [ ] Works in presentation context (consultant presenting)

### Compliance Verification
- [ ] No violations of "Explicitly Rejected" features
- [ ] No regressions on foundational principles
- [ ] Milestone deliverable marked complete

---

## Auto-Rejection Triggers

**The following features are EXPLICITLY REJECTED in PRD and will trigger auto-rollback:**

### ❌ Principle Violations

**Signal Over Noise:**
- Graph visualization as primary interface
- Node-centric detail pages
- Relationship explorer interfaces
- Data tables showing all nodes

**Narrative IS Navigation:**
- Custom navigation models separate from data hierarchy
- "Browse," "Visualize," "Wizard" mode switching
- Non-hierarchical navigation patterns

**Progressive Disclosure:**
- "Browse all capabilities" view
- Full graph exposed on initial load
- Dashboard showing all nodes/relationships

**Consultant is Pilot:**
- Static, non-interactive presentations
- Slow loading (> 1s initial, > 500ms domain fetch)
- Non-shareable URLs
- Missing global controls (Search, Filters, Storyboard)

### ❌ Out of Scope Features

These are explicitly out of scope for v1.0:
- Graph visualization
- Multi-user collaboration / commenting
- PowerPoint/PDF export automation
- Custom branding/white-labeling
- Analytics dashboard
- CRM integration
- Tablet/mobile responsive (desktop 1280px+ only)
- User authentication

### ❌ Anti-Patterns

- Emojis in UI (enterprise professional aesthetic)
- Asking users "What do you want to find?"
- Exposing database complexity
- Non-performant interactions (> 200ms)
- Non-shareable state

---

## Compliance Enforcement

### Fast Mode
**Validation:** Self-check using this checklist
**Required:** Document principle/goal in commit message
**Rollback:** Triggered on auto-rejection violations

### Careful Mode
**Validation:** Comprehensive compliance review before implementation
**Required:** Pre-implementation approval on alignment
**Documentation:** Detailed compliance report in audit log
**Rollback:** Triggered on any checklist failure

---

## Example Commit Messages

### ✅ Good - Fully Compliant

```
feat: Add domain-to-capability progressive navigation

Implements PRD User Goal: "Navigate to any business capability in < 5 seconds"
Aligns with Mission Principle: "The Narrative IS the Navigation"
Design System: Uses traditional-600 for sidebar, agentic-500 for active state
Performance: Navigation completes in 120ms (target: < 200ms)
Milestone: Phase 1.2 - Navigation Hierarchy (Complete)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### ✅ Good - Clear Alignment

```
feat: Add Cmd+K global search with instant results

Implements PRD User Goal: "Answer client questions in < 5 seconds"
Aligns with Mission Principle: "The Consultant is the Pilot"
Design System: Modal overlay with agentic-500 highlights
Performance: Search indexing preloaded, results < 100ms
Milestone: Phase 1.3 - Application Shell (Complete)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### ❌ Bad - Missing Compliance

```
feat: Add graph visualization feature
```

**Rejection Reason:** Explicitly rejected in PRD, violates "Progressive Disclosure" principle

### ❌ Bad - No Alignment Documentation

```
feat: Add capability detail page
```

**Rejection Reason:** No mission principle cited, no user goal referenced, no design system compliance

---

## Quick Reference: Mission Principles

| Principle | Key Requirement | Anti-Pattern |
|-----------|----------------|--------------|
| **Signal Over Noise** | 80% UI for A-vs-B comparison | Graph explorer, node views |
| **Narrative IS Navigation** | Follow data hierarchy | Custom modes, abstract navigation |
| **Progressive Disclosure** | Hide 1,292-node complexity | "Browse all," full graph view |
| **Consultant is Pilot** | < 200ms interactions, shareable URLs | Static presentation, slow loading |

---

## Quick Reference: PRD User Goals

| User Goal | Success Criteria | Feature Examples |
|-----------|-----------------|------------------|
| Filter to context | < 10 seconds | Industry + Persona filters |
| Navigate to capability | < 5 seconds | Domain → Capability hierarchy |
| Answer client questions | < 5 seconds | Cmd+K global search |
| Build storyboard | < 5 minutes | Add/remove/reorder frames |
| Share view | 100% shareable | URL state serialization |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-25 | Initial compliance framework |

---

**Status:** Active Enforcement Document
**Next Review:** After Milestone 1 completion
**Feedback:** Report compliance issues to `.agent-os/audit-logs/`
