import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from 'valence-ui';
import { DocCodeComponent } from '../../shared/doc-code/doc-code.component';
import { DocApiTableComponent, ApiProperty } from '../../shared/doc-code/doc-api-table.component';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [CommonModule, DividerComponent, DocCodeComponent, DocApiTableComponent],
  template: `
    <div class="val-page-container">
      <h1>Divider (Separador de Contenido)</h1>
      <p class="val-description">El componente Divider se utiliza para separar contenido con líneas horizontales, verticales y etiquetas intermedias.</p>

      <!-- 1. BÁSICO HORIZONTAL -->
      <app-doc-code
        title="1. Separador Horizontal Básico"
        description="Línea divisoria horizontal limpia entre bloques de texto."
        [html]="basicHtml"
        [ts]="dividerTs">
        <div>
          <p style="margin: 0; color: #475569;">Bloque de contenido superior</p>
          <val-divider></val-divider>
          <p style="margin: 0; color: #475569;">Bloque de contenido inferior</p>
        </div>
      </app-doc-code>

      <!-- 2. CON ETIQUETA -->
      <app-doc-code
        title="2. Con Etiquetas y Alineación"
        description="Línea divisoria con etiqueta intermedia alineada al inicio, centro o fin."
        [html]="labelHtml"
        [ts]="dividerTs">
        <div>
          <p style="margin: 0; color: #475569;">Inicio de sesión con credenciales</p>
          <val-divider label="O CONTINÚA CON" labelPosition="center"></val-divider>
          <p style="margin: 0; color: #475569;">Inicio de sesión con redes sociales</p>
        </div>
      </app-doc-code>

      <!-- 3. VERTICAL -->
      <app-doc-code
        title="3. Separador Vertical"
        description="Útil para barras de navegación, menús de acciones o toolbars."
        [html]="verticalHtml"
        [ts]="dividerTs">
        <div style="display: flex; align-items: center; gap: 1rem; height: 40px;">
          <span>Inicio</span>
          <val-divider orientation="vertical"></val-divider>
          <span>Productos</span>
          <val-divider orientation="vertical"></val-divider>
          <span>Contacto</span>
        </div>
      </app-doc-code>

      <!-- API REFERENCE -->
      <app-doc-api-table 
        title="API Reference: DividerComponent"
        [properties]="dividerProps">
      </app-doc-api-table>
    </div>
  `
})
export class DividerDemoComponent {
  basicHtml = `<p>Contenido superior</p>
<val-divider></val-divider>
<p>Contenido inferior</p>`;

  labelHtml = `<p>Login estándar</p>
<val-divider label="O CONTINÚA CON" labelPosition="center"></val-divider>
<p>Login social</p>`;

  verticalHtml = `<div style="display: flex; align-items: center; height: 40px;">
  <span>Opción 1</span>
  <val-divider orientation="vertical"></val-divider>
  <span>Opción 2</span>
</div>`;

  dividerTs = `import { Component } from '@angular/core';
import { DividerComponent } from 'valence-ui';

@Component({
  selector: 'app-my-divider',
  standalone: true,
  imports: [DividerComponent],
  templateUrl: './my-divider.component.html'
})
export class MyDividerComponent {}`;

  dividerProps: ApiProperty[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Dirección y orientación del separador.'
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Texto o etiqueta central opcional en la línea.'
    },
    {
      name: 'labelPosition',
      type: "'start' | 'center' | 'end'",
      default: "'center'",
      description: 'Alineación de la etiqueta a lo largo de la línea.'
    },
    {
      name: 'borderStyle',
      type: "'solid' | 'dashed' | 'dotted'",
      default: "'solid'",
      description: 'Estilo de trazo del borde divisorio.'
    }
  ];
}
