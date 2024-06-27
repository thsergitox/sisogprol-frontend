import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Pedido } from '../model/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }
  private backendUrl:string = environment.apiUrl
  private pedidoUrl = '/api/pedidos';
  private apiEndpointUrl:string  = this.backendUrl + this.pedidoUrl;

  createProducts(form: any): Observable<Pedido[]> {
    return this.http.post<Pedido[]>(`${this.apiEndpointUrl}/create`, form);
  }
}
