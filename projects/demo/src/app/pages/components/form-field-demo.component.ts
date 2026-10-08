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
} from 'oxygen-ui';
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
    <div class="ox-page-container">
      <div class="header-section ox-flex ox-items-center ox-justify-between ox-flex-wrap ox-gap-4 ox-mb-6">
        <div>
          <h1 class="ox-text-3xl ox-font-bold ox-text-slate-900 dark:ox-text-white ox-mb-2">FormField & Reactive Forms</h1>
          <p class="ox-description ox-text-slate-600 dark:ox-text-slate-400">
            Contenedor semántico unificado para campos de formulario con soporte automático para validación reactiva de Angular, etiquetas accesibles, pistas, prefijos/sufijos y mensajes de error animados.
          </p>
        </div>
        <div class="ox-flex ox-gap-2">
          <ox-badge value="Fase 1: Reactive Forms" severity="primary"></ox-badge>
          <ox-badge value="WCAG 2.1 AA" severity="success"></ox-badge>
        </div>
      </div>

      <!-- 1. APARIENCIAS -->
      <app-doc-code
        title="1. Variantes de Apariencia (Appearances)"
        description="El componente ox-form-field soporta apariencias 'outline' (predeterminada), 'filled' y 'standard'."
        [html]="appearanceHtml"
        [ts]="formFieldTs">
        <div class="ox-grid ox-grid-cols-1 md:ox-grid-cols-3 ox-gap-6">
          <ox-form-field appearance="outline" label="Estilo Outline" hint="Borde limpio con esquinas redondeadas">
            <input class="ox-input-native" type="text" placeholder="Escribe algo aquí..." />
          </ox-form-field>

          <ox-form-field appearance="filled" label="Estilo Filled" hint="Fondo sólido con borde suave">
            <input class="ox-input-native" type="text" placeholder="Escribe algo aquí..." />
          </ox-form-field>

          <ox-form-field appearance="standard" label="Estilo Standard" hint="Línea inferior minimalista">
            <input class="ox-input-native" type="text" placeholder="Escribe algo aquí..." />
          </ox-form-field>
        </div>
      </app-doc-code>

      <!-- 2. PREFIJOS Y SUFIJOS -->
      <app-doc-code
        title="2. Prefijos, Sufijos e Iconos Interactivos"
        description="Inserta iconos o elementos decorativos/interactivos utilizando las directivas [oxPrefix] y [oxSuffix]."
        [html]="affixesHtml"
        [ts]="formFieldTs">
        <div class="ox-grid ox-grid-cols-1 md:ox-grid-cols-2 ox-gap-6">
          <ox-form-field label="Correo Electrónico">
            <ox-icon oxPrefix name="mail" class="ox-text-slate-400"></ox-icon>
            <input class="ox-input-native" type="email" placeholder="nombre@empresa.com" />
          </ox-form-field>

          <ox-form-field label="Presupuesto del Proyecto" hint="Moneda en USD">
            <span oxPrefix class="ox-font-semibold ox-text-slate-500">$</span>
            <input class="ox-input-native" type="number" placeholder="5,000" />
            <span oxSuffix class="ox-text-xs ox-text-slate-400">USD</span>
          </ox-form-field>

          <ox-form-field label="Contraseña" [appearance]="'filled'">
            <ox-icon oxPrefix name="lock" class="ox-text-slate-400"></ox-icon>
            <input class="ox-input-native" [type]="showPassword ? 'text' : 'password'" placeholder="Tu clave segura" />
            <button oxSuffix type="button" class="ox-btn-icon-link" (click)="showPassword = !showPassword">
              <ox-icon [name]="showPassword ? 'eye-off' : 'eye'"></ox-icon>
            </button>
          </ox-form-field>

          <ox-form-field label="Búsqueda con Limpieza">
            <ox-icon oxPrefix name="search" class="ox-text-slate-400"></ox-icon>
            <input class="ox-input-native" type="text" [(ngModel)]="searchQuery" placeholder="Buscar registros..." />
            @if (searchQuery) {
              <button oxSuffix type="button" class="ox-btn-icon-link" (click)="searchQuery = ''">
                <ox-icon name="x"></ox-icon>
              </button>
            }
          </ox-form-field>
        </div>
      </app-doc-code>

      <!-- 3. TAMAÑOS -->
      <app-doc-code
        title="3. Variantes de Tamaño (Sizes)"
        description="Soporta tamaños 'sm' (compacto), 'md' (estándar) y 'lg' (amplio)."
        [html]="sizesHtml"
        [ts]="formFieldTs">
        <div class="ox-grid ox-grid-cols-1 md:ox-grid-cols-3 ox-gap-6 ox-items-end">
          <ox-form-field size="sm" label="Pequeño (sm)" hint="Ideal para tablas o toolbars">
            <input class="ox-input-native" placeholder="Tamaño SM" />
          </ox-form-field>

          <ox-form-field size="md" label="Mediano (md)" hint="Tamaño estándar recomendado">
            <input class="ox-input-native" placeholder="Tamaño MD" />
          </ox-form-field>

          <ox-form-field size="lg" label="Grande (lg)" hint="Ideal para formularios de landing">
            <input class="ox-input-native" placeholder="Tamaño LG" />
          </ox-form-field>
        </div>
      </app-doc-code>

      <!-- 4. FORMULARIO REACTIVO COMPLETO CON VALIDACIÓN AUTOMÁTICA -->
      <app-doc-code
        title="4. Integración Reactiva (FormGroup & Validators)"
        description="Validación en tiempo real con detección automática de estado 'touched' e 'invalid'. Los mensajes de error se muestran de forma fluida."
        [html]="reactiveFormHtml"
        [ts]="reactiveFormTs">
        
        <ox-card class="ox-max-w-2xl ox-mx-auto">
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="ox-p-4">
            <h3 class="ox-text-lg ox-font-semibold ox-text-slate-900 dark:ox-text-white ox-mb-4">Registro de Cuenta de Desarrollador</h3>

            @if (formSubmitted && userForm.valid) {
              <ox-alert severity="success" title="¡Formulario Enviado con Éxito!" class="ox-mb-4">
                Los datos han sido validados correctamente sin errores.
              </ox-alert>
            }

            <div class="ox-grid ox-grid-cols-1 md:ox-grid-cols-2 ox-gap-4">
              <!-- Nombre Completo -->
              <ox-form-field [required]="true">
                <ox-label [required]="true">Nombre Completo</ox-label>
                <ox-icon oxPrefix name="user"></ox-icon>
                <input class="ox-input-native" formControlName="fullName" placeholder="Ej. Sebastián Mendoza" />
                @if (userForm.get('fullName')?.hasError('required') && userForm.get('fullName')?.touched) {
                  <ox-error>El nombre completo es obligatorio</ox-error>
                }
                @if (userForm.get('fullName')?.hasError('minlength') && userForm.get('fullName')?.touched) {
                  <ox-error>Debe tener al menos 3 caracteres</ox-error>
                }
              </ox-form-field>

              <!-- Correo -->
              <ox-form-field [required]="true">
                <ox-label [required]="true">Correo Electrónico</ox-label>
                <ox-icon oxPrefix name="mail"></ox-icon>
                <input class="ox-input-native" type="email" formControlName="email" placeholder="desarrollador@empresa.com" />
                @if (userForm.get('email')?.hasError('required') && userForm.get('email')?.touched) {
                  <ox-error>El correo es requerido</ox-error>
                }
                @if (userForm.get('email')?.hasError('email') && userForm.get('email')?.touched) {
                  <ox-error>Formato de correo no válido</ox-error>
                }
              </ox-form-field>
            </div>

            <!-- Biografía / Textarea -->
            <ox-form-field hint="Máximo 200 caracteres" class="ox-mt-2">
              <ox-label>Biografía / Especialidad</ox-label>
              <textarea class="ox-input-native" rows="3" formControlName="bio" placeholder="Cuéntanos un poco sobre tus proyectos..."></textarea>
            </ox-form-field>

            <!-- Acciones -->
            <div class="ox-flex ox-justify-end ox-gap-3 ox-mt-6">
              <ox-button label="Restablecer" variant="outline-secondary" (onClick)="onReset()"></ox-button>
              <ox-button label="Guardar Registro" variant="primary" (onClick)="onSubmit()" [disabled]="userForm.invalid"></ox-button>
            </div>
          </form>
        </ox-card>
      </app-doc-code>

      <!-- 5. TABLA DE API -->
      <app-doc-api-table
        title="API de FormField"
        description="Propiedades y directivas disponibles para ox-form-field."
        [properties]="apiProperties">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .ox-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }
    .ox-btn-icon-link {
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
        color: var(--oxy-primary-500, #3b82f6);
      }
    }
  `]
})
export class FormFieldDemoComponent {
  showPassword = false;
  searchQuery = 'Oxygen UI Component System';
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

  appearanceHtml = `<ox-form-field appearance="outline" label="Estilo Outline" hint="Borde limpio">
  <input class="ox-input-native" placeholder="Escribe algo aquí..." />
