import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { 
  ProgressBarComponent, 
  ProgressSpinnerComponent, 
  TagComponent, 
  BlockUIComponent, 
  ButtonComponent, 
  CardComponent 
} from "oxygen-ui";

@Component({
  selector: "app-feedback-demo",
  standalone: true,
  imports: [
    CommonModule, 
    ProgressBarComponent, 
    ProgressSpinnerComponent, 
    TagComponent, 
    BlockUIComponent, 
    ButtonComponent, 
    CardComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Feedback & Progress (Phase 3)</h1>
      <p class="ox-description">
        Demonstration of <code>ox-progress-bar</code>, <code>ox-progress-spinner</code>, <code>ox-tag</code>, and <code>ox-block-ui</code> components.
      </p>

      <!-- 1. PROGRESS BAR -->
      <section class="ox-section">
        <h2>1. ProgressBar</h2>
        <p>Determinate & Indeterminate progress indicators with severities.</p>

        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
          <div>
            <label style="font-size: 0.875rem; font-weight: 600; color: #475569;">Determinate (Dynamic Progress)</label>
            <ox-progress-bar [value]="progressValue" severity="primary"></ox-progress-bar>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <ox-button size="sm" (click)="decreaseProgress()">- 10%</ox-button>
            <ox-button size="sm" (click)="increaseProgress()">+ 10%</ox-button>
          </div>

          <div>
            <label style="font-size: 0.875rem; font-weight: 600; color: #475569;">Severities</label>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
              <ox-progress-bar [value]="80" severity="success"></ox-progress-bar>
              <ox-progress-bar [value]="45" severity="warning"></ox-progress-bar>
              <ox-progress-bar [value]="20" severity="danger"></ox-progress-bar>
            </div>
          </div>

          <div>
            <label style="font-size: 0.875rem; font-weight: 600; color: #475569;">Indeterminate Loading</label>
            <ox-progress-bar mode="indeterminate" severity="info" style="margin-top: 0.5rem;"></ox-progress-bar>
          </div>
        </div>
      </section>

      <!-- 2. PROGRESS SPINNER -->
      <section class="ox-section">
        <h2>2. ProgressSpinner</h2>
        <p>Circular loading indicator with customizable size and stroke width.</p>

        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <ox-progress-spinner severity="primary" size="2rem"></ox-progress-spinner>
          <ox-progress-spinner severity="success" size="2.5rem"></ox-progress-spinner>
          <ox-progress-spinner severity="warning" size="3rem" strokeWidth="6"></ox-progress-spinner>
          <ox-progress-spinner severity="danger" size="3.5rem"></ox-progress-spinner>
        </div>
      </section>

      <!-- 3. TAGS & CHIPS -->
      <section class="ox-section">
        <h2>3. Tags & Chips</h2>
        <p>Status badges with icons, rounded borders and interactive dismiss options.</p>

        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-bottom: 1rem;">
          <ox-tag value="Active" severity="success" icon="✅"></ox-tag>
          <ox-tag value="Pending" severity="warning" icon="⏳"></ox-tag>
          <ox-tag value="Rejected" severity="danger" icon="❌"></ox-tag>
          <ox-tag value="Processing" severity="info" icon="⚡"></ox-tag>
          <ox-tag value="Draft" severity="secondary"></ox-tag>
        </div>

        <h3>Rounded & Removable Tags</h3>
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          @for (tag of tags; track tag) {
            <ox-tag 
              [value]="tag" 
              [rounded]="true" 
              [removable]="true" 
              severity="primary"
              (onRemove)="removeTag(tag)">
            </ox-tag>
          }
        </div>
      </section>

      <!-- 4. BLOCK UI -->
      <section class="ox-section">
        <h2>4. BlockUI (Section Lock)</h2>
        <p>Lock cards or panels during background operations.</p>

        <div style="margin-bottom: 1rem;">
          <ox-button (click)="isBlocked = !isBlocked" variant="outline-primary">
            {{ isBlocked ? 'Unblock Section' : 'Block Section' }}
          </ox-button>
        </div>

        <ox-block-ui [blocked]="isBlocked" message="Loading data...">
          <ox-card style="max-width: 450px;">
            <div style="padding: 1.5rem;">
              <h3 style="margin-top: 0;">User Account Details</h3>
              <p style="color: #64748b;">
                This section contains sensitive account settings. Toggle the button above to simulate a section block.
              </p>
              <div style="display: flex; gap: 0.5rem;">
                <ox-button size="sm">Save Changes</ox-button>
                <ox-button size="sm" variant="ghost-secondary">Cancel</ox-button>
              </div>
            </div>
          </ox-card>
        </ox-block-ui>
      </section>
    </div>
  `
})
export class FeedbackDemoComponent {
  progressValue = 50;
  isBlocked = false;

  tags = ["Angular 21", "TypeScript", "Oxygen UI", "PrimeNG Alternative"];

  increaseProgress() {
    this.progressValue = Math.min(100, this.progressValue + 10);
  }

  decreaseProgress() {
    this.progressValue = Math.max(0, this.progressValue - 10);
  }

  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter(t => t !== tagToRemove);
  }
}
