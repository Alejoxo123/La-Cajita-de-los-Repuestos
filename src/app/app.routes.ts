import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//Componentes
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PuntoVentaComponent } from './components/punto-venta/punto-venta.component';
import { DetalleventaComponent } from './components/detalleventa/detalleventa.component';


export const routes: Routes = [
    //{ path: '', component: LoginComponent }, 
    //{path: '', component: NavbarComponent },
    {path:'productos', component: ListProductsComponent},
    {path:'puntoVenta', component: PuntoVentaComponent},
    {path:'detalleVenta', component: DetalleventaComponent},
    {path:'IngresarProductos', component: AddEditProductsComponent },
    {path:'edit/:id', component: AddEditProductsComponent },
    {path:'**', redirectTo: '', pathMatch:'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}