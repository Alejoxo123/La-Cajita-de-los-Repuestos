import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";

@Component({
  selector: 'app-add-edit-products',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './add-edit-products.component.html',
  styleUrl: './add-edit-products.component.css'
})
export class AddEditProductsComponent {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar '

  constructor(private fb: FormBuilder, private productService: ProductService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      price: [null,Validators.required],
      stock: [null,Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void{
    if(this.id != 0){
      this.operacion = 'Editar '
      this.getProduct(this.id);
    }
  }
  getProduct(id: number){
    this.loading = true;
    this.productService.getProduct(id).subscribe((data:Product) =>{
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }
    this.loading = true;

    if (this.id !== 0) {
      //Es editar
      this.productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(' El producto ' + product.name + ' fue Actualisado con exito', 'Producto Actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    } else {
      //Es Agregar
      this.loading = true;
      product.id = this.id;
      this.productService.saveProduct(product).subscribe(() => {
        this.toastr.success(' El producto ' + product.name + ' fue registrado con exito', 'Producto Registrado');
        this.loading = false;
        this.router.navigate(['/']);
      });
    }


  }

}

