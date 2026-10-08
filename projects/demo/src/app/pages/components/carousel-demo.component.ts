import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CarouselComponent, 
  CarouselResponsiveOption, 
  CarouselEffect,
  ButtonComponent, 
  TagComponent
} from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

interface NumberCard {
  id: number;
  label: string;
  bg: string;
  color: string;
  borderColor: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
}

@Component({
  selector: 'app-carousel-demo',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    ButtonComponent,
    TagComponent,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Carousel (Carrusel 3D, Coverflow, Perspective & Slide)</h1>
      <p class="ox-description">
        Múltiples variantes visuales de carrusel: <strong>Perspective 3D</strong> (con rotación angular y profundidad), <strong>Coverflow</strong>, <strong>Cards Stack</strong>, <strong>Fade</strong> y el clásico <strong>Slide responsivo</strong>.
      </p>

      <!-- 1. PERSPECTIVE 3D (IGUAL A LA IMAGEN) -->
      <app-doc-code
        title="1. Efecto Perspective 3D (Coverflow con Ángulo y Profundidad)"
        description="Efecto 3D con rotación en el eje Y, escala prominente en el elemento central y selección directa al hacer clic."
        [html]="perspectiveHtml"
        [ts]="carouselTs">
        <div style="background: #f8fafc; border-radius: 16px; padding: 2rem 1rem; border: 1px dashed #cbd5e1; overflow: hidden;">
          <ox-carousel 
            [value]="coloredCards" 
            effect="perspective" 
            [circular]="true"
            itemWidth="260px"
            verticalViewPortHeight="260px"
            [autoplayInterval]="3500">
            <ng-template #itemTemplate let-card let-active="active">
              <div 
                class="perspective-number-card" 
                [style.background-color]="card.bg"
                [style.color]="card.color"
                [style.border-color]="card.borderColor"
                [class.perspective-active]="active">
                <span class="perspective-number">{{ card.label }}</span>
              </div>
            </ng-template>
          </ox-carousel>
        </div>
      </app-doc-code>

      <!-- 2. COVERFLOW 3D DE PRODUCTOS / IMÁGENES -->
      <app-doc-code
        title="2. Efecto Coverflow 3D"
        description="Efecto de flujo 3D ideal para catálogos, álbumes de música o galerías de productos."
        [html]="coverflowHtml"
        [ts]="carouselTs">
        <div style="background: #0f172a; border-radius: 16px; padding: 2rem 1rem; overflow: hidden;">
          <ox-carousel 
            [value]="products" 
            effect="coverflow" 
            [circular]="true"
            itemWidth="280px"
            verticalViewPortHeight="340px">
            <ng-template #itemTemplate let-product let-active="active">
              <div class="coverflow-card" [class.coverflow-card-active]="active">
                <img [src]="product.image" [alt]="product.name" class="coverflow-img" />
                <div class="coverflow-overlay">
                  <h4 class="coverflow-title">{{ product.name }}</h4>
                  <p class="coverflow-price">\${{ product.price }}</p>
                </div>
              </div>
            </ng-template>
          </ox-carousel>
        </div>
      </app-doc-code>

      <!-- 3. CARDS STACK -->
      <app-doc-code
        title="3. Efecto Cards Stack (Pila de Tarjetas)"
        description="Las tarjetas se apilan verticalmente simulando una baraja con elevación progresiva."
        [html]="cardsHtml"
        [ts]="carouselTs">
        <div style="background: #f1f5f9; border-radius: 16px; padding: 2rem 1rem; overflow: hidden; display: flex; justify-content: center;">
          <div style="width: 360px;">
            <ox-carousel 
              [value]="products" 
              effect="cards" 
              [circular]="true"
              itemWidth="320px"
              verticalViewPortHeight="320px">
              <ng-template #itemTemplate let-product>
                <div class="stack-card">
                  <img [src]="product.image" [alt]="product.name" class="stack-img" />
                  <div class="stack-body">
                    <h4 style="margin: 0 0 0.5rem; font-size: 1.125rem;">{{ product.name }}</h4>
                    <p style="margin: 0; color: #0066ff; font-weight: 700;">\${{ product.price }}</p>
                  </div>
                </div>
              </ng-template>
            </ox-carousel>
          </div>
        </div>
      </app-doc-code>

      <!-- 4. FADE TRANSITION -->
      <app-doc-code
        title="4. Transición Suave (Fade)"
        description="Transición mediante desvanecimiento de opacidad a ancho completo (ideal para banners y hero sections)."
        [html]="fadeHtml"
        [ts]="carouselTs">
        <div style="max-width: 680px; width: 100%; margin: 0 auto;">
          <ox-carousel 
            [value]="products" 
            effect="fade" 
            [circular]="true"
            verticalViewPortHeight="300px"
            [autoplayInterval]="4000">
            <ng-template #itemTemplate let-product>
              <div class="fade-card">
                <img [src]="product.image" [alt]="product.name" class="fade-img" />
                <div class="fade-caption">
                  <h3>{{ product.name }}</h3>
                  <p>Categoría: {{ product.category }} &bull; \${{ product.price }}</p>
                </div>
              </div>
            </ng-template>
          </ox-carousel>
        </div>
      </app-doc-code>

      <!-- 5. BÁSICO RESPONSIVO (SLIDE TRADICIONAL) -->
      <app-doc-code
        title="5. Slide Tradicional y Responsivo"
        description="Carrusel horizontal estándar con múltiples elementos visibles y navegación suave."
        [html]="basicHtml"
        [ts]="carouselTs">
        <ox-carousel 
          [value]="products" 
          [numVisible]="3" 
          [numScroll]="1" 
          [circular]="true"
          [responsiveOptions]="responsiveOptions">
          <ng-template #itemTemplate let-product>
            <div class="product-card">
              <div class="product-img-wrapper">
                <img [src]="product.image" [alt]="product.name" class="product-img" />
                <ox-tag 
                  [value]="product.inventoryStatus" 
                  [severity]="getSeverity(product.inventoryStatus)"
                  class="product-badge">
                </ox-tag>
              </div>
              <div class="product-details">
                <h4 class="product-title">{{ product.name }}</h4>
                <p class="product-price">\${{ product.price }}</p>
                <div class="product-actions">
                  <ox-button icon="shopping-bag" label="Comprar" size="sm"></ox-button>
                  <ox-button icon="heart" variant="outline-secondary" size="sm"></ox-button>
                </div>
              </div>
            </div>
          </ng-template>
        </ox-carousel>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: CarouselComponent"
        [properties]="carouselProps"
        [events]="carouselEvents">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    // PERSPECTIVE 3D STYLES (IGUAL A LA IMAGEN)
    .perspective-number-card {
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      user-select: none;

      .perspective-number {
        font-size: 5.5rem;
        font-weight: 800;
        font-family: 'Inter', -apple-system, sans-serif;
        line-height: 1;
        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      &.perspective-active {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
      }
    }

    // COVERFLOW STYLES
    .coverflow-card {
      background: #1e293b;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      height: 280px;
      position: relative;
      border: 1px solid rgba(255,255,255,0.1);

      .coverflow-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .coverflow-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(15, 23, 42, 0.95));
        padding: 1rem;
        color: white;

        .coverflow-title {
          margin: 0 0 0.25rem;
          font-size: 1rem;
        }

        .coverflow-price {
          margin: 0;
          color: #38bdf8;
          font-weight: 700;
        }
      }
    }

    // CARDS STACK STYLES
    .stack-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 24px -6px rgba(0,0,0,0.15);
      border: 1px solid #e2e8f0;

      .stack-img {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }

      .stack-body {
        padding: 1.25rem;
      }
    }

    // FADE CARD STYLES
    .fade-card {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);

      .fade-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .fade-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.85));
        color: white;
        padding: 1.5rem;

        h3 { margin: 0 0 0.25rem; font-size: 1.25rem; font-weight: 600; }
        p { margin: 0; color: #cbd5e1; font-size: 0.875rem; }
      }
    }

    // STANDARD PRODUCT CARD STYLES
    .product-card {
      background: var(--oxy-surface-card, #ffffff);
      border: 1px solid var(--oxy-surface-border, #e2e8f0);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.08);
      }
    }

    .product-img-wrapper {
      position: relative;
      background-color: #f8fafc;
      overflow: hidden;
    }

    .product-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }

    .product-badge {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
    }

    .product-details {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .product-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--oxy-text-color, #1e293b);
      margin: 0 0 0.5rem;
    }

    .product-price {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--oxy-primary, #0066ff);
      margin: 0 0 1rem;
    }

    .product-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }
  `]
})
export class CarouselDemoComponent {
  /** Tarjetas de colores y números idénticas al diseño solicitado */
  coloredCards: NumberCard[] = [
    { id: 1, label: '1', bg: '#ef4444', color: '#ffffff', borderColor: '#1e293b' },
    { id: 2, label: '2', bg: '#eab308', color: '#ffffff', borderColor: '#1e293b' },
    { id: 3, label: '3', bg: '#22c55e', color: '#ffffff', borderColor: '#1e293b' },
    { id: 4, label: '4', bg: '#06b6d4', color: '#ffffff', borderColor: '#1e293b' },
    { id: 5, label: '5', bg: '#f97316', color: '#ffffff', borderColor: '#1e293b' },
    { id: 6, label: '6', bg: '#3b82f6', color: '#ffffff', borderColor: '#1e293b' },
    { id: 7, label: '7', bg: '#a855f7', color: '#ffffff', borderColor: '#1e293b' },
    { id: 8, label: '8', bg: '#10b981', color: '#ffffff', borderColor: '#1e293b' },
    { id: 9, label: '9', bg: '#ec4899', color: '#ffffff', borderColor: '#1e293b' }
  ];

  products: Product[] = [
    {
      id: '1000',
      name: 'Reloj Inteligente Ultra',
      price: 199,
      category: 'Accesorios',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      inventoryStatus: 'INSTOCK'
    },
    {
      id: '1001',
      name: 'Auriculares Inalámbricos Pro',
      price: 149,
      category: 'Audio',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
      inventoryStatus: 'INSTOCK'
    },
    {
      id: '1002',
      name: 'Cámara Mirrorless 4K',
      price: 899,
      category: 'Fotografía',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
      inventoryStatus: 'LOWSTOCK'
    },
    {
      id: '1003',
      name: 'Zapatillas Deportivas Neon',
      price: 110,
      category: 'Calzado',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
      inventoryStatus: 'INSTOCK'
    },
    {
      id: '1004',
      name: 'Mochila Urbana Resistente',
      price: 65,
      category: 'Moda',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
      inventoryStatus: 'OUTOFSTOCK'
    }
  ];

  responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK': return 'success';
      case 'LOWSTOCK': return 'warning';
      case 'OUTOFSTOCK': return 'danger';
      default: return 'info';
    }
  }

  perspectiveHtml = `<ox-carousel 
  [value]="coloredCards" 
  effect="perspective" 
  [circular]="true"
  itemWidth="260px"
  verticalViewPortHeight="260px"
  [autoplayInterval]="3500">
  <ng-template #itemTemplate let-card let-active="active">
    <div 
      class="perspective-number-card" 
      [style.background-color]="card.bg"
      [style.color]="card.color"
      [style.border-color]="card.borderColor">
      <span>{{ card.label }}</span>
    </div>
  </ng-template>
