import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective } from 'oxygen-ui';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, OxAccordionHeaderDirective],
  template: `
    <div class="ox-page-container">
      <h1>Accordion</h1>
      <p class="ox-description">Un contenedor para mostrar contenido en paneles expandibles y colapsables.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <ox-accordion>
          <ox-accordion-item id="item1">
            <ng-template oxAccordionHeader>Sección 1: Información</ng-template>
            <p>Contenido detallado de la primera sección.</p>
          </ox-accordion-item>
          <ox-accordion-item id="item2">
            <ng-template oxAccordionHeader>Sección 2: Ajustes</ng-template>
            <p>Configuraciones y opciones del sistema.</p>
          </ox-accordion-item>
        </ox-accordion>
      </section>

      <section class="ox-section">
        <h2>Múltiple Selección</h2>
        <ox-accordion [multi]="true">
          <ox-accordion-item id="m1">
            <ng-template oxAccordionHeader>Panel A</ng-template>
            <p>Puedes abrir varios paneles a la vez.</p>
          </ox-accordion-item>
          <ox-accordion-item id="m2">
            <ng-template oxAccordionHeader>Panel B</ng-template>
            <p>Útil para dashboards o guías largas.</p>
          </ox-accordion-item>
        </ox-accordion>
      </section>

      <section class="ox-section">
        <h2>Colores y Variantes</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <h3>Sólidos</h3>
          <ox-accordion>
            <ox-accordion-item color="primary">
              <ng-template oxAccordionHeader>Primary Accordion</ng-template>
              <p>Contenido con estilo de color primario.</p>
            </ox-accordion-item>
            <ox-accordion-item color="success">
              <ng-template oxAccordionHeader>Success Accordion</ng-template>
              <p>Contenido con estilo de color de éxito.</p>
            </ox-accordion-item>
            <ox-accordion-item color="danger">
              <ng-template oxAccordionHeader>Danger Accordion</ng-template>
              <p>Contenido con estilo de color de peligro.</p>
            </ox-accordion-item>
          </ox-accordion>

          <h3 class="ox-mt-4">Outlined</h3>
          <ox-accordion>
            <ox-accordion-item color="outline-primary">
              <ng-template oxAccordionHeader>Outline Primary</ng-template>
              <p>Borde inferior resaltado con el color primario.</p>
            </ox-accordion-item>
            <ox-accordion-item color="outline-info">
              <ng-template oxAccordionHeader>Outline Info</ng-template>
              <p>Borde inferior resaltado con el color de información.</p>
            </ox-accordion-item>
          </ox-accordion>

          <h3 class="ox-mt-4">Ghost</h3>
          <ox-accordion>
            <ox-accordion-item color="ghost-primary">
              <ng-template oxAccordionHeader>Ghost Primary</ng-template>
              <p>Estilo minimalista con resaltado en hover.</p>
            </ox-accordion-item>
            <ox-accordion-item color="ghost-warning">
              <ng-template oxAccordionHeader>Ghost Warning</ng-template>
              <p>Estilo minimalista con color de advertencia.</p>
            </ox-accordion-item>
          </ox-accordion>
        </div>
      </section>
    </div>
  `
})
export class AccordionDemoComponent {}