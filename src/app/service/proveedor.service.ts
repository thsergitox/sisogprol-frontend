import { Injectable } from '@angular/core';
import { Proveedor } from "../model/proveedor";
import { environment } from '../../environments/environment'
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }
  private backendUrl:string = environment.apiUrl
  private proveedorUrl = '/api/proveedor';
  private apiEndpointUrl:string  = this.backendUrl + this.proveedorUrl;

  getProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiEndpointUrl}/all`);
    // return of(PRODUCT_DATA); // For debugging when the API is unavailable
  }
}
