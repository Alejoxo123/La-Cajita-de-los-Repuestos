import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // Método para iniciar sesión
  IniciarSesion() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese el correo y la contraseña';
      return;
    }

    // Llamar al servicio de autenticación
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.role) {
          const userRole = response.role; // Obtén el rol de la respuesta del backend
          
          // Guardar el rol usando AuthService
          this.authService.setRole(userRole);
          
          // Redirigir al usuario a la página de inicio
          this.router.navigate(['/inicio']);
        } else {
          this.errorMessage = 'No se pudo obtener el rol del usuario.';
        }
      },
      (error) => {
        console.error('Error en el login', error);
        this.errorMessage = 'Correo o contraseña incorrectos'; // Mostrar mensaje de error
      }
    );
  }
}
