import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'oxygen-ui';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  template: `
    <div class="ox-page-container">
      <h1>Alert</h1>
      <p class="ox-description">
        Alerts are used to communicate important information or feedback to the user.
      </p>

      <section class="ox-section">
        <h2>Severities</h2>
        <div class="demo-grid">
          <ox-alert severity="info" title="Info Alert">
            This is an informative message for the user.
          </ox-alert>
          <ox-alert severity="success" title="Success Alert">
            The operation was completed successfully!
          </ox-alert>
          <ox-alert severity="warn" title="Warning Alert">
            Be careful, this action might have consequences.
          </ox-alert>
          <ox-alert severity="error" title="Error Alert">
            Something went wrong while processing your request.
          </ox-alert>
        </div>
      </section>

      <section class="ox-section">
        <h2>Variants</h2>
        <div class="demo-grid">
          <h3>Filled</h3>
          <ox-alert variant="filled" severity="info">A filled alert variant.</ox-alert>
          
          <h3>Outlined</h3>
          <ox-alert variant="outlined" severity="success">An outlined alert variant.</ox-alert>
          
          <h3>Glass (Blurred)</h3>
          <div style="background: linear-gradient(45deg, #3b82f6, #a855f7); padding: 2rem; border-radius: 12px;">
             <ox-alert variant="glass" severity="info">Glass variant with backdrop blur effect.</ox-alert>
          </div>
        </div>
      </section>

      <section class="ox-section">
        <h2>Closable</h2>
        <ox-alert [closable]="true" (onClose)="handleClose()" severity="warn">
          Click the close icon to dismiss this alert.
        </ox-alert>
      </section>
    </div>
  `
})
export class AlertDemoComponent {
  handleClose() {
    console.log('Alert closed');
  }
}