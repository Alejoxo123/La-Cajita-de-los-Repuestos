import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressBarComponent, FormsModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  searchCodigo: number = 0;
  searchReferencia: string = '';


  constructor(private productService: ProductService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state as { products: Product[] };

    if (state && state.products) {
      this.listProducts = state.products;
      console.log('Productos actualizados:', this.listProducts);
    } else {
      this.getListProducts(); // Si no hay productos buscados, carga todos los productos
    }
  }

  getListProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe((data) => {
      this.listProducts = data.ListProducts;
      this.loading = false;

    })
  }

  deleteProduct(id: number) {
    this.loading = true;
    this.productService.deleteProduct(id).subscribe((data) => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto Eliminado');
    })
  }





  // Método para actualizar la lista con los productos filtrados por nombre
  searchProductsName() {
    this.loading = true;

    // Validar si el término de búsqueda está vacío
    if (this.searchTerm.trim() === '') {

      this.toastr.error('Ingresa el valor a buscar', ' busquedas vacias');
      this.getListProducts(); // Si no hay búsqueda, mostrar todos los productos
      this.loading = false;
      return;
    }

    // Validar longitud mínima del término de búsqueda
    if (this.searchTerm.trim().length < 3) {
      this.toastr.warning('El término de búsqueda debe tener al menos 3 caracteres', 'Búsqueda demasiado corta');
      this.loading = false;
      return;
    }

    // Si pasa las validaciones, realizar la búsqueda
    this.productService.searchProductsByName(this.searchTerm).subscribe({
      next: (data) => {
        if (data.products.length === 0) {
          // Si no se encuentran productos
          this.toastr.info('No se encontraron productos con ese nombre', 'Sin resultados');
        } else {
          this.listProducts = data.products; // Actualizar la lista de productos
        }
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          // Manejar el error 404 que viene desde el backend
          this.toastr.error('No se encontraron productos con ese nombre', 'Sin resultados');
        } else {
          this.toastr.error('Ocurrió un error al buscar productos', 'Error');
        }
        this.loading = false;
      }
    });
  }

  //metodo para busqueda por codigo
  searchProductsCode() {
    this.loading = true;
    if (this.searchCodigo === undefined) {
      this.toastr.error('Ingresa el valor a buscar', 'busquedas vacias');
      this.getListProducts();
      this.loading = false;
      return;
    }

    this.productService.searchProductsBycodigo(this.searchCodigo).subscribe({
      next: (data) => {
        if (data.products.length === 0) {
          this.toastr.info('No se encontraron productos con ese código', 'Sin resultados');
        }else{
          this.listProducts = data.products;
        }
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          // Manejar el error 404 que viene desde el backend
          this.toastr.error('No se encontraron productos con ese Codigo', 'Sin resultados');
        } else {
          this.toastr.error('Ocurrió un error al buscar productos', 'Error');
        }
        this.loading = false;
      }
    });
  }

  //metodo para busqueda por referencia
  searchProductsReference() {
    this.loading = true;
    if (this.searchReferencia === '') {
      this.toastr.error('Ingresa el valor a buscar', 'busquedas vacias');
      this.getListProducts();
      this.loading = false;
      return;
    }

    this.productService.searchProductsByreferencia(this.searchReferencia).subscribe({
      next: (data) => {
        if (data.products.length === 0) {
          this.toastr.info('No se encontraron productos con esa referenciaaaa', 'Sin resultados');
          }else{
            this.listProducts = data.products;
        }
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          // Manejar el error 404 que viene desde el backend
          this.toastr.error('No se encontraron productos con esa referencia', 'Sin resultados');
        } else {
          this.toastr.error('Ocurrió un error al buscar productos', 'Error');
        }
        this.loading = false;
      }
    });
  }
  
}
