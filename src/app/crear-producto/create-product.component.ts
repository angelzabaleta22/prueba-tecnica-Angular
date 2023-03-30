import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/service/products.service';
import { Producto } from '../models/nuevoProducto.model';
import { AuthenticationService } from '../../service/logout.service';
import { CategoriesService } from '../../service/categories.service';

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
    private authService: AuthenticationService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      this.router.navigate(['/login']);
    } else {
      this.getCategories();
    }
  }

  crearProducto() {
    if (
      !this.nuevoProducto.precio ||
      !this.nuevoProducto.nombre ||
      !this.nuevoProducto.categoria
    ) {
      alert('Por favor, los campos no deben estar vacíos.');
      return;
    }
    this.productsService.crearProducto(this.nuevoProducto).subscribe({
      next: (data: any) => {
        this.nuevoProducto = {
          nombre: '',
          precio: 0,
          categoria: '',
        };
      },
      error: (t: any) => {
        for (const error of t.error.errors) {
          console.log('Error al crear el producto por que: ' + error.msg);
        }
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

  getCategories() {
    this.categoriesService.getCategories().subscribe((data: any) => {
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
