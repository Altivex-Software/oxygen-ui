import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, ButtonComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Badge (Insignias e Indicadores)</h1>
      <p class="ox-description">Etiquetas pequeñas para notificaciones, contadores numéricos y estados.</p>

      <!-- 1. BÁSICO Y POSICIONADOS -->
      <app-doc-code
        title="1. Insignias Numéricas y Overlays"
        description="Badges incrustados en botones o como puntos de notificación en esquina."
        [html]="basicHtml"
        [ts]="badgeTs">
        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <ox-button>
            Bandeja de Entrada
            <ox-badge value="4" severity="secondary" style="margin-left: 8px"></ox-badge>
          </ox-button>

          <ox-button style="position: relative;">
            Mensajes
            <ox-badge value="99+" severity="error" [overlay]="true"></ox-badge>
          </ox-button>

          <ox-button style="position: relative;">
            Perfil
            <ox-badge [dot]="true" severity="error" [overlay]="true"></ox-badge>
          </ox-button>
        </div>
      </app-doc-code>

      <!-- 2. SEVERIDADES Y PILL -->
      <app-doc-code
        title="2. Severidades y Formato Pill (Píldora)"
        description="Badges redondeados con colores contextuales."
        [html]="severitiesHtml"
        [ts]="badgeTs">
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <ox-badge value="Primary" severity="primary" [pill]="true"></ox-badge>
          <ox-badge value="Secondary" severity="secondary" [pill]="true"></ox-badge>
          <ox-badge value="Success" severity="success" [pill]="true"></ox-badge>
          <ox-badge value="Danger" severity="error" [pill]="true"></ox-badge>
          <ox-badge value="Warning" severity="warn" [pill]="true"></ox-badge>
          <ox-badge value="Info" severity="info" [pill]="true"></ox-badge>
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
  basicHtml = `<ox-button style="position: relative;">
  Mensajes
  <ox-badge value="99+" severity="error" [overlay]="true"></ox-badge>
</ox-button>`;

  severitiesHtml = `<ox-badge value="Success" severity="success" [pill]="true"></ox-badge>
<ox-badge value="Danger" severity="error" [pill]="true"></ox-badge>`;

  badgeTs = `import { Component } from '@angular/core';
import { BadgeComponent, ButtonComponent } from 'oxygen-ui';

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