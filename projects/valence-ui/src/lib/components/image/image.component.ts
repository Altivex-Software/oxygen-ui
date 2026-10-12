import { 
  Component, 
  input, 
  output, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  ViewEncapsulation,
  HostListener,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ValIconName } from '../icon/icon.types';

@Component({
  selector: 'val-image',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div 
      class="val-image" 
      [class.val-image-preview-container-wrap]="preview()"
      [style.width]="width()" 
      [style.height]="height()"
      [class]="styleClass()">
      
      <!-- Loading Skeleton Shimmer -->
      @if (isLoading() && !hasError()) {
        <div class="val-image-skeleton"></div>
      }

      <!-- Error State -->
      @if (hasError()) {
        <div class="val-image-error-fallback">
          <val-icon name="image" size="1.5rem" class="val-image-error-icon"></val-icon>
          <span class="val-image-error-text">No se pudo cargar la imagen</span>
        </div>
      } @else {
        <img 
          [src]="src()" 
          [alt]="alt()" 
          [loading]="loading()"
          [class]="imageClass()" 
          [style]="imageStyle()"
          class="val-image-img" 
          [class.val-image-img-loaded]="!isLoading()"
          (load)="onLoadSuccess()"
          (error)="onLoadError()" />
      }

      <!-- Hover Preview Overlay / Indicator -->
      @if (preview() && !hasError() && !isLoading()) {
        <div 
          class="val-image-preview-mask" 
          role="button"
          tabindex="0"
          aria-haspopup="dialog"
          aria-label="Abrir vista previa a pantalla completa"
          (click)="openPreview()"
          (keydown.enter)="openPreview()"
          (keydown.space)="openPreview()">
          <span class="val-image-preview-indicator">
            <val-icon [name]="$any(indicatorIcon())" size="1.25rem"></val-icon>
          </span>
        </div>
      }
    </div>

    <!-- FULLSCREEN LIGHTBOX PREVIEW OVERLAY -->
    @if (isPreviewVisible()) {
      <div 
        class="val-image-lightbox-mask" 
        role="dialog"
        aria-modal="true"
        (click)="onMaskClick($event)">
        
        <!-- Top Action Toolbar -->
        <div class="val-image-lightbox-toolbar" (click)="$event.stopPropagation()">
          
          <!-- Zoom Percentage Pill -->
          <div class="val-image-zoom-pill">
            {{ zoomPercentage() }}%
          </div>

          <!-- Rotate Left -->
          <button 
            type="button" 
            class="val-image-action-btn" 
            (click)="rotateLeft()" 
            title="Rotar a la izquierda (-90°)">
            <val-icon name="rotate-ccw" size="1.125rem"></val-icon>
          </button>

          <!-- Rotate Right -->
          <button 
            type="button" 
            class="val-image-action-btn" 
            (click)="rotateRight()" 
            title="Rotar a la derecha (+90°)">
            <val-icon name="rotate-cw" size="1.125rem"></val-icon>
          </button>

          <!-- Flip Horizontal -->
          <button 
            type="button" 
            class="val-image-action-btn" 
            [class.active]="flipH()"
            (click)="toggleFlipH()" 
            title="Voltear horizontalmente">
            <val-icon name="columns" size="1.125rem"></val-icon>
          </button>

          <!-- Flip Vertical -->
          <button 
            type="button" 
            class="val-image-action-btn" 
            [class.active]="flipV()"
            (click)="toggleFlipV()" 
            title="Voltear verticalmente">
            <val-icon name="sliders" size="1.125rem"></val-icon>
          </button>

          <!-- Zoom Out -->
          <button 
            type="button" 
            class="val-image-action-btn" 
            (click)="zoomOut()" 
            [disabled]="scale() <= 0.4" 
            title="Alejar Zoom (-)">
            <val-icon name="zoom-out" size="1.125rem"></val-icon>
          </button>

          <!-- Zoom In -->
          <button 
            type="button" 
            class="val-image-action-btn" 
            (click)="zoomIn()" 
            [disabled]="scale() >= 4.0" 
            title="Acercar Zoom (+)">
            <val-icon name="zoom-in" size="1.125rem"></val-icon>
          </button>

          <!-- Download Image -->
          <a 
            [href]="src()" 
            [download]="alt() || 'imagen'" 
            target="_blank" 
            class="val-image-action-btn" 
            title="Descargar imagen">
            <val-icon name="printer" size="1.125rem"></val-icon>
          </a>

          <!-- Reset -->
          <button 
            type="button" 
            class="val-image-action-btn" 
            (click)="resetTransform()" 
            title="Restablecer vista original (0)">
            <val-icon name="refresh" size="1.125rem"></val-icon>
          </button>

          <!-- Close Lightbox -->
          <button 
            type="button" 
            class="val-image-action-btn val-image-action-close" 
            (click)="closePreview()" 
            title="Cerrar (Esc)">
            <val-icon name="x" size="1.25rem"></val-icon>
          </button>
        </div>

        <!-- Fullscreen Preview Image Container -->
        <div class="val-image-preview-viewport" (click)="$event.stopPropagation()">
          <img 
            [src]="src()" 
            [alt]="alt()" 
            class="val-image-preview-img" 
            [style.transform]="previewTransform()" />
        </div>
      </div>
    }
  `,
  styles: [`
    .val-image {
      position: relative;
      display: inline-block;
      overflow: hidden;
      border-radius: var(--val-border-radius, 8px);
      background-color: var(--val-surface-ground, #f1f5f9);
      transition: all 0.2s ease-in-out;
    }

    .val-image-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease-in-out, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .val-image-img-loaded {
      opacity: 1;
    }

    /* Skeleton Shimmer */
    .val-image-skeleton {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        rgba(226, 232, 240, 0.4) 0%,
        rgba(241, 245, 249, 0.8) 50%,
        rgba(226, 232, 240, 0.4) 100%
      );
      background-size: 200% 100%;
      animation: valSkeletonWave 1.5s infinite linear;
    }

    @keyframes valSkeletonWave {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Error Fallback */
    .val-image-error-fallback {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      gap: 0.5rem;
      color: var(--val-text-muted, #94a3b8);
      min-height: 120px;
    }

    .val-image-error-text {
      font-size: 0.75rem;
      font-weight: 500;
    }

    /* Hover Preview Overlay */
    .val-image-preview-mask {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(2px);
      color: #ffffff;
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .val-image:hover .val-image-preview-mask,
    .val-image-preview-mask:focus-visible {
      opacity: 1;
    }

    .val-image:hover .val-image-img {
      transform: scale(1.04);
    }

    .val-image-preview-indicator {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      transform: scale(0.7);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .val-image:hover .val-image-preview-indicator {
      transform: scale(1);
    }

    /* Lightbox Modal Overlay */
    .val-image-lightbox-mask {
      position: fixed;
      inset: 0;
      z-index: 12000;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: valLightboxIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .val-image-lightbox-toolbar {
      position: absolute;
      top: 24px;
      right: 24px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(30, 41, 59, 0.85);
      backdrop-filter: blur(12px);
      padding: 6px 12px;
      border-radius: 9999px;
      z-index: 12010;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .val-image-zoom-pill {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      padding: 0 8px;
      border-right: 1px solid rgba(255, 255, 255, 0.15);
      margin-right: 2px;
      user-select: none;
    }

    .val-image-action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: transparent;
      border: none;
      color: #cbd5e1;
      cursor: pointer;
      border-radius: 50%;
      text-decoration: none;
      transition: all 0.15s ease-in-out;

      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.15);
        color: #ffffff;
        transform: scale(1.08);
      }

      &.active {
        background: var(--val-primary, #3b82f6);
        color: #ffffff;
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }

    .val-image-action-close:hover {
      background: rgba(239, 68, 68, 0.9) !important;
      color: #ffffff !important;
    }

    .val-image-preview-viewport {
      max-width: 90vw;
      max-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      user-select: none;
    }

    .val-image-preview-img {
      max-width: 90vw;
      max-height: 85vh;
      object-fit: contain;
      border-radius: 6px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes valLightboxIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
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
  preview = input<boolean, unknown>(false, { transform: booleanAttribute });
  loading = input<'lazy' | 'eager'>('lazy');
  indicatorIcon = input<ValIconName | string>('zoom-in');
  imageClass = input<string>('');
  imageStyle = input<string>('');
  styleClass = input<string>('');

  onShow = output<void>();
  onHide = output<void>();
  onImageError = output<Event>();

  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);
  isPreviewVisible = signal<boolean>(false);
  rotateDegree = signal<number>(0);
  scale = signal<number>(1);
  flipH = signal<boolean>(false);
  flipV = signal<boolean>(false);

  previewTransform = computed(() => {
    const sx = this.flipH() ? -1 : 1;
    const sy = this.flipV() ? -1 : 1;
    return `rotate(${this.rotateDegree()}deg) scale(${this.scale() * sx}, ${this.scale() * sy})`;
  });

  zoomPercentage = computed(() => {
    return Math.round(this.scale() * 100);
  });

  onLoadSuccess(): void {
    this.isLoading.set(false);
    this.hasError.set(false);
  }

  onLoadError(event?: Event): void {
    this.isLoading.set(false);
    this.hasError.set(true);
    if (event) {
      this.onImageError.emit(event);
    }
  }

  openPreview(): void {
    this.rotateDegree.set(0);
    this.scale.set(1);
    this.flipH.set(false);
    this.flipV.set(false);
    this.isPreviewVisible.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    this.onShow.emit();
  }

  closePreview(): void {
    this.isPreviewVisible.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
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

  toggleFlipH(): void {
    this.flipH.update(v => !v);
  }

  toggleFlipV(): void {
    this.flipV.update(v => !v);
  }

  zoomIn(): void {
    this.scale.update(s => Math.min(Number((s + 0.25).toFixed(2)), 4.0));
  }

  zoomOut(): void {
    this.scale.update(s => Math.max(Number((s - 0.25).toFixed(2)), 0.4));
  }

  resetTransform(): void {
    this.rotateDegree.set(0);
    this.scale.set(1);
    this.flipH.set(false);
    this.flipV.set(false);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: any): void {
    if (!this.isPreviewVisible()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePreview();
    } else if (event.key === '+' || event.key === '=') {
      this.zoomIn();
    } else if (event.key === '-') {
      this.zoomOut();
    } else if (event.key === 'r' || event.key === 'R') {
      this.rotateRight();
    } else if (event.key === 'l' || event.key === 'L') {
      this.rotateLeft();
    } else if (event.key === '0') {
      this.resetTransform();
    }
  }
}
