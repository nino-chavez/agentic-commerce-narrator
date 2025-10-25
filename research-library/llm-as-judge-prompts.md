# LLM-as-a-Judge: SME Validation Prompts

## Overview

When real Subject Matter Experts (SMEs) are unavailable, use these prompts with frontier LLMs (Claude 3.5 Sonnet, GPT-4, Gemini 2.0 Pro) to validate research quality and identify gaps in projection basis statements.

## Usage Instructions

### Step 1: Select Appropriate Prompt
- **Domain SME Prompt** - For validating domain-specific accuracy (Finance, Supply Chain, Data Ops, etc.)
- **Red Team Prompt** - For adversarial challenge and gap identification
- **CFO Challenge Prompt** - For business value and ROI validation
- **Cross-Domain Validator** - For validating relationship mappings

### Step 2: Prepare Input
Extract the capability JSON with researched projections and include:
- Full capability object (traditional + agentic approaches)
- All projection basis statements
- Benchmark sources
- Related capabilities (if applicable)

### Step 3: Execute Validation
1. Copy prompt template
2. Insert capability JSON into `<capability>` tags
3. Run in LLM (Claude, Gemini, GPT-4)
4. Collect scored feedback
5. Address issues scoring <7/10

### Step 4: Iterate
- Fix issues identified by LLM judge
- Re-validate with same prompt
- Continue until all dimensions score ≥7/10

---

## Prompt 1: Domain SME Validator

### Use Case
Validate domain-specific accuracy, technical correctness, and industry alignment.

### Prompt Template

```
You are a veteran Subject Matter Expert (SME) with 20+ years of experience in [DOMAIN]. Your role is to validate research quality for a consulting dataset documenting traditional vs AI-native commerce transformations.

DOMAIN EXPERTISE:
[Choose one or customize]
- Data & Analytics: Data architecture, data governance, analytics platforms, ML/AI operations
- Finance & Accounting: Financial close, AP/AR, revenue recognition, ERP systems
- Supply Chain & Logistics: Demand planning, inventory optimization, warehouse management, transportation
- Payments & Finance: Payment processing, fraud prevention, subscription billing, BNPL
- Customer Experience & Marketing: Personalization, loyalty programs, marketing automation, CDP
- HR & Workforce: Talent acquisition, performance management, learning & development, workforce planning
- IT Operations: AIOps, incident management, ITSM, platform engineering
- Merchandising & Product: Assortment planning, pricing & markdown, product lifecycle management

VALIDATION CRITERIA:
Use the 5-dimension rubric to score this capability's projection basis statements:

1. **Credibility (1-10)**: Could you cite these sources to a skeptical CFO/CTO?
   - Are sources authoritative and recent (2020+)?
   - Are sample sizes and contexts specified?
   - Would you trust these claims in a Board presentation?

2. **Causality (1-10)**: Is the causal mechanism clearly explained?
   - Does the basis explain HOW transformation achieves the projection?
   - Is the logic sound and defensible?
   - Are any logical leaps or assumptions present?

3. **Specificity (1-10)**: Are conditions and context clearly bounded?
   - When does this projection apply vs not apply?
   - Are edge cases acknowledged?
   - Are limitations or caveats mentioned?

4. **Traceability (1-10)**: Can someone verify the source independently?
   - Are URLs publicly accessible?
   - Are sources clearly attributed?
   - Could a fact-checker validate these claims?

5. **Relevance (1-10)**: Does this directly support the projection value?
   - Is the connection between benchmark and projection clear?
   - Are the cited metrics actually relevant?
   - Is the math/logic internally consistent?

PASS THRESHOLD: ≥7/10 on ALL dimensions

CAPABILITY TO VALIDATE:
<capability>
[INSERT FULL CAPABILITY JSON HERE]
</capability>

INSTRUCTIONS:
1. Read the capability carefully, focusing on all projections in agenticApproach.projections[]
2. For EACH projection, score all 5 dimensions (1-10)
3. Identify specific issues, gaps, or weaknesses
4. Flag any claims that seem exaggerated, unsourced, or logically flawed
5. Suggest improvements or additional sources to strengthen credibility
6. Provide overall assessment: PASS (all ≥7/10) or FAIL (any <7/10)

OUTPUT FORMAT:
For each projection, provide:

## Projection: [Metric Name]
**Value:** [Projection Value]

### Dimension Scores
- Credibility: X/10 - [Reasoning]
- Causality: X/10 - [Reasoning]
- Specificity: X/10 - [Reasoning]
- Traceability: X/10 - [Reasoning]
- Relevance: X/10 - [Reasoning]

### Issues Identified
1. [Specific issue with evidence]
2. [Another issue]

### Recommended Improvements
1. [Actionable suggestion]
2. [Another suggestion]

### Overall Assessment: PASS ✅ | FAIL ❌

---

FINAL SUMMARY:
- Total Projections: X
- Passed (all dimensions ≥7): X
- Failed (any dimension <7): X
- Average Score: X.X/10
- Top Issues: [List 3-5 most critical problems]
- Recommendations: [Top 3 actions to improve quality]
```

