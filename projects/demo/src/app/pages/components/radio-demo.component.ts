import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioGroupComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioGroupComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Radio Button (Botones de Radio)</h1>
      <p class="ox-description">Grupo de opciones mutuamente excluyentes para selección única en formularios.</p>

      <!-- 1. HORIZONTAL -->
      <app-doc-code
        title="1. Disposición Horizontal"
        description="Opciones distribuidas en línea horizontal (default)."
        [html]="horizontalHtml"
        [ts]="radioTs">
        <div>
          <ox-radio-group [options]="options" [(ngModel)]="selectedValue"></ox-radio-group>
          <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #475569;">
            Valor seleccionado: <b>Opción {{ selectedValue }}</b>
          </p>
        </div>
      </app-doc-code>

      <!-- 2. VERTICAL -->
      <app-doc-code
        title="2. Disposición Vertical"
        description="Opciones apiladas verticalmente con la directiva [vertical]='true'."
        [html]="verticalHtml"
        [ts]="radioTs">
        <ox-radio-group [options]="options" [(ngModel)]="selectedValueVertical" [vertical]="true"></ox-radio-group>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: RadioGroupComponent"
        [properties]="radioProps">
      </app-doc-api-table>
    </div>
  `
})
export class RadioDemoComponent {
  options = [
    { label: 'Opción 1', value: 1 },
    { label: 'Opción 2', value: 2 },
    { label: 'Opción 3 (Deshabilitada)', value: 3, disabled: true }
  ];
  selectedValue = 1;
  selectedValueVertical = 2;

  horizontalHtml = `<ox-radio-group 
  [options]="options" 
  [(ngModel)]="selectedValue">
</ox-radio-group>`;

  verticalHtml = `<ox-radio-group 
  [options]="options" 
  [(ngModel)]="selectedValue" 
  [vertical]="true">
</ox-radio-group>`;

  radioTs = `options = [
  { label: 'Opción 1', value: 1 },
  { label: 'Opción 2', value: 2 },
  { label: 'Opción 3', value: 3, disabled: true }
];
selectedValue = 1;`;

  radioProps: ApiProperty[] = [
    {
      name: 'options',
      type: 'Array<{ label: string, value: any, disabled?: boolean }>',
      default: '[]',
      description: 'Colección de opciones de radio.'
    },
    {
      name: 'vertical',
      type: 'boolean',
      default: 'false',
      description: 'Apila las opciones verticalmente en vez de horizontal.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita todas las opciones de selección.'
    }
  ];
}
