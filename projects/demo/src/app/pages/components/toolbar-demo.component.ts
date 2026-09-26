import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent, ButtonComponent, DividerComponent } from 'oxygen-ui';

@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ButtonComponent, DividerComponent],
  template: `
    <div class="ox-page-container">
      <h1>Toolbar</h1>
      <p class="ox-description">Agrupa un conjunto de componentes, normalmente botones, de forma horizontal.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <div class="ox-card ox-p-4">
          <ox-toolbar>
            <div left>
              <ox-button icon="pi pi-plus" severity="success"></ox-button>
              <ox-button icon="pi pi-file" severity="secondary"></ox-button>
              <ox-button icon="pi pi-trash" severity="error"></ox-button>
            </div>
            
            <div right>
              <ox-button label="Exportar" icon="pi pi-download"></ox-button>
            </div>
          </ox-toolbar>
        </div>
      </section>

      <section class="ox-section">
        <h2>Variantes de Color</h2>
        <div class="ox-flex ox-flex-column ox-gap-4">
          <ox-toolbar color="primary">
            <div left>
              <ox-button icon="pi pi-bars" variant="ghost-secondary"></ox-button>
              <span class="ox-fw-bold">Primary Toolbar</span>
            </div>
            <div right>
              <ox-button icon="pi pi-search" variant="ghost-secondary"></ox-button>
            </div>
          </ox-toolbar>

          <ox-toolbar color="secondary">
            <div left>
              <ox-button icon="pi pi-user" variant="ghost-secondary"></ox-button>
              <span class="ox-fw-bold">Secondary Toolbar</span>
            </div>
            <div right>
              <ox-button icon="pi pi-bell" variant="ghost-secondary"></ox-button>
            </div>
          </ox-toolbar>
        </div>
      </section>
    </div>
  `
})
export class ToolbarDemoComponent {}