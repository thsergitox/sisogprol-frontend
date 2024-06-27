import { Injectable } from '@angular/core';
import { ProductosPedidos } from '../model/productospedidos';
import { environment } from '../../environments/environment'
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductospedidosService {

  constructor(private http: HttpClient) { }
  private backendUrl:string = environment.apiUrl
  private productospedidosUrl = '/api/productospedidos';
  private apiEndpointUrl:string  = this.backendUrl + this.productospedidosUrl;

  createProductosPedidos(form: any): Observable<ProductosPedidos[]> {
    return this.http.post<ProductosPedidos[]>(`${this.apiEndpointUrl}/create`, form);
  }
}