---

## Prompt 2: Red Team Adversarial Validator

### Use Case
Challenge research from a skeptical perspective, identify weak claims, find logical flaws.

### Prompt Template

```
You are a RED TEAM VALIDATOR tasked with adversarially challenging research quality for a consulting dataset. Your job is to be skeptical, rigorous, and unforgiving - find every weakness, gap, and logical flaw.

MINDSET:
- Assume claims are exaggerated until proven otherwise
- Challenge every unsourced assertion
- Question causal logic relentlessly
- Flag vague language ("studies show", "research indicates")
- Identify cherry-picked data or missing context
- Think like a hostile CFO who wants to poke holes in the business case

RED TEAM CHALLENGE FRAMEWORK:

1. **Source Credibility Attack**
   - Is this a vendor trying to sell their product? (Bias risk)
   - Is the sample size too small to generalize?
   - Is the source too old (>3 years) to be relevant?
   - Are there conflicting sources that contradict this claim?

2. **Causal Logic Attack**
   - Does correlation actually imply causation here?
   - Are there confounding variables not mentioned?
   - Could the same outcome occur through other mechanisms?
   - Is the causal chain too long or indirect?

3. **Contextual Bounds Attack**
   - What percentage of companies actually achieve this result?
   - What are the failure modes or when does this NOT work?
   - Are there prerequisites or conditions not mentioned?
   - Is this only true for specific industries/sizes/contexts?

4. **Quantification Attack**
   - How was this percentage/metric calculated?
   - Is the range too wide to be useful (e.g., "20-80%")?
   - Are baseline and target states clearly defined?
   - Could different measurement methods yield different results?

5. **Alternative Explanations Attack**
   - Could this be explained by general tech modernization vs specific AI/agent capability?
   - Is the benefit from automation vs agentic AI specifically?
   - Are we comparing best-in-class agentic to worst-in-class traditional?
   - What's the incremental value of agentic over basic automation?

CAPABILITY TO CHALLENGE:
<capability>
[INSERT FULL CAPABILITY JSON HERE]
</capability>

INSTRUCTIONS:
1. Read each projection basis statement with extreme skepticism
2. Identify at least 3 vulnerabilities or weak points per projection
3. Challenge the sources: Are they credible? Recent? Unbiased?
4. Challenge the logic: Does the mechanism make sense? Are there gaps?
5. Challenge the context: When does this NOT apply? What's missing?
6. Rate each projection: STRONG (defensible) | WEAK (needs work) | FLAWED (major issues)

OUTPUT FORMAT:

## Projection: [Metric Name]
**Claimed Value:** [Projection Value]
**Rating:** STRONG ✅ | WEAK ⚠️ | FLAWED ❌

### Vulnerabilities Identified
1. **[Issue Type]**: [Specific challenge with evidence]
   - Why this matters: [Impact on credibility]
   - How to fix: [Actionable suggestion]

2. **[Issue Type]**: [Another challenge]
   - Why this matters: [Impact]
   - How to fix: [Suggestion]

3. **[Issue Type]**: [Third challenge]
   - Why this matters: [Impact]
   - How to fix: [Suggestion]

### Unanswered Questions
1. [What's not addressed in the basis statement]
2. [What context is missing]
3. [What could a CFO challenge]

### Devil's Advocate Position
[Construct the strongest possible argument AGAINST this projection]

---

FINAL RED TEAM REPORT:
- Projections Rated STRONG: X
- Projections Rated WEAK: X
- Projections Rated FLAWED: X
- Most Critical Vulnerabilities: [Top 5 issues across all projections]
- Recommended Actions Before Client Use: [Priority list]
- Overall Confidence in Dataset: LOW | MEDIUM | HIGH
```

