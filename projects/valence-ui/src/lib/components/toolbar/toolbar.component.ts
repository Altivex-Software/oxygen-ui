import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'val-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  host: {
    '[class.val-toolbar]': 'true',
    '[class.val-toolbar--primary]': 'color() === "primary"',
    '[class.val-toolbar--surface]': 'color() === "surface"',
    '[class.val-toolbar--secondary]': 'color() === "secondary"',
    '[class.val-toolbar--transparent]': 'color() === "transparent"',
    '[class.val-toolbar--sticky]': 'sticky()',
    '[class.val-toolbar--shadow]': 'shadow()'
  }
})
export class ToolbarComponent {
  color = input<'primary' | 'surface' | 'secondary' | 'transparent'>('surface');
  sticky = input<boolean>(false);
  shadow = input<boolean>(true);
}
