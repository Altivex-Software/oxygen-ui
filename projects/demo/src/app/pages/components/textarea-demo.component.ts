import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TextareaComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Textarea (Texto Multilínea)</h1>
      <p class="ox-description">Campo de texto multilínea para comentarios, descripciones y contenido extenso.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Textarea con etiqueta y placeholder."
        [html]="basicHtml"
        [ts]="textareaTs">
        <div style="max-width: 450px;">
          <ox-textarea label="Comentarios" placeholder="Escribe tus comentarios aquí..."></ox-textarea>
        </div>
      </app-doc-code>

      <!-- 2. FILAS -->
      <app-doc-code
        title="2. Altura y Filas Personalizadas"
        description="Ajuste de líneas visibles mediante la propiedad [rows]."
        [html]="rowsHtml"
        [ts]="textareaTs">
        <div style="max-width: 450px;">
          <ox-textarea label="Descripción Detallada" [rows]="6" placeholder="Área de texto de 6 filas..."></ox-textarea>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: TextareaComponent"
        [properties]="textareaProps">
      </app-doc-api-table>
    </div>
  `
})
export class TextareaDemoComponent {
  basicHtml = `<ox-textarea label="Comentarios" placeholder="Escribe aquí..."></ox-textarea>`;
  rowsHtml = `<ox-textarea label="Descripción" [rows]="6"></ox-textarea>`;

  textareaTs = `import { Component } from '@angular/core';
import { TextareaComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-textarea',
  standalone: true,
  imports: [TextareaComponent],
  templateUrl: './my-textarea.component.html'
})
export class MyTextareaComponent {}`;

  textareaProps: ApiProperty[] = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Etiqueta superior del campo multilínea.'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Texto de ayuda inicial.'
    },
    {
      name: 'rows',
      type: 'number',
      default: '3',
      description: 'Número de filas de altura del área de texto.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Deshabilita la edición.'
    }
  ];
}
