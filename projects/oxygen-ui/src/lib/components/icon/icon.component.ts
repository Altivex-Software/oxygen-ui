import { 
  Component, 
  input, 
  computed, 
  inject, 
  ChangeDetectionStrategy, 
  ViewEncapsulation 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OxIconName, OxIconSize, OxIconColor, OxIconVariant } from './icon.types';
import { OX_ICONS, IconDefinition } from './icons';

@Component({
  selector: 'ox-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="ox-icon-wrapper" [innerHTML]="sanitizedFullSvg()"></span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 0;
      flex-shrink: 0;
    }

    .ox-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .ox-icon-svg {
      display: block;
      transition: color 0.15s ease, transform 0.15s ease;
    }

    .ox-icon-spin {
      animation: oxIconSpin 1s linear infinite;
    }

    @keyframes oxIconSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);

  /** Nombre del icono (ej: 'search', 'check', 'heart', 'heart-fill', etc.) */
  name = input<OxIconName>('info');

  /** Tamaño del icono: 'xs' (14px), 'sm' (16px), 'md' (20px), 'lg' (24px), 'xl' (32px), '2xl' (40px), o número/string personalizado */
  size = input<OxIconSize>('md');

  /** Color del icono: 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'muted', 'white', 'inherit' o código hex/rgb */
  color = input<OxIconColor>('inherit');

  /** Grosor del trazo SVG (por defecto: 2) */
  strokeWidth = input<number>(2);

  /** Modo de relleno sólido (fill) */
  fill = input<boolean>(false);

  /** Variante de estilo: 'outline' (predeterminado) o 'fill' (relleno) */
  variant = input<OxIconVariant>('outline');

  /** Activa la animación continua de giro 360° (ideal para loaders o spinners) */
  spin = input<boolean>(false);

  /** Rotación fija en grados (ej: 90, 180, 270) */
  rotate = input<number>(0);

  /** Determina si el icono debe renderizarse en modo relleno */
  isFilled = computed<boolean>(() => {
    return this.fill() || this.variant() === 'fill' || (typeof this.name() === 'string' && this.name().endsWith('-fill'));
  });

  /** Definición activa del icono */
  activeIconDef = computed<IconDefinition>(() => {
    const rawName = this.name() as string;
    const filled = this.isFilled();
    const baseName = rawName.endsWith('-fill') ? rawName.replace(/-fill$/, '') as OxIconName : rawName as OxIconName;
    const fillName = (baseName + '-fill') as OxIconName;

    if (filled && OX_ICONS[fillName]) {
      return OX_ICONS[fillName];
    }
    if (OX_ICONS[rawName as OxIconName]) {
      return OX_ICONS[rawName as OxIconName];
    }
    if (OX_ICONS[baseName]) {
      return OX_ICONS[baseName];
    }
    return OX_ICONS['info'];
  });

  /** Contenido SVG completo saneado compatible con SSR */
  sanitizedFullSvg = computed<SafeHtml>(() => {
    const def = this.activeIconDef();
    const filled = this.isFilled();
    const rawPaths = (filled && def.fillPaths) ? def.fillPaths : def.paths;
    const fill = this.resolvedFill();
    const stroke = this.resolvedStroke();
    const strokeWidth = this.resolvedStrokeWidth();
    const width = this.dimension();
    const height = this.dimension();
    const color = this.resolvedColor();
    const transform = this.transformStyle();
    const spinClass = this.spin() ? ' ox-icon-spin' : '';

    const styleStr = `width:${width};height:${height};color:${color};${transform ? `transform:${transform};` : ''}`;
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="${styleStr}" class="ox-icon-svg${spinClass}">${rawPaths}</svg>`;

    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  });

  /** Relleno resuelto del SVG */
  resolvedFill = computed<string>(() => {
    return this.isFilled() ? 'currentColor' : 'none';
  });

  /** Trazo resuelto del SVG */
  resolvedStroke = computed<string>(() => {
    const def = this.activeIconDef();
    if (this.isFilled() && def.strokeInFill === false) {
      return 'none';
    }
    return 'currentColor';
  });

  /** Grosor del trazo resuelto */
  resolvedStrokeWidth = computed<number>(() => {
    const def = this.activeIconDef();
    if (this.isFilled() && def.strokeInFill === false) {
      return 0;
    }
    return this.strokeWidth();
  });

  /** Dimensión calculada en píxeles o formato CSS */
  dimension = computed<string>(() => {
    const s = this.size();
    if (typeof s === 'number') {
      return `${s}px`;
    }
    switch (s) {
      case 'xs': return '14px';
      case 'sm': return '16px';
      case 'md': return '20px';
      case 'lg': return '24px';
      case 'xl': return '32px';
      case '2xl': return '40px';
      case '3xl': return '48px';
      default:
        return isNaN(Number(s)) ? s : `${s}px`;
    }
  });

  /** Color semántico resuelto */
  resolvedColor = computed<string>(() => {
    const c = this.color();
    switch (c) {
      case 'primary': return 'var(--oxy-primary, #0066ff)';
      case 'secondary': return 'var(--oxy-secondary, #64748b)';
      case 'success': return 'var(--oxy-success, #28a745)';
      case 'danger': return 'var(--oxy-danger, #e74c3c)';
      case 'warning': return 'var(--oxy-warning, #f1c40f)';
      case 'info': return 'var(--oxy-info, #3498db)';
      case 'muted': return '#94a3b8';
      case 'light': return '#f8fafc';
      case 'dark': return '#0f172a';
      case 'white': return '#ffffff';
      case 'inherit': return 'currentColor';
      default: return c || 'currentColor';
    }
  });

  /** Estilo de transformación (rotación) */
  transformStyle = computed<string>(() => {
    const r = this.rotate();
    if (r && !this.spin()) {
      return `rotate(${r}deg)`;
    }
    return '';
  });
}
