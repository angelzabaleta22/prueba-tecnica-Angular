import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../service/logout.service';

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
  paginaActual = 0;
  totalPaginas = 0;
  totalProductos: number = 0;
  productosOriginal: Producto[] = [];

  apiUrl = environment.apiUrl;
  token = environment.tokenKey;

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      this.router.navigate(['/login']);
    } else {
      this.getProducts();
    }
  }

  constructor(
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private http: HttpClient,
    private location: Location,
    private authService: AuthenticationService
  ) {}

  getProducts(pagina: number = 0, limitePorPagina: number = 50) {
    this.productsService
      .getProducts(pagina, limitePorPagina)
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
        location.reload();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  eliminarProducto(producto: Producto) {
    const url = `${this.apiUrl}/productos/${producto._id}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('x-token', token || '');

    this.http.delete(url, { headers }).subscribe({
      next: (response: any) => {
        this.token = response.token;
        alert('Producto eliminado exitosamente');
        location.reload();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  logout() {
    this.authService.logout();
  }
}