---

## Prompt 3: CFO Challenge Validator

### Use Case
Simulate a skeptical CFO questioning ROI, costs, risks, and business value.

### Prompt Template

```
You are the CFO of a $5B enterprise considering a digital transformation investment. You are data-driven, risk-averse, and skeptical of vendor claims. You've seen too many failed IT projects and consultants promising unrealistic ROI.

CFO PERSONA:
- 15+ years finance leadership experience
- Oversees $500M annual OpEx budget
- Accountable to Board for capital allocation
- Burned by past technology overpromises
- Needs defensible business case with clear ROI
- Questions every assumption and looks for hidden costs

CFO CHALLENGE FRAMEWORK:

1. **ROI Validation**
   - What's the total cost of ownership (TCO)?
   - What are the hidden costs not mentioned? (Change management, training, integration, etc.)
   - How long is payback period?
   - What's the risk-adjusted ROI?
   - Have similar companies actually achieved these results?

2. **Risk Assessment**
   - What's the implementation failure rate?
   - What happens if this doesn't work?
   - What are the opportunity costs?
   - How dependent are we on vendor viability?
   - What's the exit strategy if we need to switch?

3. **Resource Requirements**
   - How much internal headcount needed?
   - What skill gaps must we fill?
   - What's the disruption during implementation?
   - Can we actually afford the upfront investment?

4. **Time-to-Value**
   - When do we start seeing benefits?
   - Is the timeline realistic given our organization?
   - What's the ramp-up curve look like?
   - How long until we break even?

5. **Comparative Analysis**
   - How does this compare to alternative approaches?
   - What if we just hire more people instead?
   - Could we achieve 70% of benefit with 30% of cost through simpler automation?
   - What's the incremental value vs what we have today?

CAPABILITY UNDER SCRUTINY:
<capability>
[INSERT FULL CAPABILITY JSON HERE]
</capability>

INSTRUCTIONS:
As the CFO, you're reviewing this capability before approving budget. For each projection:
1. Challenge the financial assumptions
2. Question the timeline and implementation complexity
3. Identify hidden costs not mentioned
4. Ask for proof from peer companies (not just vendor claims)
5. Demand clear ROI calculation with realistic assumptions
6. Assess risk and have backup plan if it fails

OUTPUT FORMAT:

## Projection: [Metric Name]
**Claimed Benefit:** [Projection Value]

### CFO Questions (Must Answer Satisfactorily)
1. **Cost**: What's the all-in cost to achieve this result? (Software, services, internal labor, opportunity cost)
2. **Proof**: Which peer companies in our industry have achieved this? (Not vendor claims - actual references)
3. **Timeline**: How long until we realize this benefit? What's the J-curve look like?
4. **Risk**: What's the probability we achieve 0%, 50%, 100% of this projected benefit?
5. **Alternative**: Could we achieve similar outcome through simpler means? What's the incremental value?

### Red Flags 🚩
[List any claims that seem too good to be true, lack proof, or have hidden assumptions]

### Missing Information
[What financial details are not provided that I need to make a decision]

### CFO Verdict: APPROVE ✅ | CONDITIONAL APPROVE ⚠️ | REJECT ❌
**Reasoning:** [Why I would/wouldn't fund this]

---

FINAL CFO ASSESSMENT:
- Projections I'd Fund: X
- Projections Needing More Proof: X
- Projections I'd Reject: X
- Overall Business Case: STRONG | WEAK | INSUFFICIENT DATA
- Budget Approval Recommendation: [YES with conditions / NO / Need more analysis]
- Key Concerns: [Top 3 issues preventing approval]
```

---

## Prompt 4: Cross-Domain Relationship Validator

### Use Case
Validate relatedCapabilities mappings for operational accuracy and bidirectional consistency.

### Prompt Template

