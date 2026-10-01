import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableComponent, TreeTableNode, TreeTableColumn } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-tree-table-demo',
  standalone: true,
  imports: [CommonModule, TreeTableComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>TreeTable (Tabla Jerárquica)</h1>
      <p class="ox-description">
        Muestra datos jerárquicos estructurados en formato tabular con soporte para expansión de nodos y selección.
      </p>

      <!-- 1. BÁSICO -->
      <app-doc-code
        title="1. Estructura Jerárquica (Explorador de Archivos)"
        description="Haz clic en los chevrons para expandir carpetas o en una fila para seleccionarla."
        [html]="treeTableHtml"
        [ts]="treeTableTs">
        <div style="max-width: 800px;">
          <ox-tree-table 
            [value]="files" 
            [columns]="cols"
            selectionMode="single"
            [striped]="true"
            (nodeSelect)="onSelect($event)">
          </ox-tree-table>

          <div style="margin-top: 1rem; font-size: 0.875rem; color: #475569;">
            <strong>Nodo Seleccionado:</strong> {{ selectedNode?.data?.name || 'Ninguno' }} (Tipo: {{ selectedNode?.data?.type || 'N/A' }})
          </div>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: TreeTableComponent"
        [properties]="treeTableProps"
        [events]="treeTableEvents">
      </app-doc-api-table>
    </div>
  `
})
export class TreeTableDemoComponent {
  selectedNode: TreeTableNode | null = null;

  cols: TreeTableColumn[] = [
    { field: 'name', header: 'Nombre', width: '45%' },
    { field: 'size', header: 'Tamaño', width: '25%' },
    { field: 'type', header: 'Tipo', width: '30%' }
  ];

  files: TreeTableNode[] = [
    {
      key: '0',
      data: { name: '📁 Documentos', size: '125 KB', type: 'Carpeta' },
      expanded: true,
      children: [
        {
          key: '0-0',
          data: { name: '📁 Trabajo', size: '80 KB', type: 'Carpeta' },
          children: [
            {
              key: '0-0-0',
              data: { name: '📄 Informe_Financiero_2026.pdf', size: '55 KB', type: 'Documento PDF' }
            },
            {
              key: '0-0-1',
              data: { name: '📊 Presupuesto.xlsx', size: '25 KB', type: 'Hoja de Cálculo' }
            }
          ]
        },
        {
          key: '0-1',
          data: { name: '📄 Notas_Reunion.docx', size: '45 KB', type: 'Documento Word' }
        }
      ]
    },
    {
      key: '1',
      data: { name: '📁 Imágenes', size: '4.5 MB', type: 'Carpeta' },
      children: [
        {
          key: '1-0',
          data: { name: '🖼️ logo_oxygen_ui.png', size: '1.2 MB', type: 'Imagen PNG' }
        },
        {
          key: '1-1',
          data: { name: '🖼️ banner_hero.webp', size: '3.3 MB', type: 'Imagen WebP' }
        }
      ]
    },
    {
      key: '2',
      data: { name: '⚙️ package.json', size: '2 KB', type: 'Archivo JSON' }
    }
  ];

  onSelect(node: TreeTableNode): void {
    this.selectedNode = node;
  }

  treeTableHtml = `<ox-tree-table 
  [value]="files" 
  [columns]="cols"
  selectionMode="single"
  [striped]="true"
  (nodeSelect)="onSelect($event)">
</ox-tree-table>`;

  treeTableTs = `cols = [
  { field: 'name', header: 'Nombre', width: '45%' },
  { field: 'size', header: 'Tamaño', width: '25%' },
  { field: 'type', header: 'Tipo', width: '30%' }
];
files = [ ... ];`;

  treeTableProps: ApiProperty[] = [
    {
      name: 'value',
      type: 'TreeTableNode[]',
      default: '[]',
      description: 'Estructura en árbol de datos jerárquicos a renderizar.'
    },
    {
      name: 'columns',
      type: 'TreeTableColumn[]',
      default: '[]',
      description: 'Definición de columnas (field, header, width, align).'
    },
    {
      name: 'selectionMode',
      type: "'single' | 'multiple' | null",
      default: 'null',
      description: 'Modalidad de selección de filas.'
    },
    {
      name: 'striped',
      type: 'boolean',
      default: 'false',
      description: 'Aplica filas alternadas con fondo sutil.'
    }
  ];

  treeTableEvents: ApiEvent[] = [
    {
      name: 'nodeSelect',
      parameters: 'TreeTableNode',
      description: 'Emitido cuando un nodo es seleccionado.'
    },
    {
      name: 'nodeExpand',
      parameters: 'TreeTableNode',
      description: 'Emitido cuando un nodo se expande.'
    },
    {
      name: 'nodeCollapse',
      parameters: 'TreeTableNode',
      description: 'Emitido cuando un nodo se colapsa.'
    }
  ];
}
