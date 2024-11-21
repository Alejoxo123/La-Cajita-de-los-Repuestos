import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-add-edit-products',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent, MatTableModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent {

  loading: boolean = false;
  productoForm: FormGroup;
  productos: any[] = [];
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'referencia', 'cantidad', 'precioUnitario'];

  constructor(
    private fb: FormBuilder,
    private productservice: ProductService,
    private toastr: ToastrService,
  ) {
    this.productoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Validar que el código sea numérico
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      referencia: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      precioUnitario: [null, [Validators.required, Validators.min(0.1)]],
    });
  }

  agregarProducto() {
    const producto: Product = this.productoForm.value;
    if (this.productoForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos.');
      return;
    }
    if (!this.productoForm.get('codigo')?.value.match(/^[0-9]+$/)) {
      this.toastr.error('El código debe ser un número válido.');
      return;
    }
    const codigoExistente = this.productos.some(p => p.codigo === producto.codigo);
    if (codigoExistente) {
      this.toastr.error(`El código ${producto.codigo} ya existe en la lista.`);
      return;
    }
    this.productos.push(producto);
    this.productoForm.reset();
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  addProductos() {
    if (this.productos.length === 0) {
      this.toastr.info('No hay productos para añadir al inventario.');
      return;
    }

    this.loading = true;

    const productosFormateados = this.productos.map(producto => ({
      codigo: producto.codigo,
      name: producto.nombre,
      description: producto.descripcion,
      price: producto.precioUnitario,
      stock: producto.cantidad,
      referencia: producto.referencia
    }));

    this.productservice.saveProduct(productosFormateados).subscribe({
      next: _response => {
        this.toastr.success('Productos añadidos al inventario con éxito.');
        this.productos = [];
        this.loading = false;
      },
      error: _error => {
        this.toastr.error('Hubo un error al añadir los productos.');
        this.loading = false;
      }
    });
  }
}
