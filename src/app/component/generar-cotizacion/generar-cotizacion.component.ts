import { Component } from '@angular/core';
import {ProductSelectionComponent} from "../product-selection/product-selection.component";
import {ProviderInfoComponent} from "../provider-info/provider-info.component";
import {CompanyInfoComponent} from "../company-info/company-info.component";
import { PanelCotizacionesComponent } from '../panel-cotizaciones/panel-cotizaciones.component';

@Component({
  selector: 'app-generar-cotizacion',
  standalone: true,
  imports: [
    ProductSelectionComponent,
    ProviderInfoComponent,
    CompanyInfoComponent,
    PanelCotizacionesComponent
  ],
  templateUrl: './generar-cotizacion.component.html',
  styleUrl: './generar-cotizacion.component.css'
})
export class GenerarCotizacionComponent {

}
