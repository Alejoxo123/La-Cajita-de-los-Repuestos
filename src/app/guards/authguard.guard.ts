import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Verificamos si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      const role = this.authService.getRole();  // Obtenemos el rol del usuario
      
      // Permitimos el acceso independientemente del rol
      return true; 
    } else {
      // Si no está autenticado, redirigimos a la página de login
      this.router.navigate(['/']);
      return false;
    }
  }
}
