import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/productos';  // URL de tu API

  constructor(private http: HttpClient) {}

  searchProductsByName(name: string): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${this.apiUrl}/search?name=${name}`);
  }
  // Método para obtener los productos
  getProducts(): Observable<{ ListProducts: Product[] }> {
    return this.http.get<{ ListProducts: Product[] }>(this.apiUrl);
  }

  deleteProduct( id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  saveProduct(product: Product): Observable<void>{
    return this.http.post<void>(this.apiUrl, product);
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  
}
