---
name: valence-ui-overlays
description: API reference and best practices for Valence UI overlay components and feedback services (Dialog, DynamicDialogService, Toast, ToastService, ConfirmDialog, ConfirmService, Tooltip, Popover, BlockUI). Use when implementing modals, alerts, confirmations, or notifications.
---

# Valence UI — Overlays & Feedback Skill

Valence UI provides a complete suite of overlay and notification components powered by modern Angular CDK overlays and programmatic services.

## 1. Toast Notifications (`ToastService` & `ToastComponent`)

### Setup in Component
Declare `<val-toast>` once (typically in the root template or container):
```typescript
import { Component, inject } from '@angular/core';
import { ToastComponent, ToastService, ButtonComponent } from 'valence-ui';

@Component({
  standalone: true,
  imports: [ToastComponent, ButtonComponent],
  template: `
    <val-toast></val-toast>
    <button val-button variant="primary" (onClick)="showSuccess()">
      Guardar
    </button>
  `
})
export class NotificationDemoComponent {
  private toastService = inject(ToastService);

  showSuccess() {
    this.toastService.add({
      severity: 'success', // 'success' | 'info' | 'warn' | 'error'
      summary: 'Éxito',
      detail: 'La configuración se actualizó correctamente.',
      life: 3000
    });
  }

  showError(errMessage: string) {
    this.toastService.add({
      severity: 'error',
      summary: 'Error',
      detail: errMessage,
      sticky: true // Requires user click to dismiss
    });
  }
}
```

### `ToastMessage` Interface
* `severity`: `'success'` | `'info'` | `'warn'` | `'error'` | `'secondary'`
* `summary`: Title line
* `detail`: Descriptive message body
* `life`: Duration in milliseconds (default: `3000`)
* `sticky`: When true, stays open indefinitely
* `closable`: Shows close button (default: `true`)
* `position`: Can be configured via `toastService.setPosition('top-right' | 'top-left' | 'bottom-right' | ...)`

---

## 2. Modal Dialog (`DialogComponent`)

Template-driven modal dialog:

```typescript
import { DialogComponent, ButtonComponent } from 'valence-ui';
```

```html
<button val-button variant="primary" (onClick)="isOpen = true">Abrir Modal</button>

<val-dialog
  [(visible)]="isOpen"
  header="Editar Perfil"
  [modal]="true"
  [dismissableMask]="true"
  [style]="{ width: '450px' }">
  
  <p class="val-text-secondary val-mb-3">
    Actualiza la información de tu cuenta corporativa.
  </p>

  <div class="val-flex val-flex-column val-gap-3">
    <!-- Campos de formulario -->
  </div>

  <div class="val-flex val-justify-content-end val-gap-2 val-mt-4">
    <button val-button variant="secondary" (onClick)="isOpen = false">Cancelar</button>
    <button val-button variant="primary" (onClick)="save()">Guardar</button>
  </div>
</val-dialog>
```

### API
* **Selector**: `val-dialog`
* **Inputs**:
  * `visible` (`model<boolean>`): Two-way dialog visibility state
  * `header` (`string`): Title in modal header
  * `modal` (`boolean`): Backdrop mask (default: `true`)
  * `dismissableMask` (`boolean`): Close when clicking backdrop (default: `false`)
  * `closable` (`boolean`): Shows header close button (default: `true`)
  * `resizable` (`boolean`): Draggable resize handles

---

## 3. Confirmation Dialog (`ConfirmService` & `ConfirmDialogComponent`)

Programmatic confirmation prompts without declaring modal markup in every screen:

```typescript
import { ConfirmDialogComponent, ConfirmService, ButtonComponent } from 'valence-ui';

@Component({
  standalone: true,
  imports: [ConfirmDialogComponent, ButtonComponent],
  template: `
    <val-confirm-dialog></val-confirm-dialog>
    <button val-button variant="danger" (onClick)="confirmDelete()">Eliminar</button>
  `
})
export class ConfirmDemoComponent {
  private confirmService = inject(ConfirmService);

  confirmDelete() {
    this.confirmService.confirm({
      message: '¿Estás seguro de eliminar este registro permanentemente?',
      header: 'Confirmar Eliminación',
      icon: 'pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        // Execute delete action
      },
      reject: () => {
        // User cancelled
      }
    });
  }
}
```

---

## 4. Floating Tooltip Directive (`TooltipDirective`)

```typescript
import { TooltipDirective, ButtonComponent } from 'valence-ui';
```

```html
<button val-button variant="secondary" valTooltip="Descargar reporte en formato PDF" tooltipPosition="top">
  Exportar
</button>
```
* Positions: `'top'`, `'bottom'`, `'left'`, `'right'`.

---

## 5. UI Blocking Overlay (`BlockUIComponent`)

Masks parts of the screen or full page while pending long-running HTTP operations:

```html
<val-block-ui [blocked]="isLoading">
  <val-card>
    <h3>Datos Protegidos</h3>
    <!-- Contenido bloqueado durante carga -->
  </val-card>
</val-block-ui>
```
