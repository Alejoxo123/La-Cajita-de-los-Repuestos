import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ListProductsComponent } from '../list-products/list-products.component';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, FormsModule]
})
export class NavbarComponent {
  searchTerm: string = '';  // Almacena el término de búsqueda
  listProducts: Product[] = [];  // Almacena los productos que coinciden con la búsqueda
  @ViewChild(ListProductsComponent) listProductsComponent!: ListProductsComponent;
  
  constructor(private productService: ProductService, private router: Router) { }



  searchProducts(event: Event) {
    event.preventDefault();

    if (this.searchTerm.trim()) {
      
      this.productService.searchProductsByName(this.searchTerm).subscribe({
        next: (response) => {
          // Aquí podrías navegar a ListProductsComponent pasando los productos
          this.router.navigate([''], { state: { products: response.products } });
          console.log(response.products);
        },
        error: (error) => {
          console.error('Error al buscar productos:', error);
        }
      });
    }
  }
}

