import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ValenceConfig {
  ripple: boolean;
  inputStyle: 'filled' | 'outlined';
  theme: ThemeMode;
}

@Injectable({
  providedIn: 'root'
})
export class ValenceConfigService {
  config = signal<ValenceConfig>({
    ripple: true,
    inputStyle: 'outlined',
    theme: 'light'
  });

  constructor() {
    // Escuchar cambios en el tema para aplicar clases al body
    effect(() => {
      const theme = this.config().theme;
      this.applyTheme(theme);
    });
  }

  updateConfig(newConfig: Partial<ValenceConfig>) {
    this.config.update(current => ({ ...current, ...newConfig }));
  }

  private applyTheme(theme: ThemeMode) {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    root.classList.remove('val-dark', 'val-light');
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'val-dark' : 'val-light');
    } else {
      root.classList.add(`ox-${theme}`);
    }
  }
}
