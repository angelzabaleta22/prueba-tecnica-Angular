import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  categoria: string;
  usuario: string;
  categoriId: string;
  usuarioId: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productos: Producto[] = [];
  currentPage = 1;
  pageSize = 10;
  totalProductos: number = 0;
  productosOriginal: Producto[] = [];

  apiUrl = environment.apiUrl;
  token = environment.tokenKey;

  ngOnInit(): void {
    this.getProducts(this.currentPage);
  }

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private http: HttpClient
  ) {}

  getProducts(page: number) {
    this.currentPage = page;
    this.productsService
      .getProducts(this.currentPage, this.pageSize)
      .subscribe((response: any) => {
        const productos = response.productos.map((producto: any) => {
          return {
            ...producto,
            categoria: producto.categoria.nombre,
            categoriId: producto.categoria._id,
            usuario: producto.usuario.nombre,
            usuarioId: producto.usuario._id,
          };
        });
        this.productos = productos;
        this.productosOriginal = JSON.parse(JSON.stringify(productos));
      });
  }

  volver(): void {
    this.router.navigate(['']);
  }
  cancelarCambios() {
    this.productos = JSON.parse(JSON.stringify(this.productosOriginal));
  }

  guardarCambios(producto: Producto) {
    const url = `${this.apiUrl}/productos/${producto._id}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('x-token', token || '');
    const body = {
      precio: producto.precio,
      nombre: producto.nombre,
      categoria: producto.categoriId,
      usuario: producto.usuarioId,
    };

    this.http.put(url, body, { headers }).subscribe({
      next: (response: any) => {
        this.token = response.token;
        alert('Cambios guardados exitosamente');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
