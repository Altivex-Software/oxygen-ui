import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ButtonComponent],
  template: `
    <div class="ox-page-container">
      <h1>Badges</h1>
      <p class="ox-description">Documentación y ejemplos para badges, nuestro componente de etiquetado pequeño y adaptable.</p>

      <section class="ox-section">
        <h2>Ejemplos</h2>
        <p>Los badges escalan para coincidir con el tamaño del elemento padre inmediato utilizando fuentes relativas y em.</p>
        <div class="ox-card ox-p-4 shadow-sm ox-border rounded">
          <h1>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h1>
          <h2>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h2>
          <h3>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h3>
          <h4>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h4>
          <h5>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h5>
          <h6>Example heading <ox-badge value="New" severity="secondary"></ox-badge></h6>
        </div>
      </section>

      <section class="ox-section">
        <h2>Botones</h2>
        <p>Los badges se pueden utilizar como parte de enlaces o botones para proporcionar un contador.</p>
        <div class="ox-card ox-p-4 shadow-sm ox-border rounded">
          <ox-button severity="primary">
            Notifications <ox-badge value="4" severity="secondary" style="margin-left: 8px"></ox-badge>
          </ox-button>
        </div>
      </section>

      <section class="ox-section">
        <h2>Posicionados</h2>
        <p>Usa utilidades para posicionar un ox-badge en la esquina de un componente.</p>
        <div class="ox-card ox-p-4 shadow-sm ox-border rounded ox-flex ox-gap-4">
          <ox-button severity="primary" class="relative">
            Inbox
            <ox-badge value="99+" severity="error" [overlay]="true"></ox-badge>
          </ox-button>

          <ox-button severity="primary" class="relative">
            Profile
            <ox-badge [dot]="true" severity="error" [overlay]="true"></ox-badge>
            <span class="sr-only">unread messages</span>
          </ox-button>
        </div>
      </section>

      <section class="ox-section">
        <h2>Colores de fondo</h2>
        <p>Usa las severidades para cambiar la apariencia de un badge.</p>
        <div class="ox-card ox-p-4 shadow-sm ox-border rounded ox-flex ox-gap-2 ox-flex-wrap">
          <ox-badge value="Primary" severity="primary"></ox-badge>
          <ox-badge value="Secondary" severity="secondary"></ox-badge>
          <ox-badge value="Success" severity="success"></ox-badge>
          <ox-badge value="Danger" severity="error"></ox-badge>
          <ox-badge value="Warning" severity="warn"></ox-badge>
          <ox-badge value="Info" severity="info"></ox-badge>
        </div>
      </section>

      <section class="ox-section">
        <h2>Badges redondeados</h2>
        <p>Usa la propiedad <code>pill</code> para hacer los badges más redondeados.</p>
        <div class="ox-card ox-p-4 shadow-sm ox-border rounded ox-flex ox-gap-2">
          <ox-badge value="Primary" severity="primary" [pill]="true"></ox-badge>
          <ox-badge value="Secondary" severity="secondary" [pill]="true"></ox-badge>
          <ox-badge value="Success" severity="success" [pill]="true"></ox-badge>
          <ox-badge value="Danger" severity="error" [pill]="true"></ox-badge>
          <ox-badge value="Warning" severity="warn" [pill]="true"></ox-badge>
          <ox-badge value="Info" severity="info" [pill]="true"></ox-badge>
        </div>
      </section>
    </div>
  `
})
export class BadgeDemoComponent {}