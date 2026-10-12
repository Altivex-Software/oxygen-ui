import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-interactivity-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Interactividad & Accesibilidad</h1>
        <p class="val-page-subtitle">
          Controla tipos de cursor, selección de texto, eventos de puntero, scroll suave y clases para lectores de pantalla.
        </p>
      </div>

      <!-- DEMO 1: CURSORES -->
      <app-doc-code
        title="1. Tipos de Cursor (.val-cursor-*)"
        description="Pasa el ratón sobre cada tarjeta para verificar el puntero correspondiente."
        [html]="cursorHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-3">
          <div class="val-preview-card val-cursor-pointer val-border val-rounded-md">.val-cursor-pointer</div>
          <div class="val-preview-card val-cursor-grab val-border val-rounded-md">.val-cursor-grab</div>
          <div class="val-preview-card val-cursor-not-allowed val-border val-rounded-md">.val-cursor-not-allowed</div>
          <div class="val-preview-card val-cursor-wait val-border val-rounded-md">.val-cursor-wait</div>
          <div class="val-preview-card val-cursor-text val-border val-rounded-md">.val-cursor-text</div>
          <div class="val-preview-card val-cursor-zoom-in val-border val-rounded-md">.val-cursor-zoom-in</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: SELECCIÓN & POINTER EVENTS -->
      <app-doc-code
        title="2. Selección de Texto & Eventos (.val-user-select-none, .val-pointer-events-none)"
        description="Evita selección accidental de texto en botones o ignora eventos de ratón."
        [html]="selectHtml">
        <div class="val-demo-box val-flex val-flex-wrap val-gap-4 val-align-items-center">
          <div class="val-preview-card val-user-select-none val-bg-light val-border val-rounded-md">
            Texto no seleccionable (.val-user-select-none)
          </div>
          <div class="val-preview-card val-pointer-events-none val-opacity-50 val-border val-rounded-md">
            Sin eventos (.val-pointer-events-none)
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: ACCESIBILIDAD Y DIVIDERS -->
      <app-doc-code
        title="3. Separadores Automáticos (.val-divide-y) & Lector de Pantalla (.val-sr-only)"
        description="Crea divisores continuos en listas o tarjetas sin bordes manuales en cada elemento."
        [html]="divideHtml">
        <div class="val-demo-box">
          <div class="val-divide-y val-border val-rounded-md val-bg-white" style="max-width: 320px;">
            <div class="val-p-3">Elemento 1</div>
            <div class="val-p-3">Elemento 2</div>
            <div class="val-p-3">Elemento 3</div>
          </div>
          <span class="val-sr-only">Texto oculto visualmente pero disponible para lectores de pantalla</span>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Interactividad" 
        [classes]="interactiveClasses">
      </app-utility-table>
    </div>
  `,
  styles: [`
    .val-page-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .val-page-title {
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }
    .val-page-subtitle {
      font-size: 1rem;
      color: #475569;
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }
    .val-demo-box {
      padding: 1.5rem;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
    }
    .val-preview-card {
      padding: 1rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
  `]
})
export class InteractivityUtilityDemoComponent {
  cursorHtml = `<div class="val-cursor-pointer">Mano / Puntero</div>
<div class="val-cursor-grab">Mano abierta (arrastrar)</div>
<div class="val-cursor-not-allowed">Prohibido / Deshabilitado</div>`;

  selectHtml = `<div class="val-user-select-none">Texto no seleccionable</div>
<div class="val-pointer-events-none">Ignora clics del mouse</div>`;

  divideHtml = `<div class="val-divide-y val-border val-rounded-md">
  <div class="val-p-3">Fila 1</div>
  <div class="val-p-3">Fila 2</div>
  <div class="val-p-3">Fila 3</div>
</div>

<span class="val-sr-only">Accesible para lector de pantalla</span>`;

  interactiveClasses: UtilityClass[] = [
    { name: '.val-cursor-pointer', css: 'cursor: pointer', description: 'Cursor de enlace o botón interactivo', responsive: false },
    { name: '.val-cursor-grab / .val-cursor-grabbing', css: 'cursor: grab / grabbing', description: 'Cursor de elemento arrastrable', responsive: false },
    { name: '.val-cursor-not-allowed', css: 'cursor: not-allowed', description: 'Cursor de acción bloqueada', responsive: false },
    { name: '.val-cursor-wait / .val-cursor-text', css: 'cursor: wait / text', description: 'Cursor de espera o edición de texto', responsive: false },
    { name: '.val-user-select-none / all / auto', css: 'user-select: none / all / auto', description: 'Permite o bloquea selección de texto', responsive: false },
    { name: '.val-pointer-events-none / auto', css: 'pointer-events: none / auto', description: 'Habilita o ignora eventos de mouse', responsive: false },
    { name: '.val-scroll-smooth / .val-scroll-auto', css: 'scroll-behavior: smooth / auto', description: 'Desplazamiento suave de página', responsive: false },
    { name: '.val-sr-only', css: 'position: absolute; width: 1px; clip: rect(0,0,0,0)', description: 'Solo visible para lectores de pantalla (A11y)', responsive: false },
    { name: '.val-not-sr-only', css: 'position: static; width: auto; clip: auto', description: 'Revierte el estado de .val-sr-only', responsive: false },
    { name: '.val-divide-y / .val-divide-x', css: 'border-top / border-left: 1px solid var(--border)', description: 'Divisores automáticos entre elementos adyacentes', responsive: false }
  ];
}
