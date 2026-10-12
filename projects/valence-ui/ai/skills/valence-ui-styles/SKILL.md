---
name: valence-ui-styles
description: Complete specification and best practices for Valence UI design tokens, SCSS utility classes (flex, grid, spacing, colors, typography, animations), and dark/light themes. Use when styling layouts, creating responsive UI structures, or applying Valence design classes.
---

# Valence UI — Styles & Design System Skill

Valence UI provides a comprehensive, utility-first SCSS framework inspired by modern enterprise design systems. Every utility class is namespaced with the `val-` prefix to prevent collisions with third-party CSS.

## 1. Setup & Integration

Global styles must be imported once in the root `src/styles.scss`:
```scss
@use 'valence-ui/styles/main.scss';

// Optional theme selection (light by default)
@use 'valence-ui/themes/light/theme-light.scss';
// or dark theme:
// @use 'valence-ui/themes/dark/theme-dark.scss';
```

---

## 2. Flexbox Utilities (`val-flex`)

Always prefer Valence flex utilities over custom CSS:
```html
<div class="val-flex val-items-center val-justify-between val-gap-3">
  <div>Título</div>
  <button val-button variant="primary">Acción</button>
</div>
```

### Direction & Wrap
* `val-flex`: Sets `display: flex !important;`
* `val-inline-flex`: Sets `display: inline-flex !important;`
* `val-flex-row` / `val-flex-column`: Direction
* `val-flex-row-reverse` / `val-flex-column-reverse`
* `val-flex-wrap` / `val-flex-nowrap`

### Justify & Align
* `val-justify-content-start`
* `val-justify-content-center`
* `val-justify-content-end`
* `val-justify-content-between`
* `val-justify-content-around`
* `val-justify-content-evenly`
* `val-align-items-start`
* `val-align-items-center`
* `val-align-items-end`
* `val-align-items-stretch`
* `val-align-items-baseline`

### Flex Sizing
* `val-flex-fill`: Fills available space (`flex: 1 1 auto;`)
* `val-flex-grow-1` / `val-flex-grow-0`
* `val-flex-shrink-1` / `val-flex-shrink-0`

---

## 3. Responsive 12-Column Grid (`val-grid`)

The grid system uses negative margins with flex-based column wrappers:
```html
<div class="val-grid">
  <!-- Full width on mobile, 6 cols on tablet, 4 on desktop -->
  <div class="val-col-12 val-col-md-6 val-col-lg-4">
    <val-card>Contenido 1</val-card>
  </div>
  <div class="val-col-12 val-col-md-6 val-col-lg-4">
    <val-card>Contenido 2</val-card>
  </div>
  <div class="val-col-12 val-col-md-12 val-col-lg-4">
    <val-card>Contenido 3</val-card>
  </div>
</div>
```

### Breakpoints
* Standard: `sm` (576px), `md` (768px), `lg` (992px), `xl` (1200px).
* Classes: `val-col-{1..12}`, `val-col-sm-{1..12}`, `val-col-md-{1..12}`, `val-col-lg-{1..12}`, `val-col-xl-{1..12}`.

---

## 4. Spacing (Margin, Padding & Gap)

Scale values:
* `0`: `0`
* `1`: `0.25rem` (4px)
* `2`: `0.5rem` (8px)
* `3`: `1rem` (16px)
* `4`: `1.5rem` (24px)
* `5`: `3rem` (48px)
* `auto`: `auto`

### Margin
* All sides: `val-m-0` to `val-m-5`
* Top: `val-mt-*`, Bottom: `val-mb-*`, Left: `val-ml-*`, Right: `val-mr-*`
* Horizontal: `val-mx-*`, `val-mx-auto`
* Vertical: `val-my-*`

### Padding
* All sides: `val-p-0` to `val-p-5`
* Top: `val-pt-*`, Bottom: `val-pb-*`, Left: `val-pl-*`, Right: `val-pr-*`
* Horizontal: `val-px-*`, Vertical: `val-py-*`

### Gap
* Flex / Grid gap: `val-gap-1` to `val-gap-5`
* `val-row-gap-*`, `val-column-gap-*`

---

## 5. Typography & Colors

### Font & Sizes
* Font family defaults to **Manrope** (`--font-primary`).
* Sizes: `val-text-xs`, `val-text-sm`, `val-text-base`, `val-text-lg`, `val-text-xl`, `val-text-2xl`, `val-text-3xl`.
* Weights: `val-font-light` (300), `val-font-normal` (400), `val-font-medium` (500), `val-font-semibold` (600), `val-font-bold` (700).
* Alignment: `val-text-left`, `val-text-center`, `val-text-right`.

### Semantic Colors
* `val-text-primary`: Primary brand color
* `val-text-secondary`: Supporting text color
* `val-text-muted`: Dimmed / placeholder text
* `val-text-success`: Success green
* `val-text-danger`: Error red
* `val-text-warning`: Alert amber
* `val-text-info`: Informational blue

---

## 6. Borders, Shadows & Transitions

* **Borders:** `val-border`, `val-border-top`, `val-border-bottom`, `val-border-none`
* **Rounded Corners:** `val-rounded-sm`, `val-rounded`, `val-rounded-md`, `val-rounded-lg`, `val-rounded-xl`, `val-rounded-full`
* **Focus Rings:** `val-ring`, `val-ring-primary`, `val-ring-offset`
* **Shadows:** `val-shadow-none`, `val-shadow-sm`, `val-shadow-md`, `val-shadow-lg`, `val-shadow-xl`
* **Transitions:** `val-transition-all`, `val-duration-200`, `val-duration-300`, `val-ease-in-out`
