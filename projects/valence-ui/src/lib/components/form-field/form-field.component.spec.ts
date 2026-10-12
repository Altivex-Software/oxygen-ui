import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { FormFieldLabelComponent } from './form-field-label.component';
import { FormFieldErrorComponent } from './form-field-error.component';
import { FormFieldHintComponent } from './form-field-hint.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormFieldComponent,
        FormFieldLabelComponent,
        FormFieldErrorComponent,
        FormFieldHintComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form field successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should apply outline appearance by default', () => {
    expect(fixture.nativeElement.classList.contains('ox-form-field--outline')).toBeTrue();
  });

  it('should support filled and standard appearances', () => {
    fixture.componentRef.setInput('appearance', 'filled');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('ox-form-field--filled')).toBeTrue();

    fixture.componentRef.setInput('appearance', 'standard');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('ox-form-field--standard')).toBeTrue();
  });

  it('should apply invalid class when invalid is true', () => {
    fixture.componentRef.setInput('invalid', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('ox-form-field--invalid')).toBeTrue();
  });
});
