import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/service/categories.service';
import { Categoria } from '../../app/models/nueva-categoria.model';
import { AuthenticationService } from '../../service/logout.service';

@Component({
  selector: 'CreateCategorie',
  templateUrl: './create-categoriy.component.html',
  styleUrls: ['./create-categoriy.component.css'],
})
export class CreateCategorie {
  nuevaCategoria: Categoria = {
    nombre: '',
    categoriaId: '',
  };

  constructor(
    private router: Router,
    private CategoriesService: CategoriesService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      this.router.navigate(['/login']);
    } else {
      this.cancelarCambios();
    }
  }

  crearCategoria() {
    this.CategoriesService.crearCategoria(this.nuevaCategoria).subscribe({
      next: (data: any) => {
        this.nuevaCategoria = {
          nombre: '',
          categoriaId: '',
        };
      },
      error: (error) => {
        alert('Error al crear la categoría: ' + error.error.errors[0].msg);
        console.log(error.error.errors[0].msg);
      },
      complete: () => {
        alert('La categoría ha sido creada exitosamene');

        this.router.navigate(['/categorias']);
      },
    });
  }
  onNombreChange($event: Event) {
    this.nuevaCategoria.nombre = ($event.target as HTMLInputElement)?.value;
  }
  cancelarCambios() {
    this.nuevaCategoria = {
      nombre: '',
      categoriaId: '',
    };
  }
  volver(): void {
    this.router.navigate(['']);
  }
  logout() {
    this.authService.logout();
  }
}
