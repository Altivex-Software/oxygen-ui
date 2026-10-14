# Valence UI

> A modern, comprehensive UI component library for Angular applications built by Altivex.

[![npm version](https://img.shields.io/npm/v/valence-ui.svg)](https://www.npmjs.com/package/valence-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Installation

You can install **Valence UI** using your preferred package manager:

### npm
```bash
npm install valence-ui @angular/cdk
```

### Yarn
```bash
yarn add valence-ui @angular/cdk
```

### pnpm
```bash
pnpm add valence-ui @angular/cdk
```

---

## 🤖 AI Assistant & Agent Skills Setup

Enable your favorite AI assistant (**Cursor**, **GitHub Copilot**, **Antigravity**, **Windsurf**) to write and understand Valence UI code with native precision:

```bash
npx valence-ui
```
*Prompts you to select your AI editor and instantly sets up the official component & utility rules in your repository.*

---

## 🎨 Styles & Themes Setup

Include the core design tokens and styles in your application's global SCSS file (typically `src/styles.scss`):

```scss
@use 'valence-ui/styles/main.scss';
```

Or reference it in your `angular.json`:

```json
"styles": [
  "node_modules/valence-ui/styles/main.scss",
  "src/styles.scss"
]
```

---

## ⚡ Quick Start

Import the components you need directly into your standalone component or NgModule:

```typescript
import { Component } from '@angular/core';
import { ValButtonComponent } from 'valence-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ValButtonComponent],
  template: `
    <button val-button variant="primary">
      Click me
    </button>
  `
})
export class AppComponent {}
```

---

## 📦 What's Included

- **Form Controls:** Input, Form Field, Password, Date Picker, OTP, Radio, Switch, Checkbox, Slider, Knob, Rating, Multi-Select, AutoComplete, Chips, Color Picker.
- **Layout & Structure:** Card, Panel, Toolbar, Stepper, Tabs, Splitter, Divider, Fieldset.
- **Data & Navigation:** Table, Tree Table, Tree, Breadcrumb, Menubar, Mega Menu, Panel Menu, Sidebar, Paginator.
- **Feedback & Overlays:** Toast, Dialog, Dynamic Dialog, Popover, Confirm Popup, Confirm Dialog, Tooltip, Block UI.
- **Media & Indicators:** Galleria, Carousel, Image, Badge, Tag, Skeleton, Progress Bar, Progress Spinner, Speed Dial.

---

## 📄 License

MIT © [Altivex](https://github.com/Altivex-Software)
