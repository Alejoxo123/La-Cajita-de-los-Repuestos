import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Necesario para la navegación
import { AuthService } from '../../services/auth.service'; // Importa el AuthService
import { SidebarService } from '../../services/sidebar.service';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, FormsModule, MatListModule, MatSidenavModule]
})
export class NavbarComponent {
  isAuthenticated$; // Declarar la propiedad primero

  // El constructor debe inicializar las dependencias en el orden correcto
  constructor(
    private authService: AuthService,  // Inyectamos AuthService para usar sus métodos
    private router: Router,            // Inyectamos Router para la navegación
    private sidebarService: SidebarService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$; // Inicializamos la propiedad en el constructor
  }

  // Método para alternar la barra lateral
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Llamamos al método logout del AuthService
    this.router.navigate(['/']); // Redirigimos al login
  }
}
