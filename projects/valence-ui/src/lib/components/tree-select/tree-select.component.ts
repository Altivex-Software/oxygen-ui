import { 
  Component, 
  forwardRef, 
  input, 
  model, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  signal, 
  computed, 
  ElementRef, 
  ViewChild, 
  ChangeDetectorRef, 
  inject 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { IconComponent } from '../icon/icon.component';
import { OxIconName } from '../icon/icon.types';

import { TreeNode } from '../tree/tree.types';
export type { TreeNode };

@Component({
  selector: 'ox-tree-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule, IconComponent],
  template: `
    <div 
      #container
      class="ox-tree-select" 
      [class.ox-tree-select-open]="isOpen()" 
      [class.ox-tree-select-disabled]="disabled()"
      (click)="toggle()">
      
      <div class="ox-tree-select-label">
        {{ selectedLabel() || placeholder() }}
      </div>
      
      <div class="ox-tree-select-trigger">
        <ox-icon name="chevron-down" size="1rem" class="ox-tree-select-trigger-icon"></ox-icon>
      </div>

      <ng-template 
        cdkConnectedOverlay 
        [cdkConnectedOverlayOrigin]="container" 
        [cdkConnectedOverlayOpen]="isOpen()"
        [cdkConnectedOverlayMinWidth]="containerWidth"
        [cdkConnectedOverlayOffsetY]="4"
        (overlayOutsideClick)="close($event)">
        
        <div class="ox-tree-select-panel ox-elevation-2">
          @if (filter()) {
            <div class="ox-tree-select-filter-container" (click)="$event.stopPropagation()">
              <input 
                type="text" 
                class="ox-tree-select-filter-input" 
                [placeholder]="filterPlaceholder()"
                [(ngModel)]="filterValue">
            </div>
          }
          
          <div class="ox-tree-select-tree">
            <ng-container *ngTemplateOutlet="nodeListTemplate; context: { $implicit: options(), level: 0 }"></ng-container>
          </div>
        </div>
      </ng-template>
    </div>

    <ng-template #nodeListTemplate let-nodes let-level="level">
      <ul class="ox-tree-select-nodes" [style.padding-left.px]="level * 16">
        @for (node of nodes; track node.key || node.label) {
          @if (isNodeVisible(node)) {
            <li class="ox-tree-select-node">
              <div 
                class="ox-tree-select-node-content"
                [class.ox-tree-select-node-selected]="isSelected(node)"
                [class.ox-tree-select-node-disabled]="node.disabled"
                (click)="selectNode(node, $event)">
                
                @if (node.children && node.children.length > 0) {
                  <span class="ox-tree-select-toggler" (click)="toggleNode(node, $event)">
                    <ox-icon [name]="node.expanded ? 'chevron-down' : 'chevron-right'" size="0.75rem"></ox-icon>
                  </span>
                } @else {
                  <span class="ox-tree-select-toggler-placeholder"></span>
                }

                @if (node.icon) {
                  <ox-icon [name]="$any(node.icon)" size="0.875rem" class="ox-tree-select-node-icon"></ox-icon>
                }
                
                <span class="ox-tree-select-node-label">{{ node.label }}</span>
              </div>

              @if (node.children && node.children.length > 0 && (node.expanded || filterValue().length > 0)) {
                <ng-container *ngTemplateOutlet="nodeListTemplate; context: { $implicit: node.children, level: level + 1 }"></ng-container>
              }
            </li>
          }
        }
      </ul>
    </ng-template>
  `,
  styleUrl: './tree-select.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectComponent),
      multi: true
    }
  ]
})
export class TreeSelectComponent implements ControlValueAccessor {
  @ViewChild('container') container!: ElementRef;

  options = input<TreeNode[]>([]);
  placeholder = input<string>('Select a node');
  disabled = input<boolean>(false);
  filter = input<boolean>(false);
  filterPlaceholder = input<string>('Search nodes...');

  value = model<any>(null);
  
  isOpen = signal(false);
  filterValue = signal('');
  containerWidth = 0;

  private cdr = inject(ChangeDetectorRef);
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  selectedLabel = computed(() => {
    const val = this.value();
    if (!val) return null;
    const found = this.findNode(this.options(), val);
    return found ? found.label : null;
  });

  toggle() {
    if (this.disabled()) return;
    if (!this.isOpen()) {
      this.containerWidth = this.container.nativeElement.offsetWidth;
    }
    this.isOpen.update(v => !v);
    this.cdr.markForCheck();
  }

  close(event?: MouseEvent) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target && this.container.nativeElement.contains(target)) return;
    }
    this.isOpen.set(false);
    this.filterValue.set('');
    this.cdr.markForCheck();
  }

  toggleNode(node: TreeNode, event: Event) {
    event.stopPropagation();
    node.expanded = !node.expanded;
    this.cdr.markForCheck();
  }

  selectNode(node: TreeNode, event: Event) {
    event.stopPropagation();
    if (node.disabled) return;
    const nodeVal = node.key || node.label;
    this.value.set(nodeVal);
    this.onChange(nodeVal);
    this.onTouched();
    this.close();
  }

  isSelected(node: TreeNode): boolean {
    const val = this.value();
    return val === (node.key || node.label);
  }

  isNodeVisible(node: TreeNode): boolean {
    const term = this.filterValue().toLowerCase().trim();
    if (!term) return true;

    if (node.label.toLowerCase().includes(term)) return true;
    if (node.children) {
      return node.children.some(c => this.isNodeVisible(c));
    }
    return false;
  }

  private findNode(nodes: TreeNode[], val: any): TreeNode | null {
    for (const node of nodes) {
      if ((node.key || node.label) === val) return node;
      if (node.children) {
        const found = this.findNode(node.children, val);
        if (found) return found;
      }
    }
    return null;
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
