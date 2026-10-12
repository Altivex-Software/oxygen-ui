import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconComponent } from 'valence-ui';

@Component({
  selector: 'app-utilities-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  template: `
    <div class="utilities-layout">
      <aside class="sidebar">
        <nav class="nav">
          <div class="nav-section">Comenzar</div>
          <a routerLink="overview" routerLinkActive="active" class="nav-item">
            <val-icon name="file-text" size="1.125rem" class="nav-icon"></val-icon> Guía & Instalación
          </a>
          <a routerLink="theme-builder" routerLinkActive="active" class="nav-item">
            <val-icon name="palette" size="1.125rem" class="nav-icon"></val-icon> Theme Builder (Live)
          </a>
          <a routerLink="tokens" routerLinkActive="active" class="nav-item">
            <val-icon name="settings" size="1.125rem" class="nav-icon"></val-icon> Variables & Tokens
          </a>

          <div class="nav-section">Layout & Estructura</div>
          <a routerLink="grid" routerLinkActive="active" class="nav-item">
            <val-icon name="grid" size="1.125rem" class="nav-icon"></val-icon> Grid (12 Cols)
          </a>
          <a routerLink="flex" routerLinkActive="active" class="nav-item">
            <val-icon name="layers" size="1.125rem" class="nav-icon"></val-icon> Flexbox
          </a>
          <a routerLink="display" routerLinkActive="active" class="nav-item">
            <val-icon name="eye" size="1.125rem" class="nav-icon"></val-icon> Display & Visibilidad
          </a>
          <a routerLink="sizing" routerLinkActive="active" class="nav-item">
            <val-icon name="maximize-2" size="1.125rem" class="nav-icon"></val-icon> Dimensiones (Sizing)
          </a>
          <a routerLink="position" routerLinkActive="active" class="nav-item">
            <val-icon name="map-pin" size="1.125rem" class="nav-icon"></val-icon> Posicionamiento
          </a>

          <div class="nav-section">Estilos & Efectos</div>
          <a routerLink="spacing" routerLinkActive="active" class="nav-item">
            <val-icon name="sliders" size="1.125rem" class="nav-icon"></val-icon> Espaciado (M / P / Gap)
          </a>
          <a routerLink="typography" routerLinkActive="active" class="nav-item">
            <val-icon name="edit-3" size="1.125rem" class="nav-icon"></val-icon> Tipografía & Texto
          </a>
          <a routerLink="colors" routerLinkActive="active" class="nav-item">
            <val-icon name="sun" size="1.125rem" class="nav-icon"></val-icon> Colores & Gradientes
          </a>
          <a routerLink="borders" routerLinkActive="active" class="nav-item">
            <val-icon name="shield" size="1.125rem" class="nav-icon"></val-icon> Bordes, Rings & Sombras
          </a>
          <a routerLink="motion" routerLinkActive="active" class="nav-item">
            <val-icon name="activity" size="1.125rem" class="nav-icon"></val-icon> Movimiento & Animaciones
          </a>
          <a routerLink="filters" routerLinkActive="active" class="nav-item">
            <val-icon name="sparkles" size="1.125rem" class="nav-icon"></val-icon> Filtros & Glassmorphism
          </a>
          <a routerLink="interactivity" routerLinkActive="active" class="nav-item">
            <val-icon name="mouse-pointer" size="1.125rem" class="nav-icon"></val-icon> Interactividad & A11y
          </a>
          <a routerLink="extras" routerLinkActive="active" class="nav-item">
            <val-icon name="zap" size="1.125rem" class="nav-icon"></val-icon> Extras & Tablas
          </a>
        </nav>
      </aside>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .utilities-layout {
      display: flex;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    .sidebar {
      width: 250px;
      flex-shrink: 0;
      position: sticky;
      top: 100px;
      height: calc(100vh - 140px);
      overflow-y: auto;
      padding-right: 1rem;
      border-right: 1px solid #f1f5f9;
    }
    .nav {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .nav-section {
      font-size: 0.75rem;
      font-weight: 700;
      color: #94a3b8;
      text-transform: uppercase;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }
    .nav-section:first-child {
      margin-top: 0.5rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius-sm, 6px);
      color: #475569;
      text-decoration: none;
      font-size: 0.9375rem;
      transition: all 0.2s;
    }
    .nav-icon {
      font-size: 1rem;
      line-height: 1;
    }
    .nav-item:hover {
      background-color: #f8fafc;
      color: var(--val-primary, #0066ff);
    }
    .nav-item.active {
      background-color: color-mix(in srgb, var(--val-primary, #0066ff), transparent 90%);
      color: var(--val-primary, #0066ff);
      font-weight: 600;
    }
    .content {
      flex: 1;
      min-width: 0;
    }
    @media (max-width: 768px) {
      .utilities-layout {
        flex-direction: column;
        padding: 1rem;
      }
      .sidebar {
        width: 100%;
        height: auto;
        position: static;
        border-right: none;
        border-bottom: 1px solid #f1f5f9;
        padding-bottom: 1rem;
      }
    }
  `]
})
export class UtilitiesPageComponent {}
