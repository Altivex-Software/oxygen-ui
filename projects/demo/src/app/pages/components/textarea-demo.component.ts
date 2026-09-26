import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from 'oxygen-ui';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TextareaComponent],
  template: `
    <div class="ox-page-container">
      <h1>Textarea</h1>
      <p class="ox-description">Campo de texto multilínea.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <ox-textarea label="Comentarios" placeholder="Escribe aquí..."></ox-textarea>
      </section>

      <section class="ox-section">
        <h2>Filas personalizadas</h2>
        <ox-textarea label="Descripción larga" [rows]="10" placeholder="Este textarea es más alto..."></ox-textarea>
      </section>
    </div>
  `
})
export class TextareaDemoComponent {}
