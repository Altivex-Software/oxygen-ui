import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';

@Component({
  selector: 'app-tokens-utility-demo',
  standalone: true,
  imports: [CommonModule, DocCodeComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <h1 class="val-page-title">Variables CSS Globales & Design Tokens</h1>
        <p class="val-page-subtitle">
          Valence UI está construido sobre CSS Custom Properties (Variables CSS). Puedes sobreescribirlas a nivel global en <code>:root</code> o en cualquier contenedor para personalizar colores, radios, sombras y tipografía.
        </p>
      </div>

      <!-- PERSONALIZACIÓN RÁPIDA -->
      <app-doc-code
        title="1. Personalización de Tema en :root"
        description="Sobreescribe las variables en tu archivo styles.scss para cambiar la identidad visual de toda la librería."
        [html]="themeSnippetHtml">
        <div class="val-demo-box val-bg-light val-p-3 val-rounded val-border">
          <p class="val-mb-0">
            Al cambiar por ejemplo <code>--primary: #8b5cf6</code>, todos los botones, tarjetas, badges y clases <code>.val-bg-primary</code> / <code>.val-text-primary</code> adoptarán automáticamente tu nuevo color de marca.
          </p>
        </div>
      </app-doc-code>

      <!-- TARJETAS DE TOKENS -->
      <div class="val-tokens-grid">
        <div class="val-token-card">
          <h4>Colores Principales & Estados</h4>
          <div class="val-token-list">
            <div class="val-token-row"><code>--val-primary / --primary</code><span>#0066ff</span></div>
            <div class="val-token-row"><code>--primary-hover</code><span>#0052cc</span></div>
            <div class="val-token-row"><code>--val-secondary</code><span>#64748b</span></div>
            <div class="val-token-row"><code>--val-success / --success</code><span>#28a745</span></div>
            <div class="val-token-row"><code>--val-warning / --warning</code><span>#f1c40f</span></div>
            <div class="val-token-row"><code>--val-danger / --danger</code><span>#e74c3c</span></div>
            <div class="val-token-row"><code>--val-info / --info</code><span>#3498db</span></div>
          </div>
        </div>

        <div class="val-token-card">
          <h4>Superficies & Tipografía</h4>
          <div class="val-token-list">
            <div class="val-token-row"><code>--surface</code><span>#ffffff</span></div>
            <div class="val-token-row"><code>--surface-alt</code><span>#f7f7f7</span></div>
            <div class="val-token-row"><code>--surface-border</code><span>#e2e2e2</span></div>
            <div class="val-token-row"><code>--text-color</code><span>#1f2937</span></div>
            <div class="val-token-row"><code>--text-muted</code><span>#6b7280</span></div>
            <div class="val-token-row"><code>--font-primary</code><span>'Manrope', sans-serif</span></div>
          </div>
        </div>

        <div class="val-token-card">
          <h4>Bordes & Elevación</h4>
          <div class="val-token-list">
            <div class="val-token-row"><code>--radius-sm</code><span>4px</span></div>
            <div class="val-token-row"><code>--radius-md</code><span>6px</span></div>
            <div class="val-token-row"><code>--radius-lg</code><span>10px</span></div>
            <div class="val-token-row"><code>--shadow-sm</code><span>0 1px 3px rgba(0,0,0,0.1)</span></div>
            <div class="val-token-row"><code>--shadow-md</code><span>0 3px 8px rgba(0,0,0,0.15)</span></div>
            <div class="val-token-row"><code>--transition</code><span>150ms ease-in-out</span></div>
          </div>
        </div>
      </div>
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
    .val-tokens-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .val-token-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .val-token-card h4 {
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #f1f5f9;
    }
    .val-token-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .val-token-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
    }
    .val-token-row code {
      font-family: monospace;
      color: #7c3aed;
      background: #f5f3ff;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }
    .val-token-row span {
      color: #64748b;
      font-family: monospace;
      font-size: 0.75rem;
    }
  `]
})
export class TokensUtilityDemoComponent {
  themeSnippetHtml = `/* En src/styles.scss */
:root {
  --primary: #8b5cf6;       /* Tu color primario */
  --primary-hover: #7c3aed;
  --radius-md: 8px;         /* Radio personalizado */
}`;
}
