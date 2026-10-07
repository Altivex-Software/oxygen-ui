import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  TreeComponent, 
  TreeNode, 
  TreeNodeSelectEvent, 
  BadgeComponent, 
  TagComponent,
  IconComponent,
  ToastComponent,
  ToastService
} from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-tree-demo',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TreeComponent, 
    BadgeComponent, 
    TagComponent,
    IconComponent,
    ToastComponent,
    DocCodeComponent, 
    DocApiTableComponent
  ],
  providers: [ToastService],
  template: `
    <div class="demo-container">
      <ox-toast></ox-toast>

      <header class="demo-header">
        <div class="demo-title-badge">
          <ox-badge value="Data & Navigation" severity="primary"></ox-badge>
        </div>
        <h1 class="demo-title">Tree</h1>
        <p class="demo-description">
          Componente de árbol jerárquico avanzado para visualización de estructuras complejas, carpetas, taxonomías y selecciones multinivel (Single, Multiple y Checkbox tri-state).
        </p>
      </header>

      <!-- 1. Basic Single Selection Tree -->
      <app-doc-code
        title="1. Selección Simple y Estructura Jerárquica"
        description="Navegación tradicional de árbol con iconos personalizados para estados expandido y colapsado."
        [html]="basicTreeHtml">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div>
            <ox-tree 
              [value]="filesTree()" 
              selectionMode="single" 
              [(selection)]="selectedFile"
              (nodeSelect)="onNodeSelect($event)"
              (nodeUnselect)="onNodeUnselect($event)">
            </ox-tree>
          </div>
          <div class="flex flex-col justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nodo Seleccionado</span>
            @if (selectedFile()) {
              <div class="flex items-center gap-3">
                <ox-icon [name]="$any(selectedFile()?.icon || 'file-text')" size="1.5rem" class="text-primary-500"></ox-icon>
                <div>
                  <h4 class="font-semibold text-slate-800 dark:text-slate-100 m-0">{{ selectedFile()?.label }}</h4>
                  <p class="text-xs text-slate-500 m-0">Tipo: {{ selectedFile()?.data?.type || 'Elemento' }}</p>
                </div>
              </div>
            } @else {
              <p class="text-sm text-slate-400 italic m-0">Ningún nodo seleccionado. Haz clic en un elemento del árbol.</p>
            }
          </div>
        </div>
      </app-doc-code>

      <!-- 2. Checkbox Selection Tree (Tri-state) -->
      <app-doc-code
        title="2. Selección por Casillas (Checkbox Tri-State)"
        description="Soporte jerárquico automático: seleccionar un nodo padre selecciona automáticamente sus hijos, y la selección parcial activa el estado indeterminado."
        [html]="checkboxTreeHtml">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div>
            <ox-tree 
              [value]="checkboxTree()" 
              selectionMode="checkbox" 
              [(selection)]="selectedCheckboxNodes">
            </ox-tree>
          </div>
          <div class="flex flex-col p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-h-72 overflow-y-auto">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Elementos Seleccionados ({{ selectedCheckboxNodes().length }})</span>
            @if (selectedCheckboxNodes().length > 0) {
              <ul class="flex flex-col gap-1 p-0 m-0 list-none">
                @for (node of selectedCheckboxNodes(); track node.key || node.label) {
                  <li class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <ox-icon name="check-circle" size="0.875rem" class="text-emerald-500"></ox-icon>
                    <span>{{ node.label }}</span>
                  </li>
                }
              </ul>
            } @else {
              <p class="text-sm text-slate-400 italic m-0">Selecciona casillas en el árbol.</p>
            }
          </div>
        </div>
      </app-doc-code>

      <!-- 3. Filterable Tree with Search & Actions -->
      <app-doc-code
        title="3. Filtrado en Tiempo Real y Acciones"
        description="Incluye barra de búsqueda integrada con auto-expansión de ramas coincidentes y botones para expandir/colapsar todo el árbol."
        [html]="filterableTreeHtml">
        <div class="p-4">
          <ox-tree 
            [value]="searchableTree()" 
            [filter]="true" 
            filterPlaceholder="Buscar archivos o servicios..."
            selectionMode="single">
          </ox-tree>
        </div>
      </app-doc-code>

      <!-- 4. Custom Node Template -->
      <app-doc-code
        title="4. Plantilla de Nodo Personalizada (#nodeTemplate)"
        description="Personaliza el contenido de cada nodo añadiendo etiquetas, tags, badges o acciones interactivas."
        [html]="customTemplateTreeHtml">
        <div class="p-4">
          <ox-tree [value]="customTemplateTree()" selectionMode="single">
            <ng-template #nodeTemplate let-node>
              <div class="flex items-center justify-between w-full pr-2">
                <span class="font-medium text-slate-700 dark:text-slate-200">{{ node.label }}</span>
                @if (node.data?.badge) {
                  <ox-tag [value]="node.data.badge" [severity]="node.data.severity || 'info'"></ox-tag>
                }
              </div>
            </ng-template>
          </ox-tree>
        </div>
      </app-doc-code>

      <!-- API Documentation -->
      <section class="demo-section">
        <app-doc-api-table title="ox-tree API" [properties]="treeProperties"></app-doc-api-table>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      max-width: 900px;
    }
    .demo-header {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .demo-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--ox-text-primary, #0f172a);
      margin: 0;
    }
    .demo-description {
      font-size: 1.125rem;
      color: var(--ox-text-secondary, #64748b);
      margin: 0;
      line-height: 1.6;
    }
    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `]
})
export class TreeDemoComponent {
  selectedFile = signal<TreeNode | null>(null);
  selectedCheckboxNodes = signal<TreeNode[]>([]);

