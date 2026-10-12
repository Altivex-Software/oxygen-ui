import { Component, input, computed, ViewEncapsulation } from '@angular/core';

export type SkeletonShape = 'rectangle' | 'circle';
export type SkeletonAnimation = 'wave' | 'pulse' | 'none';

@Component({
  selector: 'ox-skeleton',
  standalone: true,
  template: ``,
  styleUrl: './skeleton.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.border-radius]': 'effectiveBorderRadius()',
  }
})
export class SkeletonComponent {
  shape = input<SkeletonShape>('rectangle');
  animation = input<SkeletonAnimation>('wave');
  width = input<string>('100%');
  height = input<string>('1rem');
  borderRadius = input<string>();

  effectiveBorderRadius = computed(() => {
    if (this.shape() === 'circle') return '50%';
    return this.borderRadius() || 'var(--radius-md)';
  });

  hostClasses = computed(() => {
    return [
      'oxy-skeleton',
      `oxy-skeleton-animation-${this.animation()}`,
      `oxy-skeleton-shape-${this.shape()}`
    ].join(' ');
  });
}
