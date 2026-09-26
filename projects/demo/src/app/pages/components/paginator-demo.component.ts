import { Component, signal } from '@angular/core';
import { PaginatorComponent, CardComponent } from 'oxygen-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, CardComponent],
  template: `
    <div class="ox-page-container">
      <h1>Paginator</h1>
      <p class="ox-description">Paginator is a generic component to display content in paged format.</p>

      <section class="ox-section">
        <ox-card>
          <div class="ox-p-4">
            <h5>Basic</h5>
            <ox-paginator 
              [rows]="10" 
              [totalRecords]="totalRecords()" 
              (onPageChange)="onPageChange($event)">
            </ox-paginator>
            <p class="ox-mt-4 text-muted">Current Page State: {{ pageState() | json }}</p>
          </div>
        </ox-card>
      </section>

      <section class="ox-section ox-mt-4">
        <ox-card>
          <div class="ox-p-4">
            <h5>Total Records: 120</h5>
            <ox-paginator 
              [rows]="5" 
              [totalRecords]="120" 
              (onPageChange)="onPageChange($event)">
            </ox-paginator>
          </div>
        </ox-card>
      </section>
    </div>
  `,
  styles: [`
    .demo-container { padding: 2rem; max-width: 1000px; margin: 0 auto; }
    .demo-section { margin-bottom: 2rem; }
    .demo-description { color: var(--text-muted); margin-bottom: 2rem; }
    h1 { margin-bottom: 0.5rem; }
    h5 { margin-bottom: 1rem; font-weight: 600; }
  `]
})
export class PaginatorDemoComponent {
  totalRecords = signal(100);
  pageState = signal<any>(null);

  onPageChange(event: any) {
    this.pageState.set(event);
  }
}


