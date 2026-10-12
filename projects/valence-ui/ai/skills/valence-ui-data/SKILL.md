---
name: valence-ui-data
description: API reference and best practices for Valence UI data presentation components (Table, Tree, TreeTable, Paginator, Timeline). Use when rendering collections, tabular data, hierarchical trees, or chronological event lists.
---

# Valence UI — Data Presentation Skill

Valence UI provides high-performance data display components with built-in sorting, filtering, selection, and responsive layouts.

## 1. Data Table (`TableComponent` & `PaginatorComponent`)

Standalone import:
```typescript
import { TableComponent, PaginatorComponent, BadgeComponent, ButtonComponent } from 'valence-ui';
```

### Basic Tabular Display
```html
<val-table
  [value]="users"
  [striped]="true"
  [hoverable]="true"
  [responsive]="true">
  
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Correo</th>
      <th>Rol</th>
      <th>Estado</th>
      <th class="val-text-right">Acciones</th>
    </tr>
  </thead>
  <tbody>
    @for (user of users; track user.id) {
      <tr>
        <td>#{{ user.id }}</td>
        <td class="val-font-medium">{{ user.name }}</td>
        <td class="val-text-muted">{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <val-badge
            [value]="user.status"
            [severity]="user.status === 'Activo' ? 'success' : 'danger'">
          </val-badge>
        </td>
        <td class="val-text-right">
          <button val-button variant="ghost-primary" icon="pi-pencil"></button>
          <button val-button variant="ghost-danger" icon="pi-trash"></button>
        </td>
      </tr>
    } @empty {
      <tr>
        <td colspan="6" class="val-text-center val-p-4 val-text-muted">
          No se encontraron registros.
        </td>
      </tr>
    }
  </tbody>
</val-table>

<!-- Paginador integrado -->
<val-paginator
  [rows]="10"
  [totalRecords]="totalItems"
  [rowsPerPageOptions]="[10, 25, 50]"
  (onPageChange)="paginate($event)">
</val-paginator>
```

### Table Inputs & Props
* `value` (`any[]`): Data array to bind
* `striped` (`boolean`): Alternating row background stripes (default: `true`)
* `hoverable` (`boolean`): Highlights row on hover (default: `true`)
* `bordered` (`boolean`): Table outer and inner cell borders (default: `false`)
* `responsive` (`boolean`): Enables horizontal scroll wrapper on small screens (default: `true`)
* `size` (`'sm' | 'md' | 'lg'`): Cell padding density (default: `'md'`)

---

## 2. Hierarchical Tree (`TreeComponent`)

Renders nested parent-child trees:

```typescript
import { TreeComponent, TreeNode } from 'valence-ui';
```

```html
<val-tree
  [value]="files"
  [selectionMode]="'single'"
  [(selection)]="selectedNode"
  (onNodeSelect)="nodeSelected($event)">
</val-tree>
```

```typescript
// Node structure
export interface TreeNode<T = any> {
  label?: string;
  data?: T;
  icon?: string;
  expandedIcon?: string;
  collapsedIcon?: string;
  children?: TreeNode<T>[];
  leaf?: boolean;
  expanded?: boolean;
}
```

---

## 3. Tree Table (`TreeTableComponent`)

Combines tabular column structure with hierarchical parent-child expanding nodes:

```html
<val-tree-table [value]="projectNodes">
  <!-- Define columns matching TreeNode structure -->
</val-tree-table>
```

---

## 4. Chronological Timeline (`TimelineComponent`)

Renders a linear event timeline:

```typescript
import { TimelineComponent } from 'valence-ui';
```

```html
<val-timeline [value]="events">
  <!-- Visual markers, dates and descriptions -->
</val-timeline>
```

```typescript
events = [
  { status: 'Orden Creada', date: '15/10/2026 10:30', icon: 'pi-shopping-cart', color: '#9C27B0' },
  { status: 'Procesando Pago', date: '15/10/2026 14:00', icon: 'pi-cog', color: '#673AB7' },
  { status: 'Enviado', date: '16/10/2026 09:15', icon: 'pi-envelope', color: '#FF9800' },
  { status: 'Entregado', date: '17/10/2026 16:45', icon: 'pi-check', color: '#4CAF50' }
];
```
