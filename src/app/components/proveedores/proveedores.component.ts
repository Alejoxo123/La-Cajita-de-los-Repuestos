import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatDialogModule, ProgressBarComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
loading: any;
searchProveedores() {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';
  proveedores = [
    { documento: '12345', nombre: 'Proveedor 1', telefono: '555-1234', correo: 'proveedor1@mail.com', direccion: 'Calle 1' },
    { documento: '67890', nombre: 'Proveedor 2', telefono: '555-5678', correo: 'proveedor2@mail.com', direccion: 'Calle 2' },
  ];
  filteredProveedores = [...this.proveedores];
  isModalOpen = false;
  nuevoProveedor = {
    documento: '',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
  };

  abrirModal() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.nuevoProveedor = { documento: '', nombre: '', telefono: '', correo: '', direccion: '' };
  }

  crearProveedor() {
    if (this.nuevoProveedor.documento && this.nuevoProveedor.nombre) {
      this.proveedores.push({ ...this.nuevoProveedor });
      this.filteredProveedores = [...this.proveedores];
      this.cerrarModal();
    }
  }

  ngOnChanges() {
    this.filteredProveedores = this.proveedores.filter((p) =>
      p.documento.includes(this.searchTerm)
    );
  }
}
