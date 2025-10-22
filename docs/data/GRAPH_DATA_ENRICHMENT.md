
Act as an AI Research Analyst.
Your sole task is to find **publicly citable data** for a 'Benchmark-to-Projection' data model.

**CRITICAL GUARDRAIL:** You MUST provide a valid 'sourceTitle' and 'sourceURL' for EVERY number you find. Do not 'hallucinate' or invent data. If you cannot find a citable source for a specific metric, set its 'value' to 'NOT FOUND' and 'sourceURL' to null.

**YOUR ASSIGNMENT:**
Research the following capability:
* **Capability:** 'Contract Lifecycle Management (CLM)'

**METRICS TO FIND:**

1.  **Benchmarks (Traditional State):**
    * 'Manual contract drafting time' (Your file mentions '2-10 hours')
    * 'Manual contract repository coverage %' (Your file mentions '20-40%')
    * 'Contract approval cycle time (manual)' (Your file mentions '5-15 days')
    * 'Manual contract renewal tracking %' (Your file mentions '10-30%')

2.  **Projections (Agentic State):**
    * 'AI contract drafting time reduction' (Your file mentions '80%')
    * 'AI contract approval cycle reduction' (Your file mentions '60%')
    * 'AI-driven contract renewal tracking %' (Your file mentions '100%')

**OUTPUT FORMAT:**
Provide your findings as a single, minified JSON object. Do not include any other text, reasoning, or markdown formatting. Use the exact structure below.

```json
{
  \"capability\": \"Contract Lifecycle Management (CLM)\",
  \"benchmarks\": [
    {\"metric\": \"Manual contract drafting time\", \"value\": \"...\", \"sourceTitle\": \"...\", \"sourceURL\": \"...\"},
    {\"metric\": \"Manual contract repository coverage %\", \"value\": \"...\", \"sourceTitle\": \"...\", \"sourceURL\": \"...\"},
    {\"metric\": \"Contract approval cycle time (manual)\", \"value\": \"...\", \"sourceTitle\": \"...\", \"sourceURL\": \"...\"},
    {\"metric\": \"Manual contract renewal tracking %\", \"value\": \"...\", \"sourceTitle\": \"...\", \"sourceURL\": \"...\"}
  ],
  \"projections\": [
    {\"metric\": \"AI contract drafting time reduction\", \"value\": \"...\", \"sourceTitle\": \"...\", \"sourceURL\": \"...\"},
    {\"metric\": \"AI contract approval cycle reduction\", \"value\": \"...\", \"sourceTitle\": \"...\", \"sourceURL\": \"...\"},
    {\"metric\": \"AI-driven contract renewal tracking %\", \"value\": \"...\", \"sourceTitle\": \"...\", \"sourceURL\": \"...\"}
  ]
}
" > research_output.json
