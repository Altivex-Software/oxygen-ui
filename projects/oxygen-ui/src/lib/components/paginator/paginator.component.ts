import { Component, input, output, computed, signal, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent, DropdownOption } from '../dropdown/dropdown.component';

@Component({
  selector: 'ox-paginator',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  template: `
    <div class="ox-paginator">
      <button 
        class="ox-paginator-button" 
        [disabled]="isFirstPage()" 
        (click)="changePage(0)"
        title="First Page">
        <span class="ox-paginator-icon">«</span>
      </button>
      <button 
        class="ox-paginator-button" 
        [disabled]="isFirstPage()" 
        (click)="changePage(currentPage() - 1)"
        title="Previous Page">
        <span class="ox-paginator-icon">‹</span>
      </button>

      <div class="ox-paginator-pages">
        @for (p of visiblePages(); track p) {
          <button 
            class="ox-paginator-page" 
            [class.ox-paginator-page-active]="p === currentPage()"
            (click)="changePage(p)">
            {{ p + 1 }}
          </button>
        }
      </div>

      <button 
        class="ox-paginator-button" 
        [disabled]="isLastPage()" 
        (click)="changePage(currentPage() + 1)"
        title="Next Page">
        <span class="ox-paginator-icon">›</span>
      </button>
      <button 
        class="ox-paginator-button" 
        [disabled]="isLastPage()" 
        (click)="changePage(pageCount() - 1)"
        title="Last Page">
        <span class="ox-paginator-icon">»</span>
      </button>

      @if (rowsPerPageOptions().length > 0) {
        <div class="ox-paginator-rpp-wrapper">
          <ox-dropdown
            size="sm"
            [options]="dropdownOptions()"
            [value]="rows()"
            (valueChange)="onRowsPerPageSelect($event)">
          </ox-dropdown>
        </div>
      }

      <span class="ox-paginator-current">
        Showing {{ totalRecords() === 0 ? 0 : currentFirst() + 1 }} to {{ currentLast() }} of {{ totalRecords() }}
      </span>
    </div>
  `,
  styleUrl: './paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  totalRecords = input<number>(0);
  rows = input<number>(10);
  page = input<number>(0);
  first = input<number>(0);
  rowsPerPageOptions = input<number[]>([]);
  
  onPageChange = output<{page: number, first: number, rows: number}>();

  dropdownOptions = computed<DropdownOption<number>[]>(() => {
    return this.rowsPerPageOptions().map(opt => ({
      label: String(opt),
      value: opt
    }));
  });

  currentPage = computed(() => {
    if (this.first() > 0 && this.rows() > 0) {
      return Math.floor(this.first() / this.rows());
    }
    return this.page();
  });

  pageCount = computed(() => Math.ceil(this.totalRecords() / this.rows()) || 1);
  isFirstPage = computed(() => this.currentPage() === 0);
  isLastPage = computed(() => this.currentPage() === this.pageCount() - 1);
  
  currentFirst = computed(() => this.currentPage() * this.rows());
  currentLast = computed(() => Math.min((this.currentPage() + 1) * this.rows(), this.totalRecords()));

  visiblePages = computed(() => {
    const total = this.pageCount();
    const current = this.currentPage();
    let start = Math.max(0, current - 2);
    let end = Math.min(total, start + 5);
    
    if (end - start < 5) {
      start = Math.max(0, end - 5);
    }
    
    const pages = [];
    for (let i = start; i < end; i++) pages.push(i);
    return pages;
  });

  changePage(p: number) {
    if (p >= 0 && p < this.pageCount() && p !== this.currentPage()) {
      const newFirst = p * this.rows();
      this.onPageChange.emit({ page: p, first: newFirst, rows: this.rows() });
    }
  }

  onRowsPerPageSelect(newRows: number) {
    if (newRows && newRows !== this.rows()) {
      this.onPageChange.emit({ page: 0, first: 0, rows: newRows });
    }
  }
}

