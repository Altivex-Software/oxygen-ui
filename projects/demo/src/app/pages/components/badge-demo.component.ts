import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, ButtonComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Badge (Insignias e Indicadores)</h1>
      <p class="val-description">Etiquetas pequeñas para notificaciones, contadores numéricos y estados.</p>

      <!-- 1. BÁSICO Y POSICIONADOS -->
      <app-doc-code
        title="1. Insignias Numéricas y Overlays"
        description="Badges incrustados en botones o como puntos de notificación en esquina."
        [html]="basicHtml"
        [ts]="badgeTs">
        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <val-button>
            Bandeja de Entrada
            <val-badge value="4" severity="secondary" style="margin-left: 8px"></val-badge>
          </val-button>

          <val-button style="position: relative;">
            Mensajes
            <val-badge value="99+" severity="error" [overlay]="true"></val-badge>
          </val-button>

          <val-button style="position: relative;">
            Perfil
            <val-badge [dot]="true" severity="error" [overlay]="true"></val-badge>
          </val-button>
        </div>
      </app-doc-code>

      <!-- 2. SEVERIDADES Y PILL -->
      <app-doc-code
        title="2. Severidades y Formato Pill (Píldora)"
        description="Badges redondeados con colores contextuales."
        [html]="severitiesHtml"
        [ts]="badgeTs">
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <val-badge value="Primary" severity="primary" [pill]="true"></val-badge>
          <val-badge value="Secondary" severity="secondary" [pill]="true"></val-badge>
          <val-badge value="Success" severity="success" [pill]="true"></val-badge>
          <val-badge value="Danger" severity="error" [pill]="true"></val-badge>
          <val-badge value="Warning" severity="warn" [pill]="true"></val-badge>
          <val-badge value="Info" severity="info" [pill]="true"></val-badge>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: BadgeComponent"
        [properties]="badgeProps">
      </app-doc-api-table>
    </div>
  `
})
export class BadgeDemoComponent {
  basicHtml = `<val-button style="position: relative;">
  Mensajes
  <val-badge value="99+" severity="error" [overlay]="true"></val-badge>
</val-button>`;

  severitiesHtml = `<val-badge value="Success" severity="success" [pill]="true"></val-badge>
<val-badge value="Danger" severity="error" [pill]="true"></val-badge>`;

  badgeTs = `import { Component } from '@angular/core';
import { BadgeComponent, ButtonComponent } from 'valence-ui';

@Component({
  selector: 'app-my-badge',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './my-badge.component.html'
})
export class MyBadgeComponent {}`;

  badgeProps: ApiProperty[] = [
    {
      name: 'value',
      type: 'string | number',
      default: "''",
      description: 'Texto o número a mostrar dentro del badge.'
    },
    {
      name: 'severity',
      type: "'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'error'",
      default: "'primary'",
      description: 'Color temático del badge.'
    },
    {
      name: 'pill',
      type: 'boolean',
      default: 'false',
      description: 'Aplica bordes completamente redondeados en forma de píldora.'
    },
    {
      name: 'dot',
      type: 'boolean',
      default: 'false',
      description: 'Muestra un pequeño punto circular de estado sin texto.'
    },
    {
      name: 'overlay',
      type: 'boolean',
      default: 'false',
      description: 'Posiciona el badge flotante en la esquina superior derecha del elemento padre.'
    }
  ];
}