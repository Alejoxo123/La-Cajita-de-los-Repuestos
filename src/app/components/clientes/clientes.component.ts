import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatDialogModule, ProgressBarComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
searchClientes() {
throw new Error('Method not implemented.');
}
  loading: boolean=false;
  searchTerm: string = '';
  clientes = [
    { documento: '54321', nombre: 'Cliente 1', telefono: '555-4321', correo: 'cliente1@mail.com', direccion: 'Avenida 1' },
    { documento: '98765', nombre: 'Cliente 2', telefono: '555-8765', correo: 'cliente2@mail.com', direccion: 'Avenida 2' },
  ];
  filteredClientes = [...this.clientes];
  isModalOpen = false;
  nuevoCliente = {
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
    this.nuevoCliente = { documento: '', nombre: '', telefono: '', correo: '', direccion: '' };
  }

  crearCliente() {
    if (this.nuevoCliente.documento && this.nuevoCliente.nombre) {
      this.clientes.push({ ...this.nuevoCliente });
      this.filteredClientes = [...this.clientes];
      this.cerrarModal();
    }
  }

  ngOnChanges() {
    this.filteredClientes = this.clientes.filter((c) =>
      c.documento.includes(this.searchTerm)
    );
  }
}
