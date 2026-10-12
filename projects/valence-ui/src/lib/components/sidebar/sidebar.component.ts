import { 
  Component, 
  input, 
  model, 
  output, 
  ChangeDetectionStrategy, 
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ox-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    @if (visible()) {
      <div 
        class="ox-sidebar-mask" 
        (click)="onMaskClick()">
        <div 
          class="ox-sidebar ox-sidebar-{{position()}} ox-elevation-4" 
          (click)="$event.stopPropagation()"
          [@panelAnim]="{ value: position(), params: { transform: getTransform() } }">
          
          <div class="ox-sidebar-header">
            <span class="ox-sidebar-title">{{ header() }}</span>
            @if (showCloseIcon()) {
              <button 
                type="button" 
                class="ox-sidebar-close" 
                (click)="close()"
                aria-label="Cerrar panel">
                <ox-icon name="x" size="sm"></ox-icon>
              </button>
            }
          </div>
          
          <div class="ox-sidebar-content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('panelAnim', [
      transition(':enter', [
        style({ transform: '{{transform}}' }),
        animate('0.3s cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none' }))
      ], { params: { transform: 'translateX(-100%)' } }),
      transition(':leave', [
        animate('0.25s cubic-bezier(0.4, 0, 1, 1)', style({ transform: '{{transform}}' }))
      ], { params: { transform: 'translateX(-100%)' } })
    ])
  ]
})
export class SidebarComponent {
  visible = model<boolean>(false);
  position = input<'left' | 'right' | 'top' | 'bottom'>('left');
  header = input<string>('');
  showCloseIcon = input<boolean>(true);
  dismissible = input<boolean>(true);

  onShow = output<void>();
  onHide = output<void>();

  getTransform(): string {
    switch (this.position()) {
      case 'right': return 'translateX(100%)';
      case 'top': return 'translateY(-100%)';
      case 'bottom': return 'translateY(100%)';
      case 'left':
      default:
        return 'translateX(-100%)';
    }
  }

  onMaskClick() {
    if (this.dismissible()) {
      this.close();
    }
  }

  close() {
    this.visible.set(false);
    this.onHide.emit();
  }
}
