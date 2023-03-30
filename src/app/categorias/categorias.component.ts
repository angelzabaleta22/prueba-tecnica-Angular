import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/service/categories.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../service/logout.service';

interface Categoría {
  _id: string;
  nombre: string;
  usuario: string;
  usuarioId: string;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriesComponent {
  categorias: Categoría[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  totalCategorías: number = 0;
  categoriaOriginal: Categoría[] = [];

  apiUrl = environment.apiUrl;
  token = environment.tokenKey;

  constructor(
    private router: Router,
    private categorieService: CategoriesService,
    private http: HttpClient,
    private location: Location,
    private authService: AuthenticationService
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

  getCategories(pagina: number = 0, limitePorPagina: number = 50) {
    this.categorieService
      .getCategories(pagina, limitePorPagina)
      .subscribe((response: any) => {
        const categorias = response.categorias.map((categoria: any) => {
          return {
            ...categoria,
            categoria: categoria.nombre,
            _id: categoria._id,
            usuario: categoria.usuario.nombre,
            usuarioId: categoria.usuario._id,
          };
        });
        this.categorias = categorias;

        this.categoriaOriginal = JSON.parse(JSON.stringify(categorias));
      });
  }

  guardarCambios(categoria: Categoría) {
    const url = `${this.apiUrl}/categorias/${categoria._id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-token', token || '');
    const body = {
      nombre: categoria.nombre,
    };

    this.http.put(url, body, { headers }).subscribe({
      next: (response: any) => {
        this.token = response.token;
        alert('Cambios guardados exitosamente');
        location.reload();
      },
      error: (url) => {
        /* var errorMsg = url.error.errors[0].msg;
        console.log(errorMsg); */
        alert('Error al actualizar la categoría: ' + url.error.errors[0].msg);
      },
    });
  }

  eliminarProducto(categoria: Categoría) {
    const url = `${this.apiUrl}/categorias/${categoria._id}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('x-token', token || '');

    this.http.delete(url, { headers }).subscribe({
      next: (response: any) => {
        this.token = response.token;
        alert('Categoría eliminada exitosamente');
        location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancelarCambios() {
    this.categorias = JSON.parse(JSON.stringify(this.categoriaOriginal));
  }

  volver(): void {
    this.router.navigate(['']);
  }
  logout() {
    this.authService.logout();
  }
}
