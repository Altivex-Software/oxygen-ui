---
name: valence-ui-forms
description: API reference and best practices for Valence UI form controls (FormField, Input, Password, Dropdown, MultiSelect, DatePicker, Checkbox, Switch, Button, Slider, Knob, OTP). Use when building reactive forms, user input screens, and validation in Angular.
---

# Valence UI — Forms & Input Controls Skill

All Valence UI form controls implement Angular's `ControlValueAccessor` (CVA), making them fully compatible with both template-driven (`[(ngModel)]`) and reactive forms (`formControlName`, `[formControl]`).

## 1. Button Component (`ButtonComponent`)

Standalone import:
```typescript
import { ButtonComponent } from 'valence-ui';
```

### Usage
```html
<!-- Native button element with directive selector -->
<button val-button variant="primary" size="md" (onClick)="onSave()">
  Guardar Cambios
</button>

<!-- Outline and ghost variants -->
<button val-button variant="outline-primary" icon="pi-check">Confirmar</button>
<button val-button variant="ghost-danger" [disabled]="isSubmitting">Cancelar</button>

<!-- Icon only button with badge -->
<button val-button variant="secondary" icon="pi-bell" badge="3" badgeSeverity="danger"></button>
```

### API
* **Selector**: `val-button`, `button[val-button]`
* **Inputs**:
  * `label` (`string`): Button text label
  * `variant` (`ButtonVariant`): `'primary'` | `'secondary'` | `'success'` | `'info'` | `'warning'` | `'danger'` | `'contrast'` | `'outline-primary'` | `'ghost-primary'` (default: `'primary'`)
  * `size` (`ValenceSize`): `'sm'` | `'md'` | `'lg'` (default: `'sm'`)
  * `icon` (`string`): Icon identifier
  * `iconPos` (`'left' | 'right'`): Icon alignment (default: `'left'`)
  * `disabled` (`boolean`): Disables interactions (default: `false`)
  * `boxShadow` (`ValenceSize | 'none'`): Elevation shadow (default: `'none'`)
  * `badge` (`string | number`): Attached notification badge
  * `badgeSeverity` (`ValenceSeverity`): Badge color semantic
  * `type` (`'button' | 'submit' | 'reset'`): HTML type (default: `'button'`)
* **Outputs**:
  * `onClick` (`MouseEvent`): Emitted on user click

---

## 2. Form Field Wrapper (`FormFieldComponent`)

Wraps input controls to provide unified labels, required asterisks, helper hints, character counts, and error feedback:

```typescript
import { FormFieldComponent, InputComponent } from 'valence-ui';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
```

```html
<val-form-field
  label="Correo Corporativo"
  [required]="true"
  hint="Introduce tu email de la empresa"
  [error]="emailControl.invalid && emailControl.touched ? 'Email inválido' : null">
  
  <val-input
    [formControl]="emailControl"
    placeholder="nombre@altivex.com"
    [clearable]="true"
    icon="pi-envelope">
  </val-input>
</val-form-field>
```

---

## 3. Text & Specialized Inputs

### `InputComponent` (`val-input`)
* Inputs: `placeholder`, `disabled`, `readonly`, `clearable`, `icon`, `iconPos`, `type` (`'text' | 'email' | 'number' | 'tel'`).
* Two-way binding: `[(ngModel)]="val"` or `[formControl]="ctrl"`.

### `PasswordComponent` (`val-password`)
* Secure password input with reveal/hide eye toggle:
```html
<val-password
  [formControl]="passControl"
  placeholder="Contraseña"
  [toggleMask]="true"
  [feedback]="true">
</val-password>
```

### `OtpComponent` (`val-otp`)
* Multi-digit verification code input:
```html
<val-otp [length]="6" (onComplete)="verifyCode($event)"></val-otp>
```

---

## 4. Selection Controls

### `DropdownComponent` (`val-dropdown`) & `MultiSelectComponent` (`val-multi-select`)
```html
<!-- Single select dropdown -->
<val-dropdown
  [options]="countries"
  optionLabel="name"
  optionValue="code"
  [(ngModel)]="selectedCountry"
  [filter]="true"
  placeholder="Selecciona un país">
</val-dropdown>

<!-- Multi-select with chips -->
<val-multi-select
  [options]="roles"
  optionLabel="name"
  optionValue="id"
  [(ngModel)]="selectedRoles"
  [display]="'chip'"
  placeholder="Seleccionar roles">
</val-multi-select>
```

### `DatePickerComponent` (`val-date-picker`)
```html
<val-date-picker
  [(ngModel)]="birthDate"
  [showIcon]="true"
  [dateFormat]="'dd/mm/yy'"
  placeholder="Fecha de nacimiento">
</val-date-picker>
```

### `CheckboxComponent` (`val-checkbox`) & `InputSwitchComponent` (`val-input-switch`)
```html
<val-checkbox [(ngModel)]="termsAccepted" label="Acepto los términos"></val-checkbox>
<val-input-switch [(ngModel)]="notificationsEnabled" label="Notificaciones activas"></val-input-switch>
```

---

## 5. Complete Reactive Form Example

```typescript
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    InputComponent,
    DropdownComponent,
    CheckboxComponent,
    ButtonComponent
  ],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="val-flex val-flex-column val-gap-4">
      <val-form-field label="Nombre" [required]="true">
        <val-input formControlName="name" placeholder="Ej. Juan Pérez"></val-input>
      </val-form-field>

      <val-form-field label="Rol de Usuario" [required]="true">
        <val-dropdown
          formControlName="role"
          [options]="roleOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Seleccionar rol">
        </val-dropdown>
      </val-form-field>

      <val-checkbox formControlName="agree" label="Acepto las políticas"></val-checkbox>

      <button val-button variant="primary" type="submit" [disabled]="userForm.invalid">
        Crear Usuario
      </button>
    </form>
  `
})
export class UserFormComponent {
  private fb = inject(FormBuilder);

  userForm = this.fb.group({
    name: ['', Validators.required],
    role: [null, Validators.required],
    agree: [false, Validators.requiredTrue]
  });

  roleOptions = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Editor', value: 'editor' }
  ];

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Submitted payload:', this.userForm.value);
    }
  }
}
```
