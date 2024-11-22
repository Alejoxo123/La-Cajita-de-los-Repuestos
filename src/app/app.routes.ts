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
import { AuthGuard } from './guards/authguard.guard';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ContactoComponent } from './components/contacto/contacto.component';


export const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta de Login
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'productos', component: ListProductsComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'puntoVenta', component: PuntoVentaComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'detalleVenta', component: DetalleventaComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'CrearProducto', component: AddEditProductsComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'IngresarProductos', component: IngresarProductosComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'Proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'Clientes', component: ClientesComponent, canActivate: [AuthGuard] }, // Protegemos con el guard
  { path: 'Contacto', component: ContactoComponent, canActivate: [AuthGuard] }, // Protegemos con el guard 
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}