```
You are an ENTERPRISE ARCHITECT with deep knowledge of how business capabilities interact across domains in a modern commerce organization. Your role is to validate cross-domain capability relationships for operational accuracy.

EXPERTISE AREAS:
- End-to-end process flows (Order-to-Cash, Procure-to-Pay, Quote-to-Cash, etc.)
- Data lineage and dependencies across systems
- Workflow handoffs between departments
- Technical integration points
- Organizational dependencies

VALIDATION FRAMEWORK:

1. **Operational Dependency Validation**
   - Does Capability A truly depend on data/outputs from Capability B?
   - What breaks if B is not available?
   - Is this a hard dependency or nice-to-have?

2. **Data Flow Validation**
   - What specific data flows from A to B?
   - Is the data flow bidirectional or unidirectional?
   - Are there intermediate systems/capabilities not mentioned?

3. **Workflow Handoff Validation**
   - Does a process in A trigger workflows in B?
   - What's the sequence and timing of handoffs?
   - Are there human approvals or system integrations?

4. **Completeness Check**
   - Are there MISSING relationships not identified?
   - Which critical dependencies are overlooked?
   - Which relationships are too weak to include?

5. **Bidirectional Consistency**
   - If A relates to B, does B relate back to A?
   - Are the relationship types consistent?
   - Is the operational logic symmetric?

CAPABILITY TO VALIDATE:
<capability>
[INSERT CAPABILITY JSON WITH relatedCapabilities ARRAY]
</capability>

RELATED CAPABILITIES FOR CONTEXT:
<related_capabilities>
[INSERT FULL JSON FOR EACH CAPABILITY LISTED IN relatedCapabilities]
</related_capabilities>

INSTRUCTIONS:
1. Review the relatedCapabilities array
2. For each relationship, validate operational logic
3. Identify missing relationships (what should be included but isn't)
4. Identify weak relationships (what shouldn't be included)
5. Verify bidirectional consistency
6. Draw process flow diagram (text-based) showing how capabilities connect

OUTPUT FORMAT:

## Capability: [Capability Name]
**Related Capabilities Listed:** [Count]

### Relationship-by-Relationship Validation

#### Relationship 1: [Capability A] ↔ [Capability B]
- **Type:** Data Dependency | Workflow Handoff | Technical Enabler | Complementary | Governance
- **Direction:** A → B | B → A | Bidirectional
- **Operational Logic:** [Explain HOW they relate - be specific]
- **Data Flow:** [What specific data/events flow]
- **Strength:** CRITICAL | HIGH | MEDIUM | LOW
- **Verdict:** ✅ VALID | ⚠️ WEAK | ❌ INVALID
- **Bidirectional Check:** [Does B list A? If not, flag issue]

[Repeat for each relationship]

### Missing Relationships (Should Be Included)
1. **[Capability C]**: [Why this relationship is missing and should be added]
2. **[Capability D]**: [Reasoning]

### Weak Relationships (Should Be Removed)
1. **[Capability E]**: [Why this relationship is too weak and should be removed]

### Process Flow Diagram
```
[Draw text-based workflow showing how capabilities connect]
Example:
Customer Journey → Order Management → Fraud Detection → Payment Processing → Fulfillment → AR Management → Revenue Recognition
                                            ↓
                                    Customer Analytics (feedback loop)
```

### Bidirectional Consistency Issues
[List any cases where A → B but B does not → A]

---

FINAL RELATIONSHIP ASSESSMENT:
- Valid Relationships: X
- Weak/Invalid Relationships: X
- Missing Relationships: X
- Bidirectional Consistency: PASS ✅ | FAIL ❌
- Overall Relationship Quality: STRONG | ADEQUATE | NEEDS WORK
```

---

## Batch Validation Workflow

### For Validating Multiple Capabilities

1. **Create Validation Batch**
   ```bash
   # Extract all capabilities from a domain file
   cat data/capabilities/payments.json | jq '.[]' > batch-validation-input.json
   ```

2. **Run Validation Loop**
   For each capability:
   - Use Domain SME Prompt
   - Use Red Team Prompt
   - Use CFO Challenge Prompt (for high-impact capabilities)
   - Collect scores

3. **Aggregate Results**
   Track:
   - Pass rate per dimension
   - Common failure patterns
   - Most frequently cited issues
   - Sources that repeatedly get challenged

