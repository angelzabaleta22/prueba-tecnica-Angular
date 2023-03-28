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
            usuario: producto.usuario.nombre,
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
      categoria: {
        nombre: producto.categoria,
      },
      usuario: {
        nombre: producto.usuario,
      },
    };

    console.log({ headers });

    this.http.put(url, body, { headers }).subscribe(
      (response) => {
        console.log('Cambios guardados exitosamente:', response);
      },
      (error) => {
        console.error('Error al guardar cambios:', error);
      }
    );
  }
}
