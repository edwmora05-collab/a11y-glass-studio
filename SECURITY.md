# Security Policy

## Scope

A11y Glass Studio is currently a frontend-only static application. It does not include a database, authentication flow, or server-side handling of user-submitted color values.

## Supported versions

Only the latest version on the default branch is actively maintained.

## Reporting a vulnerability

Please do not open a public issue for a suspected security vulnerability. Contact the project maintainer privately with a clear description, reproduction steps, affected files or URLs, and any suggested mitigation. Do not include real secrets or personal data in a report.

## Secret handling

Never commit API keys, tokens, passwords, `.env` files, or private design-system material. Use the secret manager provided by the selected hosting platform if a future server-side integration is added.

<!-- Style reminder: keep security communication factual, direct, and transparent. -->
