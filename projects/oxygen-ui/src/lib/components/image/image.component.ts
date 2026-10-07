import { 
  Component, 
  input, 
  output, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ox-image',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="ox-image" [style.width]="width()" [style.height]="height()">
      <img 
        [src]="src()" 
        [alt]="alt()" 
        [class]="imageClass()" 
        [style]="imageStyle()"
        class="ox-image-img" />

      @if (preview()) {
        <div class="ox-image-preview-mask" (click)="openPreview()">
          <span class="ox-image-preview-icon">
            <ox-icon name="eye" size="1.5rem"></ox-icon>
          </span>
        </div>
      }
    </div>

    <!-- PREVIEW MODAL OVERLAY -->
    @if (isPreviewVisible()) {
      <div class="ox-image-mask" (click)="onMaskClick($event)">
        <!-- Toolbar -->
        <div class="ox-image-toolbar" (click)="$event.stopPropagation()">
          <button type="button" class="ox-image-action" (click)="rotateLeft()" title="Rotate Left">
            <ox-icon name="rotate-ccw" size="1.125rem"></ox-icon>
          </button>
          <button type="button" class="ox-image-action" (click)="rotateRight()" title="Rotate Right">
            <ox-icon name="rotate-cw" size="1.125rem"></ox-icon>
          </button>
          <button type="button" class="ox-image-action" (click)="zoomOut()" [disabled]="scale() <= 0.4" title="Zoom Out">
            <ox-icon name="zoom-out" size="1.125rem"></ox-icon>
          </button>
          <button type="button" class="ox-image-action" (click)="zoomIn()" [disabled]="scale() >= 3.0" title="Zoom In">
            <ox-icon name="zoom-in" size="1.125rem"></ox-icon>
          </button>
          <button type="button" class="ox-image-action" (click)="resetTransform()" title="Reset">
            <ox-icon name="refresh" size="1.125rem"></ox-icon>
          </button>
          <button type="button" class="ox-image-action ox-image-action-close" (click)="closePreview()" title="Close">
            <ox-icon name="x" size="1.25rem"></ox-icon>
          </button>
        </div>

        <!-- Fullscreen Preview Image Container -->
        <div class="ox-image-preview-container" (click)="$event.stopPropagation()">
          <img 
            [src]="src()" 
            [alt]="alt()" 
            class="ox-image-preview" 
            [style.transform]="previewTransform()" />
        </div>
      </div>
    }
  `,
  styles: [`
    .ox-image {
      position: relative;
      display: inline-block;
      overflow: hidden;
      border-radius: var(--radius-md, 8px);
    }

    .ox-image-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ox-image-preview-mask {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.45);
      color: #ffffff;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
      cursor: pointer;
    }

    .ox-image:hover .ox-image-preview-mask {
      opacity: 1;
    }

    .ox-image-preview-icon {
      transform: scale(0.8);
      transition: transform 0.2s ease-in-out;
    }

    .ox-image:hover .ox-image-preview-icon {
      transform: scale(1);
    }

    /* Modal Overlay */
    .ox-image-mask {
      position: fixed;
      inset: 0;
      z-index: 1200;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: oxFadeIn 0.2s ease-out;
    }

    .ox-image-toolbar {
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(8px);
      padding: 6px 12px;
      border-radius: 9999px;
      z-index: 1210;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .ox-image-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      background: transparent;
      border: none;
      color: #e2e8f0;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.15s ease-in-out;
    }

    .ox-image-action:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
    }

    .ox-image-action:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .ox-image-action-close:hover {
      background: rgba(239, 68, 68, 0.8) !important;
      color: #ffffff;
    }

    .ox-image-preview-container {
      max-width: 90vw;
      max-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .ox-image-preview {
      max-width: 90vw;
      max-height: 85vh;
      object-fit: contain;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      pointer-events: auto;
    }

    @keyframes oxFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ImageComponent {
  src = input.required<string>();
  alt = input<string>('');
  width = input<string>('');
  height = input<string>('');
  preview = input<boolean>(false);
  imageClass = input<string>('');
  imageStyle = input<string>('');

  onShow = output<void>();
  onHide = output<void>();

  isPreviewVisible = signal<boolean>(false);
  rotateDegree = signal<number>(0);
  scale = signal<number>(1);

  previewTransform = computed(() => {
    return `rotate(${this.rotateDegree()}deg) scale(${this.scale()})`;
  });

  openPreview(): void {
    this.rotateDegree.set(0);
    this.scale.set(1);
    this.isPreviewVisible.set(true);
    this.onShow.emit();
  }

  closePreview(): void {
    this.isPreviewVisible.set(false);
    this.onHide.emit();
  }

  onMaskClick(event: MouseEvent): void {
    this.closePreview();
  }

  rotateRight(): void {
    this.rotateDegree.update(deg => deg + 90);
  }

  rotateLeft(): void {
    this.rotateDegree.update(deg => deg - 90);
  }

  zoomIn(): void {
    this.scale.update(s => Math.min(Number((s + 0.2).toFixed(1)), 3.0));
  }

  zoomOut(): void {
    this.scale.update(s => Math.max(Number((s - 0.2).toFixed(1)), 0.4));
  }

  resetTransform(): void {
    this.rotateDegree.set(0);
    this.scale.set(1);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isPreviewVisible()) {
      this.closePreview();
    }
  }
}
