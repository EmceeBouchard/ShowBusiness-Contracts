# How the Weekly Threat Matrix Cron Job Was Set Up

This documents the process used to automate the weekly Threat Matrix update, so it
can be understood, changed, or recreated later. It is a companion to
[`threat-matrix-update-prompt.md`](./threat-matrix-update-prompt.md), which holds
the prompt the job runs.

## Goal

Replace a manual calendar reminder — "open the ShowBusiness Contracts project in
Claude.ai and paste the standing update prompt to research new predatory contract
terms and propose edits to `threatMatrix.ts`" — with an automated weekly job.

## What was created

1. **A prompt file in the repo** — `docs/threat-matrix-update-prompt.md`. Puts the
   standing update prompt under version control instead of a personal reminder.
2. **A scheduled Routine (the "cron job")** — a Claude Code scheduled trigger that
   fires weekly, spawns a fresh session, runs the prompt, and opens a draft PR.

> **Important distinction:** the *prompt* is a file in this repo; the *schedule* is
> **not**. A Routine lives in Claude Code's scheduling system (tied to the remote
> execution environment), not in the git repository. Cloning the repo does not
> recreate the schedule — use the recreate steps below for that.

## Why a Routine, and not `CronCreate`

Claude Code exposes two scheduling mechanisms. The choice matters:

| Mechanism | Persistence | Fit for this task |
| --- | --- | --- |
| `CronCreate` | In-memory, **session-only**, auto-expires after 7 days | ❌ Would vanish when the session ends |
| **Routine** (`create_trigger`) | Durable, survives across sessions/restarts | ✅ Correct choice |

A weekly job that must outlive any single session requires the durable Routine.
`CronCreate` is only appropriate for short-lived, within-session reminders.

## Exact configuration used

The Routine was created with the `create_trigger` tool
(`mcp__Claude_Code_Remote__create_trigger`) using these settings:

| Field | Value |
| --- | --- |
| `name` | `Threat Matrix weekly update` |
| `cron_expression` | `17 14 * * 1` — Mondays at 14:17 **UTC** (~9:17am ET) |
| `create_new_session_on_fire` | `true` — each run starts a fresh, clean session |
| `notifications` | `{ push: true, email: true }` — notify on completion |
| `prompt` | The standing update prompt (summarized inline; full version in `threat-matrix-update-prompt.md`) |

Notes on the choices:

- **Cron is in UTC** for Routines (unlike `CronCreate`, which uses local time).
  `17 14 * * 1` = minute 17, hour 14, any day-of-month, any month, day-of-week 1
  (Monday). The off-:00 minute (`:17`) is intentional — it avoids the load spike of
  every schedule firing exactly on the hour.
- **`create_new_session_on_fire: true`** because each weekly run is independent
  research; it should not accumulate context from prior weeks.
- **Fresh sessions get the repo re-cloned**, so the job can read
  `threatMatrix.ts` and the prompt file, and push a branch.

## What each weekly run does

1. Reads `docs/threat-matrix-update-prompt.md` and follows it.
2. Uses web search to research newly emerging predatory contract terms
   (AI-exploitation clauses, SAG-AFTRA / WGA / AEA / DGA changes, new
   rights-grab / scope-creep / systemic-trap language, relevant litigation or
   legislation).
3. Proposes edits to `client/src/lib/threatMatrix.ts` (and `shared/schema.ts` if a
   new `ThreatCategory` is needed), only ever adding or strengthening protections.
4. Verifies the project type-checks (`npm run check`).
5. Commits to a new branch and opens a **draft** PR titled
   `Threat Matrix weekly update — <date>`. If nothing new is found, it opens no PR.

## Managing the Routine

From a Claude Code session (the tools live under the Claude Code Remote MCP
server), you can:

- **List** triggers to find the ID: `list_triggers`.
- **Change** cadence, prompt, name, or enabled state: `update_trigger`
  (e.g. set a different `cron_expression`, or `enabled: false` to pause).
- **Delete** it: `delete_trigger`.
- **Run it now** (outside the schedule): `fire_trigger`.

Or manage it from the Routines UI on claude.ai.

The trigger ID created for this job was `trig_01LBXnkG8Mur7FyhyEquPxmx`
(re-confirm with `list_triggers` before acting on it, since IDs can change if the
Routine is recreated).

## Recreating it from scratch

If the Routine is ever lost (e.g. the environment is rebuilt), recreate it by
calling `create_trigger` with the configuration in the table above. In plain
terms, the request to Claude Code is:

> Create a weekly Routine that fires Mondays at 14:17 UTC, starts a fresh session,
> and runs the standing prompt in `docs/threat-matrix-update-prompt.md` against
> this repo to research new predatory contract terms and open a draft PR proposing
> edits to `client/src/lib/threatMatrix.ts`. Notify me on completion.

## Caveat: connectors in fired sessions

The Routine was created without MCP connectors passed through, so fired sessions
run without connector tools (e.g. the GitHub MCP). Pushing a branch always works;
if opening the draft PR itself ever fails, the run still pushes the branch and
reports it. To make PR creation fully reliable, recreate the Routine from a
session that holds the GitHub connector so it is passed through.
