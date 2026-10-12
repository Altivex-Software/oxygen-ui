import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-typography-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Tipografía & Texto</h1>
        <p class="val-page-subtitle">
          Encabezados fluidos con escala automática <code>clamp()</code>, subtítulos, tamaños de fuente, pesos, alineación y transformaciones.
        </p>
      </div>

      <!-- DEMO 1: ENCABEZADOS FLUIDOS -->
      <app-doc-code
        title="1. Encabezados Fluidos (.val-h1, .val-h2, .val-h3)"
        description="Se adaptan de manera fluida y armónica según el tamaño de la pantalla."
        [html]="headingsHtml">
        <div class="val-demo-box val-bg-light val-p-4 val-rounded val-border">
          <div class="val-h1 val-text-primary val-mb-2">Encabezado .val-h1 Fluido</div>
          <div class="val-h2 val-text-secondary val-mb-2">Encabezado .val-h2 Fluido</div>
          <div class="val-h3 val-mb-3">Encabezado .val-h3 Fluido</div>
          <div class="val-subtitle1 val-text-muted val-mb-2">Subtítulo 1 (.val-subtitle1)</div>
          <p class="val-p">Párrafo regular estilizado (.val-p) con la tipografía Manrope.</p>
        </div>
      </app-doc-code>

      <!-- DEMO 2: TAMAÑOS DE FUENTE -->
      <app-doc-code
        title="2. Escala de Tamaños de Fuente (.val-fs-*)"
        description="Desde extra pequeño (xs: 12px) hasta display grande (5xl: 48px)."
        [html]="fontSizesHtml">
        <div class="val-demo-box val-flex val-flex-column val-gap-2">
          <span class="val-fs-xs">.val-fs-xs (0.75rem / 12px)</span>
          <span class="val-fs-sm">.val-fs-sm (0.875rem / 14px)</span>
          <span class="val-fs-base">.val-fs-base (1rem / 16px)</span>
          <span class="val-fs-lg">.val-fs-lg (1.125rem / 18px)</span>
          <span class="val-fs-xl">.val-fs-xl (1.25rem / 20px)</span>
          <span class="val-fs-2xl">.val-fs-2xl (1.5rem / 24px)</span>
          <span class="val-fs-3xl">.val-fs-3xl (1.875rem / 30px)</span>
        </div>
      </app-doc-code>

      <!-- DEMO 3: PESOS DE FUENTE -->
      <app-doc-code
        title="3. Pesos de Fuente (.val-fw-*)"
        description="Opciones de grosor tipográfico: light (300), normal (400), medium (500), semibold (600), bold (700)."
        [html]="fontWeightsHtml">
        <div class="val-demo-box val-flex val-flex-column val-gap-2">
          <span class="val-fw-light">.val-fw-light (300) - Texto ligero</span>
          <span class="val-fw-normal">.val-fw-normal (400) - Texto regular</span>
          <span class="val-fw-medium">.val-fw-medium (500) - Texto medio</span>
          <span class="val-fw-semibold">.val-fw-semibold (600) - Texto semi-negrita</span>
          <span class="val-fw-bold">.val-fw-bold (700) - Texto negrita</span>
        </div>
      </app-doc-code>

      <!-- TABLA DE CLASES -->
      <app-utility-table 
        title="Referencia de Clases de Tipografía" 
        [classes]="typographyClasses">
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
  `]
})
export class TypographyUtilityDemoComponent {
  headingsHtml = `<div class="val-h1 val-text-primary">Encabezado .val-h1</div>
<div class="val-h2 val-text-secondary">Encabezado .val-h2</div>
<div class="val-h3">Encabezado .val-h3</div>
<div class="val-subtitle1 val-text-muted">Subtítulo 1</div>
<p class="val-p">Párrafo regular</p>`;

  fontSizesHtml = `<span class="val-fs-xs">12px</span>
<span class="val-fs-sm">14px</span>
<span class="val-fs-base">16px</span>
<span class="val-fs-lg">18px</span>
<span class="val-fs-xl">20px</span>
<span class="val-fs-2xl">24px</span>`;

  fontWeightsHtml = `<span class="val-fw-light">Light</span>
