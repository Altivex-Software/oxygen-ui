import { 
  Component, 
  Type, 
  Injector, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  signal, 
  HostListener,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from './dynamic-dialog-config';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ox-dynamic-dialog-container',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="ox-dialog-mask" (click)="onMaskClick($event)">
      <div 
        class="ox-dialog ox-elevation-4" 
        [class.ox-dialog-maximized]="isMaximized()"
        [class]="config.styleClass || ''"
        [style.width]="isMaximized() ? '100vw' : (config.width || '500px')"
        [style.height]="isMaximized() ? '100vh' : (config.height || 'auto')"
        (click)="$event.stopPropagation()">
        
        <!-- Header -->
        @if (config.header || config.closable || config.maximizable) {
          <div class="ox-dialog-header">
            <span class="ox-dialog-title">{{ config.header }}</span>
            <div class="ox-dialog-header-actions">
              @if (config.maximizable) {
                <button type="button" class="ox-dialog-header-icon" (click)="toggleMaximize()" aria-label="Maximize dialog">
                  <ox-icon [name]="isMaximized() ? 'minimize' : 'maximize'" size="1rem"></ox-icon>
                </button>
              }

              @if (config.closable) {
                <button type="button" class="ox-dialog-close" (click)="close()" aria-label="Close dialog">
                  <ox-icon name="x" size="1.125rem"></ox-icon>
                </button>
              }
            </div>
          </div>
        }

        <!-- Dynamic Content -->
        <div class="ox-dialog-content" [ngStyle]="config.contentStyle">
          <ng-container *ngComponentOutlet="childComponentType; injector: childInjector"></ng-container>
        </div>
      </div>
    </div>
  `,
  styleUrl: '../dialog/dialog.component.scss',
  styles: [`
    .ox-dialog-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .ox-dialog-header-icon {
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;

      &:hover {
        background: #f1f5f9;
        color: #1e293b;
      }
    }

    .ox-dialog-maximized {
      width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      border-radius: 0 !important;
    }
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicDialogContainerComponent {
  config = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);
  private parentInjector = inject(Injector);

  childComponentType!: Type<any>;
  childInjector!: Injector;
  isMaximized = signal<boolean>(false);

  init(componentType: Type<any>): void {
    this.childComponentType = componentType;
    this.childInjector = Injector.create({
      providers: [
        { provide: DynamicDialogConfig, useValue: this.config },
        { provide: DynamicDialogRef, useValue: this.dialogRef }
      ],
      parent: this.parentInjector
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  toggleMaximize(): void {
    this.isMaximized.update(m => !m);
  }

  onMaskClick(event: MouseEvent): void {
    if (this.config.dismissableMask) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.config.closable) {
      this.close();
    }
  }
}
