import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../interfaces/proovedor';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private apiUrl = 'http://localhost:3000/api/ingresos';

  constructor(private http: HttpClient) { }

  buscarProveedor(documento_identidad: string): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/llamarproovedor?documento_identidad=${documento_identidad}`);
  }

  registrarIngreso(productos: any[], proveedorId: string, fechaIngreso: string): Observable<any> {
    const body = { productos, proveedorId, fechaIngreso }; 
    return this.http.post(`${this.apiUrl}/ingresarProductos`, body); 
  }
}

