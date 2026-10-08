import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-interactivity-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Interactividad & Accesibilidad</h1>
        <p class="ox-page-subtitle">
          Controla tipos de cursor, selección de texto, eventos de puntero, scroll suave y clases para lectores de pantalla.
        </p>
      </div>

      <!-- DEMO 1: CURSORES -->
      <app-doc-code
        title="1. Tipos de Cursor (.ox-cursor-*)"
        description="Pasa el ratón sobre cada tarjeta para verificar el puntero correspondiente."
        [html]="cursorHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-3">
          <div class="ox-preview-card ox-cursor-pointer ox-border ox-rounded-md">.ox-cursor-pointer</div>
          <div class="ox-preview-card ox-cursor-grab ox-border ox-rounded-md">.ox-cursor-grab</div>
          <div class="ox-preview-card ox-cursor-not-allowed ox-border ox-rounded-md">.ox-cursor-not-allowed</div>
          <div class="ox-preview-card ox-cursor-wait ox-border ox-rounded-md">.ox-cursor-wait</div>
          <div class="ox-preview-card ox-cursor-text ox-border ox-rounded-md">.ox-cursor-text</div>
          <div class="ox-preview-card ox-cursor-zoom-in ox-border ox-rounded-md">.ox-cursor-zoom-in</div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: SELECCIÓN & POINTER EVENTS -->
      <app-doc-code
        title="2. Selección de Texto & Eventos (.ox-user-select-none, .ox-pointer-events-none)"
        description="Evita selección accidental de texto en botones o ignora eventos de ratón."
        [html]="selectHtml">
        <div class="ox-demo-box ox-flex ox-flex-wrap ox-gap-4 ox-align-items-center">
          <div class="ox-preview-card ox-user-select-none ox-bg-light ox-border ox-rounded-md">
            Texto no seleccionable (.ox-user-select-none)
          </div>
          <div class="ox-preview-card ox-pointer-events-none ox-opacity-50 ox-border ox-rounded-md">
            Sin eventos (.ox-pointer-events-none)
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: ACCESIBILIDAD Y DIVIDERS -->
      <app-doc-code
        title="3. Separadores Automáticos (.ox-divide-y) & Lector de Pantalla (.ox-sr-only)"
        description="Crea divisores continuos en listas o tarjetas sin bordes manuales en cada elemento."
        [html]="divideHtml">
        <div class="ox-demo-box">
          <div class="ox-divide-y ox-border ox-rounded-md ox-bg-white" style="max-width: 320px;">
            <div class="ox-p-3">Elemento 1</div>
            <div class="ox-p-3">Elemento 2</div>
            <div class="ox-p-3">Elemento 3</div>
          </div>
          <span class="ox-sr-only">Texto oculto visualmente pero disponible para lectores de pantalla</span>
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
    .ox-page-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .ox-page-title {
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
    }
    .ox-page-subtitle {
      font-size: 1rem;
      color: #475569;
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }
    .ox-demo-box {
      padding: 1.5rem;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
    }
    .ox-preview-card {
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
  cursorHtml = `<div class="ox-cursor-pointer">Mano / Puntero</div>
<div class="ox-cursor-grab">Mano abierta (arrastrar)</div>
<div class="ox-cursor-not-allowed">Prohibido / Deshabilitado</div>`;

  selectHtml = `<div class="ox-user-select-none">Texto no seleccionable</div>
<div class="ox-pointer-events-none">Ignora clics del mouse</div>`;

  divideHtml = `<div class="ox-divide-y ox-border ox-rounded-md">
  <div class="ox-p-3">Fila 1</div>
  <div class="ox-p-3">Fila 2</div>
  <div class="ox-p-3">Fila 3</div>
</div>

<span class="ox-sr-only">Accesible para lector de pantalla</span>`;

  interactiveClasses: UtilityClass[] = [
    { name: '.ox-cursor-pointer', css: 'cursor: pointer', description: 'Cursor de enlace o botón interactivo', responsive: false },
    { name: '.ox-cursor-grab / .ox-cursor-grabbing', css: 'cursor: grab / grabbing', description: 'Cursor de elemento arrastrable', responsive: false },
    { name: '.ox-cursor-not-allowed', css: 'cursor: not-allowed', description: 'Cursor de acción bloqueada', responsive: false },
    { name: '.ox-cursor-wait / .ox-cursor-text', css: 'cursor: wait / text', description: 'Cursor de espera o edición de texto', responsive: false },
    { name: '.ox-user-select-none / all / auto', css: 'user-select: none / all / auto', description: 'Permite o bloquea selección de texto', responsive: false },
    { name: '.ox-pointer-events-none / auto', css: 'pointer-events: none / auto', description: 'Habilita o ignora eventos de mouse', responsive: false },
    { name: '.ox-scroll-smooth / .ox-scroll-auto', css: 'scroll-behavior: smooth / auto', description: 'Desplazamiento suave de página', responsive: false },
    { name: '.ox-sr-only', css: 'position: absolute; width: 1px; clip: rect(0,0,0,0)', description: 'Solo visible para lectores de pantalla (A11y)', responsive: false },
    { name: '.ox-not-sr-only', css: 'position: static; width: auto; clip: auto', description: 'Revierte el estado de .ox-sr-only', responsive: false },
    { name: '.ox-divide-y / .ox-divide-x', css: 'border-top / border-left: 1px solid var(--border)', description: 'Divisores automáticos entre elementos adyacentes', responsive: false }
  ];
}
