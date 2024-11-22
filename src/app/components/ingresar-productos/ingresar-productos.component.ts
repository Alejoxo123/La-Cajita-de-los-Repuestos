import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { IngresosService } from '../../services/ingresos.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ingresar-productos',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent, FormsModule],
  templateUrl: './ingresar-productos.component.html',
  styleUrl: './ingresar-productos.component.css'
})
export class IngresarProductosComponent {


  facturaForm: FormGroup;
  loading: boolean = false;
  searchDocumentProovedor: string = '';
  proveedores: any[] = [];
  productosEncontrados: any[] = [];
  codigoProducto: string = '';
  listProducts: any;
  
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingresosservice: IngresosService,
    private toastr: ToastrService,
    private productoservice: ProductService,
    private authService: AuthService
  ) {
    this.facturaForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      fecha: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentoProveedor: ['', Validators.required],
      nombreProveedor: ['', Validators.required],
      idProveedor: ['', Validators.required],
    });
  }
  

  buscarProveedor() {
    if (this.searchDocumentProovedor.trim() === '') {
      this.toastr.info('Por favor ingrese el número de documento del proveedor.');
      return;
    }

    this.loading = true;
    this.ingresosservice.buscarProveedor(this.searchDocumentProovedor).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.toastr.info(`No se encontró un proveedor con el documento: ${this.searchDocumentProovedor}`, 'Sin resultados');
          this.proveedores = [];
        } else {
          this.proveedores = data;
          this.toastr.success(`Proveedor encontrado: ${data[0].nombre}`, 'Éxito');
        }
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Error al buscar el proveedor', 'Error');
        this.loading = false;
      }
    });
  }

  buscarProducto() {

    const codigoProductoNumero = parseInt(this.codigoProducto, 10);


    if (isNaN(codigoProductoNumero) || this.codigoProducto === '') {
      this.toastr.info('Por favor ingrese el código del producto.');
      return;
    }


    this.productoservice.searchProductsBycodigo(codigoProductoNumero).subscribe({
      next: (data) => {
        console.log('Respuesta de la API:', data);
        if (data && data.products && data.products.length > 0) {
          const producto = data.products[0];
          const productoExiste = this.productosEncontrados.some(p => p.codigo === producto.codigo);
          if (!productoExiste) {
            this.productosEncontrados.push(producto);
            this.toastr.success(`Producto agregado: ${producto.name}`, 'Éxito');
          } else {
            this.toastr.warning(`El producto ${producto.name} ya está en la lista.`, 'Producto duplicado');
          }
          this.codigoProducto = '';
        } else {
          this.toastr.info('No se encontró ningún producto con ese código.', 'Producto no encontrado');
        }
      },
      error: (error) => {
        console.error('Error al buscar el producto:', error);
        this.toastr.error('Ocurrió un error al buscar el producto.', 'Error');
      }
    });
  }

  registrarIngreso() {

    if (this.productosEncontrados.length === 0) {
      this.toastr.info('No hay productos para actualizar o ingresar.');
      return;
    }
    if (!this.proveedores || this.proveedores.length === 0 || !this.proveedores[0]?.idproveedores) {
      this.toastr.warning('Por favor, seleccione un proveedor.');
      return;
    }
    const productosParaIngreso = this.productosEncontrados.map(producto => {
      return {
        codigo: producto.codigo,
        cantidad: producto.cantidad,
        precio: producto.precio,
      };
    });

    const proveedorId = this.proveedores[0]?.idproveedores;
    const fechaIngreso = this.facturaForm.controls['fecha'].value;


    this.ingresosservice.registrarIngreso(productosParaIngreso, proveedorId, fechaIngreso).subscribe({
      next: (data) => {
        this.toastr.success('Ingreso completado con éxito.', 'Éxito');


        this.resetearFormularios();


        this.productosEncontrados = [];
      },
      error: (error) => {
        this.toastr.error('Error al completar el ingreso de productos.', 'Error');
      }
    });
  }

  resetearFormularios() {

    if (this.facturaForm) {
      this.facturaForm.reset();
    }
    this.proveedores = [];

  }

}
