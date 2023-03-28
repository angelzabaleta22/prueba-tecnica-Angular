import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/service/products.service';
import { Producto } from '../models/nuevoProducto.model';

@Component({
  selector: 'app-createProduct',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  nuevoProducto: Producto = {
    nombre: '',
    precio: 0,
  };

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  crearProducto() {
    this.productsService.crearProducto(this.nuevoProducto).subscribe({
      next: (data: any) => {
        console.log(data);

        this.nuevoProducto = {
          nombre: '',
          precio: 0,
        };
      },
      error: (error: any) => {
        console.log('Error al crear el producto:', error);
      },
      complete: () => {
        alert('El producto ha sido creado correctamente');
      },
    });
  }

  volver(): void {
    this.router.navigate(['']);
  }
}
