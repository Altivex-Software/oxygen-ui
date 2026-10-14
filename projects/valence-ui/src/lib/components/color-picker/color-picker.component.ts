import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  forwardRef,
  inject,
  input,
  linkedSignal,
  model,
  signal,
  viewChild
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

/** Color en espacio HSV: tono 0-360, saturación y brillo 0-100. */
interface HsvColor {
  h: number;
  s: number;
  v: number;
}

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
const FULL_HEX_PATTERN = /^#?[0-9a-f]{6}$/i;
const DEFAULT_HSV: HsvColor = { h: 0, s: 100, v: 100 };

/** Convierte '#abc', 'abc', '#AABBCC' o 'aabbcc' a '#aabbcc'. Devuelve null si no es válido. */
function normalizeHex(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = HEX_PATTERN.exec(value.trim());
  if (!match) return null;
  let hex = match[1].toLowerCase();
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  return '#' + hex;
}

function hexToHsv(hex: string): HsvColor {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s: max === 0 ? 0 : (d / max) * 100, v: max * 100 };
}

function hsvToHex({ h, s, v }: HsvColor): string {
  const sat = s / 100;
  const val = v / 100;
  const c = val * sat;
  const sector = (h % 360) / 60;
  const x = c * (1 - Math.abs((sector % 2) - 1));
  const m = val - c;

  let rgb: [number, number, number];
  if (sector < 1) rgb = [c, x, 0];
  else if (sector < 2) rgb = [x, c, 0];
  else if (sector < 3) rgb = [0, c, x];
  else if (sector < 4) rgb = [0, x, c];
  else if (sector < 5) rgb = [x, 0, c];
  else rgb = [c, 0, x];

  return '#' + rgb
    .map(channel => Math.round((channel + m) * 255).toString(16).padStart(2, '0'))
    .join('');
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

@Component({
  selector: 'val-color-picker',
  standalone: true,
  imports: [NgTemplateOutlet, OverlayModule, A11yModule],
  template: `
    @if (inline()) {
      <ng-container [ngTemplateOutlet]="panel"></ng-container>
    } @else {
      <button
        #trigger
        type="button"
        class="val-color-picker-trigger"
        [class.val-color-picker-trigger--open]="isOpen()"
        [disabled]="isDisabled()"
        [attr.aria-label]="ariaLabel()"
        aria-haspopup="dialog"
        [attr.aria-expanded]="isOpen()"
        (click)="toggle()">
        <span
          class="val-color-picker-swatch"
          [class.val-color-picker-swatch--empty]="!displayHex()"
          [style.background-color]="displayHex()">
        </span>
        @if (showValue()) {
          <span class="val-color-picker-value" [class.val-color-picker-value--placeholder]="!displayHex()">
            {{ displayHex() ?? placeholder() }}
          </span>
        }
      </button>

      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="trigger"
        [cdkConnectedOverlayOpen]="isOpen()"
        [cdkConnectedOverlayOffsetY]="4"
        (attach)="onPanelAttached()"
        (overlayOutsideClick)="onOutsideClick($event)"
        (overlayKeydown)="onOverlayKeydown($event)">
        <div role="dialog" [attr.aria-label]="ariaLabel()" cdkTrapFocus>
          <ng-container [ngTemplateOutlet]="panel"></ng-container>
        </div>
      </ng-template>
    }

    <ng-template #panel>
      <div class="val-color-picker-panel" [class.val-color-picker-panel--overlay]="!inline()">
        <div
          #area
          class="val-color-picker-area"
          role="slider"
          aria-label="Saturación y brillo"
          [attr.aria-valuetext]="areaValueText()"
          [attr.aria-disabled]="isDisabled()"
          [attr.tabindex]="isDisabled() ? -1 : 0"
          [style.background-color]="hueColor()"
          (pointerdown)="onAreaPointerDown($event)"
          (pointermove)="onAreaPointerMove($event)"
          (keydown)="onAreaKeydown($event)">
          <span
            class="val-color-picker-area-handle"
            [style.left.%]="hsv().s"
            [style.top.%]="100 - hsv().v">
          </span>
        </div>

        <div
          class="val-color-picker-hue"
          role="slider"
          aria-label="Tono"
          aria-valuemin="0"
          aria-valuemax="360"
          [attr.aria-valuenow]="roundedHue()"
          [attr.aria-disabled]="isDisabled()"
          [attr.tabindex]="isDisabled() ? -1 : 0"
          (pointerdown)="onHuePointerDown($event)"
          (pointermove)="onHuePointerMove($event)"
          (keydown)="onHueKeydown($event)">
          <span class="val-color-picker-hue-handle" [style.left.%]="hsv().h / 3.6"></span>
        </div>

        <div class="val-color-picker-footer">
          <span
            class="val-color-picker-preview"
            [class.val-color-picker-swatch--empty]="!displayHex()"
            [style.background-color]="displayHex()">
          </span>
          <input
            type="text"
            class="val-color-picker-hex-input"
            aria-label="Código hexadecimal"
            maxlength="7"
            spellcheck="false"
            autocomplete="off"
            placeholder="#000000"
            [value]="displayHex() ?? ''"
            [disabled]="isDisabled()"
            (input)="onHexInput($event)"
            (blur)="onHexBlur($event)"
            (keydown.enter)="onHexBlur($event)">
        </div>

        @if (normalizedPresets().length) {
          <div class="val-color-picker-presets" role="group" aria-label="Colores predefinidos">
            @for (preset of normalizedPresets(); track preset) {
              <button
                type="button"
                class="val-color-picker-preset"
                [class.val-color-picker-preset--selected]="preset === displayHex()"
                [style.background-color]="preset"
                [attr.aria-label]="preset"
                [attr.aria-pressed]="preset === displayHex()"
                [disabled]="isDisabled()"
                (click)="selectPreset(preset)">
              </button>
            }
          </div>
        }
      </div>
    </ng-template>
  `,
  styleUrl: './color-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"val-color-picker val-color-picker--" + size()',
    '[class.val-color-picker--inline]': 'inline()',
    '[class.val-color-picker--disabled]': 'isDisabled()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor {
  /** Muestra el panel siempre visible en lugar de un botón con popup. */
  inline = input<boolean>(false);
  disabled = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  /** Muestra el código hexadecimal junto a la muestra de color en el botón. */
  showValue = input<boolean>(true);
  placeholder = input<string>('Seleccionar color');
  /** Colores sugeridos que se muestran debajo del selector. */
  presets = input<string[]>([]);
  ariaLabel = input<string>('Selector de color');

  /** Color seleccionado en formato '#rrggbb', o null si no hay ninguno. */
  value = model<string | null>(null);

  isOpen = signal(false);
  private formDisabled = signal(false);

  private trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private area = viewChild<ElementRef<HTMLElement>>('area');
  private injector = inject(Injector);

  isDisabled = computed(() => this.disabled() || this.formDisabled());
  displayHex = computed(() => normalizeHex(this.value()));

  /**
   * Estado HSV interno. Se recalcula cuando cambia el valor, salvo que el valor
   * nuevo coincida con el HSV actual: así no se pierde el tono al arrastrar
   * hacia zonas grises o negras, donde el hexadecimal no conserva el tono.
   */
  hsv = linkedSignal<string | null, HsvColor>({
    source: this.displayHex,
    computation: (hex, previous) => {
      if (hex && previous && hsvToHex(previous.value) === hex) return previous.value;
      return hex ? hexToHsv(hex) : (previous?.value ?? DEFAULT_HSV);
    }
  });

  hueColor = computed(() => hsvToHex({ h: this.hsv().h, s: 100, v: 100 }));
  roundedHue = computed(() => Math.round(this.hsv().h));
  areaValueText = computed(() =>
    `Saturación ${Math.round(this.hsv().s)}%, brillo ${Math.round(this.hsv().v)}%`
  );
  normalizedPresets = computed(() =>
    this.presets().map(normalizeHex).filter((hex): hex is string => hex !== null)
  );

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else if (!this.isDisabled()) {
      this.isOpen.set(true);
    }
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.onTouched();
  }

  onPanelAttached(): void {
    afterNextRender(() => this.area()?.nativeElement.focus(), { injector: this.injector });
  }

  onOutsideClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (target && this.trigger()?.nativeElement.contains(target)) return;
    this.close();
  }

  onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    this.close();
    this.trigger()?.nativeElement.focus();
  }

  // --- Área de saturación / brillo ---

  onAreaPointerDown(event: PointerEvent): void {
    if (this.isDisabled()) return;
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    el.focus();
    event.preventDefault();
    this.updateFromArea(event, el);
  }

  onAreaPointerMove(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    if (!el.hasPointerCapture(event.pointerId)) return;
    this.updateFromArea(event, el);
  }

  onAreaKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    const step = event.shiftKey ? 10 : 1;
    const { s, v } = this.hsv();
    const moves: Record<string, Partial<HsvColor>> = {
      ArrowLeft: { s: s - step },
      ArrowRight: { s: s + step },
      ArrowUp: { v: v + step },
      ArrowDown: { v: v - step }
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const next = { ...this.hsv(), ...move };
    this.applyHsv({ ...next, s: clamp(next.s, 0, 100), v: clamp(next.v, 0, 100) });
  }

  private updateFromArea(event: PointerEvent, el: HTMLElement): void {
    const rect = el.getBoundingClientRect();
    const s = clamp((event.clientX - rect.left) / rect.width, 0, 1) * 100;
    const v = (1 - clamp((event.clientY - rect.top) / rect.height, 0, 1)) * 100;
    this.applyHsv({ ...this.hsv(), s, v });
  }

  // --- Barra de tono ---

  onHuePointerDown(event: PointerEvent): void {
    if (this.isDisabled()) return;
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    el.focus();
    event.preventDefault();
    this.updateFromHue(event, el);
  }

  onHuePointerMove(event: PointerEvent): void {
    const el = event.currentTarget as HTMLElement;
    if (!el.hasPointerCapture(event.pointerId)) return;
    this.updateFromHue(event, el);
  }

  onHueKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    const step = event.shiftKey ? 10 : 1;
    const h = this.hsv().h;
    const targets: Record<string, number> = {
      ArrowLeft: h - step,
      ArrowDown: h - step,
      ArrowRight: h + step,
      ArrowUp: h + step,
      Home: 0,
      End: 360
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    this.applyHsv({ ...this.hsv(), h: clamp(target, 0, 360) });
  }

  private updateFromHue(event: PointerEvent, el: HTMLElement): void {
    const rect = el.getBoundingClientRect();
    const h = clamp((event.clientX - rect.left) / rect.width, 0, 1) * 360;
    this.applyHsv({ ...this.hsv(), h });
  }

  // --- Campo hexadecimal y colores predefinidos ---

  onHexInput(event: Event): void {
    // Solo se aplica el color con 6 dígitos completos para no reescribir el
    // campo mientras el usuario escribe (por ejemplo '#fff' de camino a '#fff000').
    const text = (event.target as HTMLInputElement).value;
    if (FULL_HEX_PATTERN.test(text.trim())) {
      this.commit(normalizeHex(text));
    }
  }

  onHexBlur(event: Event): void {
    const field = event.target as HTMLInputElement;
    const hex = normalizeHex(field.value);
    if (hex) this.commit(hex);
    field.value = this.displayHex() ?? '';
    this.onTouched();
  }

  selectPreset(hex: string): void {
    if (this.isDisabled()) return;
    this.commit(hex);
    this.onTouched();
  }

  private applyHsv(next: HsvColor): void {
    this.hsv.set(next);
    this.commit(hsvToHex(next));
  }

  private commit(hex: string | null): void {
    if (hex === this.displayHex()) return;
    this.value.set(hex);
    this.onChange(hex);
  }

  // --- ControlValueAccessor ---

  writeValue(value: string | null): void {
    this.value.set(normalizeHex(value));
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
    if (isDisabled) this.isOpen.set(false);
  }
}
