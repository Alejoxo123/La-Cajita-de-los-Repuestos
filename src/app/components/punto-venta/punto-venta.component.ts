import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-punto-venta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './punto-venta.component.html',
  styleUrl: './punto-venta.component.css'
})
export class PuntoVentaComponent {

  searchCodigo?: number;
  cantidadProducto: number = 1;
  listProducts: any[] = [];
  totalVenta: number = 0;
  loading: boolean = false;

  constructor(private productService: ProductService , private toastr: ToastrService) { }


  agregarProducto() {
    // Obtener valores de los inputs
  const codigoProducto = Number(this.searchCodigo);
  const cantidad = Number(this.cantidadProducto);

  // Verificar que los valores sean válidos
  if (!codigoProducto || cantidad <= 0) {
    this.toastr.error('Ingresa un código de producto válido y una cantidad mayor a cero', 'Datos incorrectos');
    return;
  }

  // Activar indicador de carga
  this.loading = true;

  // Llamar al servicio para buscar el producto por código
  this.productService.searchProductsBycodigo(codigoProducto).subscribe({
    next: (data) => {
      if (data.products.length === 0) {
        this.toastr.info('No se encontraron productos con ese código', 'Sin resultados');
      } else {
        const producto = data.products[0]; // Tomar el primer producto encontrado

        // Verificar si hay suficiente stock
        if (cantidad > producto.stock) {
          this.toastr.warning(`Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`, 'Stock insuficiente');
          this.loading = false;
          return;
        }
        // Calcular el precio total basado en la cantidad
        const precioTotal = producto.price * cantidad;

        // Añadir el producto y los detalles a la lista
        this.listProducts.push({
          ...producto,
          cantidad,         // La cantidad ingresada por el usuario
          precioTotal       // El precio total calculado
        });

        // Actualizar el total de la venta
        this.calcularTotalVenta();
      }
      this.loading = false;
    },
    error: (error) => {
      if (error.status === 404) {
        this.toastr.error('No se encontraron productos con ese código', 'Sin resultados');
      } else {
        this.toastr.error('Ocurrió un error al buscar productos', 'Error');
      }
      this.loading = false;
    }
  });
  }

  calcularTotalVenta() {
    this.totalVenta = this.listProducts.reduce((total, item) => total + item.precioTotal, 0);
  }

  eliminarProducto(producto: any) {
    this.listProducts = this.listProducts.filter(p => p !== producto);
    this.calcularTotalVenta();
  }


}