</ox-carousel>`;

  coverflowHtml = `<ox-carousel 
  [value]="products" 
  effect="coverflow" 
  [circular]="true"
  itemWidth="280px"
  verticalViewPortHeight="340px">
  <ng-template #itemTemplate let-product let-active="active">
    <div class="coverflow-card" [class.coverflow-card-active]="active">
      <img [src]="product.image" [alt]="product.name" />
      <div class="coverflow-overlay">
        <h4>{{ product.name }}</h4>
        <p>\${{ product.price }}</p>
      </div>
    </div>
  </ng-template>
</ox-carousel>`;

  cardsHtml = `<ox-carousel 
  [value]="products" 
  effect="cards" 
  [circular]="true"
  itemWidth="320px"
  verticalViewPortHeight="320px">
  <ng-template #itemTemplate let-product>
    <div class="stack-card">
      <img [src]="product.image" [alt]="product.name" />
      <h4>{{ product.name }}</h4>
      <p>\${{ product.price }}</p>
    </div>
  </ng-template>
</ox-carousel>`;

  fadeHtml = `<ox-carousel 
  [value]="products" 
  effect="fade" 
  [circular]="true"
  verticalViewPortHeight="280px"
  [autoplayInterval]="4000">
  <ng-template #itemTemplate let-product>
    <div class="fade-card">
      <img [src]="product.image" [alt]="product.name" />
      <div class="fade-caption">
        <h3>{{ product.name }}</h3>
        <p>\${{ product.price }}</p>
      </div>
    </div>
  </ng-template>
