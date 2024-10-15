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

  getListProducts(){
    this.loading = true;
    this.productService.getProducts().subscribe((data) => {
      this.listProducts  = data.ListProducts;
      this.loading = false;

    })
  }

  deleteProduct(id: number){
    this.loading = true;
    this.productService.deleteProduct(id).subscribe((data) => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito','Producto Eliminado');
    })
  }
  
  // Método para actualizar la lista con los productos filtrados por nombre
  searchProducts() {
    this.loading = true;
    if (this.searchTerm ==  '') {
      this.toastr.info('Ingresa una busqueda','valor  vacio');

      this.getListProducts();  
    }else
    this.productService.searchProductsByName(this.searchTerm).subscribe((data) => {
      this.listProducts = data.products;
      this.loading = false;
    })
  }
}
