import { 
  Component, 
  input, 
  signal, 
  computed, 
  ChangeDetectionStrategy, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'valence-ui';

export interface CodeTab {
  label: string;
  code: string;
  language?: 'html' | 'ts' | 'scss' | 'json' | string;
}

@Component({
  selector: 'app-doc-code',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="val-doc-code-card">
      <!-- Preview Header & Actions -->
      <div class="val-doc-preview-bar">
        <div class="val-doc-preview-info">
          @if (title()) {
            <span class="val-doc-title">{{ title() }}</span>
          }
          @if (description()) {
            <span class="val-doc-subtitle">{{ description() }}</span>
          }
        </div>

        <div class="val-doc-preview-actions">
          <button 
            type="button" 
            class="val-doc-action-btn"
            [class.val-doc-action-btn-active]="isCodeVisible()"
            (click)="toggleCode()"
            title="Ver código fuente">
            <val-icon name="code" size="1rem"></val-icon>
            <span>{{ isCodeVisible() ? 'Ocultar Código' : 'Ver Código' }}</span>
          </button>
        </div>
      </div>

      <!-- Live Interactive Preview Slot -->
      <div class="val-doc-preview-content">
        <ng-content></ng-content>
      </div>

      <!-- Collapsible Code Section -->
      @if (isCodeVisible()) {
        <div class="val-doc-code-wrapper">
          <!-- Tab Bar & Copy Action -->
          <div class="val-doc-tabs-bar">
            <div class="val-doc-tabs">
              @for (tab of activeTabs(); track tab.label; let i = $index) {
                <button 
                  type="button" 
                  class="val-doc-tab-btn"
                  [class.val-doc-tab-btn-active]="selectedTabIndex() === i"
                  (click)="selectedTabIndex.set(i)">
                  {{ tab.label }}
                </button>
              }
            </div>

            <button 
              type="button" 
              class="val-doc-copy-btn"
              (click)="copyActiveCode()"
              title="Copiar al portapapeles">
              @if (isCopied()) {
                <span class="val-doc-copied-text">
                  <val-icon name="check" size="0.875rem"></val-icon>
                  ¡Copiado!
                </span>
              } @else {
                <span class="val-doc-copy-text">
                  <val-icon name="copy" size="0.875rem"></val-icon>
                  Copiar
                </span>
              }
            </button>
          </div>

          <!-- Code View -->
          <div class="val-doc-code-block">
            <pre><code>{{ currentCode() }}</code></pre>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .val-doc-code-card {
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--radius-lg, 12px);
      background: var(--bg-surface, #ffffff);
      overflow: hidden;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: border-color 0.2s;
    }

    .val-doc-preview-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      background: var(--bg-surface-subtle, #f8fafc);
      border-bottom: 1px solid var(--border-color, #f1f5f9);
    }

    .val-doc-preview-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .val-doc-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary, #0f172a);
    }

    .val-doc-subtitle {
      font-size: 0.8125rem;
      color: var(--text-secondary, #64748b);
    }

    .val-doc-preview-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .val-doc-action-btn {
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

    .val-doc-action-btn:hover {
      background: var(--primary-50, #eef2ff);
      color: var(--primary-color, #4f46e5);
      border-color: var(--primary-200, #c7d2fe);
    }

    .val-doc-action-btn-active {
      background: var(--primary-100, #e0e7ff) !important;
      color: var(--primary-color, #4f46e5) !important;
      border-color: var(--primary-400, #818cf8) !important;
    }

    .val-doc-preview-content {
      padding: 2rem;
      background-color: #f8fafc;
      background-image: radial-gradient(#e2e8f0 1.2px, transparent 1.2px);
      background-size: 16px 16px;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Code View Section */
    .val-doc-code-wrapper {
      border-top: 1px solid #1e293b;
      background: #0f172a;
      animation: valDocFadeDown 0.2s ease-out;
    }

    .val-doc-tabs-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      background: #1e293b;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .val-doc-tabs {
      display: flex;
      gap: 4px;
    }

    .val-doc-tab-btn {
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

    .val-doc-tab-btn:hover {
      color: #f8fafc;
    }

    .val-doc-tab-btn-active {
      color: #60a5fa !important;
      border-bottom-color: #60a5fa !important;
      background: rgba(255, 255, 255, 0.03);
    }

    .val-doc-copy-btn {
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

    .val-doc-copy-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.15);
    }

    .val-doc-copied-text {
      color: #34d399;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
    }

    .val-doc-copy-text {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .val-doc-code-block {
      padding: 1.25rem 1.5rem;
      overflow-x: auto;
      max-height: 450px;
    }

    .val-doc-code-block pre {
      margin: 0;
      font-family: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;
      font-size: 0.8125rem;
      line-height: 1.6;
      color: #e2e8f0;
      white-space: pre;
    }

    @keyframes valDocFadeDown {
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
