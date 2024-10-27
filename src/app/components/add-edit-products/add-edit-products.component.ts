import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  styleUrl: './add-edit-products.component.css'
})
export class AddEditProductsComponent {

  loading: boolean = false;
  facturaForm: FormGroup;
  productoForm: FormGroup;
  productos: any[] = [];
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'referencia', 'cantidad', 'precioUnitario'];

  constructor(private fb: FormBuilder) {
    this.facturaForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      fecha: ['', Validators.required],
      proveedor: ['', Validators.required]
    });

    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      referencia: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  agregarProducto() {
    if (this.productoForm.valid) {
      this.productos.push(this.productoForm.value);
      this.productoForm.reset();
    }
  }

  guardarProductos() {
    console.log('Productos añadidos al inventario:', this.productos);
    // Lógica para guardar en la base de datos o enviar a la API
  }

}

