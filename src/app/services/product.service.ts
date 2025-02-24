import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/productos';  // URL de tu API

  constructor(private http: HttpClient) { }


  searchProductsBycodigo(codigo: number): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${this.apiUrl}/searchcode?codigo=${codigo}`);
  }


  searchProductsByreferencia(referencia: string): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${this.apiUrl}/searchreference?referencia=${referencia}`);
  }


  searchProductsByName(name: string): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${this.apiUrl}/searchname?name=${name}`);
  }

  getProducts(): Observable<{ ListProducts: Product[] }> {
    return this.http.get<{ ListProducts: Product[] }>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  saveProduct(products: Product[]): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/crear', products);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }


}
