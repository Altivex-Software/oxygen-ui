import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from 'oxygen-ui';

@Component({
  selector: 'app-overview-utility-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="ox-page-container">
      <div class="ox-header-hero">
        <div class="ox-badge-wrapper">
          <span class="ox-badge-pill">Oxygen UI Styles</span>
          <span class="ox-badge-ver">v1.0.0</span>
        </div>
        <h1 class="ox-page-title">Guía & Configuración de Clases CSS</h1>
        <p class="ox-page-subtitle">
          Oxygen UI proporciona un sistema completo de utilidades CSS atomizadas y altamente optimizadas. 
          Aprende cómo configurarlas en tu aplicación Angular y cómo aprovechar al máximo los modificadores responsivos.
        </p>
      </div>

      <!-- INSTALACIÓN -->
      <div class="ox-setup-card">
        <div class="ox-setup-header">
          <div class="ox-setup-icon">
            <ox-icon name="zap" size="1.5rem"></ox-icon>
          </div>
          <div>
            <h3 class="ox-setup-title">1. Importación en tu proyecto</h3>
            <p class="ox-setup-desc">Puedes importar la hoja de estilos en <code>styles.scss</code> o registrarla en <code>angular.json</code>.</p>
          </div>
        </div>

        <div class="ox-setup-grid">
          <div class="ox-setup-col">
            <div class="ox-setup-code-title">Opción A: En <code>src/styles.scss</code> (Recomendado)</div>
            <div class="ox-code-snippet">
              <pre><code>&#64;use 'oxygen-ui/styles/main';</code></pre>
            </div>
          </div>

          <div class="ox-setup-col">
            <div class="ox-setup-code-title">Opción B: En <code>angular.json</code></div>
            <div class="ox-code-snippet">
              <pre><code>"styles": [
  "node_modules/oxygen-ui/styles/main.scss"
]</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- BREAKPOINTS -->
      <div class="ox-bp-card">
        <h3 class="ox-card-title">2. Sistema de Breakpoints & Modificadores Responsivos</h3>
        <p class="ox-card-desc">
          Casi todas las clases de utilidad en Oxygen UI aceptan un sufijo de breakpoint para activarse a partir de un ancho de pantalla específico:
          <code>.ox-&#123;propiedad&#125;-&#123;breakpoint&#125;-&#123;valor&#125;</code>
        </p>

        <div class="ox-bp-table-wrapper">
          <table class="ox-bp-table">
            <thead>
              <tr>
                <th>Breakpoint</th>
                <th>Prefijo</th>
                <th>Resolución Mínima</th>
                <th>Ejemplo de Clase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Extra Small (xs)</strong></td>
                <td><em>(Sin prefijo)</em></td>
                <td><code>&lt; 576px</code> (Móviles)</td>
                <td><code>.ox-flex-column</code>, <code>.ox-p-2</code></td>
              </tr>
              <tr>
                <td><strong>Small (sm)</strong></td>
                <td><code>-sm</code></td>
                <td><code>&ge; 576px</code></td>
                <td><code>.ox-flex-sm-row</code>, <code>.ox-p-sm-3</code></td>
              </tr>
              <tr>
                <td><strong>Medium (md)</strong></td>
                <td><code>-md</code></td>
                <td><code>&ge; 768px</code> (Tablets)</td>
                <td><code>.ox-col-md-6</code>, <code>.ox-d-md-flex</code></td>
              </tr>
              <tr>
                <td><strong>Large (lg)</strong></td>
                <td><code>-lg</code></td>
                <td><code>&ge; 992px</code> (Laptops)</td>
                <td><code>.ox-col-lg-4</code>, <code>.ox-p-lg-4</code></td>
              </tr>
              <tr>
                <td><strong>Extra Large (xl)</strong></td>
                <td><code>-xl</code></td>
                <td><code>&ge; 1200px</code> (Desktops)</td>
                <td><code>.ox-col-xl-3</code>, <code>.ox-gap-xl-4</code></td>
              </tr>
              <tr>
                <td><strong>Extra Extra Large (xxl)</strong></td>
                <td><code>-xxl</code></td>
                <td><code>&ge; 1400px</code> (Pantallas anchas)</td>
                <td><code>.ox-container-xxl</code>, <code>.ox-fs-xxl-5xl</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ACCESOS RÁPIDOS A LAS CATEGORÍAS -->
      <div class="ox-categories-grid">
        <h3 class="ox-grid-section-title">3. Explora las Categorías de Utilidades</h3>
        <div class="ox-cards-deck">
          <a routerLink="/utilities/grid" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="grid" size="1.25rem"></ox-icon></span>
            <h4>Grid & Contenedores</h4>
            <p>12 columnas fluidas, contenedores fijos y fluidos, gutters adaptables.</p>
          </a>

          <a routerLink="/utilities/flex" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="layers" size="1.25rem"></ox-icon></span>
            <h4>Flexbox</h4>
            <p>Dirección, alineación, justificación, flex-grow, flex-shrink y flex-fill.</p>
          </a>

          <a routerLink="/utilities/spacing" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="sliders" size="1.25rem"></ox-icon></span>
            <h4>Espaciado</h4>
            <p>Margen, Padding y Gap en escala 0-5 y valores precisos en píxeles.</p>
          </a>

          <a routerLink="/utilities/typography" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="edit-3" size="1.25rem"></ox-icon></span>
            <h4>Tipografía</h4>
            <p>Encabezados fluidos clamp(), tamaños de fuente, pesos y transformaciones.</p>
          </a>

          <a routerLink="/utilities/colors" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="sun" size="1.25rem"></ox-icon></span>
            <h4>Colores & Fondos</h4>
            <p>Paleta semántica integrada para texto, superficies y bordes temáticos.</p>
          </a>

          <a routerLink="/utilities/borders" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="shield" size="1.25rem"></ox-icon></span>
            <h4>Bordes & Sombras</h4>
            <p>Radios redondeados, pill, círculos, grosores y sombras de elevación.</p>
          </a>

          <a routerLink="/utilities/sizing" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="maximize-2" size="1.25rem"></ox-icon></span>
            <h4>Dimensiones</h4>
            <p>Anchos y altos porcentuales, viewport vw/vh, auto y límites max/min.</p>
          </a>

          <a routerLink="/utilities/position" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="map-pin" size="1.25rem"></ox-icon></span>
            <h4>Posicionamiento</h4>
            <p>Relative, absolute, fixed, sticky, coordenadas y centrado translate-middle.</p>
          </a>

          <a routerLink="/utilities/display" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="eye" size="1.25rem"></ox-icon></span>
            <h4>Display & Visibilidad</h4>
            <p>Block, inline, flex, grid, none y utilidades de visibilidad por resolución.</p>
          </a>

          <a routerLink="/utilities/extras" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="zap" size="1.25rem"></ox-icon></span>
            <h4>Extras & Misceláneos</h4>
            <p>Z-Index, opacidad, object-fit, floats, clearfix y vertical-align.</p>
          </a>

          <a routerLink="/utilities/tokens" class="ox-nav-card">
            <span class="ox-card-icon"><ox-icon name="settings" size="1.25rem"></ox-icon></span>
            <h4>Variables & Tokens</h4>
            <p>Variables CSS nativas de Oxygen UI para temas claro y oscuro.</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ox-page-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .ox-header-hero {
      margin-bottom: 2rem;
    }
    .ox-badge-wrapper {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .ox-badge-pill {
      background: color-mix(in srgb, var(--oxy-primary, #0066ff), transparent 88%);
      color: var(--oxy-primary, #0066ff);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ox-badge-ver {
      background: #f1f5f9;
      color: #64748b;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
    }
    .ox-page-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.75rem 0;
    }
    .ox-page-subtitle {
      font-size: 1.0625rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }
    .ox-setup-card, .ox-bp-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .ox-setup-header {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }
    .ox-setup-icon {
      font-size: 1.75rem;
      line-height: 1;
    }
    .ox-setup-title, .ox-card-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }
    .ox-setup-desc, .ox-card-desc {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }
    .ox-setup-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 768px) {
      .ox-setup-grid {
        grid-template-columns: 1fr;
      }
    }
    .ox-setup-code-title {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #475569;
      margin-bottom: 0.35rem;
    }
    .ox-code-snippet {
      background: #0f172a;
      border-radius: 8px;
      padding: 0.75rem 1rem;
    }
    .ox-code-snippet pre {
      margin: 0;
      color: #38bdf8;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 0.8125rem;
    }
    .ox-bp-table-wrapper {
      margin-top: 1rem;
      overflow-x: auto;
    }
    .ox-bp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .ox-bp-table th {
      background: #f8fafc;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
    }
    .ox-bp-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    .ox-bp-table code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--oxy-primary, #0066ff);
      font-family: monospace;
      font-size: 0.8125rem;
    }
    .ox-grid-section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 2rem 0 1rem 0;
    }
    .ox-cards-deck {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      margin-bottom: 3rem;
    }
    .ox-nav-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.25rem;
      text-decoration: none;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
    }
    .ox-nav-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px -4px rgba(0, 102, 255, 0.12);
      border-color: var(--oxy-primary, #0066ff);
    }
    .ox-card-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .ox-nav-card h4 {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.35rem 0;
    }
    .ox-nav-card p {
      font-size: 0.8125rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }
  `]
})
export class OverviewUtilityDemoComponent {}
