import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/clientes';



@Injectable({
  providedIn: 'root'
})
export class VentaService {
    private apiUrl = 'http://localhost:3000/api/ventas'; 

  constructor(private http: HttpClient) {}
  
  getCliente(documento_identidad: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/cliente?documento_identidad=${documento_identidad}`);
  }
  
  crearVenta(ventaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearventa`, ventaData);
  }

  getventadetalle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  

}
