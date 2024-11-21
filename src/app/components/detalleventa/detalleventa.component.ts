import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalleventa',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css']
})
export class DetalleventaComponent {
  codigoVenta: string = '';
  ventas: any[] = [];
  ventaDetalles: any = null;

  constructor(private router: Router, private ventaservice: VentaService, private toastr: ToastrService) { }

  buscarVentas() {
    const idventa = this.codigoVenta;

    if (idventa === '' || idventa === null) {
      this.toastr.error('Por favor ingresa un número de venta');
    } else {
      this.ventaservice.getventadetalle(parseInt(idventa)).subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data);

          if (data && data.venta && data.detalles) {

            this.ventas = [data.venta];
            this.ventaDetalles = data;


            console.log('Detalles de la venta:', this.ventaDetalles);
          } else {
            this.toastr.error('No se encontraron detalles para esta venta.');
          }
        },
        error: (err) => {
          this.toastr.error('Hubo un error al obtener los detalles de la venta');
        }
      });
    }
  }

}
