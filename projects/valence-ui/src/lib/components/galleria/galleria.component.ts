import {
  Component,
  input,
  output,
  model,
  signal,
  computed,
  inject,
  contentChild,
  TemplateRef,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  HostListener,
  effect
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { GalleriaResponsiveOption, GalleriaItem } from './galleria.types';

@Component({
  selector: 'ox-galleria',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleriaComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  /** Lista de elementos/imágenes */
  value = input<any[]>([]);

  /** Índice del elemento activo (soporta two-way binding) */
  activeIndex = model<number>(0);

  /** Modo pantalla completa (modal) */
  fullScreen = model<boolean>(false);

  /** Visibilidad en modo pantalla completa */
  visible = model<boolean>(true);

  /** Número de miniaturas visibles en la tira de thumbnails */
  numVisible = input<number>(5);

  /** Opciones responsivas según el ancho de pantalla */
  responsiveOptions = input<GalleriaResponsiveOption[]>([]);

  /** Mostrar botones prev/next sobre el item principal */
  showItemNavigators = input<boolean>(false);

  /** Mostrar botones prev/next del item sólo al hacer hover */
  showItemNavigatorsOnHover = input<boolean>(false);

  /** Mostrar tira de miniaturas (thumbnails) */
  showThumbnails = input<boolean>(true);

  /** Mostrar flechas de navegación en las miniaturas */
  showThumbnailNavigators = input<boolean>(true);

  /** Posición de las miniaturas: 'bottom' | 'top' | 'left' | 'right' */
  thumbnailsPosition = input<'bottom' | 'top' | 'left' | 'right'>('bottom');

  /** Mostrar indicadores tipo puntos */
  showIndicators = input<boolean>(false);

  /** Colocar los indicadores encima de la imagen principal */
  showIndicatorsOnItem = input<boolean>(false);

  /** Mostrar leyenda/pie de foto (caption) si está disponible */
  showCaption = input<boolean>(false);

  /** Navegación circular continua */
  circular = input<boolean>(false);

  /** Reproducción automática */
  autoPlay = input<boolean>(false);

  /** Intervalo de reproducción automática en ms */
  transitionInterval = input<number>(4000);

  /** Estilos y clases personalizadas */
  containerStyle = input<string>('');
  containerClass = input<string>('');

  /** Eventos */
  activeIndexChange = output<number>();
  visibleChange = output<boolean>();

  /** Plantillas personalizadas */
  itemTemplate = contentChild<TemplateRef<any>>('itemTemplate');
  thumbnailTemplate = contentChild<TemplateRef<any>>('thumbnailTemplate');
  captionTemplate = contentChild<TemplateRef<any>>('captionTemplate');
  headerTemplate = contentChild<TemplateRef<any>>('headerTemplate');
  footerTemplate = contentChild<TemplateRef<any>>('footerTemplate');

  // Estado interno
  private activeNumVisible = signal<number>(5);
  private autoPlayTimer: any = null;
  private isHovered = signal<boolean>(false);

  /** Elemento activo actual */
  activeItem = computed<any>(() => {
    const items = this.value() || [];
    const idx = this.activeIndex();
    return items[idx] || null;
  });

  /** Deshabilitar navegación previa en item */
  isPrevItemDisabled = computed<boolean>(() => {
    if (this.circular()) return false;
    return this.activeIndex() <= 0;
  });

  /** Deshabilitar navegación siguiente en item */
  isNextItemDisabled = computed<boolean>(() => {
    const items = this.value() || [];
    if (this.circular()) return false;
    return this.activeIndex() >= items.length - 1;
  });

  /** Array de miniaturas visibles con desplazamiento calculado */
  thumbnailTranslate = computed<string>(() => {
    const total = (this.value() || []).length;
    const numVis = this.activeNumVisible();
    const idx = this.activeIndex();
    const isVert = this.thumbnailsPosition() === 'left' || this.thumbnailsPosition() === 'right';

    if (total <= numVis) {
      return isVert ? 'translateY(0px)' : 'translateX(0px)';
    }

    // Centrar la miniatura activa en la ventana visible
    let startIdx = idx - Math.floor(numVis / 2);
    if (startIdx < 0) startIdx = 0;
    if (startIdx > total - numVis) startIdx = total - numVis;

    const itemSize = isVert ? 64 + 8 : 72 + 8; // tamaño + gap
    const shift = -(startIdx * itemSize);

    return isVert ? `translateY(${shift}px)` : `translateX(${shift}px)`;
  });

  constructor() {
    effect(() => {
      this.updateResponsiveConfig();
    });

    effect(() => {
      const play = this.autoPlay();
      const interval = this.transitionInterval();
      const hovered = this.isHovered();

      if (this.isBrowser) {
        this.clearAutoPlay();
        if (play && !hovered) {
          this.startAutoPlay(interval);
        }
      }
    });
  }

  ngOnInit(): void {
    this.updateResponsiveConfig();
  }

  ngOnDestroy(): void {
    this.clearAutoPlay();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isBrowser) {
      this.updateResponsiveConfig();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.fullScreen() && this.visible()) {
      this.closeFullScreen();
    }
  }

  private updateResponsiveConfig(): void {
    if (!this.isBrowser) {
      this.activeNumVisible.set(this.numVisible());
      return;
    }

    const options = this.responsiveOptions();
    if (!options || options.length === 0) {
      this.activeNumVisible.set(this.numVisible());
      return;
    }

    const width = window.innerWidth;
    const sorted = [...options].sort((a, b) => {
      return parseInt(a.breakpoint, 10) - parseInt(b.breakpoint, 10);
    });

    let matched = null;
    for (const opt of sorted) {
      if (width <= parseInt(opt.breakpoint, 10)) {
        matched = opt;
        break;
      }
    }

    if (matched) {
      this.activeNumVisible.set(matched.numVisible);
    } else {
      this.activeNumVisible.set(this.numVisible());
    }
  }

  prevItem(): void {
    const items = this.value() || [];
    if (items.length === 0 || this.isPrevItemDisabled()) return;

    let target = this.activeIndex() - 1;
    if (target < 0) {
      target = this.circular() ? items.length - 1 : 0;
    }
    this.setActiveIndex(target);
  }

  nextItem(): void {
    const items = this.value() || [];
    if (items.length === 0 || this.isNextItemDisabled()) return;

    let target = this.activeIndex() + 1;
    if (target >= items.length) {
      target = this.circular() ? 0 : items.length - 1;
    }
    this.setActiveIndex(target);
  }

  setActiveIndex(index: number): void {
    if (index === this.activeIndex()) return;
    this.activeIndex.set(index);
    this.activeIndexChange.emit(index);
  }

  closeFullScreen(): void {
    this.visible.set(false);
    this.visibleChange.emit(false);
  }

  openFullScreen(): void {
    this.visible.set(true);
    this.visibleChange.emit(true);
  }

  private startAutoPlay(interval: number): void {
    if (this.isBrowser && interval > 0) {
      this.autoPlayTimer = setInterval(() => {
        this.nextItem();
      }, interval);
    }
  }

  private clearAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
    this.clearAutoPlay();
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
    if (this.autoPlay()) {
      this.startAutoPlay(this.transitionInterval());
    }
  }
}
