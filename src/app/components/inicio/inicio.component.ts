import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  role: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtén el rol del usuario desde el almacenamiento local o el servicio
    this.role = localStorage.getItem('role');
  }

  // Método para saber si el usuario es admin
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  // Método para saber si el usuario es auxiliar
  isAuxiliar(): boolean {
    return this.role === 'auxiliar';
  }

  actividadesRecientes: string = "";

  nuevaVenta(){
    
  }

  gestionarInventario(){

  }

  verHistorial(){

  }

  consultarClientes(){

  }

  buscar(){

  }

  limpiarBusqueda(){

  }

  verReportes(){

  }
  configuracion(){

  }

}

