import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaComponent, GalleriaItem, GalleriaResponsiveOption, ButtonComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-galleria-demo',
  standalone: true,
  imports: [
    CommonModule,
    GalleriaComponent,
    ButtonComponent,
    DocCodeComponent,
    DocApiTableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Galleria (Galería de Medios e Imágenes)</h1>
      <p class="ox-description">
        Componente avanzado de galería con miniaturas (thumbnails), soporte responsivo, navegación con teclado, pies de foto y modo pantalla completa (lightbox).
      </p>

      <!-- 1. BÁSICA CON THUMBNAILS -->
      <app-doc-code
        title="1. Galería Básica con Miniaturas"
        description="Muestra la imagen activa junto con miniaturas interactivas para una navegación rápida."
        [html]="basicHtml"
        [ts]="galleriaTs">
        <div style="max-width: 640px; margin: 0 auto;">
          <ox-galleria 
            [value]="images" 
            [numVisible]="5" 
            [circular]="true"
            [showItemNavigators]="true"
            [showCaption]="true"
            [responsiveOptions]="responsiveOptions">
          </ox-galleria>
        </div>
      </app-doc-code>

      <!-- 2. MINIATURAS A LA IZQUIERDA / DERECHA -->
      <app-doc-code
        title="2. Miniaturas Verticales (Izquierda)"
        description="Posicionamiento lateral de las miniaturas para layouts panorámicos o catálogos de producto."
        [html]="verticalThumbHtml"
        [ts]="galleriaTs">
        <div style="max-width: 700px; margin: 0 auto;">
          <ox-galleria 
            [value]="images" 
            [numVisible]="4" 
            thumbnailsPosition="left"
            [circular]="true"
            [showItemNavigators]="true">
          </ox-galleria>
        </div>
      </app-doc-code>

      <!-- 3. MODO PANTALLA COMPLETA (FULLSCREEN MODAL) -->
      <app-doc-code
        title="3. Modo Pantalla Completa (Fullscreen / Lightbox)"
        description="Abre la galería en un modal overlay de pantalla completa con soporte de tecla ESC."
        [html]="fullscreenHtml"
        [ts]="galleriaTs">
        <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; padding: 2rem;">
          <ox-button 
            label="Abrir Galería a Pantalla Completa" 
            icon="maximize" 
            (onClick)="openFullscreenGalleria()">
          </ox-button>

          <ox-galleria 
            [value]="images" 
            [(visible)]="displayFullscreen"
            [fullScreen]="true"
            [showItemNavigators]="true"
            [showThumbnails]="true"
            [circular]="true">
          </ox-galleria>
        </div>
      </app-doc-code>

      <!-- 4. AUTO-PLAY & INDICADORES -->
      <app-doc-code
        title="4. Auto-Play con Indicadores"
        description="Transición continua de diapositivas con puntos indicadores sobre la imagen."
        [html]="autoplayHtml"
        [ts]="galleriaTs">
        <div style="max-width: 640px; margin: 0 auto;">
          <ox-galleria 
            [value]="images" 
            [autoPlay]="true"
            [transitionInterval]="3500"
            [showIndicators]="true"
            [showIndicatorsOnItem]="true"
            [showThumbnails]="false"
            [circular]="true"
            [showItemNavigators]="true"
            [showItemNavigatorsOnHover]="true">
          </ox-galleria>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: GalleriaComponent"
        [properties]="galleriaProps"
        [events]="galleriaEvents">
      </app-doc-api-table>
    </div>
  `
})
export class GalleriaDemoComponent {
  displayFullscreen = signal<boolean>(false);

  images: GalleriaItem[] = [
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&auto=format&fit=crop&q=80',
      alt: 'Valle y Lago en Yosemite',
      title: 'Yosemite National Park',
      caption: 'Vista panorámica del valle y reflejo cristalino en el lago.'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=150&auto=format&fit=crop&q=80',
      alt: 'Bosque de Niebla al Amanecer',
      title: 'Bosque Místico',
      caption: 'Senderos envueltos en neblina matutina entre pinos milenarios.'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&auto=format&fit=crop&q=80',
      alt: 'Montañas y Cordillera Nevada',
      title: 'Picos Alpinos',
      caption: 'Amanecer dorado sobre las cumbres nevadas.'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=150&auto=format&fit=crop&q=80',
      alt: 'Pradera Verde y Colinas',
      title: 'Colinas Verdes',
      caption: 'Campos ondulados bajo el cielo despejado de primavera.'
    },
    {
      itemImageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      thumbnailImageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=80',
      alt: 'Playa Tropical y Palmeras',
      title: 'Costa Tropical',
      caption: 'Aguas turquesas y arenas blancas en el mar caribe.'
    }
  ];

  responsiveOptions: GalleriaResponsiveOption[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  openFullscreenGalleria(): void {
    this.displayFullscreen.set(true);
  }

  basicHtml = `<ox-galleria 
  [value]="images" 
  [numVisible]="5" 
  [circular]="true"
  [showItemNavigators]="true"
  [showCaption]="true"
  [responsiveOptions]="responsiveOptions">
</ox-galleria>`;

  verticalThumbHtml = `<ox-galleria 
  [value]="images" 
  [numVisible]="4" 
  thumbnailsPosition="left"
  [circular]="true"
  [showItemNavigators]="true">
</ox-galleria>`;

  fullscreenHtml = `<ox-button 
  label="Abrir Galería a Pantalla Completa" 
  icon="maximize" 
  (onClick)="displayFullscreen.set(true)">
</ox-button>

<ox-galleria 
  [value]="images" 
  [(visible)]="displayFullscreen"
  [fullScreen]="true"
  [showItemNavigators]="true"
  [showThumbnails]="true">
</ox-galleria>`;

  autoplayHtml = `<ox-galleria 
  [value]="images" 
  [autoPlay]="true"
  [transitionInterval]="3500"
  [showIndicators]="true"
  [showIndicatorsOnItem]="true"
  [showThumbnails]="false">
</ox-galleria>`;

  galleriaTs = `import { Component, signal } from '@angular/core';
import { GalleriaComponent, GalleriaItem, GalleriaResponsiveOption, ButtonComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-galleria',
  standalone: true,
  imports: [GalleriaComponent, ButtonComponent],
  templateUrl: './my-galleria.component.html'
})
export class MyGalleriaComponent {
  displayFullscreen = signal<boolean>(false);
  images: GalleriaItem[] = [...];
}`;

  galleriaProps: ApiProperty[] = [
    {
      name: 'value',
      type: 'any[]',
      default: '[]',
      description: 'Colección de imágenes/elementos a mostrar en la galería.'
    },
    {
      name: 'activeIndex',
      type: 'number',
      default: '0',
      description: 'Índice de la imagen activa actual (soporta two-way binding).'
    },
    {
      name: 'fullScreen',
      type: 'boolean',
      default: 'false',
      description: 'Modo modal de pantalla completa (lightbox).'
    },
    {
      name: 'visible',
      type: 'boolean',
      default: 'true',
      description: 'Visibilidad del visor en modo pantalla completa.'
    },
    {
      name: 'numVisible',
      type: 'number',
      default: '5',
      description: 'Número de miniaturas mostradas en la tira de thumbnails.'
    },
    {
      name: 'thumbnailsPosition',
      type: "'bottom' | 'top' | 'left' | 'right'",
      default: "'bottom'",
      description: 'Posición de las miniaturas respecto a la imagen principal.'
    },
    {
      name: 'showItemNavigators',
      type: 'boolean',
      default: 'false',
      description: 'Muestra los botones de navegación anterior y siguiente sobre la imagen.'
    },
    {
      name: 'showItemNavigatorsOnHover',
      type: 'boolean',
      default: 'false',
      description: 'Muestra las flechas de navegación del item sólo al pasar el ratón.'
    },
    {
      name: 'showThumbnails',
      type: 'boolean',
      default: 'true',
      description: 'Muestra u oculta la tira de miniaturas.'
    },
    {
      name: 'showCaption',
      type: 'boolean',
      default: 'false',
      description: 'Muestra el título y descripción (caption) sobre la imagen principal.'
    },
    {
      name: 'circular',
      type: 'boolean',
      default: 'false',
      description: 'Permite navegación cíclica infinita entre las imágenes.'
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      default: 'false',
      description: 'Habilita la reproducción automática de diapositivas.'
    },
    {
      name: 'transitionInterval',
      type: 'number',
      default: '4000',
      description: 'Tiempo en ms para cambio automático en modo autoplay.'
    }
  ];

  galleriaEvents: ApiEvent[] = [
    {
      name: 'activeIndexChange',
      parameters: 'number',
      description: 'Emitido cuando cambia el índice de la imagen activa.'
    },
    {
      name: 'visibleChange',
      parameters: 'boolean',
      description: 'Emitido cuando cambia la visibilidad en modo pantalla completa.'
    }
  ];
}
