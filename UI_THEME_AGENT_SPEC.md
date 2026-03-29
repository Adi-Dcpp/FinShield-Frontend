# FinShield UI Agent Spec (Authoritative)

Purpose: this file is the single source of truth for AI agents and human developers to recreate FinShield UI without style drift.

Scope:
- Dashboard screen
- Payment Simulator screen
- Shared permanent background theme
- Shared component styling (glassy effect)

If an instruction from an AI prompt conflicts with this file, follow this file.

## 1. Brand Identity

Theme name: `FinShield Cosmic Glass`

Visual direction:
- Futuristic fintech command center
- Deep-space background with cyan and magenta nebula glow
- Glassmorphism cards and controls
- Calm, premium, high-trust tone

## 2. Hard Non-Negotiable Rules

1. Do not use static background image files for the main page atmosphere.
2. Background layers must be fixed to viewport and must not move when content scrolls.
3. Background layers must be non-interactive (`pointer-events: none`).
4. All functional UI content must render above background layers.
5. Glass effect must be used for cards, nav wrappers, and utility panels.
6. Accent palette must stay cyan + violet/magenta, never warm/orange dominant.
7. Do not switch to generic white background or default template styles.

## 3. Global Layering Contract

Required z-index stack:
- `0`: base nebula gradients
- `1`: glow overlay + haze
- `2`: star field
- `3`: twinkle stars
- `10+`: app content

Implementation contract:
- Use global pseudo-layers (`html::before`, `html::after`, `body::before`, `body::after`) or equivalent fixed layers.
- Keep `#root` or main app container above background layers.

## 4. Color Tokens (Exact)

```css
:root {
  --bg-base: #050018;
  --bg-deep-1: #040014;
  --bg-deep-2: #120238;
  --bg-deep-3: #1d0750;
  --bg-deep-4: #09001c;

  --accent-cyan: #60a5fa;
  --accent-purple: #a855f7;

  --text-main: #ffffff;
  --text-soft: #cbd5e1;

  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.15);
}
```

Supporting tones used in controls:
- `rgba(10, 12, 35, 0.34)` for nav glass base
- `rgba(8, 10, 28, 0.45)` for tab wrapper
- `rgba(47, 22, 92, 0.45)` for info/team panel

## 5. Typography

Primary font:
- `'Segoe UI', sans-serif`

Type scale guidance:
- Hero title: `clamp(2.2rem, 4.8vw, 4rem)`
- Card title: around `1.55rem` to `1.9rem`
- Body copy: around `1rem` to `1.08rem`
- Labels/buttons: around `0.95rem` to `1.09rem`

Tone:
- Strong heading contrast
- Soft secondary text using alpha white/cool gray

## 6. Glass Effect Recipe (Required)

Base glass style:
```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.15);
backdrop-filter: blur(18px);
border-radius: 16px to 20px;
```

Control glass (buttons/pills):
```css
background: rgba(120, 131, 255, 0.13);
border-color: rgba(255, 255, 255, 0.14);
```

Hover motion:
- Slight translate Y up (`-1px`)
- Slight brightness increase
- Keep transitions short and smooth (`~180ms`)

## 7. Dashboard Layout Contract

Required blocks in order:
1. Top navbar
2. Section nav pills (Dashboard/Simulator/Fraud Detection/History)
3. Hero heading + subtitle
4. Module card grid (3 cards desktop)
5. Bottom utility area (team and/or status cards)

Navbar content contract:
- Left: logo mark + wordmark + divider + current page label
- Right: settings control + avatar control + optional notification badge

Module card contract:
- Icon block with cyan->purple gradient
- Title
- Description
- CTA button/link (e.g. `Open module`)
- Soft bottom glow under card

## 8. Payment Simulator Layout Contract

Target feel from reference:
- Centered phone mockup card as hero object
- Left and right annotation callouts with arrows/glow
- On-phone risk panel with score and factors
- Action row (approve/decline style controls)

Simulator visual rules:
- Keep phone module dark, glossy, and layered
- Risk score must be high emphasis (large number)
- Status text and factor chips must be readable on dark surfaces
- Keep cyan/magenta glow around phone to merge with global backdrop

## 9. Interaction Contract (Frontend-Backend Ready)

All clickable elements must call named handlers. Use this naming style:
- `onNavigateSection(sectionId)`
- `onOpenSettings()`
- `onOpenProfile()`
- `onOpenModule(moduleId)`
- `onSimulatorAction(actionType, payload)`

Do not hardcode side effects in JSX.
- Keep handlers centralized in component logic or a controller layer.
- Handlers may start as placeholders but must exist and be callable.

## 10. Responsiveness Contract

Desktop:
- 3-column module cards
- Right-side utility card placement allowed

Tablet/mobile:
- Stack cards in one column
- Navbar can wrap vertically
- Keep call-to-action controls reachable without overlap
- Preserve readability; never let text blend into background glow

## 11. Accessibility/Usability Rules

1. Maintain sufficient text contrast on all glass surfaces.
2. Use semantic buttons for actions.
3. Provide `aria-label` where icon-only controls exist.
4. Keep focus states visible.
5. Preserve keyboard operability for nav and module actions.

## 12. Agent Guardrails (Do and Do Not)

Do:
- Reuse the tokens from this file.
- Reuse existing theme classes when available (`glass-card`, etc.).
- Keep visual depth with multiple gradients and star layers.
- Validate on desktop and mobile widths.

Do not:
- Replace theme with plain black/white dashboard.
- Introduce unrelated color systems.
- Remove fixed background behavior.
- Add random animation clutter.
- Use purple-only palette without cyan balancing.

## 13. Acceptance Checklist

A change is valid only if all pass:

1. Background is cosmic and fixed during scroll.
2. Glass cards and controls are visibly translucent.
3. Cyan + magenta accents are present and balanced.
4. Navbar + section tabs + content cards match structural contract.
5. All buttons/controls are wired to explicit handlers.
6. Desktop and mobile layouts both render cleanly.
7. No interaction is blocked by visual background layers.

## 14. AI Copy/Paste Prompt (Strict Mode)

```text
Implement or update UI using FinShield Cosmic Glass spec.
Hard constraints:
- No static image for primary background.
- Fixed multi-layer cosmic background with stars and twinkle.
- Glassmorphism cards and controls.
- Use tokens exactly from UI_THEME_AGENT_SPEC.md.
- Keep all content above background layers.
- Maintain dashboard structure: navbar, tabs, hero, module cards, utility cards.
- Ensure all buttons call explicit handlers for backend integration.
- Deliver responsive desktop/mobile behavior.
- Do not deviate to generic template styles.
After implementation, self-check against Section 13 checklist.
```

## 15. Implementation Reference in This Repo

Current style sources:
- `src/theme.css`
- `src/App.css`

Update this spec whenever tokens/layout contracts change.
