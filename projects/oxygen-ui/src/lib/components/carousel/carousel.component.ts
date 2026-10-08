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
  ElementRef,
  viewChild,
  OnInit,
  OnDestroy,
  HostListener,
  effect
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { CarouselResponsiveOption, CarouselPageEvent, CarouselEffect } from './carousel.types';

export interface CarouselRenderItem {
  data: any;
  index: number;
  isClone?: boolean;
}

@Component({
  selector: 'ox-carousel',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  /** Lista de elementos a mostrar en el carrusel */
  value = input<any[]>([]);

  /** Efecto visual: 'slide' | 'coverflow' | 'perspective' | 'cards' | 'fade' */
  effect = input<CarouselEffect>('slide');

  /** Número de elementos visibles simultáneamente (modo slide) */
  numVisible = input<number>(1);

  /** Número de elementos a desplazar por cada navegación */
  numScroll = input<number>(1);

  /** Opciones responsivas según el ancho de pantalla */
  responsiveOptions = input<CarouselResponsiveOption[]>([]);

  /** Orientación: 'horizontal' o 'vertical' */
  orientation = input<'horizontal' | 'vertical'>('horizontal');

  /** Altura del viewport (ej: '300px') */
  verticalViewPortHeight = input<string>('300px');

  /** Ancho personalizado para cada item en efectos 3D (ej: '280px', '320px') */
  itemWidth = input<string>('300px');

  /** Navegación circular infinita continua */
  circular = input<boolean>(false);

  /** Intervalo de reproducción automática en ms (0 para desactivar) */
  autoplayInterval = input<number>(0);

  /** Mostrar botones de navegación anterior / siguiente */
  showNavigators = input<boolean>(true);

  /** Mostrar indicadores de página */
  showIndicators = input<boolean>(true);

  /** Posición de los indicadores ('bottom' | 'top') */
  indicatorsContentPosition = input<'bottom' | 'top'>('bottom');

  /** Página activa actual (soporta two-way binding) */
  page = model<number>(0);

  /** Evento emitido al cambiar de página */
  onPage = output<CarouselPageEvent>();

  /** Plantillas personalizadas */
  itemTemplate = contentChild<TemplateRef<any>>('itemTemplate');
  headerTemplate = contentChild<TemplateRef<any>>('headerTemplate');
  footerTemplate = contentChild<TemplateRef<any>>('footerTemplate');

  private viewportRef = viewChild<ElementRef<HTMLDivElement>>('viewport');

  // Estado interno dinámico
  private activeNumVisible = signal<number>(1);
  private activeNumScroll = signal<number>(1);
  private autoplayTimer: any = null;
  private isHovered = signal<boolean>(false);

  // Soporte Loop Circular Infinito para Slide
  private slideIndex = signal<number>(0);
  private enableTransition = signal<boolean>(true);

  // Soporte Touch & Drag
  private startPos = 0;

  /** Verifica si es un efecto 3D o personalizado */
  is3DEffect = computed<boolean>(() => {
    const ef = this.effect();
    return ef === 'coverflow' || ef === 'perspective' || ef === 'cards';
  });

  isCustomEffect = computed<boolean>(() => {
    return this.effect() !== 'slide';
  });

  /** Indica si se utiliza el modo de loop infinito con clones */
  isInfiniteSlide = computed<boolean>(() => {
    return this.circular() && !this.isCustomEffect() && (this.value() || []).length > this.activeNumVisible();
  });

  /** Elementos a renderizar en el DOM (incluye clones en los extremos para scroll circular continuo) */
  renderedItems = computed<CarouselRenderItem[]>(() => {
    const val = this.value() || [];
    if (val.length === 0) return [];

    if (!this.isInfiniteSlide()) {
      return val.map((data, index) => ({ data, index, isClone: false }));
    }

    const n = this.activeNumVisible();
    const startClones: CarouselRenderItem[] = val.slice(-n).map((data, i) => ({
      data,
      index: val.length - n + i,
      isClone: true
    }));

    const realItems: CarouselRenderItem[] = val.map((data, index) => ({
      data,
      index,
      isClone: false
    }));

    const endClones: CarouselRenderItem[] = val.slice(0, n).map((data, i) => ({
      data,
      index: i,
      isClone: true
    }));

    return [...startClones, ...realItems, ...endClones];
  });

  /** Cantidad total de páginas / indicadores */
  totalShiftNumber = computed<number>(() => {
    const items = this.value() || [];
    if (items.length === 0) return 0;
    if (this.isCustomEffect() || this.circular()) {
      return items.length;
    }
    const numVis = this.activeNumVisible();
    return Math.max(1, items.length - numVis + 1);
  });

  /** Array de índices para los indicadores */
  indicatorPages = computed<number[]>(() => {
    const total = this.totalShiftNumber();
    return Array.from({ length: total }, (_, i) => i);
  });

  /** Porcentaje de ancho / alto por elemento en modo estándar */
  itemFlexBasis = computed<string>(() => {
    if (this.isCustomEffect()) {
      return this.itemWidth();
    }
    const vis = this.activeNumVisible();
    return `${100 / (vis || 1)}%`;
  });

  /** Estilo de transformación CSS del contenedor de items */
  itemsContainerStyle = computed<string>(() => {
    if (this.isCustomEffect()) {
      return '';
    }

    const vis = this.activeNumVisible();
    const isVert = this.orientation() === 'vertical';

    if (this.isInfiniteSlide()) {
      const shiftPercent = this.slideIndex() * (100 / vis);
      const trans = this.enableTransition()
        ? 'transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);'
        : 'transition: none;';
      return (isVert ? `transform: translateY(-${shiftPercent}%);` : `transform: translateX(-${shiftPercent}%);`) + trans;
    }

    const p = Math.min(this.page(), Math.max(0, (this.value() || []).length - vis));
    const shiftPercent = p * (100 / vis);
    return isVert ? `transform: translateY(-${shiftPercent}%);` : `transform: translateX(-${shiftPercent}%);`;
  });

  /** Deshabilitar botón prev */
  isBackwardDisabled = computed<boolean>(() => {
    if (this.circular()) return false;
    return this.page() <= 0;
  });

  /** Deshabilitar botón next */
  isForwardDisabled = computed<boolean>(() => {
    if (this.circular()) return false;
    return this.page() >= this.totalShiftNumber() - 1;
  });

  constructor() {
    effect(() => {
      this.updateResponsiveConfig();
    });

    // Sincroniza slideIndex con el valor inicial o cambios en numVisible/circular
    effect(() => {
      const isInf = this.isInfiniteSlide();
      const n = this.activeNumVisible();
      const p = this.page();
      if (isInf) {
        this.slideIndex.set(n + p);
      }
    });

    // Gestiona autoplay
    effect(() => {
      const interval = this.autoplayInterval();
      const hovered = this.isHovered();
      if (this.isBrowser) {
        this.clearAutoplay();
        if (interval > 0 && !hovered) {
          this.startAutoplay();
        }
      }
    });
  }

  ngOnInit(): void {
    this.updateResponsiveConfig();
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isBrowser) {
      this.updateResponsiveConfig();
    }
  }

  private updateResponsiveConfig(): void {
    if (!this.isBrowser) {
      this.activeNumVisible.set(this.numVisible());
      this.activeNumScroll.set(this.numScroll());
      return;
    }

    const options = this.responsiveOptions();
    if (!options || options.length === 0) {
      this.activeNumVisible.set(this.numVisible());
      this.activeNumScroll.set(this.numScroll());
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
      this.activeNumScroll.set(matched.numScroll);
    } else {
      this.activeNumVisible.set(this.numVisible());
      this.activeNumScroll.set(this.numScroll());
    }

    if (!this.circular() && this.page() >= this.totalShiftNumber()) {
      this.setPage(Math.max(0, this.totalShiftNumber() - 1));
    }
  }

  /** Distancia relativa entre el item y la página activa para efectos 3D */
  getItemDiff(index: number): number {
    const current = this.page();
    const total = (this.value() || []).length;
    if (total <= 1) return 0;
    let diff = index - current;
    if (this.circular()) {
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
    }
    return diff;
  }

  /** Estilos dinámicos por item según el efecto visual */
  getItemStyle(index: number): string {
    const ef = this.effect();
    const w = this.itemWidth();

    if (ef === 'slide') {
      return '';
    }

    if (ef === 'fade') {
      const isActive = index === this.page();
      return `position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; opacity: ${isActive ? 1 : 0}; z-index: ${isActive ? 2 : 1}; pointer-events: ${isActive ? 'auto' : 'none'}; transition: opacity 0.5s ease-in-out; display: flex;`;
    }

    const diff = this.getItemDiff(index);
    const absDiff = Math.abs(diff);

    if (ef === 'coverflow') {
      if (absDiff > 3) return 'display: none;';
      const rotateY = diff < 0 ? 38 : diff > 0 ? -38 : 0;
      const scale = diff === 0 ? 1.12 : Math.max(0.72, 1 - absDiff * 0.15);
      const translateZ = diff === 0 ? 60 : -absDiff * 60;
      const translateX = diff * 110;
      const zIndex = 25 - absDiff;
      const opacity = diff === 0 ? 1 : Math.max(0.4, 0.9 - absDiff * 0.25);
      return `position: absolute; left: 50%; top: 50%; width: ${w}; transform: translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale}); z-index: ${zIndex}; opacity: ${opacity}; transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1); cursor: pointer;`;
    }

    if (ef === 'perspective') {
      if (absDiff > 3) return 'display: none;';
      const rotateY = diff < 0 ? 46 : diff > 0 ? -46 : 0;
      const scale = diff === 0 ? 1.2 : Math.max(0.75, 1 - absDiff * 0.18);
      const translateZ = diff === 0 ? 80 : -absDiff * 80;
      const translateX = diff * 135;
      const zIndex = 30 - absDiff;
      const opacity = diff === 0 ? 1 : Math.max(0.45, 0.85 - absDiff * 0.2);
      return `position: absolute; left: 50%; top: 50%; width: ${w}; transform: translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale}); z-index: ${zIndex}; opacity: ${opacity}; transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1); cursor: pointer;`;
    }

    if (ef === 'cards') {
      if (diff < 0 || diff > 4) return 'display: none;';
      const translateY = diff * 14;
      const scale = 1 - diff * 0.06;
      const zIndex = 25 - diff;
      const opacity = 1 - diff * 0.2;
      return `position: absolute; left: 50%; top: 50%; width: ${w}; transform: translate(-50%, -50%) translateY(${translateY}px) scale(${scale}); z-index: ${zIndex}; opacity: ${opacity}; transition: all 0.4s ease; cursor: pointer;`;
    }

    return '';
  }

  onItemClick(index: number): void {
    if (this.isCustomEffect()) {
      this.setPage(index);
    }
  }

  stepBackward(): void {
    if (this.isBackwardDisabled()) return;

    if (this.isInfiniteSlide()) {
      this.enableTransition.set(true);
      const newIdx = this.slideIndex() - 1;
      this.slideIndex.set(newIdx);

      const N = (this.value() || []).length;
      const n = this.activeNumVisible();
      const realPage = (newIdx - n + N * 10) % N;
      this.page.set(realPage);
      this.onPage.emit({ page: realPage });
      return;
    }

    let targetPage = this.page() - 1;
    if (targetPage < 0) {
      targetPage = this.circular() ? this.totalShiftNumber() - 1 : 0;
    }
    this.setPage(targetPage);
  }

  stepForward(): void {
    if (this.isForwardDisabled()) return;

    if (this.isInfiniteSlide()) {
      this.enableTransition.set(true);
      const newIdx = this.slideIndex() + 1;
      this.slideIndex.set(newIdx);

      const N = (this.value() || []).length;
      const n = this.activeNumVisible();
      const realPage = (newIdx - n + N * 10) % N;
      this.page.set(realPage);
      this.onPage.emit({ page: realPage });
      return;
    }

    let targetPage = this.page() + 1;
    if (targetPage >= this.totalShiftNumber()) {
      targetPage = this.circular() ? 0 : this.totalShiftNumber() - 1;
    }
    this.setPage(targetPage);
  }

  /** Manejador de fin de transición para reposicionamiento instantáneo e imperceptible */
  onTransitionEnd(): void {
    if (!this.isInfiniteSlide()) return;

    const N = (this.value() || []).length;
    const n = this.activeNumVisible();
    const cur = this.slideIndex();

    if (cur >= n + N) {
      this.enableTransition.set(false);
      this.slideIndex.set(cur - N);
      setTimeout(() => this.enableTransition.set(true), 25);
    } else if (cur < n) {
      this.enableTransition.set(false);
      this.slideIndex.set(cur + N);
      setTimeout(() => this.enableTransition.set(true), 25);
    }
  }

  setPage(index: number): void {
    if (index === this.page()) return;
    this.page.set(index);
    if (this.isInfiniteSlide()) {
      this.enableTransition.set(true);
      this.slideIndex.set(this.activeNumVisible() + index);
    }
    this.onPage.emit({ page: index });
  }

  private startAutoplay(): void {
    const interval = this.autoplayInterval();
    if (interval > 0 && this.isBrowser) {
      this.autoplayTimer = setInterval(() => {
        this.stepForward();
      }, interval);
    }
  }

  private clearAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
    this.clearAutoplay();
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
    if (this.autoplayInterval() > 0) {
      this.startAutoplay();
    }
  }

  onTouchStart(e: TouchEvent): void {
    this.startPos = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    const diff = this.startPos - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.stepForward();
      } else {
        this.stepBackward();
      }
    }
  }

  @HostListener('keydown.arrowLeft', ['$event'])
  onArrowLeft(event: Event): void {
    if (this.orientation() === 'horizontal') {
      event.preventDefault();
      this.stepBackward();
    }
  }

  @HostListener('keydown.arrowRight', ['$event'])
  onArrowRight(event: Event): void {
    if (this.orientation() === 'horizontal') {
      event.preventDefault();
      this.stepForward();
    }
  }
}
