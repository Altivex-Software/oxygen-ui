import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { 
  FormFieldComponent, 
  FormFieldLabelComponent, 
  FormFieldHintComponent, 
  FormFieldErrorComponent,
  FormFieldPrefixDirective,
  FormFieldSuffixDirective,
  ButtonComponent,
  CardComponent,
  IconComponent,
  AlertComponent,
  BadgeComponent
} from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-form-field-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule, 
    FormFieldComponent, 
    FormFieldLabelComponent, 
    FormFieldErrorComponent,
    FormFieldPrefixDirective,
    FormFieldSuffixDirective,
    ButtonComponent,
    CardComponent,
    IconComponent,
    AlertComponent,
    BadgeComponent,
    DocCodeComponent, 
    DocApiTableComponent
  ],
  template: `
    <div class="val-page-container">
      <div class="header-section val-flex val-items-center val-justify-between val-flex-wrap val-gap-4 val-mb-6">
        <div>
          <h1 class="val-text-3xl val-font-bold val-text-slate-900 dark:val-text-white val-mb-2">FormField & Reactive Forms</h1>
          <p class="val-description val-text-slate-600 dark:val-text-slate-400">
            Contenedor semántico unificado para campos de formulario con soporte automático para validación reactiva de Angular, etiquetas accesibles, pistas, prefijos/sufijos y mensajes de error animados.
          </p>
        </div>
        <div class="val-flex val-gap-2">
          <val-badge value="Fase 1: Reactive Forms" severity="primary"></val-badge>
          <val-badge value="WCAG 2.1 AA" severity="success"></val-badge>
        </div>
      </div>

      <!-- 1. APARIENCIAS -->
      <app-doc-code
        title="1. Variantes de Apariencia (Appearances)"
        description="El componente val-form-field soporta apariencias 'outline' (predeterminada), 'filled' y 'standard'."
        [html]="appearanceHtml"
        [ts]="formFieldTs">
        <div class="val-grid val-grid-cols-1 md:val-grid-cols-3 val-gap-6">
          <val-form-field appearance="outline" label="Estilo Outline" hint="Borde limpio con esquinas redondeadas">
            <input class="val-input-native" type="text" placeholder="Escribe algo aquí..." />
          </val-form-field>

          <val-form-field appearance="filled" label="Estilo Filled" hint="Fondo sólido con borde suave">
            <input class="val-input-native" type="text" placeholder="Escribe algo aquí..." />
          </val-form-field>

          <val-form-field appearance="standard" label="Estilo Standard" hint="Línea inferior minimalista">
            <input class="val-input-native" type="text" placeholder="Escribe algo aquí..." />
          </val-form-field>
        </div>
      </app-doc-code>

      <!-- 2. PREFIJOS Y SUFIJOS -->
      <app-doc-code
        title="2. Prefijos, Sufijos e Iconos Interactivos"
        description="Inserta iconos o elementos decorativos/interactivos utilizando las directivas [valPrefix] y [valSuffix]."
        [html]="affixesHtml"
        [ts]="formFieldTs">
        <div class="val-grid val-grid-cols-1 md:val-grid-cols-2 val-gap-6">
          <val-form-field label="Correo Electrónico">
            <val-icon valPrefix name="mail" class="val-text-slate-400"></val-icon>
            <input class="val-input-native" type="email" placeholder="nombre@empresa.com" />
          </val-form-field>

          <val-form-field label="Presupuesto del Proyecto" hint="Moneda en USD">
            <span valPrefix class="val-font-semibold val-text-slate-500">$</span>
            <input class="val-input-native" type="number" placeholder="5,000" />
            <span valSuffix class="val-text-xs val-text-slate-400">USD</span>
          </val-form-field>

          <val-form-field label="Contraseña" [appearance]="'filled'">
            <val-icon valPrefix name="lock" class="val-text-slate-400"></val-icon>
            <input class="val-input-native" [type]="showPassword ? 'text' : 'password'" placeholder="Tu clave segura" />
            <button valSuffix type="button" class="val-btn-icon-link" (click)="showPassword = !showPassword">
              <val-icon [name]="showPassword ? 'eye-off' : 'eye'"></val-icon>
            </button>
          </val-form-field>

          <val-form-field label="Búsqueda con Limpieza">
            <val-icon valPrefix name="search" class="val-text-slate-400"></val-icon>
            <input class="val-input-native" type="text" [(ngModel)]="searchQuery" placeholder="Buscar registros..." />
            @if (searchQuery) {
              <button valSuffix type="button" class="val-btn-icon-link" (click)="searchQuery = ''">
                <val-icon name="x"></val-icon>
              </button>
            }
          </val-form-field>
        </div>
      </app-doc-code>

      <!-- 3. TAMAÑOS -->
      <app-doc-code
        title="3. Variantes de Tamaño (Sizes)"
        description="Soporta tamaños 'sm' (compacto), 'md' (estándar) y 'lg' (amplio)."
        [html]="sizesHtml"
        [ts]="formFieldTs">
        <div class="val-grid val-grid-cols-1 md:val-grid-cols-3 val-gap-6 val-items-end">
          <val-form-field size="sm" label="Pequeño (sm)" hint="Ideal para tablas o toolbars">
            <input class="val-input-native" placeholder="Tamaño SM" />
          </val-form-field>

          <val-form-field size="md" label="Mediano (md)" hint="Tamaño estándar recomendado">
            <input class="val-input-native" placeholder="Tamaño MD" />
          </val-form-field>

          <val-form-field size="lg" label="Grande (lg)" hint="Ideal para formularios de landing">
            <input class="val-input-native" placeholder="Tamaño LG" />
          </val-form-field>
        </div>
      </app-doc-code>

      <!-- 4. FORMULARIO REACTIVO COMPLETO CON VALIDACIÓN AUTOMÁTICA -->
      <app-doc-code
        title="4. Integración Reactiva (FormGroup & Validators)"
        description="Validación en tiempo real con detección automática de estado 'touched' e 'invalid'. Los mensajes de error se muestran de forma fluida."
        [html]="reactiveFormHtml"
        [ts]="reactiveFormTs">
        
        <val-card class="val-max-w-2xl val-mx-auto">
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="val-p-4">
            <h3 class="val-text-lg val-font-semibold val-text-slate-900 dark:val-text-white val-mb-4">Registro de Cuenta de Desarrollador</h3>

            @if (formSubmitted && userForm.valid) {
              <val-alert severity="success" title="¡Formulario Enviado con Éxito!" class="val-mb-4">
                Los datos han sido validados correctamente sin errores.
              </val-alert>
            }

            <div class="val-grid val-grid-cols-1 md:val-grid-cols-2 val-gap-4">
              <!-- Nombre Completo -->
              <val-form-field [required]="true">
                <val-label [required]="true">Nombre Completo</val-label>
                <val-icon valPrefix name="user"></val-icon>
                <input class="val-input-native" formControlName="fullName" placeholder="Ej. Sebastián Mendoza" />
                @if (userForm.get('fullName')?.hasError('required') && userForm.get('fullName')?.touched) {
                  <val-error>El nombre completo es obligatorio</val-error>
                }
                @if (userForm.get('fullName')?.hasError('minlength') && userForm.get('fullName')?.touched) {
                  <val-error>Debe tener al menos 3 caracteres</val-error>
                }
              </val-form-field>

              <!-- Correo -->
              <val-form-field [required]="true">
                <val-label [required]="true">Correo Electrónico</val-label>
                <val-icon valPrefix name="mail"></val-icon>
                <input class="val-input-native" type="email" formControlName="email" placeholder="desarrollador@empresa.com" />
                @if (userForm.get('email')?.hasError('required') && userForm.get('email')?.touched) {
                  <val-error>El correo es requerido</val-error>
                }
                @if (userForm.get('email')?.hasError('email') && userForm.get('email')?.touched) {
                  <val-error>Formato de correo no válido</val-error>
                }
              </val-form-field>
            </div>

            <!-- Biografía / Textarea -->
            <val-form-field hint="Máximo 200 caracteres" class="val-mt-2">
              <val-label>Biografía / Especialidad</val-label>
              <textarea class="val-input-native" rows="3" formControlName="bio" placeholder="Cuéntanos un poco sobre tus proyectos..."></textarea>
            </val-form-field>

            <!-- Acciones -->
            <div class="val-flex val-justify-end val-gap-3 val-mt-6">
              <val-button label="Restablecer" variant="outline-secondary" (onClick)="onReset()"></val-button>
              <val-button label="Guardar Registro" variant="primary" (onClick)="onSubmit()" [disabled]="userForm.invalid"></val-button>
            </div>
          </form>
        </val-card>
      </app-doc-code>

      <!-- 5. TABLA DE API -->
      <app-doc-api-table
        title="API de FormField"
        description="Propiedades y directivas disponibles para val-form-field."
        [properties]="apiProperties">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .val-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    .val-btn-icon-link {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s ease;
      &:hover {
        color: var(--val-primary-500, #3b82f6);
      }
    }
  `]
})
export class FormFieldDemoComponent {
  showPassword = false;
  searchQuery = 'Valence UI Component System';
  formSubmitted = false;

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['']
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.userForm.valid) {
      console.log('Form data:', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onReset() {
    this.formSubmitted = false;
    this.userForm.reset();
  }

  appearanceHtml = `<val-form-field appearance="outline" label="Estilo Outline" hint="Borde limpio">
  <input class="val-input-native" placeholder="Escribe algo aquí..." />
</val-form-field>

<val-form-field appearance="filled" label="Estilo Filled" hint="Fondo sólido">
  <input class="val-input-native" placeholder="Escribe algo aquí..." />
</val-form-field>

<val-form-field appearance="standard" label="Estilo Standard" hint="Línea minimalista">
  <input class="val-input-native" placeholder="Escribe algo aquí..." />
</val-form-field>`;

  affixesHtml = `<val-form-field label="Correo Electrónico">
  <val-icon valPrefix name="mail"></val-icon>
  <input class="val-input-native" type="email" placeholder="nombre@empresa.com" />
</val-form-field>

<val-form-field label="Presupuesto" hint="En USD">
  <span valPrefix>$</span>
  <input class="val-input-native" type="number" />
  <span valSuffix>USD</span>
</val-form-field>`;

  sizesHtml = `<val-form-field size="sm" label="Pequeño (sm)">
  <input class="val-input-native" />
</val-form-field>

<val-form-field size="md" label="Mediano (md)">
  <input class="val-input-native" />
</val-form-field>

<val-form-field size="lg" label="Grande (lg)">
  <input class="val-input-native" />
</val-form-field>`;

  reactiveFormHtml = `<val-form-field [required]="true">
  <val-label [required]="true">Nombre Completo</val-label>
  <val-icon valPrefix name="user"></val-icon>
  <input class="val-input-native" formControlName="fullName" placeholder="Ej. Sebastián" />
  @if (userForm.get('fullName')?.hasError('required') && userForm.get('fullName')?.touched) {
    <val-error>El nombre completo es obligatorio</val-error>
  }
</val-form-field>`;

  formFieldTs = `import { FormFieldComponent, FormFieldPrefixDirective, FormFieldSuffixDirective } from 'valence-ui';`;

  reactiveFormTs = `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent, FormFieldLabelComponent, FormFieldErrorComponent } from 'valence-ui';

@Component({
  imports: [ReactiveFormsModule, FormFieldComponent, FormFieldLabelComponent, FormFieldErrorComponent],
  templateUrl: './my-form.component.html'
})
export class MyFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}`;

  apiProperties: ApiProperty[] = [
    { name: 'appearance', type: `'outline' | 'filled' | 'standard'`, default: `'outline'`, description: 'Estilo visual del contenedor del campo.' },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Variante de tamaño y espaciado del campo.' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Texto de la etiqueta superior (también se puede proyectar con <val-label>).' },
    { name: 'hint', type: 'string', default: 'undefined', description: 'Texto de ayuda inferior (también se puede proyectar con <val-hint>).' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Mensaje de error explícito (también se puede proyectar con <val-error>).' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Muestra el asterisco indicador de campo obligatorio.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Aplica el estado visual y funcional deshabilitado al contenedor.' },
    { name: '[valPrefix]', type: 'directive', default: '-', description: 'Directiva para ubicar elementos o iconos en el extremo izquierdo.' },
    { name: '[valSuffix]', type: 'directive', default: '-', description: 'Directiva para ubicar elementos o iconos en el extremo derecho.' }
  ];
}
