# Research Library

This directory contains research sources, extracted metrics, and documentation for all enrichment-related research efforts.

## Purpose

Store and catalog all research sources used to populate projection basis statements across the 125 capabilities in the Agentic Commerce Narrator dataset.

## Structure

```
/research-library/
├── README.md (this file)
├── /analyst-reports/           Gartner, Forrester, IDC, McKinsey reports
├── /vendor-case-studies/       Vendor-specific merchant case studies
├── /industry-benchmarks/       NRF, CSCMP, SHRM, Baymard Institute data
├── /extracted-metrics/         Parsed metrics from sources
├── *-research-catalog.json     Capability-specific research catalogs
└── research-template.json      Template for new research efforts
```

## Research Catalog Files

Each major capability domain has a research catalog (JSON format) documenting:
- Sources used (with URLs, dates, credibility scores)
- Extracted metrics (with context and sample sizes)
- Tier classification (Tier 1/2/3)
- Key findings summary

**Existing Catalogs:**
- `payments-research-catalog.json` - BNPL, Crypto, Payment Orchestration, Subscriptions, Revenue Recognition (11 projections, 12 sources)

## Quality Standards

### Source Credibility Scoring (1-10)

| Score | Description |
|-------|-------------|
| 9-10  | Tier 1 Analyst firm (Gartner, Forrester, IDC) or academic peer-reviewed |
| 8-9   | Tier 1 Vendor case study with large sample size |
| 7-8   | Tier 2 Industry benchmark or association data |
| 6-7   | Tier 2 Trade publication survey |
| <6    | Insufficient credibility, do not use |

### Source Recency Requirements

- **Preferred:** 2023-2025
- **Acceptable:** 2020-2022
- **Avoid:** Pre-2020 (unless historical baseline)

### Tier Classification

**Tier 1 (Target: 60-70% of projections)**
- Vendor case studies with specific merchant data
- Analyst reports (Gartner, Forrester, IDC, McKinsey, etc.)
- Academic research (Google Scholar, MIT Sloan, HBR)

**Tier 2 (Target: 20-30% of projections)**
- Industry benchmarking reports (APQC, Hackett, SHRM)
- Trade association data (NRF, CSCMP, GMA)
- Government statistics (BLS, Census Bureau)

**Tier 3 (Target: 10-20% of projections)**
- First principles analysis (time-motion, error rates, economics)
- Infrastructure calculations (redundancy, scalability)
- Operational workflow analysis

## Research Workflow

### 1. Identify TBD Placeholders

```bash
grep -r "TBD:" data/capabilities/*.json
```

### 2. Execute Research

**For each projection:**
1. Web search for Tier 1 sources (vendor case studies, analyst reports)
2. Extract specific metrics with context
3. If no Tier 1 found, search Tier 2 (industry benchmarks)
4. If no Tier 2 found, use Tier 3 (first principles)
5. Document source in research catalog

**Search Query Template:**
```
[Vendor Name] [Capability] case study statistics [Year]
[Analyst Firm] [Domain] report benchmarks 2024
```

### 3. Write Basis Statement

**Template:**
```
[Tier X] Based on [Source Name] ([Year]) showing [specific metric] through [causal mechanism]. [Additional validation from secondary source if available]. Causal mechanism: [Explain HOW transformation achieves projection]. Effect most pronounced [contextual bounds].
```

**Example (Tier 1):**
```json
{
  "basis": "[Tier 1] Based on Affirm and Klarna merchant data (2023-2024) showing BNPL options reduce cart abandonment by 20-30% for high-value purchases through elimination of upfront cost barriers. Affirm reports merchants see cart abandonment rates plummet 28% when pay-later options are available, while Klarna merchants report 30% conversion increases during implementation. Baymard Institute research (2024) validates this mechanism, finding 40% of BNPL users will abandon cart if installment option is unavailable at checkout. Causal mechanism: Installment payment flexibility reduces psychological purchase hesitancy by spreading costs over time, particularly effective for discretionary purchases >$200 and younger demographics (18-35) who prefer BNPL over traditional credit. Effect most pronounced during economic uncertainty when consumers have liquidity concerns but maintain purchase intent."
}
```

### 4. Update Research Catalog

Add source to capability-specific catalog with:
- Source metadata (title, author, date, URL, type)
- Extracted metrics (metric name, value, context, sample size)
- Credibility score (7-10 required)
- Relevant capabilities (capability IDs)

### 5. Cross-Validate

- Check multiple sources for controversial claims
- Verify URLs are publicly accessible
- Confirm metrics match source content (not inferred)
- Flag low-confidence projections for SME review

## Proof of Concept Results

### Payments.json Research (2025-01-22)

**Scope:** 11 TBD placeholders across 5 capabilities
**Time:** ~2 hours research + documentation
**Results:**
- ✅ 11/11 projections researched
- ✅ 12 Tier 1 sources identified
- ✅ 8 Tier 1 basis statements (73%)
- ✅ 1 Tier 2 basis statement (9%)
- ✅ 2 Tier 3 basis statements (18%)
- ✅ 100% sources dated 2023-2024
- ✅ Average credibility score: 8.3/10

**Key Learnings:**
1. Vendor blogs and case study pages are rich Tier 1 sources
2. Analyst firm reports often referenced in vendor materials (indirect access)
3. Industry associations (Baymard, Nilson Report) provide critical validation
4. Tier 3 first principles useful for infrastructure/reliability projections
5. Cross-validation (multiple sources) significantly strengthens credibility

## Next Steps

### Immediate (Weeks 1-2)
- Research high-priority files: data-operations.json, enterprise-hr.json, finance-accounting.json
- Create research catalogs for each domain
- Build reusable search query library

### Medium-term (Weeks 3-8)
- Complete all 451 TBD placeholders
- Consolidate common sources into shared library
- Develop automated source verification scripts

### Long-term (Post-completion)
- Quarterly source refresh (check for newer reports)
- Annual credibility re-scoring
- Expand to new capabilities as product evolves

## Tools & Automation

### Recommended Search Tools
- Google (with site: filters for vendor blogs)
- Google Scholar (for academic research)
- LinkedIn (for case study announcements)
- Analyst firm portals (Gartner, Forrester with subscriptions)

### Validation Scripts
```bash
# Check all URLs are accessible
node scripts/validate-sources.js

# Find TBD placeholders
grep -r "TBD:" data/capabilities/*.json | wc -l

# Count completed vs pending
npm run research:status
```

## Contributing

When adding new research:
1. Follow the 3-tier methodology strictly
2. Always include causal mechanism in basis statements
3. Specify contextual bounds (when does projection apply vs not)
4. Cross-validate with multiple sources for critical metrics
5. Update research catalog with full metadata
6. Score credibility honestly (≥7 required, <7 = find better source)

---

**Last Updated:** 2025-01-22
**Status:** Active - Payments domain complete (11/11 projections), 440 remaining
**Maintainer:** Data Enrichment Team
