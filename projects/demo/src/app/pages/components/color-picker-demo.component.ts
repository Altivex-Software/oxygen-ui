import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ColorPickerComponent, ButtonComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-color-picker-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ColorPickerComponent, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Color Picker</h1>
      <p class="val-description">Selector de color con área de saturación/brillo, barra de tono, campo hexadecimal y colores predefinidos. El valor es un string '#rrggbb'.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Botón con muestra de color que abre el selector. Se vincula con ngModel."
        [html]="basicHtml"
        [ts]="basicTs">
        <div class="val-flex val-flex-column val-align-items-center val-gap-3">
          <val-color-picker [(ngModel)]="color"></val-color-picker>
          <p class="val-m-0 val-fs-sm val-text-muted">Valor actual: <b>{{ color ?? 'null' }}</b></p>
        </div>
      </app-doc-code>

      <!-- 2. INLINE + PRESETS -->
      <app-doc-code
        title="2. Inline y Colores Predefinidos"
        description="Panel siempre visible con una paleta de colores sugeridos."
        [html]="inlineHtml"
        [ts]="inlineTs">
        <div class="val-flex val-flex-wrap val-justify-content-center val-align-items-start val-gap-4">
          <val-color-picker [(ngModel)]="brandColor" [inline]="true" [presets]="presets"></val-color-picker>
          <div
            class="val-p-3 val-rounded-lg val-text-white val-fw-semibold val-text-center"
            [style.background-color]="brandColor">
            Vista previa
          </div>
        </div>
      </app-doc-code>

      <!-- 3. TAMAÑOS Y ESTADOS -->
      <app-doc-code
        title="3. Tamaños y Estados"
        description="Tamaños sm, md y lg; sin valor inicial; sin texto; y deshabilitado."
        [html]="sizesHtml"
        [ts]="basicTs">
        <div class="val-flex val-flex-wrap val-justify-content-center val-align-items-center val-gap-3">
          <val-color-picker size="sm" [(ngModel)]="sizeColor"></val-color-picker>
          <val-color-picker size="md" [(ngModel)]="sizeColor"></val-color-picker>
          <val-color-picker size="lg" [(ngModel)]="sizeColor"></val-color-picker>
          <val-color-picker [(ngModel)]="emptyColor"></val-color-picker>
          <val-color-picker [showValue]="false" [(ngModel)]="sizeColor"></val-color-picker>
          <val-color-picker [disabled]="true" [ngModel]="'#10b981'"></val-color-picker>
        </div>
      </app-doc-code>

      <!-- 4. REACTIVE FORMS -->
      <app-doc-code
        title="4. Formularios Reactivos"
        description="Compatible con formControl, incluyendo el estado deshabilitado del control."
        [html]="reactiveHtml"
        [ts]="reactiveTs">
        <div class="val-flex val-flex-wrap val-justify-content-center val-align-items-center val-gap-3">
          <val-color-picker [formControl]="colorControl"></val-color-picker>
          <button val-button variant="secondary" size="md" (click)="toggleControl()">
            {{ colorControl.disabled ? 'Habilitar' : 'Deshabilitar' }}
          </button>
          <span class="val-fs-sm val-text-muted">Valor: <b>{{ colorControl.value }}</b></span>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table
        title="API Reference: ColorPickerComponent"
        [properties]="props"
        [events]="events">
      </app-doc-api-table>
    </div>
  `
})
export class ColorPickerDemoComponent {
  color: string | null = '#0066ff';
  brandColor = '#8b5cf6';
  sizeColor = '#f43f5e';
  emptyColor: string | null = null;
  colorControl = new FormControl<string | null>('#22c55e');

  presets = [
    '#ef4444', '#f97316', '#f59e0b', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
    '#0f172a', '#334155', '#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0', '#f1f5f9', '#ffffff'
  ];

  toggleControl() {
    if (this.colorControl.disabled) {
      this.colorControl.enable();
    } else {
      this.colorControl.disable();
    }
  }

  basicHtml = `<val-color-picker [(ngModel)]="color"></val-color-picker>`;

  basicTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerComponent } from 'valence-ui';

@Component({
  selector: 'app-my-color',
  standalone: true,
  imports: [FormsModule, ColorPickerComponent],
  templateUrl: './my-color.component.html'
})
export class MyColorComponent {
  color: string | null = '#0066ff';
}`;

  inlineHtml = `<val-color-picker
  [(ngModel)]="brandColor"
  [inline]="true"
  [presets]="presets">
</val-color-picker>`;

  inlineTs = `export class MyColorComponent {
  brandColor = '#8b5cf6';
  presets = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#3b82f6'];
}`;

  sizesHtml = `<val-color-picker size="sm" [(ngModel)]="color"></val-color-picker>
<val-color-picker size="md" [(ngModel)]="color"></val-color-picker>
<val-color-picker size="lg" [(ngModel)]="color"></val-color-picker>
<val-color-picker [(ngModel)]="emptyColor"></val-color-picker>
<val-color-picker [showValue]="false" [(ngModel)]="color"></val-color-picker>
<val-color-picker [disabled]="true" [ngModel]="'#10b981'"></val-color-picker>`;

  reactiveHtml = `<val-color-picker [formControl]="colorControl"></val-color-picker>`;

  reactiveTs = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from 'valence-ui';

@Component({
  selector: 'app-my-color',
  standalone: true,
  imports: [ReactiveFormsModule, ColorPickerComponent],
  template: \`<val-color-picker [formControl]="colorControl"></val-color-picker>\`
})
export class MyColorComponent {
  colorControl = new FormControl<string | null>('#22c55e');
}`;

  props: ApiProperty[] = [
    { name: 'value', type: 'string | null', default: 'null', description: "Color seleccionado en formato '#rrggbb'. Admite [(value)], ngModel y formControl." },
    { name: 'inline', type: 'boolean', default: 'false', description: 'Muestra el panel siempre visible en lugar de un botón con popup.' },
    { name: 'presets', type: 'string[]', default: '[]', description: "Colores sugeridos en hexadecimal ('#rgb' o '#rrggbb'). Los valores inválidos se ignoran." },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del botón.' },
    { name: 'showValue', type: 'boolean', default: 'true', description: 'Muestra el código hexadecimal junto a la muestra de color.' },
    { name: 'placeholder', type: 'string', default: "'Seleccionar color'", description: 'Texto del botón cuando no hay color seleccionado.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el selector.' },
    { name: 'ariaLabel', type: 'string', default: "'Selector de color'", description: 'Etiqueta accesible del botón y del panel.' }
  ];

  events: ApiEvent[] = [
    { name: 'valueChange', parameters: 'string | null', description: 'Emitido cada vez que cambia el color, también mientras se arrastra.' }
  ];
}
