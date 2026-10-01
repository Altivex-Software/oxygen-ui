export class DynamicDialogConfig<T = any> {
  data?: T;
  header?: string;
  width?: string = '500px';
  height?: string;
  closable?: boolean = true;
  dismissableMask?: boolean = true;
  styleClass?: string;
  maximizable?: boolean = false;
  contentStyle?: Record<string, string>;
}
