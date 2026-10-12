import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent, BadgeComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-image-demo',
  standalone: true,
  imports: [
    CommonModule, 
    ImageComponent, 
    BadgeComponent,
    DocCodeComponent, 
    DocApiTableComponent
  ],
  template: `
    <div class="val-page-container">
      <div class="val-flex val-items-center val-justify-between val-flex-wrap val-gap-4 val-mb-6">
        <div>
          <h1 class="val-text-3xl val-font-bold val-text-slate-900 dark:val-text-white val-mb-2">Image (Visor con Zoom y Lightbox)</h1>
          <p class="val-text-slate-600 dark:val-text-slate-400">
            Componente de imagen optimizado con visor Lightbox a pantalla completa, rotación en 360°, zoom multinivel con indicador de porcentaje, inversión horizontal/vertical (flip), descarga y skeleton shimmer.
          </p>
        </div>
        <div class="val-flex val-gap-2">
          <val-badge value="Lightbox Pro" severity="primary"></val-badge>
          <val-badge value="High-Res Viewer" severity="success"></val-badge>
        </div>
      </div>

      <!-- 1. VISTA PREVIA CON LIGHTBOX COMPLETO -->
      <app-doc-code
        title="1. Visor Lightbox Interactivo con Zoom, Rotación y Flip"
        description="Haz clic sobre cualquiera de las imágenes para abrir la barra de herramientas del visor a pantalla completa."
        [html]="previewHtml"
        [ts]="imageTs">
        <div class="val-grid val-grid-cols-1 sm:val-grid-cols-2 md:val-grid-cols-3 val-gap-6">
          <div class="image-showcase-card val-flex val-flex-col val-items-center val-p-3 val-rounded-xl val-border val-border-slate-200 dark:val-border-slate-800 val-bg-white dark:val-bg-slate-900 shadow-sm">
            <val-image 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" 
              alt="Paisaje Natural de Montañas"
              width="100%"
              height="180px"
              [preview]="true">
            </val-image>
            <div class="val-mt-3 val-text-center">
              <span class="val-text-xs val-font-semibold val-text-slate-800 dark:val-text-slate-200 val-block">Montañas y Lago</span>
              <span class="val-text-[11px] val-text-slate-400">Haz clic para expandir visor</span>
            </div>
          </div>

          <div class="image-showcase-card val-flex val-flex-col val-items-center val-p-3 val-rounded-xl val-border val-border-slate-200 dark:val-border-slate-800 val-bg-white dark:val-bg-slate-900 shadow-sm">
            <val-image 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" 
              alt="Placa de Circuitos Tecnológicos"
              width="100%"
              height="180px"
              [preview]="true">
            </val-image>
            <div class="val-mt-3 val-text-center">
              <span class="val-text-xs val-font-semibold val-text-slate-800 dark:val-text-slate-200 val-block">Microprocesador Tech</span>
              <span class="val-text-[11px] val-text-slate-400">Rotación y Zoom disponibles</span>
            </div>
          </div>

          <div class="image-showcase-card val-flex val-flex-col val-items-center val-p-3 val-rounded-xl val-border val-border-slate-200 dark:val-border-slate-800 val-bg-white dark:val-bg-slate-900 shadow-sm">
            <val-image 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80" 
              alt="Galería de Arte Contemporáneo"
              width="100%"
              height="180px"
              [preview]="true">
            </val-image>
            <div class="val-mt-3 val-text-center">
              <span class="val-text-xs val-font-semibold val-text-slate-800 dark:val-text-slate-200 val-block">Pintura Abstracta</span>
              <span class="val-text-[11px] val-text-slate-400">Soporta atajos de teclado (Esc, +, -)</span>
            </div>
          </div>
        </div>
      </app-doc-code>

      <!-- 2. SKELETON SHIMMER & ERROR FALLBACK -->
      <app-doc-code
        title="2. Estados de Carga (Skeleton) y Fallback de Error"
        description="Manejo automático de animación shimmer durante la carga y mensaje elegante en caso de URL rota."
        [html]="statesHtml"
        [ts]="imageTs">
        <div class="val-grid val-grid-cols-1 sm:val-grid-cols-2 val-gap-6">
          <div class="val-flex val-flex-col val-items-center">
            <val-image 
              src="https://invalid-broken-url-example.com/not-found.jpg" 
              alt="Imagen Rota"
              width="240px"
              height="150px">
            </val-image>
            <span class="val-text-xs val-text-slate-500 val-mt-2">Fallback cuando la URL es inválida</span>
          </div>

          <div class="val-flex val-flex-col val-items-center">
            <val-image 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80" 
              alt="Planeta Tierra Espacio"
              width="240px"
              height="150px"
              [preview]="true">
            </val-image>
            <span class="val-text-xs val-text-slate-500 val-mt-2">Carga suave con fade-in</span>
          </div>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: ImageComponent"
        [properties]="imageProps"
        [events]="imageEvents">
      </app-doc-api-table>
    </div>
  `,
  styles: [`
    .val-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }
  `]
})
export class ImageDemoComponent {
  previewHtml = `<val-image 
  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" 
  alt="Paisaje Natural" 
  width="100%" 
  height="180px"
  [preview]="true">
</val-image>`;

  statesHtml = `<!-- Manejo de imagen rota o no disponible -->
<val-image 
  src="https://invalid-url.com/broken.jpg" 
  width="240px" 
  height="150px">
</val-image>`;

  imageTs = `import { Component } from '@angular/core';
import { ImageComponent } from 'valence-ui';

@Component({
  imports: [ImageComponent],
  templateUrl: './my-image.component.html'
})
export class MyImageComponent {}`;

  imageProps: ApiProperty[] = [
    {
      name: 'src',
      type: 'string',
      default: 'required',
      description: 'URL de la imagen que se va a mostrar.'
    },
    {
      name: 'alt',
      type: 'string',
      default: "''",
      description: 'Texto descriptivo alternativo para accesibilidad (SEO y lectores de pantalla).'
    },
    {
      name: 'width',
      type: 'string',
      default: "''",
      description: 'Ancho personalizado del contenedor (ej. "250px", "100%").'
    },
    {
      name: 'height',
      type: 'string',
      default: "''",
      description: 'Alto personalizado del contenedor (ej. "180px").'
    },
    {
      name: 'preview',
      type: 'boolean',
      default: 'false',
      description: 'Habilita el visor Lightbox a pantalla completa al hacer clic con controles de zoom, rotación y flip.'
    },
    {
      name: 'loading',
      type: "'lazy' | 'eager'",
      default: "'lazy'",
      description: 'Estrategia de carga nativa del navegador.'
    },
    {
      name: 'indicatorIcon',
      type: 'ValIconName | string',
      default: "'zoom-in'",
      description: 'Nombre del icono mostrado en la máscara al pasar el cursor sobre la imagen.'
    }
  ];

  imageEvents: ApiEvent[] = [
    {
      name: 'onShow',
      parameters: 'void',
      description: 'Emitido cuando se abre el visor Lightbox a pantalla completa.'
    },
    {
      name: 'onHide',
      parameters: 'void',
      description: 'Emitido cuando se cierra el visor Lightbox.'
    },
    {
      name: 'onImageError',
      parameters: 'Event',
      description: 'Emitido si la imagen no se pudo cargar.'
    }
  ];
}
