import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { UtilityTableComponent, UtilityClass } from './utility-table.component';

@Component({
  selector: 'app-typography-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent, UtilityTableComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <h1 class="ox-page-title">Tipografía & Texto</h1>
        <p class="ox-page-subtitle">
          Encabezados fluidos con escala automática <code>clamp()</code>, subtítulos, tamaños de fuente, pesos, alineación y transformaciones.
        </p>
      </div>

      <!-- DEMO 1: ENCABEZADOS FLUIDOS -->
      <app-doc-code
        title="1. Encabezados Fluidos (.ox-h1, .ox-h2, .ox-h3)"
        description="Se adaptan de manera fluida y armónica según el tamaño de la pantalla."
        [html]="headingsHtml">
        <div class="ox-demo-box ox-bg-light ox-p-4 ox-rounded ox-border">
          <div class="ox-h1 ox-text-primary ox-mb-2">Encabezado .ox-h1 Fluido</div>
          <div class="ox-h2 ox-text-secondary ox-mb-2">Encabezado .ox-h2 Fluido</div>
          <div class="ox-h3 ox-mb-3">Encabezado .ox-h3 Fluido</div>
          <div class="ox-subtitle1 ox-text-muted ox-mb-2">Subtítulo 1 (.ox-subtitle1)</div>
          <p class="ox-p">Párrafo regular estilizado (.ox-p) con la tipografía Manrope.</p>
        </div>
      </app-doc-code>

      <!-- DEMO 2: TAMAÑOS DE FUENTE -->
      <app-doc-code
        title="2. Escala de Tamaños de Fuente (.ox-fs-*)"
        description="Desde extra pequeño (xs: 12px) hasta display grande (5xl: 48px)."
        [html]="fontSizesHtml">
        <div class="ox-demo-box ox-flex ox-flex-column ox-gap-2">
          <span class="ox-fs-xs">.ox-fs-xs (0.75rem / 12px)</span>
          <span class="ox-fs-sm">.ox-fs-sm (0.875rem / 14px)</span>
          <span class="ox-fs-base">.ox-fs-base (1rem / 16px)</span>
          <span class="ox-fs-lg">.ox-fs-lg (1.125rem / 18px)</span>
          <span class="ox-fs-xl">.ox-fs-xl (1.25rem / 20px)</span>
          <span class="ox-fs-2xl">.ox-fs-2xl (1.5rem / 24px)</span>
          <span class="ox-fs-3xl">.ox-fs-3xl (1.875rem / 30px)</span>
        </div>
      </app-doc-code>

      <!-- DEMO 3: PESOS DE FUENTE -->
      <app-doc-code
        title="3. Pesos de Fuente (.ox-fw-*)"
        description="Opciones de grosor tipográfico: light (300), normal (400), medium (500), semibold (600), bold (700)."
        [html]="fontWeightsHtml">
        <div class="ox-demo-box ox-flex ox-flex-column ox-gap-2">
          <span class="ox-fw-light">.ox-fw-light (300) - Texto ligero</span>
          <span class="ox-fw-normal">.ox-fw-normal (400) - Texto regular</span>
          <span class="ox-fw-medium">.ox-fw-medium (500) - Texto medio</span>
          <span class="ox-fw-semibold">.ox-fw-semibold (600) - Texto semi-negrita</span>
          <span class="ox-fw-bold">.ox-fw-bold (700) - Texto negrita</span>
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
  `]
})
export class TypographyUtilityDemoComponent {
  headingsHtml = `<div class="ox-h1 ox-text-primary">Encabezado .ox-h1</div>
<div class="ox-h2 ox-text-secondary">Encabezado .ox-h2</div>
<div class="ox-h3">Encabezado .ox-h3</div>
<div class="ox-subtitle1 ox-text-muted">Subtítulo 1</div>
<p class="ox-p">Párrafo regular</p>`;

  fontSizesHtml = `<span class="ox-fs-xs">12px</span>
<span class="ox-fs-sm">14px</span>
<span class="ox-fs-base">16px</span>
<span class="ox-fs-lg">18px</span>
<span class="ox-fs-xl">20px</span>
<span class="ox-fs-2xl">24px</span>`;

  fontWeightsHtml = `<span class="ox-fw-light">Light</span>
<span class="ox-fw-normal">Normal</span>
<span class="ox-fw-medium">Medium</span>
<span class="ox-fw-semibold">Semibold</span>
<span class="ox-fw-bold">Bold</span>`;

  typographyClasses: UtilityClass[] = [
    { name: 'ox-h1', css: 'font-size: clamp(1.75rem, ..., 3rem); font-weight: 700', description: 'Título de primer nivel fluido y responsivo', responsive: true },
    { name: 'ox-h2', css: 'font-size: clamp(1.5rem, ..., 2.25rem); font-weight: 600', description: 'Título de segundo nivel fluido', responsive: true },
    { name: 'ox-h3', css: 'font-size: clamp(1.25rem, ..., 1.875rem); font-weight: 600', description: 'Título de tercer nivel fluido', responsive: true },
    { name: 'ox-subtitle1', css: 'font-size: clamp(1.125rem, ..., 1.25rem); font-weight: 500', description: 'Subtítulo grande', responsive: true },
    { name: 'ox-subtitle2', css: 'font-size: clamp(1.0625rem, ..., 1.125rem); font-weight: 500', description: 'Subtítulo mediano', responsive: true },
    { name: 'ox-subtitle3', css: 'font-size: 1rem; font-weight: 500', description: 'Subtítulo base', responsive: true },
    { name: 'ox-p', css: 'font-size: clamp(0.9375rem, ..., 1rem); line-height: 1.6', description: 'Párrafo estándar con espaciado óptimo', responsive: true },
    { name: 'ox-p-sm', css: 'font-size: 0.875rem; line-height: 1.6', description: 'Párrafo pequeño compacto (14px)', responsive: true },
    { name: 'ox-fs-xs', css: 'font-size: 0.75rem (12px)', description: 'Tamaño extra pequeño', responsive: true },
    { name: 'ox-fs-sm', css: 'font-size: 0.875rem (14px)', description: 'Tamaño pequeño', responsive: true },
    { name: 'ox-fs-base', css: 'font-size: 1rem (16px)', description: 'Tamaño de texto base estándar', responsive: true },
    { name: 'ox-fs-lg', css: 'font-size: 1.125rem (18px)', description: 'Tamaño grande', responsive: true },
    { name: 'ox-fs-xl', css: 'font-size: 1.25rem (20px)', description: 'Tamaño extra grande', responsive: true },
    { name: 'ox-fs-2xl / 3xl / 4xl / 5xl', css: 'font-size: 1.5rem a 3rem', description: 'Tamaños grandes para displays', responsive: true },
    { name: 'ox-fw-light', css: 'font-weight: 300 !important', description: 'Peso de fuente delgado', responsive: true },
    { name: 'ox-fw-normal', css: 'font-weight: 400 !important', description: 'Peso de fuente regular', responsive: true },
    { name: 'ox-fw-medium', css: 'font-weight: 500 !important', description: 'Peso de fuente medio', responsive: true },
    { name: 'ox-fw-semibold', css: 'font-weight: 600 !important', description: 'Peso de fuente semi-negrita', responsive: true },
    { name: 'ox-fw-bold', css: 'font-weight: 700 !important', description: 'Peso de fuente negrita', responsive: true },
    { name: 'ox-text-start', css: 'text-align: left !important', description: 'Alineación de texto a la izquierda', responsive: true },
    { name: 'ox-text-center', css: 'text-align: center !important', description: 'Alineación de texto centrada', responsive: true },
    { name: 'ox-text-end', css: 'text-align: right !important', description: 'Alineación de texto a la derecha', responsive: true },
    { name: 'ox-text-italic', css: 'font-style: italic !important', description: 'Texto en cursiva', responsive: true },
    { name: 'ox-text-transform-uppercase', css: 'text-transform: uppercase !important', description: 'Texto a MAYÚSCULAS', responsive: true },
    { name: 'ox-text-transform-lowercase', css: 'text-transform: lowercase !important', description: 'Texto a minúsculas', responsive: true },
    { name: 'ox-text-transform-capitalize', css: 'text-transform: capitalize !important', description: 'Capitaliza primera letra', responsive: true },
    { name: 'ox-text-decoration-none', css: 'text-decoration: none !important', description: 'Remueve subrayado', responsive: true },
    { name: 'ox-text-decoration-underline', css: 'text-decoration: underline !important', description: 'Añade subrayado', responsive: true }
  ];
}
