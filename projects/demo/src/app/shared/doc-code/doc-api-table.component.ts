import { Component, input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ApiEvent {
  name: string;
  parameters: string;
  description: string;
}

@Component({
  selector: 'app-doc-api-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ox-doc-api-section">
      <h2 class="ox-doc-api-header">{{ title() }}</h2>
      
      @if (properties() && properties()!.length > 0) {
        <h3 class="ox-doc-api-sub">Propiedades / Inputs</h3>
        <div class="ox-doc-table-wrapper">
          <table class="ox-doc-api-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Por Defecto</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              @for (prop of properties(); track prop.name) {
                <tr>
                  <td><code>{{ prop.name }}</code></td>
                  <td><span class="ox-doc-type">{{ prop.type }}</span></td>
                  <td><code>{{ prop.default || 'null' }}</code></td>
                  <td>{{ prop.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      @if (events() && events()!.length > 0) {
        <h3 class="ox-doc-api-sub" style="margin-top: 1.5rem;">Eventos / Outputs</h3>
        <div class="ox-doc-table-wrapper">
          <table class="ox-doc-api-table">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Parámetros</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              @for (evt of events(); track evt.name) {
                <tr>
                  <td><code>{{ evt.name }}</code></td>
                  <td><span class="ox-doc-type">{{ evt.parameters }}</span></td>
                  <td>{{ evt.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .ox-doc-api-section {
      margin-top: 3rem;
      border-top: 1px solid var(--border-color, #e2e8f0);
      padding-top: 2rem;
    }

    .ox-doc-api-header {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary, #0f172a);
      margin-bottom: 1.5rem;
    }

    .ox-doc-api-sub {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary, #1e293b);
      margin-bottom: 0.75rem;
    }

    .ox-doc-table-wrapper {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: 8px;
    }

    .ox-doc-api-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;
    }

    .ox-doc-api-table th {
      padding: 10px 14px;
      background: var(--bg-surface-subtle, #f8fafc);
      border-bottom: 1px solid var(--border-color, #e2e8f0);
      font-weight: 600;
      color: var(--text-secondary, #475569);
    }

    .ox-doc-api-table td {
      padding: 10px 14px;
      border-bottom: 1px solid var(--border-color, #f1f5f9);
      color: var(--text-primary, #334155);
      vertical-align: middle;
    }

    .ox-doc-api-table code {
      background: var(--bg-surface-subtle, #f1f5f9);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.8125rem;
      color: var(--primary-700, #4338ca);
    }

    .ox-doc-type {
      color: #0284c7;
      font-family: monospace;
      font-size: 0.8125rem;
      font-weight: 500;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DocApiTableComponent {
  title = input<string>('Documentación de la API');
  properties = input<ApiProperty[]>([]);
  events = input<ApiEvent[]>([]);
}
