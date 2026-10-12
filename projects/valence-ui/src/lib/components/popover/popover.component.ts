import { 
  Component, 
  input, 
  output, 
  signal, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  ElementRef, 
  ViewChild, 
  ChangeDetectorRef, 
  inject 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'ox-popover',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <div #targetOrigin class="ox-popover-target" (click)="toggle()">
      <ng-content select="[oxTarget]"></ng-content>
    </div>

    <ng-template 
      cdkConnectedOverlay 
      [cdkConnectedOverlayOrigin]="targetOrigin" 
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayOffsetY]="offsetY()"
      [cdkConnectedOverlayOffsetX]="offsetX()"
      (overlayOutsideClick)="close($event)">
      <div class="ox-popover-panel ox-elevation-3">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styleUrl: './popover.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {
  @ViewChild('targetOrigin') targetOrigin!: ElementRef;

  offsetY = input<number>(8);
  offsetX = input<number>(0);
  
  onShow = output<void>();
  onHide = output<void>();

  isOpen = signal(false);
  private cdr = inject(ChangeDetectorRef);

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.isOpen()) {
      this.isOpen.set(true);
      this.onShow.emit();
      this.cdr.markForCheck();
    }
  }

  close(event?: MouseEvent) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target && this.targetOrigin?.nativeElement?.contains(target)) {
        return;
      }
    }
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.onHide.emit();
      this.cdr.markForCheck();
    }
  }
}
