import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { LoginComponent } from "./components/login/login.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PuntoVentaComponent } from './components/punto-venta/punto-venta.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListProductsComponent, LoginComponent, SidebarComponent, PuntoVentaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'la_cajita_de_los_repuestos';
}
