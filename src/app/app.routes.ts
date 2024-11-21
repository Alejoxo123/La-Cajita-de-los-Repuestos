import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PuntoVentaComponent } from './components/punto-venta/punto-venta.component';
import { DetalleventaComponent } from './components/detalleventa/detalleventa.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IngresarProductosComponent } from './components/ingresar-productos/ingresar-productos.component';


export const routes: Routes = [
    //{ path: '', component: LoginComponent }, 
    //{path: '', component: NavbarComponent },
    {path:'', component: InicioComponent},
    {path:'productos', component: ListProductsComponent},
    {path:'puntoVenta', component: PuntoVentaComponent},
    {path:'detalleVenta', component: DetalleventaComponent},
    {path:'CrearProducto', component: AddEditProductsComponent },
    {path:'IngresarProductos', component: IngresarProductosComponent },
    {path:'edit/:id', component: AddEditProductsComponent },
    {path:'**', redirectTo: '', pathMatch:'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}