</ox-form-field>

<ox-form-field appearance="filled" label="Estilo Filled" hint="Fondo sólido">
  <input class="ox-input-native" placeholder="Escribe algo aquí..." />
</ox-form-field>

<ox-form-field appearance="standard" label="Estilo Standard" hint="Línea minimalista">
  <input class="ox-input-native" placeholder="Escribe algo aquí..." />
</ox-form-field>`;

  affixesHtml = `<ox-form-field label="Correo Electrónico">
  <ox-icon oxPrefix name="mail"></ox-icon>
  <input class="ox-input-native" type="email" placeholder="nombre@empresa.com" />
</ox-form-field>

<ox-form-field label="Presupuesto" hint="En USD">
  <span oxPrefix>$</span>
  <input class="ox-input-native" type="number" />
  <span oxSuffix>USD</span>
</ox-form-field>`;

  sizesHtml = `<ox-form-field size="sm" label="Pequeño (sm)">
  <input class="ox-input-native" />
</ox-form-field>

<ox-form-field size="md" label="Mediano (md)">
  <input class="ox-input-native" />
</ox-form-field>

<ox-form-field size="lg" label="Grande (lg)">
  <input class="ox-input-native" />
</ox-form-field>`;

  reactiveFormHtml = `<ox-form-field [required]="true">
  <ox-label [required]="true">Nombre Completo</ox-label>
  <ox-icon oxPrefix name="user"></ox-icon>
  <input class="ox-input-native" formControlName="fullName" placeholder="Ej. Sebastián" />
  @if (userForm.get('fullName')?.hasError('required') && userForm.get('fullName')?.touched) {
    <ox-error>El nombre completo es obligatorio</ox-error>
  }
</ox-form-field>`;

  formFieldTs = `import { FormFieldComponent, FormFieldPrefixDirective, FormFieldSuffixDirective } from 'oxygen-ui';`;

  reactiveFormTs = `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent, FormFieldLabelComponent, FormFieldErrorComponent } from 'oxygen-ui';

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
    { name: 'label', type: 'string', default: 'undefined', description: 'Texto de la etiqueta superior (también se puede proyectar con <ox-label>).' },
    { name: 'hint', type: 'string', default: 'undefined', description: 'Texto de ayuda inferior (también se puede proyectar con <ox-hint>).' },
    { name: 'error', type: 'string', default: 'undefined', description: 'Mensaje de error explícito (también se puede proyectar con <ox-error>).' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Muestra el asterisco indicador de campo obligatorio.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Aplica el estado visual y funcional deshabilitado al contenedor.' },
    { name: '[oxPrefix]', type: 'directive', default: '-', description: 'Directiva para ubicar elementos o iconos en el extremo izquierdo.' },
    { name: '[oxSuffix]', type: 'directive', default: '-', description: 'Directiva para ubicar elementos o iconos en el extremo derecho.' }
  ];
}
