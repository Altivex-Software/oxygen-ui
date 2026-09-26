import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent, FileUploadSelectEvent, FileUploadErrorEvent, ToastService } from 'oxygen-ui';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  template: `
    <div class="ox-page-container">
      <h1>FileUpload</h1>
      <p class="ox-description">Permite a los usuarios seleccionar o arrastrar archivos para subirlos.</p>

      <section class="ox-section">
        <h2>Básico (Un solo archivo)</h2>
        <div class="ox-card ox-p-4">
          <div style="max-width: 500px">
            <ox-file-upload 
              (onSelect)="onSelect($event)" 
              (onRemove)="onRemove()"
              chooseLabel="Seleccionar un documento">
            </ox-file-upload>
          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Múltiples Archivos y Filtro de Tipo</h2>
        <div class="ox-card ox-p-4">
          <p class="ox-mb-3 ox-text-surface-600">Solo imágenes (png, jpg, jpeg) y hasta 1 MB por archivo.</p>
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
}
