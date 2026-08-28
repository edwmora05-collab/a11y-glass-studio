# Contributing to A11y Glass Studio

Thank you for helping improve A11y Glass Studio. The project is intentionally small, frontend-only, and focused on clear accessibility feedback.

## Before opening a pull request

Run `pnpm check` and `pnpm build`. Test the page at a desktop width and a narrow mobile width. Use the keyboard to reach every control, verify that focus remains visible, and test the page with reduced motion enabled. If you modify contrast logic, include the input colors, expected ratio, and the WCAG threshold you verified.

## Product principles

Keep the Optical Lab visual language: precise, dark, tactile, and restrained. Prefer changes that make the relationship between a control and its output clearer. Avoid decorative motion that competes with measurement. Do not introduce fake reviews, ratings, testimonials, or invented user feedback.

## Pull request expectations

Explain the user-facing outcome, list the checks you ran, and include screenshots for meaningful visual changes. Keep dependencies limited and document any new dependency in the README. Do not commit secrets, generated credentials, or local environment files.

## Commit style

Use concise imperative messages, for example `Improve contrast result feedback` or `Document local setup`. Keep unrelated refactors out of feature commits.

## Reporting issues

Include your browser, viewport size, input values, reproduction steps, and the expected versus actual behavior. For visual issues, include a screenshot when possible.

<!-- Style reminder: contributions should preserve clarity, measured feedback, keyboard access, and reduced-motion support. -->
