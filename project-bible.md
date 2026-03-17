# Project Bible: Digital Deadman

## One-sentence mission
"Build a simple payment-protection bar that freelance developers can add to client websites before final handover, so unpaid projects stay visibly protected until payment is complete."

## Target user + core value
"Freelance web developers who get ghosted by clients -> a simple way to keep leverage on final delivery without messy arguments."

## Non-goals
"No full dashboard yet, no social sharing, no gamification, no complex user roles, no heavy site-breaking behavior in MVP."

## Tech stack rules
"Next.js app router + Tailwind. Keep the MVP lean. Only add backend/storage when the payment bar flow needs it. No extra libs unless critical."

## Design rules
"Clean, minimal, dark mode default, mobile-first. Show the product visually inside a fake client website screen so users understand it in 5 seconds."

## Naming conventions
"Components: PascalCase, files: kebab-case, env vars: UPPER_CASE"

## Success criteria
"MVP live when: Landing page clearly explains the product, users can copy a real embed script, and the bar can be tested on a live client website."

## Pricing
"Free to use for the MVP. Remove all early-access pricing language."

## Core feature definition
"The main product is a script freelancers add to a client site. That script injects a fixed top bar explaining that the project is pending final payment. Once the freelancer marks the project as paid, the bar disappears."

## MVP implementation approach
"Keep it simple:
1. Deploy Digital Deadman once.
2. Freelancer copies one script tag from the landing page or README.
3. They place the script on the client website before final handover.
4. The script reads simple data attributes like project name, client name, invoice URL, and payment status.
5. If status is pending, the script injects a top sticky bar on the website.
6. If status is paid, the script does nothing."

## Anti-bypass strategy
"Make this easy to understand:
- If the client removes the script from the codebase, they can bypass it. So this only works before final source handover or while the freelancer still controls deployment.
- The real leverage is operational, not magical: the freelancer keeps deployment control until invoice is paid.
- The script should be loaded from our remote server, so we can change bar behavior without asking the freelancer to edit client code again.
- Each project should use a unique project token tied to an allowed domain.
- The script should fail safely and only show a visible payment bar, not destroy the website.
- Later, we can add stronger protections like disabling selected actions or locking premium components, but MVP should stay limited to a visible top bar."

## Product positioning
"This is not a hacker tool. It is a professional payment reminder layer for projects that have not reached final payment yet."

## AI Prompt Instructions
"@project-bible.md Read this file first. Follow every rule strictly. Do NOT add features outside the mission."
