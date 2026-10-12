---
name: valence-ui-navigation
description: API reference and best practices for Valence UI navigation and menu components (Tabs, Tab, Stepper, Step, Sidebar, Menubar, MegaMenu, PanelMenu, Breadcrumb, SpeedDial, Toolbar). Use when organizing layout structures, routing menus, multi-step workflows, or tabbed views.
---

# Valence UI — Navigation & Menus Skill

Valence UI provides responsive, accessible navigation components supporting active link states, icons, and keyboard navigation.

## 1. Tabs Component (`TabsComponent` & `TabComponent`)

Standalone import:
```typescript
import { TabsComponent, TabComponent } from 'valence-ui';
```

### Usage
```html
<val-tabs [activeIndex]="selectedTabIndex" (onChange)="onTabChange($event)">
  <val-tab header="Perfil" icon="pi-user">
    <div class="val-p-3">
      <h4>Datos Personales</h4>
      <p>Configuración general de la cuenta.</p>
    </div>
  </val-tab>

  <val-tab header="Seguridad" icon="pi-lock">
    <div class="val-p-3">
      <h4>Seguridad & Contraseña</h4>
      <p>Configuración de autenticación de dos factores.</p>
    </div>
  </val-tab>

  <val-tab header="Facturación" icon="pi-credit-card" [disabled]="!isBillingActive">
    <div class="val-p-3">
      <h4>Historial de Pagos</h4>
    </div>
  </val-tab>
</val-tabs>
```

---

## 2. Multi-Step Wizard (`StepperComponent` & `StepComponent`)

Linear and non-linear wizards with smooth animated transitions:

```typescript
import { StepperComponent, StepComponent, ButtonComponent } from 'valence-ui';
```

```html
<val-stepper [linear]="true" [(activeStep)]="currentStep">
  <val-step header="Información Personal">
    <div class="val-p-4">
      <!-- Step 1 Form -->
      <div class="val-flex val-justify-content-end val-mt-4">
        <button val-button variant="primary" (onClick)="currentStep = 1">Siguiente</button>
      </div>
    </div>
  </val-step>

  <val-step header="Plan & Suscripción">
    <div class="val-p-4">
      <!-- Step 2 Content -->
      <div class="val-flex val-justify-content-between val-mt-4">
        <button val-button variant="secondary" (onClick)="currentStep = 0">Atrás</button>
        <button val-button variant="primary" (onClick)="currentStep = 2">Siguiente</button>
      </div>
    </div>
  </val-step>

  <val-step header="Confirmación">
    <div class="val-p-4">
      <p>Revisa y confirma tu orden.</p>
      <div class="val-flex val-justify-content-between val-mt-4">
        <button val-button variant="secondary" (onClick)="currentStep = 1">Atrás</button>
        <button val-button variant="success" (onClick)="finish()">Finalizar</button>
      </div>
    </div>
  </val-step>
</val-stepper>
```

---

## 3. Off-Canvas Drawer (`SidebarComponent`)

Sliding drawer for menus, filters, and mobile navigation:

```typescript
import { SidebarComponent, ButtonComponent } from 'valence-ui';
```

```html
<button val-button icon="pi-bars" (onClick)="menuOpen = true"></button>

<val-sidebar
  [(visible)]="menuOpen"
  position="left"
  [modal]="true"
  [dismissableMask]="true">
  
  <div class="val-p-3">
    <h3 class="val-mb-4">Menú Principal</h3>
    <ul class="val-flex val-flex-column val-gap-2">
      <li><a class="val-text-primary" href="/dashboard">Dashboard</a></li>
      <li><a class="val-text-primary" href="/users">Usuarios</a></li>
      <li><a class="val-text-primary" href="/settings">Configuración</a></li>
    </ul>
  </div>
</val-sidebar>
```
* **Positions**: `'left'`, `'right'`, `'top'`, `'bottom'`.

---

## 4. Top Header & Toolbar (`ToolbarComponent`)

```typescript
import { ToolbarComponent, ButtonComponent } from 'valence-ui';
```

```html
<val-toolbar>
  <div start class="val-flex val-items-center val-gap-2">
    <button val-button variant="primary" icon="pi-plus" label="Nuevo"></button>
    <button val-button variant="secondary" icon="pi-upload" label="Subir"></button>
  </div>
  
  <div center>
    <span class="val-font-bold val-text-lg">Gestión de Catálogo</span>
  </div>

  <div end class="val-flex val-items-center val-gap-2">
    <button val-button variant="ghost-secondary" icon="pi-search"></button>
    <button val-button variant="ghost-danger" icon="pi-trash"></button>
  </div>
</val-toolbar>
```

---

## 5. Menubar & MegaMenu (`MenubarComponent`, `MegaMenuComponent`)

Desktop application navigation bars supporting hierarchical menu items:

```typescript
import { MenubarComponent, MenuItem } from 'valence-ui';
```

```html
<val-menubar [model]="menuItems"></val-menubar>
```

```typescript
menuItems: MenuItem[] = [
  {
    label: 'Archivo',
    icon: 'pi-file',
    items: [
      { label: 'Nuevo Documento', icon: 'pi-plus', command: () => this.create() },
      { label: 'Exportar PDF', icon: 'pi-download', command: () => this.export() }
    ]
  },
  {
    label: 'Editar',
    icon: 'pi-pencil',
    items: [
      { label: 'Deshacer', icon: 'pi-undo' },
      { label: 'Rehacer', icon: 'pi-refresh' }
    ]
  }
];
```
