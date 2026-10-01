import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    CommonModule, 
    AccordionComponent, 
    AccordionItemComponent, 
    OxAccordionHeaderDirective,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Accordion (Acordeón de Paneles)</h1>
      <p class="ox-description">Contenedor para agrupar y mostrar contenido en paneles expandibles y colapsables con animaciones suaves.</p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Acordeón Básico (Selección Simple)"
        description="Solo un panel permanece abierto a la vez."
        [html]="basicHtml"
        [ts]="accordionTs">
        <ox-accordion>
          <ox-accordion-item id="item1">
            <ng-template oxAccordionHeader>Sección 1: Información General</ng-template>
            <p style="margin: 0; color: #475569;">Contenido detallado de la primera sección con información relevante.</p>
          </ox-accordion-item>
          <ox-accordion-item id="item2">
            <ng-template oxAccordionHeader>Sección 2: Ajustes de Cuenta</ng-template>
            <p style="margin: 0; color: #475569;">Configuraciones y opciones del perfil de usuario.</p>
          </ox-accordion-item>
        </ox-accordion>
      </app-doc-code>

      <!-- 2. MÚLTIPLE SELECCIÓN -->
      <app-doc-code
        title="2. Modo Múltiple Selección"
        description="Permite tener abiertos varios paneles de forma simultánea con [multi]='true'."
        [html]="multiHtml"
        [ts]="accordionTs">
        <ox-accordion [multi]="true">
          <ox-accordion-item id="m1">
            <ng-template oxAccordionHeader>Panel A: Notificaciones</ng-template>
            <p style="margin: 0; color: #475569;">Configuración de alertas de correo y notificaciones push.</p>
          </ox-accordion-item>
          <ox-accordion-item id="m2">
            <ng-template oxAccordionHeader>Panel B: Seguridad y Accesos</ng-template>
            <p style="margin: 0; color: #475569;">Autenticación en dos pasos y claves de seguridad.</p>
          </ox-accordion-item>
        </ox-accordion>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: AccordionComponent"
        [properties]="accordionProps"
        [events]="accordionEvents">
      </app-doc-api-table>
    </div>
  `
})
export class AccordionDemoComponent {
  basicHtml = `<ox-accordion>
  <ox-accordion-item id="item1">
    <ng-template oxAccordionHeader>Sección 1: Información</ng-template>
    <p>Contenido detallado de la primera sección.</p>
  </ox-accordion-item>
  <ox-accordion-item id="item2">
    <ng-template oxAccordionHeader>Sección 2: Ajustes</ng-template>
    <p>Configuraciones y opciones.</p>
  </ox-accordion-item>
</ox-accordion>`;

  multiHtml = `<ox-accordion [multi]="true">
  <ox-accordion-item id="m1">
    <ng-template oxAccordionHeader>Panel A</ng-template>
    <p>Contenido A</p>
  </ox-accordion-item>
  <ox-accordion-item id="m2">
    <ng-template oxAccordionHeader>Panel B</ng-template>
    <p>Contenido B</p>
  </ox-accordion-item>
</ox-accordion>`;

  accordionTs = `import { Component } from '@angular/core';
import { AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective } from 'oxygen-ui';

@Component({
  selector: 'app-my-accordion',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective],
  templateUrl: './my-accordion.component.html'
})
export class MyAccordionComponent {}`;

  accordionProps: ApiProperty[] = [
    {
      name: 'multi',
      type: 'boolean',
      default: 'false',
      description: 'Permite abrir múltiples paneles simultáneamente.'
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
      default: "'primary'",
      description: 'Color temático de los paneles activos.'
    }
  ];

  accordionEvents: ApiEvent[] = [
    {
      name: 'onOpen',
      parameters: '{ id: string }',
      description: 'Emitido cuando se abre un panel.'
    },
    {
      name: 'onClose',
      parameters: '{ id: string }',
      description: 'Emitido cuando se cierra un panel.'
    }
  ];
}