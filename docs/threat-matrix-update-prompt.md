# Threat Matrix — Standing Weekly Update Prompt

This is the standing prompt used to keep the app's contract **Threat Matrix**
current. It is run automatically once a week by a scheduled Routine (see
"Automation" below), which replaces the old manual reminder to open the project
in Claude.ai and paste this by hand.

The Threat Matrix lives at [`client/src/lib/threatMatrix.ts`](../client/src/lib/threatMatrix.ts).
It is the diagnostic engine behind ShowBusiness: Contracts — an immutable-in-spirit
list of predatory clause patterns (`ThreatPattern[]`) plus `GREEN_FLAG_PATTERNS`.

---

## The Prompt

> You are maintaining the Threat Matrix for **ShowBusiness: Contracts**, a private
> tool that helps working artists (actors, writers, voice actors, designers) spot
> predatory terms in work-for-hire agreements.
>
> **Your task this week:** research newly emerging predatory contract terms and
> propose edits to `client/src/lib/threatMatrix.ts`.
>
> 1. **Research.** Look for developments over roughly the last 1–3 months in:
>    - New AI-exploitation clauses (voice cloning, digital replicas, synthetic
>      performers, AI training rights, generative-AI usage).
>    - SAG-AFTRA, WGA, AEA, and DGA contract changes, MOUs, and guidance.
>    - Emerging rights-grab / scope-creep / systemic-trap language appearing in
>      streaming, gig-platform, indie, and theatrical contracts.
>    - Notable disputes, litigation, or legislation (e.g. state laws restricting
>      arbitration or protecting digital likeness) affecting artist contracts.
>
> 2. **Propose edits.** For each genuinely new or materially changed threat:
>    - Add a new `ThreatPattern` entry, or extend the `keywords`/`context`/
>      `strategicNote`/`revisionTemplate` of an existing one.
>    - Match the existing object shape **exactly** (`category`, `keywords`,
>      `title`, `description`, `context`, `strategicNote`, `revisionTemplate`).
>    - If a new `category` is required, add it to the `ThreatCategory` type in
>      `shared/schema.ts` in the same change.
>    - Keep the "seasoned legal expert / cynical negotiator / smart, kind friend"
>      tone of the existing entries.
>
> 3. **Guardrails.**
>    - Do **not** delete or weaken existing protections — only add or strengthen.
>    - Keep changes evidence-based; cite the source for each proposed addition in
>      the PR description (not in the code).
>    - Ensure the file still type-checks (`npm run check`).
>
> 4. **Deliver.** Commit to a new branch and open a **draft** pull request titled
>    `Threat Matrix weekly update — <date>`. In the PR body, list each proposed
>    change with a one-line rationale and a source link. If a week's research
>    surfaces nothing new worth adding, open no PR and simply note that the matrix
>    is current.

---

## Automation

This prompt is scheduled to run automatically once a week via a Claude Code
Routine (scheduled trigger) that spawns a fresh session, performs the research,
and opens a draft PR. Because it now runs on a schedule, the manual calendar
reminder to "open the project in Claude.ai and paste the standing update prompt"
is no longer needed.

To change the cadence, pause it, or stop it, manage the Routine from Claude Code
(list / update / delete triggers).