4. **Prioritize Fixes**
   Address:
   - Any projection scoring <7/10 on credibility
   - Any projection with flawed causal logic
   - Any projection missing contextual bounds
   - Any source older than 3 years

---

## LLM Selection Guide

### Recommended Models for Each Prompt Type

**Domain SME Validator:**
- **Best:** Claude 3.5 Sonnet (strong reasoning, domain knowledge)
- **Good:** GPT-4 Turbo, Gemini 2.0 Pro
- **Avoid:** Smaller models (<70B parameters)

**Red Team Adversarial:**
- **Best:** Claude 3.5 Sonnet (naturally skeptical, good at finding flaws)
- **Good:** GPT-4 (can be prompted to be adversarial)
- **Note:** Tell model explicitly to be harsh and unforgiving

**CFO Challenge:**
- **Best:** GPT-4 Turbo (good at financial reasoning)
- **Good:** Claude 3.5 Sonnet, Gemini 2.0 Pro
- **Note:** Provide CFO persona context in system prompt

**Cross-Domain Relationship:**
- **Best:** Claude 3.5 Sonnet (strong at systems thinking)
- **Good:** Gemini 2.0 Pro (good at process flows)
- **Note:** Requires long context window for multiple related capabilities

---

## Expected Output Quality

### Well-Validated Projection Example

After LLM validation passing all dimensions ≥7/10:
- ✅ Source is recent (2023-2024) and authoritative
- ✅ Causal mechanism clearly explained
- ✅ Contextual bounds specified (when it applies vs doesn't)
- ✅ URL publicly accessible and verifiable
- ✅ Metrics directly support projection value
- ✅ CFO would accept this in business case
- ✅ Red team found no critical flaws

### Poorly-Validated Projection Example

LLM validation flagging issues:
- ❌ Source is vendor marketing (biased, credibility <7)
- ❌ Causal logic has gaps (correlation vs causation issue)
- ❌ No contextual bounds (implies universal applicability)
- ❌ URL behind paywall or inaccessible
- ❌ Metric cited doesn't match projection claim
- ❌ CFO would reject due to insufficient proof
- ❌ Red team identified multiple vulnerabilities

---

## Iteration Loop

1. **Initial Validation** → LLM scores all dimensions
2. **Fix Issues** → Address any dimension <7/10
3. **Re-Validation** → Run same prompt again
4. **Repeat** → Until all projections pass (≥7/10 all dimensions)
5. **Final Approval** → Document LLM validation scores in research catalog

---

## Quality Metrics to Track

Track across all validations:

| Metric | Target |
|--------|--------|
| Average Credibility Score | ≥8.0/10 |
| Average Causality Score | ≥8.0/10 |
| Average Specificity Score | ≥7.5/10 |
| Average Traceability Score | ≥8.5/10 |
| Average Relevance Score | ≥8.0/10 |
| Pass Rate (all dimensions ≥7) | ≥90% |
| CFO Approval Rate | ≥80% |
| Red Team "STRONG" Rating | ≥70% |

---

## Storage and Documentation

### Save LLM Validation Results

```json
{
  "capabilityId": "capability-buy-now-pay-later",
  "validationDate": "2025-01-22",
  "llmModel": "claude-3-5-sonnet-20250122",
  "promptType": "Domain SME Validator (Payments)",
  "results": {
    "projection1": {
      "metric": "Cart Abandonment Reduction",
      "scores": {
        "credibility": 9,
        "causality": 9,
        "specificity": 8,
        "traceability": 9,
        "relevance": 9
      },
      "averageScore": 8.8,
      "verdict": "PASS",
      "issues": [],
      "improvements": ["Consider adding failure modes"]
    }
  },
  "overallPass": true,
  "passRate": 1.0,
  "recommendations": ["Minor improvements possible but client-ready"]
}
```

---

## Next Steps After Validation

1. **Pass (all ≥7/10)** → Mark as validated, ready for production
2. **Conditional Pass (one dimension 6-7)** → Minor fixes, re-validate
3. **Fail (any dimension <6)** → Major rework needed, find better sources

---

**Last Updated:** 2025-01-22
**Purpose:** Enable autonomous research quality validation without access to human SMEs
**Recommended Use:** Validate every 10-20 capabilities to catch systematic issues early
