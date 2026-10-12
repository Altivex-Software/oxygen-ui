import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-flex-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Flexbox</h1>
        <p class="val-page-subtitle">
          Utilidades flexibles para maquetación: dirección, envoltorio, alineación vertical, distribución horizontal y control de crecimiento.
        </p>
      </div>

      <!-- DEMO 1: JUSTIFY CONTENT -->
      <app-doc-code
        title="1. Justificación Horizontal (.val-justify-content-*)"
        description="Distribuye los elementos en el eje principal: start, center, end, between, around, evenly."
        [html]="justifyHtml">
        <div class="val-demo-box val-flex val-flex-column val-gap-3">
          <div class="val-flex val-justify-content-between val-p-2 val-bg-light val-rounded val-border">
            <div class="val-box">between</div>
            <div class="val-box">between</div>
            <div class="val-box">between</div>
          </div>
          <div class="val-flex val-justify-content-center val-p-2 val-bg-light val-rounded val-border">
            <div class="val-box">center</div>
            <div class="val-box">center</div>
          </div>
          <div class="val-flex val-justify-content-end val-p-2 val-bg-light val-rounded val-border">
            <div class="val-box">end</div>
            <div class="val-box">end</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 2: ALIGN ITEMS -->
      <app-doc-code
        title="2. Alineación Vertical (.val-align-items-*)"
        description="Alinea los elementos a lo largo del eje cruzado: start, center, end, baseline, stretch."
        [html]="alignHtml">
        <div class="val-demo-box">
          <div class="val-flex val-align-items-center val-gap-3 val-p-3 val-bg-light val-rounded val-border" style="height: 100px;">
            <div class="val-box" style="height: 40px;">Height 40px</div>
            <div class="val-box" style="height: 70px;">Height 70px (Centrado)</div>
            <div class="val-box" style="height: 50px;">Height 50px</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 3: FLEX GROW & FILL -->
      <app-doc-code
        title="3. Crecimiento & Expansión (.val-flex-fill, .val-flex-grow-*)"
        description="Permite que un elemento ocupe todo el espacio sobrante disponible en la fila."
        [html]="fillHtml">
        <div class="val-demo-box">
          <div class="val-flex val-gap-2 val-p-2 val-bg-light val-rounded val-border">
            <div class="val-box">Fijo</div>
            <div class="val-box val-flex-fill val-bg-primary val-text-white">.val-flex-fill (Ocupa el resto)</div>
            <div class="val-box">Fijo</div>
          </div>
        </div>
      </app-doc-code>

      <!-- DEMO 4: DIRECCIÓN RESPONSIVA -->
      <app-doc-code
        title="4. Dirección Responsiva (.val-flex-column, .val-flex-md-row)"
        description="Coloca items en columna en móviles y en fila horizontal a partir de tablets / pantallas medianas."
        [html]="directionHtml">
        <div class="val-demo-box">
          <div class="val-flex val-flex-column val-flex-md-row val-gap-2 val-p-3 val-bg-light val-rounded val-border">
            <div class="val-box val-flex-fill">Paso 1</div>
            <div class="val-box val-flex-fill">Paso 2</div>
            <div class="val-box val-flex-fill">Paso 3</div>
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
      width: 100%;
    }
    .val-box {
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
  justifyHtml = `<div class="val-flex val-justify-content-between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`;

  alignHtml = `<div class="val-flex val-align-items-center" style="height: 100px;">
  <div>Item Centrado Verticalmente</div>
</div>`;

  fillHtml = `<div class="val-flex val-gap-2">
  <div>Fijo</div>
  <div class="val-flex-fill">Auto-Expandible</div>
  <div>Fijo</div>
</div>`;

  directionHtml = `<div class="val-flex val-flex-column val-flex-md-row val-gap-2">
  <div class="val-flex-fill">Paso 1</div>
  <div class="val-flex-fill">Paso 2</div>
  <div class="val-flex-fill">Paso 3</div>
</div>`;

  flexClasses: UtilityClass[] = [
    { name: 'val-flex', css: 'display: flex !important', description: 'Activa el contenedor flex', responsive: true },
    { name: 'val-inline-flex', css: 'display: inline-flex !important', description: 'Activa contenedor inline flex', responsive: true },
    { name: 'val-flex-row', css: 'flex-direction: row !important', description: 'Dirección horizontal estándar', responsive: true },
    { name: 'val-flex-column', css: 'flex-direction: column !important', description: 'Dirección vertical apilada', responsive: true },
    { name: 'val-flex-row-reverse', css: 'flex-direction: row-reverse !important', description: 'Dirección horizontal invertida', responsive: true },
    { name: 'val-flex-column-reverse', css: 'flex-direction: column-reverse !important', description: 'Dirección vertical invertida', responsive: true },
    { name: 'val-flex-wrap', css: 'flex-wrap: wrap !important', description: 'Permite salto de línea en flex items', responsive: true },
    { name: 'val-flex-nowrap', css: 'flex-wrap: nowrap !important', description: 'Fuerza que todos los items se mantengan en una sola línea', responsive: true },
    { name: 'val-justify-content-start', css: 'justify-content: flex-start !important', description: 'Alinea al inicio del eje principal', responsive: true },
    { name: 'val-justify-content-center', css: 'justify-content: center !important', description: 'Centra en el eje principal', responsive: true },
    { name: 'val-justify-content-end', css: 'justify-content: flex-end !important', description: 'Alinea al final del eje principal', responsive: true },
    { name: 'val-justify-content-between', css: 'justify-content: space-between !important', description: 'Espacio entre elementos con extremos pegados al borde', responsive: true },
    { name: 'val-justify-content-around', css: 'justify-content: space-around !important', description: 'Espacio alrededor equitativo', responsive: true },
    { name: 'val-justify-content-evenly', css: 'justify-content: space-evenly !important', description: 'Espacio idéntico entre elementos y bordes', responsive: true },
    { name: 'val-align-items-start', css: 'align-items: flex-start !important', description: 'Alinea arriba en el eje cruzado', responsive: true },
    { name: 'val-align-items-center', css: 'align-items: center !important', description: 'Centra en el eje cruzado', responsive: true },
    { name: 'val-align-items-end', css: 'align-items: flex-end !important', description: 'Alinea abajo en el eje cruzado', responsive: true },
    { name: 'val-align-items-stretch', css: 'align-items: stretch !important', description: 'Estira los elementos para ocupar la altura total', responsive: true },
    { name: 'val-align-items-baseline', css: 'align-items: baseline !important', description: 'Alinea según la línea base del texto', responsive: true },
    { name: 'val-flex-grow-1', css: 'flex-grow: 1 !important', description: 'Permite que el elemento crezca', responsive: true },
    { name: 'val-flex-grow-0', css: 'flex-grow: 0 !important', description: 'Evita crecimiento flex', responsive: true },
    { name: 'val-flex-shrink-1', css: 'flex-shrink: 1 !important', description: 'Permite encogerse si falta espacio', responsive: true },
    { name: 'val-flex-shrink-0', css: 'flex-shrink: 0 !important', description: 'Impide que el elemento se encoja', responsive: true },
    { name: 'val-flex-fill', css: 'flex: 1 1 auto !important', description: 'Llena el espacio sobrante proporcionalmente', responsive: true }
  ];
}
