import { Component, input, output, signal, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FileUploadSelectEvent {
  originalEvent: Event;
  files: File[];
  currentFiles: File[];
}

export interface FileUploadRemoveEvent {
  file: File;
  currentFiles: File[];
}

export interface FileUploadErrorEvent {
  file: File;
  error: 'size' | 'type';
}

@Component({
  selector: 'ox-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="ox-file-upload" 
      [class.ox-file-upload-disabled]="disabled()"
      [class.ox-file-upload-dragover]="isDragOver()">
      
      <!-- Hidden file input -->
      <input 
        #fileInput
        type="file" 
        class="ox-file-upload-input" 
        [accept]="accept()"
        [multiple]="multiple()"
        [disabled]="disabled()"
        (change)="onFileSelect($event)">

      <!-- Drag & Drop Area / Button -->
      @if (!customUpload()) {
        <div 
          class="ox-file-upload-dropzone" 
          (dragover)="onDragOver($event)" 
          (dragleave)="onDragLeave($event)" 
          (drop)="onDrop($event)"
          (click)="fileInput.click()">
          
          <div class="ox-file-upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p class="ox-file-upload-text">{{ chooseLabel() }}</p>
          <p class="ox-file-upload-subtext">o arrastra y suelta aquí</p>
        </div>
      } @else {
        <ng-content></ng-content>
      }

      <!-- File List -->
      @if (showFileList() && files().length > 0) {
        <div class="ox-file-upload-list">
          @for (file of files(); track file.name + file.size) {
            <div class="ox-file-upload-item">
              <div class="ox-file-upload-item-info">
                <svg viewBox="0 0 20 20" fill="currentColor" class="ox-file-icon">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <div class="ox-file-details">
                  <span class="ox-file-name" [title]="file.name">{{ file.name }}</span>
                  <span class="ox-file-size">{{ formatSize(file.size) }}</span>
                </div>
              </div>
              <button 
                type="button" 
                class="ox-file-remove-btn" 
                (click)="removeFile(file, $event)"
                [disabled]="disabled()">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './file-upload.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  multiple = input<boolean>(false);
  accept = input<string>('');
  maxFileSize = input<number>();
  disabled = input<boolean>(false);
  chooseLabel = input<string>('Seleccionar archivo');
  showFileList = input<boolean>(true);
  customUpload = input<boolean>(false); // If true, hides the default dropzone
  
  onSelect = output<FileUploadSelectEvent>();
  onRemove = output<FileUploadRemoveEvent>();
  onError = output<FileUploadErrorEvent>();
  
  files = signal<File[]>([]);
  isDragOver = signal<boolean>(false);

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.handleFiles(Array.from(target.files), event);
    }
    // Reset input so selecting the same file again works
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onDragOver(event: DragEvent) {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    if (this.disabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFiles(Array.from(event.dataTransfer.files), event);
    }
  }

  handleFiles(newFiles: File[], event: Event) {
    let validFiles: File[] = [];
    const max = this.maxFileSize();
    const accepts = this.accept();

    for (const file of newFiles) {
      if (max && file.size > max) {
        this.onError.emit({ file, error: 'size' });
        continue;
      }
      
      if (accepts && !this.isFileTypeValid(file, accepts)) {
        this.onError.emit({ file, error: 'type' });
        continue;
      }
      
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      if (!this.multiple()) {
        validFiles = [validFiles[0]];
      }
      
      const currentFiles = this.multiple() ? [...this.files(), ...validFiles] : validFiles;
      this.files.set(currentFiles);
      
      this.onSelect.emit({
        originalEvent: event,
        files: validFiles,
        currentFiles: currentFiles
      });
    }
  }

  isFileTypeValid(file: File, accepts: string): boolean {
    const acceptedTypes = accepts.split(',').map(t => t.trim());
    if (acceptedTypes.length === 0) return true;

    return acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.endsWith('/*')) {
        const category = type.split('/')[0];
        return file.type.startsWith(category + '/');
      }
      return file.type === type;
    });
  }

  removeFile(file: File, event: Event) {
    event.stopPropagation();
    if (this.disabled()) return;
    
    const newFiles = this.files().filter(f => f !== file);
    this.files.set(newFiles);
    
    this.onRemove.emit({
      file,
      currentFiles: newFiles
    });
  }

  clear() {
    this.files.set([]);
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