</ox-carousel>`;

  basicHtml = `<ox-carousel 
  [value]="products" 
  [numVisible]="3" 
  [numScroll]="1" 
  [circular]="true"
  [responsiveOptions]="responsiveOptions">
  <ng-template #itemTemplate let-product>
    <div class="product-card">
      <img [src]="product.image" [alt]="product.name" />
      <h4>{{ product.name }}</h4>
      <p>\${{ product.price }}</p>
    </div>
  </ng-template>
</ox-carousel>`;

  carouselTs = `import { Component } from '@angular/core';
import { CarouselComponent, CarouselEffect } from 'oxygen-ui';

@Component({
  selector: 'app-my-carousel',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './my-carousel.component.html'
})
export class MyCarouselComponent {
  // effect: 'perspective' | 'coverflow' | 'cards' | 'fade' | 'slide'
}`;

  carouselProps: ApiProperty[] = [
    {
      name: 'value',
      type: 'any[]',
      default: '[]',
      description: 'Colección de elementos a mostrar en el carrusel.'
    },
    {
      name: 'effect',
      type: "'slide' | 'perspective' | 'coverflow' | 'cards' | 'fade'",
      default: "'slide'",
      description: 'Efecto de transición visual: slide, perspectiva 3D, coverflow, pila de tarjetas o fade.'
    },
    {
      name: 'itemWidth',
      type: 'string',
      default: "'300px'",
      description: 'Ancho de cada elemento para los modos 3D (perspective, coverflow, cards).'
    },
    {
      name: 'numVisible',
      type: 'number',
      default: '1',
      description: 'Cantidad de elementos mostrados simultáneamente (en modo slide).'
    },
    {
      name: 'numScroll',
      type: 'number',
      default: '1',
      description: 'Cantidad de elementos que se desplazan en cada paso (en modo slide).'
    },
    {
      name: 'responsiveOptions',
      type: 'CarouselResponsiveOption[]',
      default: '[]',
      description: 'Opciones de adaptación para diferentes anchos de pantalla (breakpoints).'
    },
    {
      name: 'circular',
      type: 'boolean',
      default: 'false',
      description: 'Habilita la navegación circular infinita.'
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      default: '0',
      description: 'Tiempo en ms para cambio automático de diapositiva (0 para deshabilitar).'
    },
    {
      name: 'showNavigators',
      type: 'boolean',
      default: 'true',
      description: 'Muestra los botones de navegación anterior y siguiente.'
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'true',
      description: 'Muestra los indicadores de página.'
    },
    {
      name: 'page',
      type: 'number',
      default: '0',
      description: 'Índice de la página/elemento activo (soporta two-way binding).'
    }
  ];

  carouselEvents: ApiEvent[] = [
    {
      name: 'onPage',
      parameters: '{ page: number }',
      description: 'Emitido cuando cambia la página o elemento actual.'
    }
  ];
}
