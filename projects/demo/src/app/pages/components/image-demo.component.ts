import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-image-demo',
  standalone: true,
  imports: [CommonModule, ImageComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>Image (Visor con Zoom y Preview)</h1>
      <p class="ox-description">
        Muestra imágenes con modo vista previa a pantalla completa, controles de zoom, rotación y reset.
      </p>

      <!-- 1. IMAGEN ESTÁNDAR -->
      <app-doc-code
        title="1. Imagen Estándar"
        description="Renderizado limpio con border-radius y estilos integrados."
        [html]="basicHtml"
        [ts]="imageTs">
        <ox-image 
          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80" 
          alt="Artwork sample"
          width="250px">
        </ox-image>
      </app-doc-code>

      <!-- 2. CON PREVIEW MODAL -->
      <app-doc-code
        title="2. Imagen con Vista Previa (Modal + Zoom + Rotación)"
        description="Pasa el cursor por encima y haz clic para abrir el visor interactivo."
        [html]="previewHtml"
        [ts]="imageTs">
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <div style="text-align: center;">
            <ox-image 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80" 
              alt="Paisaje Natural"
              width="200px"
              [preview]="true">
            </ox-image>
            <span style="display: block; font-size: 0.8125rem; color: #64748b; margin-top: 0.5rem;">
              Paisaje (Haz clic)
            </span>
          </div>

          <div style="text-align: center;">
            <ox-image 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80" 
              alt="Tecnología Circuitos"
              width="200px"
              [preview]="true">
            </ox-image>
            <span style="display: block; font-size: 0.8125rem; color: #64748b; margin-top: 0.5rem;">
              Tecnología (Haz clic)
            </span>
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
  `
})
export class ImageDemoComponent {
  basicHtml = `<ox-image 
  src="https://example.com/photo.jpg" 
  alt="Foto" 
  width="250px">
</ox-image>`;

  previewHtml = `<ox-image 
  src="https://example.com/photo.jpg" 
  alt="Foto con Zoom" 
  width="200px" 
  [preview]="true">
</ox-image>`;

  imageTs = `import { Component } from '@angular/core';
import { ImageComponent } from 'oxygen-ui';

@Component({
  selector: 'app-my-image',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './my-image.component.html'
})
export class MyImageComponent {}`;

  imageProps: ApiProperty[] = [
    {
      name: 'src',
      type: 'string',
      default: "''",
      description: 'Ruta o URL de la imagen.'
    },
    {
      name: 'alt',
      type: 'string',
      default: "''",
      description: 'Texto alternativo para accesibilidad (a11y).'
    },
    {
      name: 'width',
      type: 'string',
      default: "''",
      description: 'Ancho del contenedor de la imagen (ej: 250px, 100%).'
    },
    {
      name: 'preview',
      type: 'boolean',
      default: 'false',
      description: 'Habilita el visor a pantalla completa con zoom y rotación al hacer clic.'
    }
  ];

  imageEvents: ApiEvent[] = [
    {
      name: 'onShow',
      parameters: 'void',
      description: 'Emitido cuando se abre el modal de vista previa.'
    },
    {
      name: 'onHide',
      parameters: 'void',
      description: 'Emitido cuando se cierra la vista previa.'
    }
  ];
}
