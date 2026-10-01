import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { 
  TreeSelectComponent, 
  TreeNode, 
  SplitterComponent, 
  TimelineComponent, 
  TimelineItem,
  CardComponent,
  ButtonComponent
} from "oxygen-ui";

@Component({
  selector: "app-advanced-demo",
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TreeSelectComponent, 
    SplitterComponent, 
    TimelineComponent,
    CardComponent,
    ButtonComponent
  ],
  template: `
    <div class="ox-page-container">
      <h1>Advanced Forms & Layout (Phase 4)</h1>
      <p class="ox-description">
        Demonstration of <code>ox-tree-select</code>, <code>ox-splitter</code>, and <code>ox-timeline</code> components.
      </p>

      <!-- 1. TREE SELECT -->
      <section class="ox-section">
        <h2>1. TreeSelect</h2>
        <p>Hierarchical dropdown for selecting nested nodes or organizational charts.</p>

        <div style="max-width: 340px; margin-bottom: 1rem;">
          <ox-tree-select 
            [options]="categoryNodes" 
            [(ngModel)]="selectedCategory"
            placeholder="Select a category"
            [filter]="true">
          </ox-tree-select>
        </div>

        <div style="font-size: 0.875rem; color: #475569;">
          <strong>Selected Node Value:</strong> {{ selectedCategory || 'None' }}
        </div>
      </section>

      <!-- 2. SPLITTER -->
      <section class="ox-section">
        <h2>2. Splitter (Resizable Panels)</h2>
        <p>Drag the center divider bar to resize left and right panels dynamically.</p>

        <div style="height: 250px; margin-bottom: 1rem;">
          <ox-splitter [initialSize]="40">
            <div oxPanel1 style="padding: 1rem; background: #f8fafc;">
              <h3 style="margin-top: 0;">Panel 1 (Left)</h3>
              <p style="font-size: 0.875rem; color: #64748b;">
                This side can host a navigation sidebar, tree view or master list.
              </p>
            </div>
            <div oxPanel2 style="padding: 1rem;">
              <h3 style="margin-top: 0;">Panel 2 (Right)</h3>
              <p style="font-size: 0.875rem; color: #64748b;">
                This side hosts detailed inspection data, editor view or document content.
              </p>
            </div>
          </ox-splitter>
        </div>
      </section>

      <!-- 3. TIMELINE -->
      <section class="ox-section">
        <h2>3. Timeline</h2>
        <p>Chronological step-by-step progress or activity log.</p>

        <ox-card style="max-width: 600px;">
          <div style="padding: 1.5rem;">
            <ox-timeline [value]="orderHistory"></ox-timeline>
          </div>
        </ox-card>
      </section>
    </div>
  `
})
export class AdvancedDemoComponent {
  selectedCategory = "";

  categoryNodes: TreeNode[] = [
    {
      key: "electronics",
      label: "Electronics",
      icon: "💻",
      expanded: true,
      children: [
        {
          key: "phones",
          label: "Smartphones",
          icon: "📱",
          children: [
            { key: "iphone", label: "iPhone 15 Pro", icon: "🍎" },
            { key: "galaxy", label: "Samsung Galaxy S24", icon: "🤖" }
          ]
        },
        {
          key: "laptops",
          label: "Laptops",
          icon: "💻",
          children: [
            { key: "macbook", label: "MacBook Pro M3", icon: "💻" },
            { key: "dell", label: "Dell XPS 15", icon: "🖥️" }
          ]
        }
      ]
    },
    {
      key: "fashion",
      label: "Clothing & Apparel",
      icon: "👕",
      children: [
        { key: "shirts", label: "Shirts & Tops" },
        { key: "shoes", label: "Sneakers" }
      ]
    }
  ];

  orderHistory: TimelineItem[] = [
    {
      status: "Order Placed",
      date: "15/10/2026 10:30",
      icon: "🛒",
      color: "#3b82f6",
      description: "Item #9401 order confirmed by customer."
    },
    {
      status: "Processing & Packing",
      date: "15/10/2026 14:15",
      icon: "📦",
      color: "#f59e0b",
      description: "Package wrapped and handed to courier."
    },
    {
      status: "Shipped",
      date: "16/10/2026 09:00",
      icon: "🚚",
      color: "#06b6d4",
      description: "In transit with FedEx tracking #FDX-8840."
    },
    {
      status: "Delivered",
      date: "17/10/2026 16:45",
      icon: "✅",
      color: "#22c55e",
      description: "Package signed and received."
    }
  ];
}
