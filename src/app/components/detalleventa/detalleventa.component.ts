import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalleventa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './detalleventa.component.html',
  styleUrl: './detalleventa.component.css'
})
export class DetalleventaComponent {
  codigoVenta: string = '';
    ventas: any[] = []; // Cambia el tipo según tu modelo de datos

    constructor(private router: Router) {}

    buscarVentas() {
        // Aquí debes implementar la lógica para buscar ventas en tu backend
        // Ejemplo simulado:
        this.ventas = [
            { id: 1, codigo: '001', total: 300, fecha: new Date(), vendedor: 'Juan Pérez' },
            { id: 2, codigo: '002', total: 450, fecha: new Date(), vendedor: 'Ana Gómez' }
        ].filter(venta => venta.codigo.includes(this.codigoVenta));
    }

    verDetalles(ventaId: number) {
        // Navegar al componente de detalles de la venta
        this.router.navigate(['/detalles-venta', ventaId]);
    }
}
