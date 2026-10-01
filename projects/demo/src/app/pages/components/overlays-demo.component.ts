import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { 
  PopoverComponent, 
  ContextMenuComponent, 
  ConfirmPopupComponent, 
  ButtonComponent, 
  InputComponent,
  ContextMenuItem,
  BadgeComponent,
  OxygenTemplateDirective,
  TableComponent
} from "oxygen-ui";

@Component({
  selector: "app-overlays-demo",
  standalone: true,
  imports: [
    CommonModule, 
    PopoverComponent, 
    ContextMenuComponent, 
    ConfirmPopupComponent, 
    ButtonComponent, 
    BadgeComponent,
    OxygenTemplateDirective,
    TableComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Overlays & Context Menus (Phase 2)</h1>
      <p class="ox-description">
        Demonstration of <code>ox-popover</code>, <code>ox-context-menu</code> and <code>ox-confirm-popup</code> components.
      </p>

      <!-- 1. POPOVER -->
      <section class="ox-section">
        <h2>1. Popover (OverlayPanel)</h2>
        <p>Floating interactive container anchored to any trigger element.</p>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <ox-popover #userPopover>
            <ox-button oxTarget variant="primary">👤 View User Profile</ox-button>

            <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 220px;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #2563eb; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                  JD
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 0.9375rem;">Jane Doe</h4>
                  <span style="font-size: 0.75rem; color: #64748b;">jane.doe&#64;example.com</span>
                </div>
              </div>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;" />
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8125rem; color: #475569;">Role:</span>
                <ox-badge value="Administrator" severity="primary" size="sm"></ox-badge>
              </div>
              <ox-button size="sm" variant="outline-primary" (click)="userPopover.close()">Close Profile</ox-button>
            </div>
          </ox-popover>
        </div>
      </section>

      <!-- 2. CONFIRM POPUP -->
      <section class="ox-section">
        <h2>2. ConfirmPopup</h2>
        <p>Compact, inline confirmation overlay for destructive or important actions.</p>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <ox-confirm-popup 
            message="Are you sure you want to delete this item?"
            acceptLabel="Delete"
            rejectLabel="Cancel"
            acceptVariant="danger"
            (onAccept)="onDeleteConfirmed()"
            (onReject)="onDeleteCancelled()">
            <ox-button oxTarget variant="danger">🗑️ Delete Item</ox-button>
          </ox-confirm-popup>

          <span *ngIf="lastActionMessage" style="font-size: 0.875rem; color: #475569; font-weight: 500;">
            Status: {{ lastActionMessage }}
          </span>
        </div>
      </section>

      <!-- 3. CONTEXT MENU -->
      <section class="ox-section">
        <h2>3. ContextMenu (Right Click)</h2>
        <p>Right-click on any row in the table below to trigger the custom context menu.</p>

        <ox-context-menu #contextMenu [model]="menuItems"></ox-context-menu>

        <ox-table [value]="users">
          <ng-template oxTemplate="header">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Right Click Action</th>
            </tr>
          </ng-template>

          <ng-template oxTemplate="body" let-user>
            <tr (contextmenu)="contextMenu.show($event, user)" style="cursor: context-menu;">
              <td class="ox-fw-bold">{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <ox-badge [value]="user.role" [severity]="user.role === 'Admin' ? 'danger' : 'info'" size="sm"></ox-badge>
              </td>
              <td style="color: #94a3b8; font-size: 0.8125rem;">Right-click row for options 🖱️</td>
            </tr>
          </ng-template>
        </ox-table>
      </section>
    </div>
  `
})
export class OverlaysDemoComponent {
  lastActionMessage = "";

  users = [
    { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "Admin" },
    { id: 2, name: "Sarah Connor", email: "sarah@example.com", role: "User" },
    { id: 3, name: "John Wick", email: "john@example.com", role: "Admin" }
  ];

  menuItems: ContextMenuItem[] = [
    { label: "View Profile", icon: "👤", command: (e) => this.action("Viewed " + e.data?.name) },
    { label: "Edit Record", icon: "✏️", command: (e) => this.action("Editing " + e.data?.name) },
    { separator: true },
    { label: "Delete User", icon: "🗑️", danger: true, command: (e) => this.action("Deleted " + e.data?.name) }
  ];

  onDeleteConfirmed() {
    this.lastActionMessage = "Item deleted successfully! ✅";
  }

  onDeleteCancelled() {
    this.lastActionMessage = "Deletion cancelled ❌";
  }

  action(msg: string) {
    this.lastActionMessage = msg;
  }
}