<span class="val-fw-normal">Normal</span>
<span class="val-fw-medium">Medium</span>
<span class="val-fw-semibold">Semibold</span>
<span class="val-fw-bold">Bold</span>`;

  typographyClasses: UtilityClass[] = [
    { name: 'val-h1', css: 'font-size: clamp(1.75rem, ..., 3rem); font-weight: 700', description: 'Título de primer nivel fluido y responsivo', responsive: true },
    { name: 'val-h2', css: 'font-size: clamp(1.5rem, ..., 2.25rem); font-weight: 600', description: 'Título de segundo nivel fluido', responsive: true },
    { name: 'val-h3', css: 'font-size: clamp(1.25rem, ..., 1.875rem); font-weight: 600', description: 'Título de tercer nivel fluido', responsive: true },
    { name: 'val-subtitle1', css: 'font-size: clamp(1.125rem, ..., 1.25rem); font-weight: 500', description: 'Subtítulo grande', responsive: true },
    { name: 'val-subtitle2', css: 'font-size: clamp(1.0625rem, ..., 1.125rem); font-weight: 500', description: 'Subtítulo mediano', responsive: true },
    { name: 'val-subtitle3', css: 'font-size: 1rem; font-weight: 500', description: 'Subtítulo base', responsive: true },
    { name: 'val-p', css: 'font-size: clamp(0.9375rem, ..., 1rem); line-height: 1.6', description: 'Párrafo estándar con espaciado óptimo', responsive: true },
    { name: 'val-p-sm', css: 'font-size: 0.875rem; line-height: 1.6', description: 'Párrafo pequeño compacto (14px)', responsive: true },
    { name: 'val-fs-xs', css: 'font-size: 0.75rem (12px)', description: 'Tamaño extra pequeño', responsive: true },
    { name: 'val-fs-sm', css: 'font-size: 0.875rem (14px)', description: 'Tamaño pequeño', responsive: true },
    { name: 'val-fs-base', css: 'font-size: 1rem (16px)', description: 'Tamaño de texto base estándar', responsive: true },
    { name: 'val-fs-lg', css: 'font-size: 1.125rem (18px)', description: 'Tamaño grande', responsive: true },
    { name: 'val-fs-xl', css: 'font-size: 1.25rem (20px)', description: 'Tamaño extra grande', responsive: true },
    { name: 'val-fs-2xl / 3xl / 4xl / 5xl', css: 'font-size: 1.5rem a 3rem', description: 'Tamaños grandes para displays', responsive: true },
    { name: 'val-fw-light', css: 'font-weight: 300 !important', description: 'Peso de fuente delgado', responsive: true },
    { name: 'val-fw-normal', css: 'font-weight: 400 !important', description: 'Peso de fuente regular', responsive: true },
    { name: 'val-fw-medium', css: 'font-weight: 500 !important', description: 'Peso de fuente medio', responsive: true },
    { name: 'val-fw-semibold', css: 'font-weight: 600 !important', description: 'Peso de fuente semi-negrita', responsive: true },
    { name: 'val-fw-bold', css: 'font-weight: 700 !important', description: 'Peso de fuente negrita', responsive: true },
    { name: 'val-text-start', css: 'text-align: left !important', description: 'Alineación de texto a la izquierda', responsive: true },
    { name: 'val-text-center', css: 'text-align: center !important', description: 'Alineación de texto centrada', responsive: true },
    { name: 'val-text-end', css: 'text-align: right !important', description: 'Alineación de texto a la derecha', responsive: true },
    { name: 'val-text-italic', css: 'font-style: italic !important', description: 'Texto en cursiva', responsive: true },
    { name: 'val-text-transform-uppercase', css: 'text-transform: uppercase !important', description: 'Texto a MAYÚSCULAS', responsive: true },
    { name: 'val-text-transform-lowercase', css: 'text-transform: lowercase !important', description: 'Texto a minúsculas', responsive: true },
    { name: 'val-text-transform-capitalize', css: 'text-transform: capitalize !important', description: 'Capitaliza primera letra', responsive: true },
    { name: 'val-text-decoration-none', css: 'text-decoration: none !important', description: 'Remueve subrayado', responsive: true },
    { name: 'val-text-decoration-underline', css: 'text-decoration: underline !important', description: 'Añade subrayado', responsive: true }
  ];
}