  constructor(private toastService: ToastService) {}

  filesTree = signal<TreeNode[]>([
    {
      key: '0',
      label: 'Documentos',
      icon: 'folder',
      expanded: true,
      children: [
        {
          key: '0-0',
          label: 'Trabajo',
          icon: 'folder',
          expanded: true,
          children: [
            { key: '0-0-0', label: 'Reporte_Trimestral.pdf', icon: 'file-text', data: { type: 'Documento PDF' } },
            { key: '0-0-1', label: 'Presupuesto_2026.xlsx', icon: 'file', data: { type: 'Hoja de Cálculo' } }
          ]
        },
        {
          key: '0-1',
          label: 'Personal',
          icon: 'folder',
          children: [
            { key: '0-1-0', label: 'Curriculum_Vitae.pdf', icon: 'file-text', data: { type: 'Documento PDF' } },
            { key: '0-1-1', label: 'Notas.txt', icon: 'file-text', data: { type: 'Archivo de Texto' } }
          ]
        }
      ]
    },
    {
      key: '1',
      label: 'Imágenes y Medios',
      icon: 'folder',
      children: [
        { key: '1-0', label: 'banner_principal.png', icon: 'image', data: { type: 'Imagen PNG' } },
        { key: '1-1', label: 'avatar_usuario.jpg', icon: 'image', data: { type: 'Imagen JPG' } },
        { key: '1-2', label: 'presentacion_producto.mp4', icon: 'video', data: { type: 'Video MP4' } }
      ]
    },
    {
      key: '2',
      label: 'Código Fuente',
      icon: 'folder',
      children: [
        { key: '2-0', label: 'app.component.ts', icon: 'code', data: { type: 'TypeScript' } },
        { key: '2-1', label: 'styles.scss', icon: 'palette', data: { type: 'SCSS' } },
        { key: '2-2', label: 'package.json', icon: 'settings', data: { type: 'JSON Config' } }
      ]
    }
  ]);

  checkboxTree = signal<TreeNode[]>([
    {
      key: 'c-0',
      label: 'Módulos del Sistema',
      icon: 'folder',
      expanded: true,
      children: [
        {
          key: 'c-0-0',
          label: 'Administración de Usuarios',
          icon: 'user',
          expanded: true,
          children: [
            { key: 'c-0-0-0', label: 'Crear Usuarios', icon: 'user-plus' },
            { key: 'c-0-0-1', label: 'Editar Permisos', icon: 'lock' },
            { key: 'c-0-0-2', label: 'Eliminar Cuentas', icon: 'trash' }
          ]
        },
        {
          key: 'c-0-1',
          label: 'Facturación & Pagos',
          icon: 'dollar-sign',
          expanded: true,
          children: [
            { key: 'c-0-1-0', label: 'Emitir Facturas', icon: 'file-text' },
            { key: 'c-0-1-1', label: 'Reembolsos', icon: 'refresh' },
            { key: 'c-0-1-2', label: 'Reportes de Ventas', icon: 'chart-bar' }
          ]
        }
      ]
    }
  ]);

