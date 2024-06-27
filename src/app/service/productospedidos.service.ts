import { Injectable } from '@angular/core';
import { ProductosPedidos } from '../model/productospedidos';
import { Producto } from '../model/producto';
import { environment } from '../../environments/environment'
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

interface PedidoInfo {
  cantidad: number,
  total: number,
  id_pedido: number,
}

@Injectable({
  providedIn: 'root'
})
export class ProductospedidosService {

  constructor(private http: HttpClient) { }
  private backendUrl:string = environment.apiUrl
  private productospedidosUrl = '/api/productospedidos';
  private apiEndpointUrl:string  = this.backendUrl + this.productospedidosUrl;

  createProductosPedidos(productos: Array<Producto>, data: PedidoInfo): void {
    productos.forEach((producto => {
      const productopedido = {producto,...data}
      return this.http.post<ProductosPedidos[]>(`${this.apiEndpointUrl}/create`, productopedido);
    }))
  }


}
