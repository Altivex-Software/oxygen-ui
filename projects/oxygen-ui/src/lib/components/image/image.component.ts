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

@Component({
  selector: 'ox-image',
  standalone: true,
  imports: [CommonModule],
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38L2.5 8"/>
            </svg>
          </button>
          <button type="button" class="ox-image-action" (click)="rotateRight()" title="Rotate Right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38L21.5 8"/>
            </svg>
          </button>
          <button type="button" class="ox-image-action" (click)="zoomOut()" [disabled]="scale() <= 0.4" title="Zoom Out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button type="button" class="ox-image-action" (click)="zoomIn()" [disabled]="scale() >= 3.0" title="Zoom In">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button type="button" class="ox-image-action" (click)="resetTransform()" title="Reset">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </button>
          <button type="button" class="ox-image-action ox-image-action-close" (click)="closePreview()" title="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
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
