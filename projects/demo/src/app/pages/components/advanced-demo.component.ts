import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { 
  TreeSelectComponent, 
  TreeNode, 
  SplitterComponent, 
  TimelineComponent, 
  TimelineItem,
  CardComponent
} from "oxygen-ui";
import { DocCodeComponent } from "../../shared/doc-code/doc-code.component";
import { DocApiTableComponent, ApiProperty, ApiEvent } from "../../shared/doc-code/doc-api-table.component";

@Component({
  selector: "app-advanced-demo",
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TreeSelectComponent, 
    SplitterComponent, 
    TimelineComponent,
    CardComponent,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Advanced Forms & Layout</h1>
      <p class="ox-description">
        Componentes avanzados de navegación, jerarquías y estructura de paneles: <code>ox-tree-select</code>, <code>ox-splitter</code> y <code>ox-timeline</code>.
      </p>

      <!-- 1. TREE SELECT -->
      <section class="ox-section">
        <h2>1. TreeSelect (Selector Jerárquico)</h2>
        <p>Desplegable con soporte para árbol de nodos jerárquicos y filtrado en tiempo real.</p>

        <div style="max-width: 340px; margin-bottom: 1rem;">
          <ox-tree-select 
            [options]="categoryNodes" 
            [(ngModel)]="selectedCategory"
            placeholder="Selecciona una categoría"
            [filter]="true">
          </ox-tree-select>
        </div>

        <div style="font-size: 0.875rem; color: #475569; margin-bottom: 1.5rem;">
          <strong>Nodo seleccionado:</strong> <code>{{ selectedCategory || 'Ninguno' }}</code>
        </div>

        <app-doc-code 
          title="TreeSelect"
          [htmlCode]="treeSelectHtml"
          [tsCode]="treeSelectTs">
        </app-doc-code>
      </section>

      <!-- 2. SPLITTER -->
      <section class="ox-section">
        <h2>2. Splitter (Paneles Redimensionables)</h2>
        <p>Arrastra la barra divisoria central para redimensionar los paneles izquierdo y derecho en tiempo real.</p>

        <div style="height: 250px; margin-bottom: 1.5rem; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <ox-splitter [initialSize]="40">
            <div oxPanel1 style="padding: 1rem; background: #f8fafc; height: 100%;">
              <h3 style="margin-top: 0; font-size: 1rem;">Panel Izquierdo</h3>
              <p style="font-size: 0.875rem; color: #64748b;">
                Área de navegación, estructura de carpetas o lista maestra.
              </p>
            </div>
            <div oxPanel2 style="padding: 1rem; height: 100%;">
              <h3 style="margin-top: 0; font-size: 1rem;">Panel Derecho</h3>
              <p style="font-size: 0.875rem; color: #64748b;">
                Área de inspección de detalles, editor o previsualización.
              </p>
            </div>
          </ox-splitter>
        </div>

        <app-doc-code 
          title="Splitter"
          [htmlCode]="splitterHtml"
          [tsCode]="splitterTs">
        </app-doc-code>
      </section>

      <!-- 3. TIMELINE -->
      <section class="ox-section">
        <h2>3. Timeline (Línea de Tiempo)</h2>
        <p>Visualización cronológica de eventos, seguimiento de envíos o historial de actividad.</p>

        <ox-card style="max-width: 600px; margin-bottom: 1.5rem;">
          <div style="padding: 1.5rem;">
            <ox-timeline [value]="orderHistory"></ox-timeline>
          </div>
        </ox-card>

        <app-doc-code 
          title="Timeline"
          [htmlCode]="timelineHtml"
          [tsCode]="timelineTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; &lt;ox-tree-select&gt;</h2>
        <app-doc-api-table [properties]="treeSelectProperties"></app-doc-api-table>
      </section>
    </div>
  `
})
export class AdvancedDemoComponent {
  selectedCategory = "";

  categoryNodes: TreeNode[] = [
    {
      key: "electronics",
      label: "Electrónica",
      icon: "cpu",
      expanded: true,
      children: [
        {
          key: "phones",
          label: "Smartphones",
          icon: "smartphone",
          children: [
            { key: "iphone", label: "iPhone 15 Pro", icon: "smartphone" },
            { key: "galaxy", label: "Samsung Galaxy S24", icon: "smartphone" }
          ]
        },
        {
          key: "laptops",
          label: "Portátiles",
          icon: "laptop",
          children: [
            { key: "macbook", label: "MacBook Pro M3", icon: "laptop" },
            { key: "dell", label: "Dell XPS 15", icon: "monitor" }
          ]
        }
      ]
    },
    {
      key: "fashion",
      label: "Ropa & Calzado",
      icon: "tag",
      children: [
        { key: "shirts", label: "Camisas & Polos" },
        { key: "shoes", label: "Zapatillas" }
      ]
    }
  ];

  orderHistory: TimelineItem[] = [
    {
      status: "Pedido Realizado",
      date: "15/10/2026 10:30",
      icon: "shopping-cart",
      color: "#3b82f6",
      description: "Orden confirmada y validada por el cliente."
    },
    {
      status: "En Preparación",
      date: "15/10/2026 14:15",
      icon: "package",
      color: "#f59e0b",
      description: "Paquete embalado y entregado al servicio de mensajería."
    },
    {
      status: "En Tránsito",
      date: "16/10/2026 09:00",
      icon: "truck",
      color: "#06b6d4",
      description: "En ruta de entrega con número de seguimiento #OX-8840."
    },
    {
      status: "Entregado",
      date: "17/10/2026 16:45",
      icon: "check-circle",
      color: "#22c55e",
      description: "Paquete entregado y firmado en destino."
    }
  ];

  treeSelectHtml = `<ox-tree-select 
  [options]="categoryNodes" 
  [(ngModel)]="selectedCategory"
  placeholder="Selecciona categoría"
  [filter]="true">
</ox-tree-select>`;

  treeSelectTs = `import { Component } from '@angular/core';
import { TreeSelectComponent, TreeNode } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [TreeSelectComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  selectedCategory = '';
  categoryNodes: TreeNode[] = [
    {
      key: 'electronics',
      label: 'Electrónica',
      children: [{ key: 'phone', label: 'Celulares' }]
    }
  ];
}`;

  splitterHtml = `<ox-splitter [initialSize]="40">
  <div oxPanel1>Panel 1</div>
  <div oxPanel2>Panel 2</div>
</ox-splitter>`;

  splitterTs = `import { Component } from '@angular/core';
import { SplitterComponent } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [SplitterComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {}`;

  timelineHtml = `<ox-timeline [value]="orderHistory"></ox-timeline>`;

  timelineTs = `import { Component } from '@angular/core';
import { TimelineComponent, TimelineItem } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [TimelineComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  orderHistory: TimelineItem[] = [
    { status: 'Iniciado', date: '10:00', icon: 'zap' },
    { status: 'Completado', date: '11:00', icon: 'check-circle' }
  ];
}`;

  treeSelectProperties: ApiProperty[] = [
    { name: 'options', type: 'TreeNode[]', default: '[]', description: 'Estructura en árbol de nodos con labels, claves y subnodos.' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Texto placeholder cuando no hay nodo seleccionado.' },
    { name: 'filter', type: 'boolean', default: 'false', description: 'Habilita el filtrado en vivo de los nodos del árbol.' }
  ];
}
