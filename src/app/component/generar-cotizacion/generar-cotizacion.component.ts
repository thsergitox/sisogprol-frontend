import { ProductospedidosService } from './../../service/productospedidos.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProviderInfoComponent } from "../provider-info/provider-info.component";
import { CompanyInfoComponent } from "../company-info/company-info.component";
import { PanelCotizacionesComponent } from '../panel-cotizaciones/panel-cotizaciones.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { Producto } from "../../model/producto";
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { SelectionModel } from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProductService } from '../../service/product.service';
import { PedidoService } from '../../service/pedido.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-generar-cotizacion',
  standalone: true,
  imports: [
    CommonModule,
    ProviderInfoComponent,
    CompanyInfoComponent,
    PanelCotizacionesComponent,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    DatePipe,
    FormsModule,
    MatCheckboxModule
  ],
  templateUrl: './generar-cotizacion.component.html',
  styleUrl: './generar-cotizacion.component.css'
})
export class GenerarCotizacionComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'nombre', 'precio', 'categoria', 'created_at', 'updated_at'];
  dataSource: Producto[] = [];
  clickedRows = new Set<Producto>();

  dataProveedores: Proveedor[] = [];
  selectedProvider?: Proveedor;
  providerName?: string;
  providerEmail?: string;
  providerRUC?: string;
  providerAddress?: string;
  providerPhone?: string;
  date?: string;
  idPedido?: number;

  selection = new SelectionModel<Producto>(true, []);

  constructor(private _productService: ProductService,
    private _proveedorService: ProveedorService,
    private _productospedidosService: ProductospedidosService,
    private _pedidopedidosService: PedidoService
  ){}

  ngOnInit(): void {
    this._productService.getProducts().subscribe(data => {
      this.dataSource = data;
      console.log('Productos cargados:', data);
    });
    this._proveedorService.getProveedor().subscribe(data => {
      this.dataProveedores = data;
    });
  }

  onProviderSelectionChange(provider: Proveedor): void {
    this.selectedProvider = provider;
    this.providerName = provider.nombre;
    this.providerEmail = provider.correo;
    this.providerRUC = provider.ruc;
    this.providerAddress = provider.direccion;
    this.providerPhone = provider.telefono;
  }

  toggleSelection(row: Producto): void {
    this.selection.toggle(row);
    console.log('Productos seleccionados:', this.selection.selected);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  isIndeterminate(): boolean {
    return this.selection.selected.length > 0 && !this.isAllSelected();
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.forEach(row => this.selection.select(row));
    }
    console.log('Productos seleccionados:', this.selection.selected);
  }

  setDate(event: Event): void{
    const input = event.target as HTMLInputElement;
    this.date = input.value;
    console.log(this.date)
  }

  createPedido(): void{

    this._pedidopedidosService.createPedido({

      estado: "Pendiente",
      descripcion: "Nuevo Pedido",
      name: "Pedido N",
      empleado: {
        id: 1
      }
      //fechacreacion: this.date
    }).subscribe((data) => {
      this.ngOnInit();
      this.idPedido = data.id
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'registrarPersona!...',
        text: '!Se creó exitosamente el Pedido',
      });
    },
    (err: any) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Advertencia!...',
        text: '!Ah ocurrido un error al crear el Pedido!',
      });
    })

    //this._productospedidosService.
  }

}
