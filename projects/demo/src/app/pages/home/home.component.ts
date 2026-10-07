import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent, IconComponent } from 'oxygen-ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, IconComponent],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Oxygen UI</h1>
        <p class="hero-subtitle">Modern Design System for Angular 21+</p>
        <p class="hero-description">
          A high-performance, lightweight, and professional UI library built from the ground up 
          using <strong>Signals</strong> and <strong>Angular CDK</strong>.
        </p>
        <div class="hero-actions">
          <ox-button routerLink="/components" size="lg" icon="zap">Get Started</ox-button>
          <ox-button variant="outline-primary" size="lg" icon="external-link" (click)="goToGithub()">GitHub</ox-button>
        </div>
      </div>
      
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon-wrapper feature-icon-wrapper--primary">
            <ox-icon name="zap" size="2rem"></ox-icon>
          </div>
          <h3>Modern APIs</h3>
          <p>Built exclusively with Angular Signals and the latest template syntax.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrapper feature-icon-wrapper--purple">
            <ox-icon name="layers" size="2rem"></ox-icon>
          </div>
          <h3>Design System</h3>
          <p>Strictly typed and powered by CSS variables for easy theming.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrapper feature-icon-wrapper--indigo">
            <ox-icon name="package" size="2rem"></ox-icon>
          </div>
          <h3>Professional Components</h3>
          <p>From simple Buttons to complex Tables and Dialogs with overlays.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem 2rem;
      text-align: center;
      min-height: calc(100vh - 200px);
    }
    .hero-content {
      max-width: 800px;
      margin-bottom: 4rem;
    }
    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--oxy-primary) 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      font-size: 1.5rem;
      color: var(--oxy-primary);
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    .hero-description {
      font-size: 1.25rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      width: 100%;
      max-width: 1100px;
    }
    .feature-card {
      padding: 2.5rem 2rem;
      background: white;
      border-radius: var(--radius-lg, 16px);
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
      border: 1px solid #f1f5f9;
      transition: all 0.25s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      
      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 30px -4px rgba(0, 102, 255, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04);
        border-color: rgba(0, 102, 255, 0.2);
      }
    }
    .feature-icon-wrapper {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      transition: transform 0.25s ease;

      &--primary {
        background: rgba(0, 102, 255, 0.1);
        color: var(--oxy-primary, #0066ff);
        border: 1px solid rgba(0, 102, 255, 0.2);
      }

      &--purple {
        background: rgba(168, 85, 247, 0.1);
        color: #a855f7;
        border: 1px solid rgba(168, 85, 247, 0.2);
      }

      &--indigo {
        background: rgba(99, 102, 241, 0.1);
        color: #6366f1;
        border: 1px solid rgba(99, 102, 241, 0.2);
      }
    }
    .feature-card:hover .feature-icon-wrapper {
      transform: scale(1.1);
    }
    .feature-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      font-weight: 700;
      color: #1e293b;
    }
    .feature-card p {
      color: #64748b;
      line-height: 1.6;
      margin: 0;
      font-size: 0.9375rem;
    }
  `]
})
export class HomeComponent {
  goToGithub() {
    window.open('https://github.com', '_blank');
  }
}