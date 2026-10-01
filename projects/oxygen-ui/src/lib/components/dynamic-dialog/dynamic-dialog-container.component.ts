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

@Component({
  selector: 'ox-dynamic-dialog-container',
  standalone: true,
  imports: [CommonModule],
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    @if (isMaximized()) {
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                    } @else {
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    }
                  </svg>
                </button>
              }

              @if (config.closable) {
                <button type="button" class="ox-dialog-close" (click)="close()" aria-label="Close dialog">
                  <span>×</span>
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
