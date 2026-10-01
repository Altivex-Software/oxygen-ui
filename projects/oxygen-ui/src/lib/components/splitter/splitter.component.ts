import { 
  Component, 
  input, 
  signal, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  ElementRef, 
  ViewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type SplitterLayout = 'horizontal' | 'vertical';

@Component({
  selector: 'ox-splitter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      #container
      class="ox-splitter"
      [class.ox-splitter-horizontal]="layout() === 'horizontal'"
      [class.ox-splitter-vertical]="layout() === 'vertical'">
      
      <div 
        class="ox-splitter-panel" 
        [style.flex-basis.%]="panel1Size()"
        style="overflow: auto;">
        <ng-content select="[oxPanel1]"></ng-content>
      </div>

      <div 
        class="ox-splitter-gutter" 
        (mousedown)="onMouseDown($event)">
        <div class="ox-splitter-gutter-handle"></div>
      </div>

      <div 
        class="ox-splitter-panel" 
        [style.flex-basis.%]="100 - panel1Size()"
        style="overflow: auto;">
        <ng-content select="[oxPanel2]"></ng-content>
      </div>
    </div>
  `,
  styleUrl: './splitter.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitterComponent {
  @ViewChild('container') container!: ElementRef;

  layout = input<SplitterLayout>('horizontal');
  initialSize = input<number>(50); // % of Panel 1

  panel1Size = signal(50);
  private isDragging = false;

  ngOnInit() {
    this.panel1Size.set(this.initialSize());
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging || !this.container) return;
      const rect = this.container.nativeElement.getBoundingClientRect();
      let percentage = 50;

      if (this.layout() === 'horizontal') {
        const offset = e.clientX - rect.left;
        percentage = (offset / rect.width) * 100;
      } else {
        const offset = e.clientY - rect.top;
        percentage = (offset / rect.height) * 100;
      }

      // Constrain between 10% and 90%
      percentage = Math.max(10, Math.min(90, percentage));
      this.panel1Size.set(percentage);
    };

    const onMouseUp = () => {
      this.isDragging = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
}
