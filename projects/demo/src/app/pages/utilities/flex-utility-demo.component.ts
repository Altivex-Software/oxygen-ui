import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-flex-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Flexbox</h1>
        <p class="ox-page-subtitle">
          Utilidades flexibles para maquetación: dirección, envoltorio, alineación vertical, distribución horizontal y control de crecimiento.
        </p>
      </div>

      <!-- DEMO 1: JUSTIFY CONTENT -->
      <app-doc-code
        title="1. Justificación Horizontal (.ox-justify-content-*)"
        description="Distribuye los elementos en el eje principal: start, center, end, between, around, evenly."
        [html]="justifyHtml">
        <div class="ox-demo-box ox-flex ox-flex-column ox-gap-3">
          <div class="ox-flex ox-justify-content-between ox-p-2 ox-bg-light ox-rounded ox-border">
            <div class="ox-box">between</div>
            <div class="ox-box">between</div>
            <div class="ox-box">between</div>
          </div>
          <div class="ox-flex ox-justify-content-center ox-p-2 ox-bg-light ox-rounded ox-border">
            <div class="ox-box">center</div>
            <div class="ox-box">center</div>
          </div>
          <div class="ox-flex ox-justify-content-end ox-p-2 ox-bg-light ox-rounded ox-border">
            <div class="ox-box">end</div>
            <div class="ox-box">end</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: ALIGN ITEMS -->
      <app-doc-code
        title="2. Alineación Vertical (.ox-align-items-*)"
        description="Alinea los elementos a lo largo del eje cruzado: start, center, end, baseline, stretch."
        [html]="alignHtml">
        <div class="ox-demo-box">
          <div class="ox-flex ox-align-items-center ox-gap-3 ox-p-3 ox-bg-light ox-rounded ox-border" style="height: 100px;">
            <div class="ox-box" style="height: 40px;">Height 40px</div>
            <div class="ox-box" style="height: 70px;">Height 70px (Centrado)</div>
            <div class="ox-box" style="height: 50px;">Height 50px</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: FLEX GROW & FILL -->
      <app-doc-code
        title="3. Crecimiento & Expansión (.ox-flex-fill, .ox-flex-grow-*)"
        description="Permite que un elemento ocupe todo el espacio sobrante disponible en la fila."
        [html]="fillHtml">
        <div class="ox-demo-box">
          <div class="ox-flex ox-gap-2 ox-p-2 ox-bg-light ox-rounded ox-border">
            <div class="ox-box">Fijo</div>
            <div class="ox-box ox-flex-fill ox-bg-primary ox-text-white">.ox-flex-fill (Ocupa el resto)</div>
            <div class="ox-box">Fijo</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 4: DIRECCIÓN RESPONSIVA -->
      <app-doc-code
        title="4. Dirección Responsiva (.ox-flex-column, .ox-flex-md-row)"
        description="Coloca items en columna en móviles y en fila horizontal a partir de tablets / pantallas medianas."
        [html]="directionHtml">
        <div class="ox-demo-box">
          <div class="ox-flex ox-flex-column ox-flex-md-row ox-gap-2 ox-p-3 ox-bg-light ox-rounded ox-border">
            <div class="ox-box ox-flex-fill">Paso 1</div>
            <div class="ox-box ox-flex-fill">Paso 2</div>
            <div class="ox-box ox-flex-fill">Paso 3</div>
          </div>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases Flexbox" 
        [classes]="flexClasses">
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
      width: 100%;
    }
    .ox-box {
      padding: 0.5rem 1rem;
      background: #e0e7ff;
      color: #3730a3;
      border: 1px solid #c7d2fe;
      border-radius: 6px;
      font-size: 0.8125rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class FlexUtilityDemoComponent {
  justifyHtml = `<div class="ox-flex ox-justify-content-between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`;

  alignHtml = `<div class="ox-flex ox-align-items-center" style="height: 100px;">
  <div>Item Centrado Verticalmente</div>
</div>`;

  fillHtml = `<div class="ox-flex ox-gap-2">
  <div>Fijo</div>
  <div class="ox-flex-fill">Auto-Expandible</div>
  <div>Fijo</div>
</div>`;

  directionHtml = `<div class="ox-flex ox-flex-column ox-flex-md-row ox-gap-2">
  <div class="ox-flex-fill">Paso 1</div>
  <div class="ox-flex-fill">Paso 2</div>
  <div class="ox-flex-fill">Paso 3</div>
</div>`;

  flexClasses: UtilityClass[] = [
    { name: 'ox-flex', css: 'display: flex !important', description: 'Activa el contenedor flex', responsive: true },
    { name: 'ox-inline-flex', css: 'display: inline-flex !important', description: 'Activa contenedor inline flex', responsive: true },
    { name: 'ox-flex-row', css: 'flex-direction: row !important', description: 'Dirección horizontal estándar', responsive: true },
    { name: 'ox-flex-column', css: 'flex-direction: column !important', description: 'Dirección vertical apilada', responsive: true },
    { name: 'ox-flex-row-reverse', css: 'flex-direction: row-reverse !important', description: 'Dirección horizontal invertida', responsive: true },
    { name: 'ox-flex-column-reverse', css: 'flex-direction: column-reverse !important', description: 'Dirección vertical invertida', responsive: true },
    { name: 'ox-flex-wrap', css: 'flex-wrap: wrap !important', description: 'Permite salto de línea en flex items', responsive: true },
    { name: 'ox-flex-nowrap', css: 'flex-wrap: nowrap !important', description: 'Fuerza que todos los items se mantengan en una sola línea', responsive: true },
    { name: 'ox-justify-content-start', css: 'justify-content: flex-start !important', description: 'Alinea al inicio del eje principal', responsive: true },
    { name: 'ox-justify-content-center', css: 'justify-content: center !important', description: 'Centra en el eje principal', responsive: true },
    { name: 'ox-justify-content-end', css: 'justify-content: flex-end !important', description: 'Alinea al final del eje principal', responsive: true },
    { name: 'ox-justify-content-between', css: 'justify-content: space-between !important', description: 'Espacio entre elementos con extremos pegados al borde', responsive: true },
    { name: 'ox-justify-content-around', css: 'justify-content: space-around !important', description: 'Espacio alrededor equitativo', responsive: true },
    { name: 'ox-justify-content-evenly', css: 'justify-content: space-evenly !important', description: 'Espacio idéntico entre elementos y bordes', responsive: true },
    { name: 'ox-align-items-start', css: 'align-items: flex-start !important', description: 'Alinea arriba en el eje cruzado', responsive: true },
    { name: 'ox-align-items-center', css: 'align-items: center !important', description: 'Centra en el eje cruzado', responsive: true },
    { name: 'ox-align-items-end', css: 'align-items: flex-end !important', description: 'Alinea abajo en el eje cruzado', responsive: true },
    { name: 'ox-align-items-stretch', css: 'align-items: stretch !important', description: 'Estira los elementos para ocupar la altura total', responsive: true },
    { name: 'ox-align-items-baseline', css: 'align-items: baseline !important', description: 'Alinea según la línea base del texto', responsive: true },
    { name: 'ox-flex-grow-1', css: 'flex-grow: 1 !important', description: 'Permite que el elemento crezca', responsive: true },
    { name: 'ox-flex-grow-0', css: 'flex-grow: 0 !important', description: 'Evita crecimiento flex', responsive: true },
    { name: 'ox-flex-shrink-1', css: 'flex-shrink: 1 !important', description: 'Permite encogerse si falta espacio', responsive: true },
    { name: 'ox-flex-shrink-0', css: 'flex-shrink: 0 !important', description: 'Impide que el elemento se encoja', responsive: true },
    { name: 'ox-flex-fill', css: 'flex: 1 1 auto !important', description: 'Llena el espacio sobrante proporcionalmente', responsive: true }
  ];
}
