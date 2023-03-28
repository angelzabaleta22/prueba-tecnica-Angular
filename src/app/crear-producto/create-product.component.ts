import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/service/products.service';
import { Producto } from '../models/nuevoProducto.model';
import { AuthenticationService } from '../../service/logout.service';

@Component({
  selector: 'app-createProduct',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  nuevoProducto: Producto = {
    nombre: '',
    precio: 0,
    categoria: '',
  };

  categorias: any[] = [];

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      this.router.navigate(['/login']);
    } else {
      this.obtenerCatergorias();
    }
  }

  crearProducto() {
    this.productsService.crearProducto(this.nuevoProducto).subscribe({
      next: (data: any) => {
        this.nuevoProducto = {
          nombre: '',
          precio: 0,
          categoria: '',
        };
      },
      error: (error: any) => {
        console.log('Error al crear el producto:', error);
      },
      complete: () => {
        alert('El producto ha sido creado correctamente');
        this.router.navigate(['/productos']);
      },
    });
  }
  onNombreChange($event: Event) {
    this.nuevoProducto.nombre = ($event.target as HTMLInputElement)?.value;
  }

  onPrecioChange($event: Event) {
    this.nuevoProducto.precio = Number(
      ($event.target as HTMLInputElement)?.value
    );
  }

  onCategoriaChange($event: Event) {
    this.nuevoProducto.categoria = ($event.target as HTMLSelectElement)?.value;
  }

  obtenerCatergorias() {
    this.productsService.obtenerCatergorias().subscribe((data: any) => {
      this.categorias = data.categorias;
    });
  }

  volver(): void {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }
}
