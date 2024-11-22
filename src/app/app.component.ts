import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule], // Solo importa lo necesario
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Usa styleUrls en lugar de styleUrl (corrección ortográfica)
})
export class AppComponent {
  title = 'la_cajita_de_los_repuestos';

  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    // Retorna true si la URL actual no es '/login', ocultando el navbar en esa ruta
    return this.router.url !== '/';
  }
}
