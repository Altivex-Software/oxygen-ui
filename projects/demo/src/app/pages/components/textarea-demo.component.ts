import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TextareaComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Textarea (Texto Multilínea)</h1>
      <p class="val-description">Campo de texto multilínea para comentarios, descripciones y contenido extenso.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Uso Básico"
        description="Textarea con etiqueta y placeholder."
        [html]="basicHtml"
        [ts]="textareaTs">
        <div style="max-width: 450px;">
          <val-textarea label="Comentarios" placeholder="Escribe tus comentarios aquí..."></val-textarea>
        </div>
      </app-doc-code>

      <!-- 2. FILAS -->
      <app-doc-code
        title="2. Altura y Filas Personalizadas"
        description="Ajuste de líneas visibles mediante la propiedad [rows]."
        [html]="rowsHtml"
        [ts]="textareaTs">
        <div style="max-width: 450px;">
          <val-textarea label="Descripción Detallada" [rows]="6" placeholder="Área de texto de 6 filas..."></val-textarea>
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
  basicHtml = `<val-textarea label="Comentarios" placeholder="Escribe aquí..."></val-textarea>`;
  rowsHtml = `<val-textarea label="Descripción" [rows]="6"></val-textarea>`;

  textareaTs = `import { Component } from '@angular/core';
import { TextareaComponent } from 'valence-ui';

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
