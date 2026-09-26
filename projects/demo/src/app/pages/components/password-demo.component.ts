import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from 'oxygen-ui';

@Component({
  selector: 'app-password-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordComponent],
  template: `
    <div class="ox-page-container">
      <h1>Password</h1>
      <p class="ox-description">Campo con botón para mostrar/ocultar contraseña.</p>

      <section class="ox-section">
        <h2>Básico</h2>
        <form class="demo-grid" (submit)="$event.preventDefault()">
          <ox-password 
            label="Contraseña" 
            placeholder="Ingresa tu clave"
            [(ngModel)]="pass1"
            name="password-basic">
          </ox-password>
          <p class="ox-mt-2 ox-p-sm">Valor: {{ pass1 }}</p>
        </form>
      </section>

      <section class="ox-section">
        <h2>Variantes</h2>
        <form class="demo-grid" (submit)="$event.preventDefault()">
          <ox-password label="Estándar" variant="default" placeholder="Borde normal" [(ngModel)]="v1" name="v1"></ox-password>
          <ox-password label="Fieldset" variant="fieldset" placeholder="Etiqueta en el borde" [(ngModel)]="v2" name="v2"></ox-password>
          <ox-password label="One Line" variant="oneLine" placeholder="Borde solo inferior" [(ngModel)]="v3" name="v3"></ox-password>
        </form>
      </section>

      <section class="ox-section">
        <h2>Float Label</h2>
        <form class="demo-grid" (submit)="$event.preventDefault()">
          <ox-password label="Float Estándar" [floatLabel]="true" [(ngModel)]="f1" name="f1"></ox-password>
          <ox-password label="Float Fieldset" [floatLabel]="true" variant="fieldset" [(ngModel)]="f2" name="f2"></ox-password>
          <ox-password label="Float One Line" [floatLabel]="true" variant="oneLine" [(ngModel)]="f3" name="f3"></ox-password>
        </form>
      </section>

      <section class="ox-section">
        <h2>Tamaños</h2>
        <form class="demo-grid" (submit)="$event.preventDefault()">
          <ox-password label="Pequeño" size="sm" placeholder="Input pequeño" [(ngModel)]="passSm" name="sm"></ox-password>
          <ox-password label="Mediano" size="md" placeholder="Input mediano" [(ngModel)]="passMd" name="md"></ox-password>
          <ox-password label="Grande" size="lg" placeholder="Input grande" [(ngModel)]="passLg" name="lg"></ox-password>
        </form>
      </section>

      <section class="ox-section">
        <h2>Estados</h2>
        <form class="demo-grid" (submit)="$event.preventDefault()">
          <ox-password label="Con Error" error="Contraseña demasiado corta" [(ngModel)]="passError" name="error"></ox-password>
          <ox-password label="Deshabilitado" [disabled]="true" value="secret123" name="disabled"></ox-password>
          <ox-password label="Con ayuda" hint="Debe incluir al menos un número" [(ngModel)]="passHint" name="hint"></ox-password>
        </form>
      </section>
    </div>
  `
})
export class PasswordDemoComponent {
  pass1 = '';
  passSm = '';
  passMd = '';
  passLg = '';
  passError = '123';
  passHint = '';
  v1 = '';
  v2 = '';
  v3 = '';
  f1 = '';
  f2 = '';
  f3 = '';
}
