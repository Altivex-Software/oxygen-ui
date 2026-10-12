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
import { ValIconName, ValIconSize, ValIconColor, ValIconVariant } from './icon.types';
import { VAL_ICONS, IconDefinition } from './icons';

@Component({
  selector: 'val-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="val-icon-wrapper" [innerHTML]="sanitizedFullSvg()"></span>
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

    .val-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    .val-icon-svg {
      display: block;
      transition: color 0.15s ease, transform 0.15s ease;
    }

    .val-icon-spin {
      animation: valIconSpin 1s linear infinite;
    }

    @keyframes valIconSpin {
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
  name = input<ValIconName>('info');

  /** Tamaño del icono: 'xs' (14px), 'sm' (16px), 'md' (20px), 'lg' (24px), 'xl' (32px), '2xl' (40px), o número/string personalizado */
  size = input<ValIconSize>('md');

  /** Color del icono: 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'muted', 'white', 'inherit' o código hex/rgb */
  color = input<ValIconColor>('inherit');

  /** Grosor del trazo SVG (por defecto: 2) */
  strokeWidth = input<number>(2);

  /** Modo de relleno sólido (fill) */
  fill = input<boolean>(false);

  /** Variante de estilo: 'outline' (predeterminado) o 'fill' (relleno) */
  variant = input<ValIconVariant>('outline');

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
    const baseName = rawName.endsWith('-fill') ? rawName.replace(/-fill$/, '') as ValIconName : rawName as ValIconName;
    const fillName = (baseName + '-fill') as ValIconName;

    if (filled && VAL_ICONS[fillName]) {
      return VAL_ICONS[fillName];
    }
    if (VAL_ICONS[rawName as ValIconName]) {
      return VAL_ICONS[rawName as ValIconName];
    }
    if (VAL_ICONS[baseName]) {
      return VAL_ICONS[baseName];
    }
    return VAL_ICONS['info'];
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
    const spinClass = this.spin() ? ' val-icon-spin' : '';

    const styleStr = `width:${width};height:${height};color:${color};${transform ? `transform:${transform};` : ''}`;
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="${styleStr}" class="val-icon-svg${spinClass}">${rawPaths}</svg>`;

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
      case 'primary': return 'var(--val-primary, #0066ff)';
      case 'secondary': return 'var(--val-secondary, #64748b)';
      case 'success': return 'var(--val-success, #28a745)';
      case 'danger': return 'var(--val-danger, #e74c3c)';
      case 'warning': return 'var(--val-warning, #f1c40f)';
      case 'info': return 'var(--val-info, #3498db)';
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
