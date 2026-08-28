# A11y Glass Studio

> **Measure contrast. Shape glass. Ship accessible surfaces.**

A11y Glass Studio is a focused, browser-based design tool that combines a WCAG contrast checker with a live glassmorphism CSS generator. It was created to help designers make visual decisions with measurable accessibility feedback, instead of treating contrast and material styling as separate steps.

## Why this exists

Accessible visual design is easier to adopt when the feedback is immediate and part of the creative workflow. A11y Glass Studio places the contrast ratio, WCAG status, rendered text sample, glass preview, controls, and generated CSS in one calm workspace. The interface is intentionally dark and instrument-like: it gives visual hierarchy to the result while keeping the controls close to the thing they change.

The project is also a compact reference implementation for teams who want a client-only accessibility utility with no account, no database, and no required API key.

## Who it is for

The tool is designed for product designers, UX/UI designers, frontend developers, design-system maintainers, accessibility specialists, and students learning how color contrast and translucent surfaces behave in practice. It is especially useful during early visual exploration, design reviews, and handoff preparation.

It is not a replacement for a complete accessibility audit. It evaluates the color-pair and glass properties exposed by this interface; production interfaces should still be tested in their real context, with keyboard navigation, zoom, screen readers, non-text contrast, focus states, and automated/manual audit tools.

## Features

| Feature | What it does |
| --- | --- |
| Live contrast ratio | Calculates the relative-luminance ratio for foreground and background colors as values change. |
| WCAG 2.1 results | Reports AA and AAA status for small and large text thresholds. The thresholds follow WCAG 2.1 guidance for normal and large text. [1] [2] |
| Color controls | Supports native color picking and editable `#RRGGBB` values with validation feedback. |
| Live type sample | Renders the selected foreground and background colors together so the number has visual context. |
| Contrast presets | Starts from curated high-contrast combinations and supports quick switching. |
| Swap and reset | Swaps foreground/background roles or restores the default calibration in one action. |
| Glassmorphism generator | Adjusts background opacity, backdrop blur, and border opacity with live range controls. |
| CSS output | Generates a ready-to-copy `.glass-panel` rule with both `backdrop-filter` and the WebKit fallback. [5] |
| Copy feedback | Uses the Clipboard API when available and a graceful fallback when it is not. [3] |
| Reduced-motion support | Disables non-essential motion when the user prefers reduced motion. [4] |
| Responsive layout | Reflows the two labs into a single-column mobile workspace without hiding the core controls. |

## How to use it

1. Open the Contrast Lab and choose a text color with the color picker or edit the hexadecimal value.
2. Choose a background color. The ratio dial, live sample, and compliance rows update immediately.
3. Read the Small text and Large text results. AA is generally the practical baseline for body copy; AAA is a stricter target. Confirm the exact threshold against the current WCAG guidance for the context you are designing. [1] [2]
4. Use **Browse presets** for a quick starting point, or use **Swap colors** to test the inverse relationship.
5. Open the Material Lab and adjust background opacity, backdrop blur, and border opacity.
6. Observe the translucent panel over the spectrum image. The CSS output stays synchronized with the preview.
7. Select **Copy CSS** and paste the generated class into your stylesheet.
8. Use **Reset** to restore the default colors and glass settings.

## Accessibility notes

The checker uses the WCAG relative-luminance contrast calculation and compares the result with the small- and large-text AA/AAA thresholds. Large text is defined by WCAG as at least 18 point (approximately 24 CSS pixels) or 14 point (approximately 18.66 CSS pixels) bold; the tool displays that practical CSS interpretation next to the result. [1]

The application also includes visible keyboard focus, semantic labels, live outputs for range controls, text alternatives for decorative imagery, and a `prefers-reduced-motion` media query for non-essential animation. The generator includes the WebKit-prefixed fallback because browser support for CSS features can vary by environment. [4] [5]

> A passing color ratio does not guarantee that a complete interface is accessible. Check context, font rendering, focus indicators, adjacent UI boundaries, states, and actual user flows before shipping.

## Technical stack

| Layer | Choice |
| --- | --- |
| UI | React 19 with TypeScript |
| Styling | Tailwind 4 import plus a purpose-built CSS layer for the Optical Lab visual system |
| Interaction | React state, native color inputs, native range inputs, Clipboard API |
| Icons | `lucide-react` |
| Notifications | `sonner` |
| Build | Vite 7 and TypeScript |
| Hosting model | Frontend-only static application |
| Visual assets | Project-scoped Manus storage URLs for generated visual assets |

The original product brief requested HTML, static CSS, and vanilla JavaScript. This repository uses the managed React/Vite frontend scaffold so the delivered application remains a static browser experience while keeping the UI maintainable as reusable components. No backend, database, login, or external API is required.

## Local development

### Requirements

Use Node.js 20 or newer and pnpm 10 or newer.

### Install and run

```bash
pnpm install
pnpm dev
```

Vite will print the local development URL. The application is fully client-side and does not need environment-specific application secrets for its core features.

### Quality checks

```bash
pnpm check
pnpm build
```

`pnpm check` runs TypeScript validation. `pnpm build` creates the production frontend bundle and verifies the managed build pipeline.

## Repository structure

```text
client/
  index.html              Document metadata, fonts, and root mount
  src/
    App.tsx               Theme provider and route entry point
    index.css             Optical Lab tokens, layout, components, and motion
    pages/Home.tsx        Single-page application and interaction logic
    components/ui/        Reusable scaffold components
server/                   Managed compatibility server; untouched by the UI feature work
shared/                   Shared scaffold placeholders
ideas.md                  Design exploration and the selected visual system
todo.md                   Revision and release checklist
```

## Design system

The selected direction is **Optical Lab**. Mineral black creates a low-distraction instrument surface. Electric citron (`#E9FF70`) is the signature action and positive-status color. Cobalt and coral act as optical accents inside the glass preview. Space Grotesk carries display hierarchy, while DM Mono identifies values, measurements, and code.

The interface favors asymmetry, thin calibration lines, circular ratio instrumentation, material previews, and short motion transitions. Animations are deliberately subordinate to the measurement: transitions should clarify a change, not compete with it.

## Deployment

The repository can be stored on GitHub for collaboration and versioning. The managed Manus project can also be published from the project Management UI after a checkpoint has been created. For a static-hosting workflow outside Manus, confirm that the host supports the Vite build output and client-side fallback behavior before choosing a provider.

This repository does not commit generated secrets. If a future feature introduces a server-side integration, keep credentials in the hosting platform's secret manager rather than in source control.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Keep changes focused, preserve keyboard support, test responsive behavior, and explain any change to the contrast logic or visual thresholds. Do not add fabricated reviews, ratings, or testimonials to demonstrate the product.

## Security

Please read [SECURITY.md](SECURITY.md) for responsible disclosure guidance. The current application is frontend-only and should not be used to process confidential design-system data that must remain private in a browser session.

## License

This project is released under the MIT License. See [LICENSE](LICENSE).

## References

[1]: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html "Web Content Accessibility Guidelines — Contrast Minimum"
[2]: https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html "Web Content Accessibility Guidelines — Contrast Enhanced"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API "MDN — Clipboard API"
[4]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion "MDN — prefers-reduced-motion"
[5]: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter "MDN — backdrop-filter"
[6]: https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories "GitHub Docs — About repositories"

<!-- Design reminder: documentation should feel like the product—precise, transparent, practical, and calm. -->