  searchableTree = signal<TreeNode[]>([
    {
      key: 's-0',
      label: 'Frontend Core',
      icon: 'folder',
      expanded: true,
      children: [
        { key: 's-0-0', label: 'Components (Button, Dialog, Tree)', icon: 'layers' },
        { key: 's-0-1', label: 'Services (ToastService, ConfigService)', icon: 'zap' },
        { key: 's-0-2', label: 'Directives & Utilities', icon: 'tool' }
      ]
    },
    {
      key: 's-1',
      label: 'Backend Microservices',
      icon: 'folder',
      expanded: true,
      children: [
        { key: 's-1-0', label: 'Auth Service (OAuth2, JWT)', icon: 'shield' },
        { key: 's-1-1', label: 'Payment Gateway (Stripe, Paypal)', icon: 'credit-card' },
        { key: 's-1-2', label: 'Notification Engine (Emails, SMS)', icon: 'bell' }
      ]
    }
  ]);

  customTemplateTree = signal<TreeNode[]>([
    {
      key: 't-0',
      label: 'Proyecto Alpha',
      icon: 'folder',
      expanded: true,
      children: [
        { key: 't-0-0', label: 'Diseño UI/UX en Figma', icon: 'figma', data: { badge: 'Completado', severity: 'success' } },
        { key: 't-0-1', label: 'Desarrollo de Componentes', icon: 'code', data: { badge: 'En Progreso', severity: 'warning' } },
        { key: 't-0-2', label: 'Pruebas E2E & QA', icon: 'check-circle', data: { badge: 'Pendiente', severity: 'danger' } }
      ]
    }
  ]);

  onNodeSelect(event: TreeNodeSelectEvent) {
    this.toastService.add({
      summary: 'Nodo Seleccionado',
      detail: `${event.node.label}`,
      severity: 'info'
    });
  }

  onNodeUnselect(event: TreeNodeSelectEvent) {
    this.toastService.add({
      summary: 'Nodo Deseleccionado',
      detail: `${event.node.label}`,
      severity: 'secondary'
    });
  }

  basicTreeHtml = `<ox-tree 
  [value]="filesTree()" 
  selectionMode="single" 
  [(selection)]="selectedFile"
  (nodeSelect)="onNodeSelect($event)">
</ox-tree>`;

  checkboxTreeHtml = `<ox-tree 
  [value]="checkboxTree()" 
  selectionMode="checkbox" 
  [(selection)]="selectedCheckboxNodes">
</ox-tree>`;

  filterableTreeHtml = `<ox-tree 
  [value]="searchableTree()" 
  [filter]="true" 
  filterPlaceholder="Buscar archivos o carpetas..."
  selectionMode="single">
</ox-tree>`;

  customTemplateTreeHtml = `<ox-tree [value]="customTemplateTree()" selectionMode="single">
  <ng-template #nodeTemplate let-node>
    <div class="flex items-center justify-between w-full pr-2">
      <span class="font-medium text-slate-700 dark:text-slate-200">{{ node.label }}</span>
      @if (node.data?.badge) {
        <ox-tag [value]="node.data.badge" [severity]="node.data.severity || 'info'"></ox-tag>
      }
    </div>
  </ng-template>
</ox-tree>`;

  treeProperties: ApiProperty[] = [
    { name: 'value', type: 'TreeNode[]', default: '[]', description: 'Arreglo jerárquico de nodos que estructuran el árbol.' },
    { name: 'selectionMode', type: "'single' | 'multiple' | 'checkbox'", default: "'single'", description: 'Modo de selección de elementos.' },
    { name: 'selection', type: 'model<any>', default: 'null', description: 'Nodo o lista de nodos seleccionados (Two-way binding).' },
    { name: 'filter', type: 'boolean', default: 'false', description: 'Habilita la barra de búsqueda y filtrado en tiempo real.' },
    { name: 'filterPlaceholder', type: 'string', default: "'Buscar...'", description: 'Texto del placeholder del buscador.' },
    { name: 'showLines', type: 'boolean', default: 'false', description: 'Muestra líneas conectoras guía entre nodos.' },
    { name: 'scrollHeight', type: 'string', default: 'null', description: 'Altura máxima del contenedor con scroll interno.' },
    { name: 'emptyMessage', type: 'string', default: "'No se encontraron elementos'", description: 'Mensaje a mostrar cuando no hay resultados.' }
  ];
}
