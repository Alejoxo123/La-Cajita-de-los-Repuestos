import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";




@Component({
  selector: 'app-punto-venta',
  standalone: true,
  imports: [FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './punto-venta.component.html',
  styleUrl: './punto-venta.component.css'
})
export class PuntoVentaComponent {

  searchCodigo?: number;
  cantidadProducto: number = 1;
  listProducts: any[] = [];
  listClientes: any[] = [];
  totalVenta: number = 0;
  loading: boolean = false;
  searchCliente: string = '';
  fecha: string | null = '';
  username: any;




  constructor(private productService: ProductService, private toastr: ToastrService, private ventaservice: VentaService) { }

  ngOnInit() {

    //Configuracion de la fecha
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    this.fecha = `${year}-${month}-${day}`;
  }

  buscarCliente() {
    const cliente = this.searchCliente.trim();
    console.log('Cliente a buscar:', cliente);

    if (!cliente) {
      this.toastr.warning('Por favor, ingresa un documento de identidad.', 'Advertencia');
      return;
    }

    this.loading = true;
    this.ventaservice.getCliente(cliente).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (data.length === 0) {
          this.toastr.info(`No se encontró un cliente con el documento de identidad: ${cliente}`, 'Sin resultados');
          this.listClientes = [];
        } else {
          this.listClientes = data;
          this.toastr.success(`Cliente encontrado: ${data[0].nombre}`, 'Éxito');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.toastr.error('Ocurrió un error al buscar el cliente. Por favor, inténtelo de nuevo.', 'Error');
        this.loading = false;
      }
    });
  }


  agregarProducto() {
    const codigoProducto = Number(this.searchCodigo);
    const cantidad = Number(this.cantidadProducto);

    if (!codigoProducto || cantidad <= 0) {
      this.toastr.error('Ingresa un código de producto válido y una cantidad mayor a cero', 'Datos incorrectos');
      return;
    }


    this.loading = true;


    this.productService.searchProductsBycodigo(codigoProducto).subscribe({
      next: (data) => {
        if (data.products.length === 0) {
          this.toastr.info('No se encontraron productos con ese código', 'Sin resultados');
        } else {
          const producto = data.products[0];
          const cantidadEnLista = this.listProducts
            .filter(item => item.id === producto.codigo)
            .reduce((acc, item) => acc + item.cantidad, 0);
          if (cantidadEnLista + cantidad > producto.stock) {
            const disponibles = producto.stock - cantidadEnLista;
            this.toastr.warning(`Stock insuficiente. Solo quedan ${disponibles} unidades disponibles.`, 'Stock insuficiente');
            this.loading = false;
            return;
          }

          const precioTotal = producto.price * cantidad;

          this.listProducts.push({
            ...producto,
            cantidad,
            precioTotal
          });

          this.calcularTotalVenta();
        }
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.toastr.error('No se encontraron productos con ese código', 'Sin resultados');
        } else {
          this.toastr.error('Ocurrió un error al buscar productos', 'Error');
        }
        this.loading = false;
      }
    });
  }

  calcularTotalVenta() {
    this.totalVenta = this.listProducts.reduce((total, item) => total + item.precioTotal, 0);
  }

  eliminarProducto(producto: any) {
    this.listProducts = this.listProducts.filter(p => p !== producto);
    this.calcularTotalVenta();
    this.toastr.info('producto eliminado correctamente', 'prodcuto eliminado')
  }


  liquidarVenta() {

    if (this.listProducts.length === 0) {
      this.toastr.warning('No hay productos en la venta.', 'Venta vacía');
      return;
    }

    const ventaData = {
      username: this.username,
      fecha: this.fecha,
      total: this.totalVenta,
      clienteid: this.listClientes[0]?.idclientes,
      productos: this.listProducts.map(producto => ({
        codigo: producto.codigo,
        nombre: producto.name,
        descripcion: producto.description,
        cantidad: producto.cantidad,
        precioUnitario: producto.price,
        precioTotal: producto.precioTotal
      }))
    };


    this.ventaservice.crearVenta(ventaData).subscribe({
      next: (_response) => {
        console.log(_response);
        this.toastr.success(`Venta liquidada con éxito. ID de la venta: ${_response.venta.id}`, 'Venta exitosa');
        this.listClientes = [];
        this.listProducts = [];
        this.totalVenta = 0;
      },
      error: (error) => {
        this.toastr.error('Ocurrió un error al liquidar la venta', 'Error');
        console.error('Error al liquidar la venta:', error);
      }
    });
  }


}





