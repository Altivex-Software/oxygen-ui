import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { 
  ProgressBarComponent, 
  ProgressSpinnerComponent, 
  TagComponent, 
  BlockUIComponent, 
  ButtonComponent, 
  CardComponent 
} from "oxygen-ui";
import { DocCodeComponent } from "../../shared/doc-code/doc-code.component";
import { DocApiTableComponent, ApiProperty, ApiEvent } from "../../shared/doc-code/doc-api-table.component";

@Component({
  selector: "app-feedback-demo",
  standalone: true,
  imports: [
    CommonModule, 
    ProgressBarComponent, 
    ProgressSpinnerComponent, 
    TagComponent, 
    BlockUIComponent, 
    ButtonComponent, 
    CardComponent,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Feedback & Progress</h1>
      <p class="ox-description">
        Indicadores visuales de estado de carga, progreso y bloqueo de interfaz: <code>ox-progress-bar</code>, <code>ox-progress-spinner</code>, <code>ox-tag</code> y <code>ox-block-ui</code>.
      </p>

      <!-- 1. PROGRESS BAR -->
      <section class="ox-section">
        <h2>1. ProgressBar</h2>
        <p>Barra de progreso reactiva en modos determinado e indeterminado con soporte de severidades cromáticas.</p>

        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px; margin-bottom: 1.5rem;">
          <div>
            <label style="font-size: 0.875rem; font-weight: 600; color: #475569;">Progreso Determinado Dinámico ({{ progressValue }}%)</label>
            <ox-progress-bar [value]="progressValue" severity="primary"></ox-progress-bar>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
            <ox-button size="sm" (click)="decreaseProgress()">- 10%</ox-button>
            <ox-button size="sm" (click)="increaseProgress()">+ 10%</ox-button>
          </div>

          <div>
            <label style="font-size: 0.875rem; font-weight: 600; color: #475569;">Severidades de Progreso</label>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
              <ox-progress-bar [value]="80" severity="success"></ox-progress-bar>
              <ox-progress-bar [value]="45" severity="warning"></ox-progress-bar>
              <ox-progress-bar [value]="20" severity="danger"></ox-progress-bar>
            </div>
          </div>

          <div>
            <label style="font-size: 0.875rem; font-weight: 600; color: #475569;">Carga Indeterminada (Loop)</label>
            <ox-progress-bar mode="indeterminate" severity="info" style="margin-top: 0.5rem;"></ox-progress-bar>
          </div>
        </div>

        <app-doc-code 
          title="ProgressBar"
          [htmlCode]="progressHtml"
          [tsCode]="progressTs">
        </app-doc-code>
      </section>

      <!-- 2. PROGRESS SPINNER -->
      <section class="ox-section">
        <h2>2. ProgressSpinner</h2>
        <p>Indicador de carga circular continuo con tamaño, grosor de trazo y color personalizables.</p>

        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <ox-progress-spinner severity="primary" size="2rem"></ox-progress-spinner>
          <ox-progress-spinner severity="success" size="2.5rem"></ox-progress-spinner>
          <ox-progress-spinner severity="warning" size="3rem" strokeWidth="6"></ox-progress-spinner>
          <ox-progress-spinner severity="danger" size="3.5rem"></ox-progress-spinner>
        </div>

        <app-doc-code 
          title="ProgressSpinner"
          [htmlCode]="spinnerHtml"
          [tsCode]="progressTs">
        </app-doc-code>
      </section>

      <!-- 3. TAGS & CHIPS -->
      <section class="ox-section">
        <h2>3. Tags & Badges de Estado</h2>
        <p>Etiquetas de categorización con iconos, bordes redondeados y opción de remoción interactiva.</p>

        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
          <ox-tag value="Activo" severity="success" icon="check-circle"></ox-tag>
          <ox-tag value="Pendiente" severity="warning" icon="clock"></ox-tag>
          <ox-tag value="Rechazado" severity="danger" icon="x-circle"></ox-tag>
          <ox-tag value="Procesando" severity="info" icon="zap"></ox-tag>
          <ox-tag value="Borrador" severity="secondary"></ox-tag>
        </div>

        <h3 style="font-size: 1rem; margin-top: 1rem; margin-bottom: 0.5rem;">Tags Redondeados y Removibles</h3>
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
          @for (tag of tags; track tag) {
            <ox-tag 
              [value]="tag" 
              [rounded]="true" 
              [removable]="true" 
              severity="primary"
              (onRemove)="removeTag(tag)">
            </ox-tag>
          }
        </div>

        <app-doc-code 
          title="Tags"
          [htmlCode]="tagsHtml"
          [tsCode]="tagsTs">
        </app-doc-code>
      </section>

      <!-- 4. BLOCK UI -->
      <section class="ox-section">
        <h2>4. BlockUI (Bloqueo de Sección)</h2>
        <p>Inhabilita la interacción en contenedores o paneles mientras ocurren operaciones asíncronas.</p>

        <div style="margin-bottom: 1rem;">
          <ox-button (click)="isBlocked = !isBlocked" variant="outline-primary">
            {{ isBlocked ? 'Desbloquear Sección' : 'Bloquear Sección' }}
          </ox-button>
        </div>

        <ox-block-ui [blocked]="isBlocked" message="Cargando datos...">
          <ox-card style="max-width: 450px;">
            <div style="padding: 1.5rem;">
              <h3 style="margin-top: 0;">Detalles de la Cuenta</h3>
              <p style="color: #64748b; font-size: 0.875rem;">
                Esta sección simula un área bloqueada cuando se envían peticiones a la API.
              </p>
              <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <ox-button size="sm">Guardar Cambios</ox-button>
                <ox-button size="sm" variant="ghost-secondary">Cancelar</ox-button>
              </div>
            </div>
          </ox-card>
        </ox-block-ui>

        <app-doc-code 
          title="BlockUI"
          [htmlCode]="blockUiHtml"
          [tsCode]="tagsTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; Feedback Components</h2>
        <h3>&lt;ox-progress-bar&gt;</h3>
        <app-doc-api-table [properties]="progressBarProperties"></app-doc-api-table>
        
        <h3 class="ox-mt-4">&lt;ox-tag&gt;</h3>
        <app-doc-api-table [properties]="tagProperties" [events]="tagEvents"></app-doc-api-table>
      </section>
    </div>
  `
})
export class FeedbackDemoComponent {
  progressValue = 50;
  isBlocked = false;

  tags = ["Angular 19", "TypeScript", "Oxygen UI", "CDK Overlays"];

  increaseProgress() {
    this.progressValue = Math.min(100, this.progressValue + 10);
  }

  decreaseProgress() {
    this.progressValue = Math.max(0, this.progressValue - 10);
  }

  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter(t => t !== tagToRemove);
  }

  progressHtml = `<ox-progress-bar [value]="progressValue" severity="primary"></ox-progress-bar>
<ox-progress-bar mode="indeterminate" severity="info"></ox-progress-bar>`;

  spinnerHtml = `<ox-progress-spinner severity="primary" size="2rem"></ox-progress-spinner>
<ox-progress-spinner severity="success" size="2.5rem"></ox-progress-spinner>
<ox-progress-spinner severity="warning" size="3rem" strokeWidth="6"></ox-progress-spinner>`;

  tagsHtml = `<ox-tag value="Activo" severity="success" icon="check-circle"></ox-tag>
<ox-tag [value]="tag" [rounded]="true" [removable]="true" (onRemove)="removeTag(tag)"></ox-tag>`;

  blockUiHtml = `<ox-block-ui [blocked]="isBlocked" message="Cargando...">
  <ox-card>
    <p>Contenido protegido mientras se procesa.</p>
  </ox-card>
</ox-block-ui>`;

  progressTs = `import { Component } from '@angular/core';
import { ProgressBarComponent, ProgressSpinnerComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [ProgressBarComponent, ProgressSpinnerComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  progressValue = 50;
}`;

  tagsTs = `import { Component } from '@angular/core';
import { TagComponent, BlockUIComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [TagComponent, BlockUIComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  isBlocked = false;
  tags = ['Angular', 'TypeScript'];
  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }
}`;

  progressBarProperties: ApiProperty[] = [
    { name: 'value', type: 'number', default: '0', description: 'Porcentaje actual de avance (0 a 100).' },
    { name: 'mode', type: "'determinate' | 'indeterminate'", default: "'determinate'", description: 'Modo de visualización de la barra.' },
    { name: 'severity', type: 'string', default: "'primary'", description: 'Variante de color (primary, success, warning, danger, info).' },
    { name: 'showValue', type: 'boolean', default: 'true', description: 'Muestra u oculta la etiqueta de porcentaje de texto.' }
  ];

  tagProperties: ApiProperty[] = [
    { name: 'value', type: 'string', default: "''", description: 'Texto que se renderiza dentro del tag.' },
    { name: 'severity', type: 'string', default: "'primary'", description: 'Color temático (primary, success, warning, danger, info, secondary).' },
    { name: 'rounded', type: 'boolean', default: 'false', description: 'Aplica bordes completamente redondeados tipo píldora.' },
    { name: 'icon', type: 'string', default: "''", description: 'Icono o emoji decorativo antes del texto.' },
    { name: 'removable', type: 'boolean', default: 'false', description: 'Muestra un botón de cerrar para eliminar el tag.' }
  ];

  tagEvents: ApiEvent[] = [
    { name: 'onRemove', parameters: 'MouseEvent', description: 'Se dispara al hacer clic en el botón de remover tag.' }
  ];
}
