import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from 'valence-ui';

@Component({
  selector: 'app-overview-utility-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="val-page-container">
      <div class="val-header-hero">
        <div class="val-badge-wrapper">
          <span class="val-badge-pill">Valence UI Styles</span>
          <span class="val-badge-ver">v1.0.0</span>
        </div>
        <h1 class="val-page-title">Guía & Configuración de Clases CSS</h1>
        <p class="val-page-subtitle">
          Valence UI proporciona un sistema completo de utilidades CSS atomizadas y altamente optimizadas. 
          Aprende cómo configurarlas en tu aplicación Angular y cómo aprovechar al máximo los modificadores responsivos.
        </p>
      </div>

      <!-- INSTALACIÓN -->
      <div class="val-setup-card">
        <div class="val-setup-header">
          <div class="val-setup-icon">
            <val-icon name="zap" size="1.5rem"></val-icon>
          </div>
          <div>
            <h3 class="val-setup-title">1. Importación en tu proyecto</h3>
            <p class="val-setup-desc">Puedes importar la hoja de estilos en <code>styles.scss</code> o registrarla en <code>angular.json</code>.</p>
          </div>
        </div>

        <div class="val-setup-grid">
          <div class="val-setup-col">
            <div class="val-setup-code-title">Opción A: En <code>src/styles.scss</code> (Recomendado)</div>
            <div class="val-code-snippet">
              <pre><code>&#64;use 'valence-ui/styles/main';</code></pre>
            </div>
          </div>

          <div class="val-setup-col">
            <div class="val-setup-code-title">Opción B: En <code>angular.json</code></div>
            <div class="val-code-snippet">
              <pre><code>"styles": [
  "node_modules/valence-ui/styles/main.scss"
]</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- BREAKPOINTS -->
      <div class="val-bp-card">
        <h3 class="val-card-title">2. Sistema de Breakpoints & Modificadores Responsivos</h3>
        <p class="val-card-desc">
          Casi todas las clases de utilidad en Valence UI aceptan un sufijo de breakpoint para activarse a partir de un ancho de pantalla específico:
          <code>.ox-&#123;propiedad&#125;-&#123;breakpoint&#125;-&#123;valor&#125;</code>
        </p>

        <div class="val-bp-table-wrapper">
          <table class="val-bp-table">
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
                <td><code>.val-flex-column</code>, <code>.val-p-2</code></td>
              </tr>
              <tr>
                <td><strong>Small (sm)</strong></td>
                <td><code>-sm</code></td>
                <td><code>&ge; 576px</code></td>
                <td><code>.val-flex-sm-row</code>, <code>.val-p-sm-3</code></td>
              </tr>
              <tr>
                <td><strong>Medium (md)</strong></td>
                <td><code>-md</code></td>
                <td><code>&ge; 768px</code> (Tablets)</td>
                <td><code>.val-col-md-6</code>, <code>.val-d-md-flex</code></td>
              </tr>
              <tr>
                <td><strong>Large (lg)</strong></td>
                <td><code>-lg</code></td>
                <td><code>&ge; 992px</code> (Laptops)</td>
                <td><code>.val-col-lg-4</code>, <code>.val-p-lg-4</code></td>
              </tr>
              <tr>
                <td><strong>Extra Large (xl)</strong></td>
                <td><code>-xl</code></td>
                <td><code>&ge; 1200px</code> (Desktops)</td>
                <td><code>.val-col-xl-3</code>, <code>.val-gap-xl-4</code></td>
              </tr>
              <tr>
                <td><strong>Extra Extra Large (xxl)</strong></td>
                <td><code>-xxl</code></td>
                <td><code>&ge; 1400px</code> (Pantallas anchas)</td>
                <td><code>.val-container-xxl</code>, <code>.val-fs-xxl-5xl</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ACCESOS RÁPIDOS A LAS CATEGORÍAS -->
      <div class="val-categories-grid">
        <h3 class="val-grid-section-title">3. Explora las Categorías de Utilidades</h3>
        <div class="val-cards-deck">
          <a routerLink="/utilities/grid" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="grid" size="1.25rem"></val-icon></span>
            <h4>Grid & Contenedores</h4>
            <p>12 columnas fluidas, contenedores fijos y fluidos, gutters adaptables.</p>
          </a>

          <a routerLink="/utilities/flex" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="layers" size="1.25rem"></val-icon></span>
            <h4>Flexbox</h4>
            <p>Dirección, alineación, justificación, flex-grow, flex-shrink y flex-fill.</p>
          </a>

          <a routerLink="/utilities/spacing" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="sliders" size="1.25rem"></val-icon></span>
            <h4>Espaciado</h4>
            <p>Margen, Padding y Gap en escala 0-5 y valores precisos en píxeles.</p>
          </a>

          <a routerLink="/utilities/typography" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="edit-3" size="1.25rem"></val-icon></span>
            <h4>Tipografía</h4>
            <p>Encabezados fluidos clamp(), tamaños de fuente, pesos y transformaciones.</p>
          </a>

          <a routerLink="/utilities/colors" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="sun" size="1.25rem"></val-icon></span>
            <h4>Colores & Fondos</h4>
            <p>Paleta semántica integrada para texto, superficies y bordes temáticos.</p>
          </a>

          <a routerLink="/utilities/borders" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="shield" size="1.25rem"></val-icon></span>
            <h4>Bordes, Sombras & Rings</h4>
            <p>Radios, bordes direccionales, rings de foco, dividers y sombras.</p>
          </a>

          <a routerLink="/utilities/colors" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="sun" size="1.25rem"></val-icon></span>
            <h4>Colores & Gradientes</h4>
            <p>Paleta semántica, fondos degradados en 8 direcciones y paradas de color.</p>
          </a>

          <a routerLink="/utilities/extras" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="activity" size="1.25rem"></val-icon></span>
            <h4>Movimiento & Animaciones</h4>
            <p>Transiciones, duraciones, curvas ease, escala, rotación y keyframes predefinidos.</p>
          </a>

          <a routerLink="/utilities/extras" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="sparkles" size="1.25rem"></val-icon></span>
            <h4>Filtros & Glassmorphism</h4>
            <p>Backdrop-blur (efecto vidrio), desenfoque, brillo, contraste y drop-shadows.</p>
          </a>

          <a routerLink="/utilities/extras" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="mouse-pointer" size="1.25rem"></val-icon></span>
            <h4>Interactividad & Accesibilidad</h4>
            <p>Cursores, user-select, pointer-events, scroll suave y lectores de pantalla (sr-only).</p>
          </a>

          <a routerLink="/utilities/sizing" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="maximize-2" size="1.25rem"></val-icon></span>
            <h4>Dimensiones</h4>
            <p>Anchos y altos porcentuales, viewport vw/vh, auto y límites max/min.</p>
          </a>

          <a routerLink="/utilities/position" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="map-pin" size="1.25rem"></val-icon></span>
            <h4>Posicionamiento</h4>
            <p>Relative, absolute, fixed, sticky, coordenadas y centrado translate-middle.</p>
          </a>

          <a routerLink="/utilities/display" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="eye" size="1.25rem"></val-icon></span>
            <h4>Display & Visibilidad</h4>
            <p>Block, inline, flex, grid nativo, none y utilidades de visibilidad por resolución.</p>
          </a>

          <a routerLink="/utilities/extras" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="zap" size="1.25rem"></val-icon></span>
            <h4>Extras & Estados</h4>
            <p>Z-Index, opacidad, hover-scale, focus-ring, tablas y estilos de listas.</p>
          </a>

          <a routerLink="/utilities/tokens" class="val-nav-card">
            <span class="val-card-icon"><val-icon name="settings" size="1.25rem"></val-icon></span>
            <h4>Variables & Tokens</h4>
            <p>Variables CSS nativas de Valence UI para temas claro y oscuro.</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .val-page-container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .val-header-hero {
      margin-bottom: 2rem;
    }
    .val-badge-wrapper {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .val-badge-pill {
      background: color-mix(in srgb, var(--val-primary, #0066ff), transparent 88%);
      color: var(--val-primary, #0066ff);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .val-badge-ver {
      background: #f1f5f9;
      color: #64748b;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 999px;
    }
    .val-page-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.75rem 0;
    }
    .val-page-subtitle {
      font-size: 1.0625rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }
    .val-setup-card, .val-bp-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .val-setup-header {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }
    .val-setup-icon {
      font-size: 1.75rem;
      line-height: 1;
    }
    .val-setup-title, .val-card-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.25rem 0;
    }
    .val-setup-desc, .val-card-desc {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0;
    }
    .val-setup-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 768px) {
      .val-setup-grid {
        grid-template-columns: 1fr;
      }
    }
    .val-setup-code-title {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #475569;
      margin-bottom: 0.35rem;
    }
    .val-code-snippet {
      background: #0f172a;
      border-radius: 8px;
      padding: 0.75rem 1rem;
    }
    .val-code-snippet pre {
      margin: 0;
      color: #38bdf8;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 0.8125rem;
    }
    .val-bp-table-wrapper {
      margin-top: 1rem;
      overflow-x: auto;
    }
    .val-bp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .val-bp-table th {
      background: #f8fafc;
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: #475569;
      border-bottom: 1px solid #e2e8f0;
    }
    .val-bp-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    .val-bp-table code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--val-primary, #0066ff);
      font-family: monospace;
      font-size: 0.8125rem;
    }
    .val-grid-section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 2rem 0 1rem 0;
    }
    .val-cards-deck {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      margin-bottom: 3rem;
    }
    .val-nav-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.25rem;
      text-decoration: none;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
    }
    .val-nav-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px -4px rgba(0, 102, 255, 0.12);
      border-color: var(--val-primary, #0066ff);
    }
    .val-card-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .val-nav-card h4 {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.35rem 0;
    }
    .val-nav-card p {
      font-size: 0.8125rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }
  `]
})
export class OverviewUtilityDemoComponent {}
