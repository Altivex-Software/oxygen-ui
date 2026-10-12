# GitHub Copilot Instructions for Valence UI

This repository uses **Valence UI**, an enterprise component library and SCSS utility framework for Angular 19+.

## Key Architectural Rules

1. **Standalone Components**: Always import Valence UI components standalone in `@Component({ imports: [ButtonComponent, CardComponent, ...] })`.
2. **Design System & CSS Utilities**:
   - Use the `val-` utility classes instead of writing raw CSS.
   - Use `val-flex`, `val-flex-column`, `val-items-center`, `val-justify-between`, `val-gap-3` for layout.
   - Use `val-grid` and `val-col-{1..12}` (with breakpoints `val-col-md-6`) for grids.
   - Use `val-m-{0..5}` and `val-p-{0..5}` for spacing.
3. **Buttons**: Use `<button val-button variant="primary">...</button>`. Available variants: `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `outline-primary`, `ghost-primary`.
4. **Forms**:
   - Wrap inputs with `<val-form-field label="..." [required]="true">`.
   - Use `<val-input>`, `<val-password>`, `<val-dropdown>`, `<val-date-picker>`, `<val-checkbox>`.
   - All inputs support Reactive Forms via `formControlName` or `[formControl]`.
5. **Overlays & Feedback**:
   - For notifications: inject `ToastService` and call `toastService.add({ severity: 'success', summary: '...', detail: '...' })`.
   - For confirmations: inject `ConfirmService` and call `confirmService.confirm({ ... })`.
   - For modals: use `<val-dialog [(visible)]="isOpen" header="...">`.
