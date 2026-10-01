import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent, FileUploadSelectEvent, FileUploadErrorEvent, ToastService } from 'oxygen-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty, ApiEvent } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="ox-page-container">
      <h1>FileUpload</h1>
      <p class="ox-description">
        Zona de carga interactiva para selección y arrastre de archivos (Drag & Drop), con validación integrada de extensiones y peso máximo.
      </p>

      <!-- 1. BÁSICO -->
      <section class="ox-section">
        <h2>Carga de Archivo Individual</h2>
        <div class="ox-card ox-p-4" style="margin-bottom: 1.5rem;">
          <div style="max-width: 500px">
            <ox-file-upload 
              (onSelect)="onSelect($event)" 
              (onRemove)="onRemove()"
              chooseLabel="Seleccionar un documento">
            </ox-file-upload>
          </div>
        </div>

        <app-doc-code 
          title="FileUpload Simple"
          [htmlCode]="singleHtml"
          [tsCode]="uploadTs">
        </app-doc-code>
      </section>

      <!-- 2. MÚLTIPLES Y FILTRADO -->
      <section class="ox-section">
        <h2>Múltiples Archivos y Filtro de Tipo</h2>
        <div class="ox-card ox-p-4" style="margin-bottom: 1.5rem;">
          <p class="ox-mb-3 ox-text-surface-600" style="color: #64748b; font-size: 0.875rem;">
            Solo imágenes (png, jpg, jpeg) y hasta 1 MB por archivo.
          </p>
          <div style="max-width: 500px">
            <ox-file-upload 
              [multiple]="true"
              accept="image/png, image/jpeg"
              [maxFileSize]="1048576"
              (onSelect)="onSelect($event)"
              (onError)="onError($event)">
            </ox-file-upload>
          </div>
        </div>

        <app-doc-code 
          title="FileUpload con Validación"
          [htmlCode]="multipleHtml"
          [tsCode]="uploadTs">
        </app-doc-code>
      </section>

      <!-- API REFERENCE -->
      <section class="ox-section">
        <h2>API Reference &mdash; &lt;ox-file-upload&gt;</h2>
        <app-doc-api-table [properties]="fileUploadProperties" [events]="fileUploadEvents"></app-doc-api-table>
      </section>
    </div>
  `
})
export class FileUploadDemoComponent {
  constructor(private toastService: ToastService) {}

  onSelect(event: FileUploadSelectEvent) {
    this.toastService.add({
      severity: 'success',
      summary: 'Archivo seleccionado',
      detail: `Se han cargado ${event.files.length} archivo(s).`
    });
  }

  onRemove() {
    this.toastService.add({
      severity: 'info',
      summary: 'Archivo removido',
      detail: 'El archivo ha sido eliminado de la lista.'
    });
  }

  onError(event: FileUploadErrorEvent) {
    let msg = '';
    if (event.error === 'size') {
      msg = `El archivo ${event.file.name} supera el tamaño máximo permitido.`;
    } else {
      msg = `El tipo de archivo ${event.file.name} no está permitido.`;
    }
    
    this.toastService.add({
      severity: 'error',
      summary: 'Error de validación',
      detail: msg
    });
  }

  singleHtml = `<ox-file-upload 
  (onSelect)="onSelect($event)" 
  (onRemove)="onRemove()"
  chooseLabel="Seleccionar un documento">
</ox-file-upload>`;

  multipleHtml = `<ox-file-upload 
  [multiple]="true"
  accept="image/png, image/jpeg"
  [maxFileSize]="1048576"
  (onSelect)="onSelect($event)"
  (onError)="onError($event)">
</ox-file-upload>`;

  uploadTs = `import { Component, inject } from '@angular/core';
import { FileUploadComponent, FileUploadSelectEvent, ToastService } from 'oxygen-ui';

@Component({
  standalone: true,
  imports: [FileUploadComponent],
  templateUrl: './my-component.html'
})
export class MyComponent {
  private toastService = inject(ToastService);

  onSelect(event: FileUploadSelectEvent) {
    console.log('Archivos subidos:', event.files);
  }
}`;

  fileUploadProperties: ApiProperty[] = [
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite seleccionar múltiples archivos simultáneamente.' },
    { name: 'accept', type: 'string', default: "''", description: 'Tipos MIME o extensiones permitidas (ej: image/*, .pdf).' },
    { name: 'maxFileSize', type: 'number', default: 'Infinity', description: 'Tamaño máximo permitido en bytes por archivo.' },
    { name: 'chooseLabel', type: 'string', default: "'Seleccionar Archivo'", description: 'Texto del botón o área de selección.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva la zona de carga.' }
  ];

  fileUploadEvents: ApiEvent[] = [
    { name: 'onSelect', parameters: 'FileUploadSelectEvent', description: 'Se dispara cuando el usuario selecciona o arrastra archivos válidos.' },
    { name: 'onRemove', parameters: 'void', description: 'Se dispara al eliminar un archivo seleccionado.' },
    { name: 'onError', parameters: 'FileUploadErrorEvent', description: 'Se dispara cuando un archivo falla validaciones de tamaño o formato.' }
  ];
}
