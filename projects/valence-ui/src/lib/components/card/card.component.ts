import { Component, Directive, input, model, computed, contentChild, ElementRef, effect, viewChild, signal, untracked } from "@angular/core";
import { ValenceSize } from "../../lib-core";
import { CommonModule } from "@angular/common";

@Directive({
  selector: "[valCardHeader]",
  standalone: true
})
export class ValCardHeaderDirective {}

@Directive({
  selector: "[valCardBody]",
  standalone: true
})
export class ValCardBodyDirective {}

@Directive({
  selector: "[valCardFooter]",
  standalone: true
})
export class ValCardFooterDirective {}

@Directive({
  selector: "[valCardBack]",
  standalone: true
})
export class ValCardBackDirective {}

@Directive({
  selector: "[valCardBackHeader]",
  standalone: true
})
export class ValCardBackHeaderDirective {}

@Directive({
  selector: "[valCardBackBody]",
  standalone: true
})
export class ValCardBackBodyDirective {}

@Directive({
  selector: "[valCardBackFooter]",
  standalone: true
})
export class ValCardBackFooterDirective {}

@Component({
  selector: "val-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  host: {
    "[class]": "hostClasses()",
    "[style.--val-card-shadow]": "shadowValue()",
    "[class.val-card--flipped]": "flipped()",
    "[class.val-card--animating]": "isAnimating()",
    "role": "article"
  }
})
export class CardComponent {
  boxShadow = input<ValenceSize | "none">("sm");
  bordered = input<boolean>(true);
  hoverable = input<boolean>(false);
  liftOnHover = input<boolean>(false);
  flipped = model<boolean>(false);
  
  isAnimating = signal<boolean>(false);

  header = contentChild(ValCardHeaderDirective);
  body = contentChild(ValCardBodyDirective);
  footer = contentChild(ValCardFooterDirective);
  
  back = contentChild(ValCardBackDirective);
  backHeader = contentChild(ValCardBackHeaderDirective);
  backBody = contentChild(ValCardBackBodyDirective);
  backFooter = contentChild(ValCardBackFooterDirective);

  hasBack = computed(() => !!this.back() || !!this.backHeader() || !!this.backBody() || !!this.backFooter());

  frontContainer = viewChild<ElementRef<HTMLElement>>("frontSide");
  backContainer = viewChild<ElementRef<HTMLElement>>("backSide");

  constructor() {
    let isFirstRun = true;
    effect((onCleanup) => {
      const isFlipped = this.flipped();
      
      untracked(() => {
        this.isAnimating.set(true);
      });
      
      const timer = setTimeout(() => {
        untracked(() => {
            this.isAnimating.set(false);
        });

        if (!isFirstRun) {
          const target = isFlipped ? this.backContainer() : this.frontContainer();
          if (target) {
            const focusable = target.nativeElement.querySelector("button, a, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])") as HTMLElement;
            if (focusable) {
              focusable.focus();
            }
          }
        }
        isFirstRun = false;
      }, 600);

      onCleanup(() => clearTimeout(timer));
    });
  }

  hostClasses = computed(() => {
    const classes = ["val-card"];
    if (this.bordered()) classes.push("val-card--bordered");
    if (this.hoverable()) classes.push("val-card--hoverable");
    if (this.liftOnHover()) classes.push("val-card--lift");
    return classes.join(" ");
  });

  shadowValue = computed(() => {
    const s = this.boxShadow();
    if (s === "none") return "none";
    return "var(--shadow-" + s + ")";
  });
}
