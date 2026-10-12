import { 
  Injectable, 
  Type, 
  ApplicationRef, 
  EnvironmentInjector, 
  createComponent, 
  Injector, 
  inject 
} from '@angular/core';
import { DynamicDialogConfig } from './dynamic-dialog-config';
import { DynamicDialogRef } from './dynamic-dialog-ref';
import { DynamicDialogContainerComponent } from './dynamic-dialog-container.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicDialogService {
  private appRef = inject(ApplicationRef);
  private environmentInjector = inject(EnvironmentInjector);

  open<T = any, R = any>(
    componentType: Type<T>, 
    config: Partial<DynamicDialogConfig> = {}
  ): DynamicDialogRef<R> {
    const dialogConfig = Object.assign(new DynamicDialogConfig(), config);
    const dialogRef = new DynamicDialogRef<R>();

    const injector = Injector.create({
      providers: [
        { provide: DynamicDialogConfig, useValue: dialogConfig },
        { provide: DynamicDialogRef, useValue: dialogRef }
      ],
      parent: this.environmentInjector
    });

    const containerRef = createComponent(DynamicDialogContainerComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: injector
    });

    containerRef.instance.init(componentType);

    // Attach to ApplicationRef change detection & DOM
    this.appRef.attachView(containerRef.hostView);
    const domElem = (containerRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    const cleanup = () => {
      dialogRef.destroy();
      this.appRef.detachView(containerRef.hostView);
      containerRef.destroy();
      if (domElem.parentNode) {
        domElem.parentNode.removeChild(domElem);
      }
    };

    dialogRef.onClose.subscribe(() => {
      cleanup();
    });

    return dialogRef;
  }
}
