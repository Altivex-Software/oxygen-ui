import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent, BadgeComponent } from 'oxygen-ui';
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
    <div class="ox-page-container">
      <div class="ox-flex ox-items-center ox-justify-between ox-flex-wrap ox-gap-4 ox-mb-6">
        <div>
          <h1 class="ox-text-3xl ox-font-bold ox-text-slate-900 dark:ox-text-white ox-mb-2">Image (Visor con Zoom y Lightbox)</h1>
          <p class="ox-text-slate-600 dark:ox-text-slate-400">
            Componente de imagen optimizado con visor Lightbox a pantalla completa, rotación en 360°, zoom multinivel con indicador de porcentaje, inversión horizontal/vertical (flip), descarga y skeleton shimmer.
          </p>
        </div>
        <div class="ox-flex ox-gap-2">
          <ox-badge value="Lightbox Pro" severity="primary"></ox-badge>
          <ox-badge value="High-Res Viewer" severity="success"></ox-badge>
        </div>
      </div>

      <!-- 1. VISTA PREVIA CON LIGHTBOX COMPLETO -->
      <app-doc-code
        title="1. Visor Lightbox Interactivo con Zoom, Rotación y Flip"
        description="Haz clic sobre cualquiera de las imágenes para abrir la barra de herramientas del visor a pantalla completa."
        [html]="previewHtml"
        [ts]="imageTs">
        <div class="ox-grid ox-grid-cols-1 sm:ox-grid-cols-2 md:ox-grid-cols-3 ox-gap-6">
          <div class="image-showcase-card ox-flex ox-flex-col ox-items-center ox-p-3 ox-rounded-xl ox-border ox-border-slate-200 dark:ox-border-slate-800 ox-bg-white dark:ox-bg-slate-900 shadow-sm">
            <ox-image 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" 
              alt="Paisaje Natural de Montañas"
              width="100%"
              height="180px"
              [preview]="true">
            </ox-image>
            <div class="ox-mt-3 ox-text-center">
              <span class="ox-text-xs ox-font-semibold ox-text-slate-800 dark:ox-text-slate-200 ox-block">Montañas y Lago</span>
              <span class="ox-text-[11px] ox-text-slate-400">Haz clic para expandir visor</span>
            </div>
          </div>

          <div class="image-showcase-card ox-flex ox-flex-col ox-items-center ox-p-3 ox-rounded-xl ox-border ox-border-slate-200 dark:ox-border-slate-800 ox-bg-white dark:ox-bg-slate-900 shadow-sm">
            <ox-image 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" 
              alt="Placa de Circuitos Tecnológicos"
              width="100%"
              height="180px"
              [preview]="true">
            </ox-image>
            <div class="ox-mt-3 ox-text-center">
              <span class="ox-text-xs ox-font-semibold ox-text-slate-800 dark:ox-text-slate-200 ox-block">Microprocesador Tech</span>
              <span class="ox-text-[11px] ox-text-slate-400">Rotación y Zoom disponibles</span>
            </div>
          </div>

          <div class="image-showcase-card ox-flex ox-flex-col ox-items-center ox-p-3 ox-rounded-xl ox-border ox-border-slate-200 dark:ox-border-slate-800 ox-bg-white dark:ox-bg-slate-900 shadow-sm">
            <ox-image 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80" 
              alt="Galería de Arte Contemporáneo"
              width="100%"
              height="180px"
              [preview]="true">
            </ox-image>
            <div class="ox-mt-3 ox-text-center">
              <span class="ox-text-xs ox-font-semibold ox-text-slate-800 dark:ox-text-slate-200 ox-block">Pintura Abstracta</span>
              <span class="ox-text-[11px] ox-text-slate-400">Soporta atajos de teclado (Esc, +, -)</span>
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
        <div class="ox-grid ox-grid-cols-1 sm:ox-grid-cols-2 ox-gap-6">
          <div class="ox-flex ox-flex-col ox-items-center">
            <ox-image 
              src="https://invalid-broken-url-example.com/not-found.jpg" 
              alt="Imagen Rota"
              width="240px"
              height="150px">
            </ox-image>
            <span class="ox-text-xs ox-text-slate-500 ox-mt-2">Fallback cuando la URL es inválida</span>
          </div>

          <div class="ox-flex ox-flex-col ox-items-center">
            <ox-image 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80" 
              alt="Planeta Tierra Espacio"
              width="240px"
              height="150px"
              [preview]="true">
            </ox-image>
            <span class="ox-text-xs ox-text-slate-500 ox-mt-2">Carga suave con fade-in</span>
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
    .ox-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }
  `]
})
export class ImageDemoComponent {
  previewHtml = `<ox-image 
  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" 
  alt="Paisaje Natural" 
  width="100%" 
  height="180px"
  [preview]="true">
</ox-image>`;

  statesHtml = `<!-- Manejo de imagen rota o no disponible -->
<ox-image 
  src="https://invalid-url.com/broken.jpg" 
  width="240px" 
  height="150px">
</ox-image>`;

  imageTs = `import { Component } from '@angular/core';
import { ImageComponent } from 'oxygen-ui';

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
      type: 'OxIconName | string',
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
