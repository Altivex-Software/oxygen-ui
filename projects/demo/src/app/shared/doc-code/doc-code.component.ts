import { 
  Component, 
  input, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CodeTab {
  label: string;
  code: string;
  language?: 'html' | 'ts' | 'scss' | 'json' | string;
}

@Component({
  selector: 'app-doc-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ox-doc-code-card">
      <!-- Preview Header & Actions -->
      <div class="ox-doc-preview-bar">
        <div class="ox-doc-preview-info">
          @if (title()) {
            <span class="ox-doc-title">{{ title() }}</span>
          }
          @if (description()) {
            <span class="ox-doc-subtitle">{{ description() }}</span>
          }
        </div>

        <div class="ox-doc-preview-actions">
          <button 
            type="button" 
            class="ox-doc-action-btn"
            [class.ox-doc-action-btn-active]="isCodeVisible()"
            (click)="toggleCode()"
            title="Ver código fuente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>{{ isCodeVisible() ? 'Ocultar Código' : 'Ver Código' }}</span>
          </button>
        </div>
      </div>

      <!-- Live Interactive Preview Slot -->
      <div class="ox-doc-preview-content">
        <ng-content></ng-content>
      </div>

      <!-- Collapsible Code Section -->
      @if (isCodeVisible()) {
        <div class="ox-doc-code-wrapper">
          <!-- Tab Bar & Copy Action -->
          <div class="ox-doc-tabs-bar">
            <div class="ox-doc-tabs">
              @for (tab of activeTabs(); track tab.label; let i = $index) {
                <button 
                  type="button" 
                  class="ox-doc-tab-btn"
                  [class.ox-doc-tab-btn-active]="selectedTabIndex() === i"
                  (click)="selectedTabIndex.set(i)">
                  {{ tab.label }}
                </button>
              }
            </div>

            <button 
              type="button" 
              class="ox-doc-copy-btn"
              (click)="copyActiveCode()"
              title="Copiar al portapapeles">
              @if (isCopied()) {
                <span class="ox-doc-copied-text">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  ¡Copiado!
                </span>
              } @else {
                <span class="ox-doc-copy-text">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copiar
                </span>
              }
            </button>
          </div>

          <!-- Code View -->
          <div class="ox-doc-code-block">
            <pre><code>{{ currentCode() }}</code></pre>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .ox-doc-code-card {
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-lg, 12px);
      background: var(--bg-surface, #ffffff);
      overflow: hidden;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: border-color 0.2s;
    }

    .ox-doc-preview-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      background: var(--bg-surface-subtle, #f8fafc);
      border-bottom: 1px solid var(--border-color, #f1f5f9);
    }

    .ox-doc-preview-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ox-doc-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary, #0f172a);
    }

    .ox-doc-subtitle {
      font-size: 0.8125rem;
      color: var(--text-secondary, #64748b);
    }

    .ox-doc-preview-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ox-doc-action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-secondary, #475569);
      background: var(--bg-surface, #ffffff);
      border: 1px solid var(--border-color, #cbd5e1);
      border-radius: var(--radius-md, 6px);
      cursor: pointer;
      transition: all 0.15s ease-in-out;
    }

    .ox-doc-action-btn:hover {
      background: var(--primary-50, #eef2ff);
      color: var(--primary-color, #4f46e5);
      border-color: var(--primary-200, #c7d2fe);
    }

    .ox-doc-action-btn-active {
      background: var(--primary-100, #e0e7ff) !important;
      color: var(--primary-color, #4f46e5) !important;
      border-color: var(--primary-400, #818cf8) !important;
    }

    .ox-doc-preview-content {
      padding: 1.5rem;
      background: var(--bg-surface, #ffffff);
    }

    /* Code View Section */
    .ox-doc-code-wrapper {
      border-top: 1px solid #1e293b;
      background: #0f172a;
      animation: oxDocFadeDown 0.2s ease-out;
    }

    .ox-doc-tabs-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      background: #1e293b;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .ox-doc-tabs {
      display: flex;
      gap: 4px;
    }

    .ox-doc-tab-btn {
      padding: 8px 14px;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #94a3b8;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
    }

    .ox-doc-tab-btn:hover {
      color: #f8fafc;
    }

    .ox-doc-tab-btn-active {
      color: #60a5fa !important;
      border-bottom-color: #60a5fa !important;
      background: rgba(255, 255, 255, 0.03);
    }

    .ox-doc-copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 500;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .ox-doc-copy-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.15);
    }

    .ox-doc-copied-text {
      color: #34d399;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
    }

    .ox-doc-copy-text {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .ox-doc-code-block {
      padding: 1.25rem 1.5rem;
      overflow-x: auto;
      max-height: 450px;
    }

    .ox-doc-code-block pre {
      margin: 0;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;
      font-size: 0.8125rem;
      line-height: 1.6;
      color: #e2e8f0;
      white-space: pre;
    }

    @keyframes oxDocFadeDown {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DocCodeComponent {
  title = input<string>('');
  description = input<string>('');
  html = input<string>('');
  htmlCode = input<string>('');
  ts = input<string>('');
  tsCode = input<string>('');
  scss = input<string>('');
  customTabs = input<CodeTab[]>([]);

  isCodeVisible = signal<boolean>(false);
  selectedTabIndex = signal<number>(0);
  isCopied = signal<boolean>(false);

  activeTabs = computed<CodeTab[]>(() => {
    if (this.customTabs().length > 0) {
      return this.customTabs();
    }
    const tabs: CodeTab[] = [];
    const htmlContent = this.html() || this.htmlCode();
    const tsContent = this.ts() || this.tsCode();
    if (htmlContent) {
      tabs.push({ label: 'HTML', code: htmlContent, language: 'html' });
    }
    if (tsContent) {
      tabs.push({ label: 'TypeScript', code: tsContent, language: 'ts' });
    }
    if (this.scss()) {
      tabs.push({ label: 'SCSS', code: this.scss(), language: 'scss' });
    }
    return tabs;
  });

  currentCode = computed<string>(() => {
    const tabs = this.activeTabs();
    const idx = this.selectedTabIndex();
    return tabs[idx]?.code || '';
  });

  toggleCode(): void {
    this.isCodeVisible.update(v => !v);
  }

  copyActiveCode(): void {
    const text = this.currentCode();
    if (!text) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2000);
      });
    }
  }
}
