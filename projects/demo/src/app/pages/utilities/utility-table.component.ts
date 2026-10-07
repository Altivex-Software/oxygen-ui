import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from 'oxygen-ui';

export interface UtilityClass {
  name: string;
  css: string;
  description: string;
  responsive?: boolean;
}

@Component({
  selector: 'app-utility-table',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="ox-table-wrapper">
      <div class="ox-table-header">
        <h3 class="ox-table-title">{{ title() }}</h3>
        <div class="ox-search-box">
          <ox-icon name="search" size="1rem" class="ox-search-icon"></ox-icon>
          <input 
            type="text" 
            class="ox-search-input" 
            placeholder="Filtrar clases..."
            [ngModel]="searchQuery()"
            (ngModelChange)="searchQuery.set($event)"
          />
        </div>
      </div>

      <div class="ox-table-scroll">
        <table class="ox-class-table">
          <thead>
            <tr>
              <th style="width: 260px">Clase</th>
              <th style="width: 130px">Responsivo</th>
              <th>CSS Aplicado</th>
              <th>Descripción</th>
              <th style="width: 70px; text-align: center">Copiar</th>
            </tr>
          </thead>
          <tbody>
            @for (item of filteredClasses(); track item.name) {
              <tr>
                <td>
                  <code class="ox-class-name">.{{ item.name }}</code>
                </td>
                <td>
                  @if (item.responsive !== false) {
                    <span class="ox-resp-pill" title="Admite prefijos: -sm, -md, -lg, -xl, -xxl" style="display: inline-flex; align-items: center; gap: 4px;">
                      <ox-icon name="check" size="0.75rem"></ox-icon> Responsivo
                    </span>
                  } @else {
                    <span class="ox-no-resp-pill">—</span>
                  }
                </td>
                <td>
                  <code class="ox-css-preview">{{ item.css }}</code>
                </td>
                <td class="ox-desc-cell">
                  {{ item.description }}
                </td>
                <td style="text-align: center">
                  <button 
                    type="button" 
                    class="ox-copy-btn" 
                    (click)="copyClass(item.name)"
                    [title]="'Copiar .' + item.name">
                    @if (copiedName() === item.name) {
                      <ox-icon name="check" size="0.875rem" class="ox-copied-icon"></ox-icon>
                    } @else {
                      <ox-icon name="copy" size="0.875rem"></ox-icon>
                    }
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="ox-empty">
                  No se encontraron clases que coincidan con "{{ searchQuery() }}"
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (copiedToast()) {
        <div class="ox-toast">
          <span style="display: inline-flex; align-items: center; gap: 6px;">
            <ox-icon name="check" size="sm" color="success"></ox-icon>
            Copiado: <code>.{{ copiedToast() }}</code>
          </span>
        </div>
      }
    </div>
  `,
  styles: [`
    .ox-table-wrapper {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      margin: 2rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .ox-table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.25rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .ox-table-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }
    .ox-search-box {
      position: relative;
      min-width: 220px;
    }
    .ox-search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      color: #94a3b8;
    }
    .ox-search-input {
      width: 100%;
      padding: 0.4rem 0.75rem 0.4rem 2rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 0.8125rem;
      outline: none;
    }
    .ox-search-input:focus {
      border-color: var(--oxy-primary, #0066ff);
      box-shadow: 0 0 0 2px rgba(0,102,255,0.15);
    }
    .ox-table-scroll {
      overflow-x: auto;
    }
    .ox-class-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;
    }
    .ox-class-table th {
      padding: 0.75rem 1rem;
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      font-size: 0.8125rem;
      border-bottom: 1px solid #e2e8f0;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .ox-class-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      vertical-align: middle;
    }
    .ox-class-table tr:hover td {
      background: #fbfdff;
    }
    .ox-class-name {
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-weight: 600;
      color: var(--oxy-primary, #0066ff);
      background: rgba(0, 102, 255, 0.07);
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 0.8125rem;
    }
    .ox-resp-pill {
      font-size: 0.6875rem;
      font-weight: 600;
      color: #059669;
      background: #ecfdf5;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #a7f3d0;
    }
    .ox-no-resp-pill {
      color: #94a3b8;
    }
    .ox-css-preview {
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 0.75rem;
      color: #0284c7;
      background: #f0f9ff;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .ox-desc-cell {
      font-size: 0.8125rem;
      color: #64748b;
    }
    .ox-copy-btn {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 6px;
      color: #64748b;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }
    .ox-copy-btn:hover {
      background: #f8fafc;
      color: var(--oxy-primary, #0066ff);
      border-color: var(--oxy-primary, #0066ff);
    }
    .ox-copied-icon {
      color: #059669;
      font-weight: 700;
      font-size: 0.75rem;
    }
    .ox-empty {
      padding: 2rem !important;
      text-align: center;
      color: #64748b;
    }
    .ox-toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #0f172a;
      color: #ffffff;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      font-size: 0.875rem;
      z-index: 9999;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
    }
    .ox-toast code {
      color: #38bdf8;
    }
  `]
})
export class UtilityTableComponent {
  title = input<string>('Listado de Clases');
  classes = input<UtilityClass[]>([]);

  searchQuery = signal<string>('');
  copiedName = signal<string | null>(null);
  copiedToast = signal<string | null>(null);

  filteredClasses = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const list = this.classes();
    if (!q) return list;
    return list.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.css.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  copyClass(name: string): void {
    const clean = name.replace(/\.\{.*?\}/g, '');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(clean).then(() => {
        this.copiedName.set(name);
        this.copiedToast.set(clean);
        setTimeout(() => {
          if (this.copiedName() === name) this.copiedName.set(null);
          this.copiedToast.set(null);
        }, 2000);
      });
    }
  }
}
