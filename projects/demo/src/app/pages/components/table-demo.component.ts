import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent, OxygenTemplateDirective, BadgeComponent, ButtonComponent } from "oxygen-ui";

@Component({
  selector: "app-table-demo",
  standalone: true,
  imports: [CommonModule, TableComponent, OxygenTemplateDirective, BadgeComponent, ButtonComponent],
  template: `
    <div class="ox-page-container">
      <h1>Table</h1>
      <p class="ox-description">
        Display large amounts of data in a structured way with custom templates.
      </p>

      <section class="ox-section">
        <h2>Basic Table</h2>
        <ox-table 
          [value]="customers" 
          [columns]="['name', 'country', 'status', 'activity']">
          
          <ng-template oxTemplate="header">
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Status</th>
              <th>Activity</th>
              <th>Actions</th>
            </tr>
          </ng-template>

          <ng-template oxTemplate="body" let-customer>
            <tr>
              <td class="ox-fw-bold">{{ customer.name }}</td>
              <td>{{ customer.country }}</td>
              <td>
                <ox-badge 
                  [severity]="getStatusSeverity(customer.status)" 
                  [value]="customer.status"
                  [pill]="true"
                  size="sm">
                </ox-badge>
              </td>
              <td>{{ customer.activity }}%</td>
              <td>
                <ox-button size="sm" variant="ghost-primary">View</ox-button>
              </td>
            </tr>
          </ng-template>
        </ox-table>
      </section>
    </div>
  `
})
export class TableDemoComponent {
  customers = [
    { id: 1000, name: "James Butt", country: "Algeria", status: "qualified", activity: 17 },
    { id: 1001, name: "Josephine Darakjy", country: "Egypt", status: "unqualified", activity: 0 },
    { id: 1002, name: "Art Venere", country: "Panama", status: "negotiation", activity: 63 },
    { id: 1003, name: "Lenna Paprocki", country: "Slovenia", status: "new", activity: 37 },
    { id: 1004, name: "Donette Foller", country: "South Africa", status: "qualified", activity: 0 },
  ];

  getStatusSeverity(status: string): any {
    switch (status) {
      case "qualified": return "success";
      case "unqualified": return "danger";
      case "negotiation": return "warning";
      case "new": return "info";
      default: return "primary";
    }
  }
}
