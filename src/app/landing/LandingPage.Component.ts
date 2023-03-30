import { Component } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/logout.service';

@Component({
  selector: 'LandingPageComponent',
  templateUrl: './LandingPage.Component.html',
  styleUrls: ['./LandingPage.Component.css'],
})
export class LandingPageComponent {
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario;
  paginaActual = 1;
  totalPaginas = 0;
  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.nuevoUsuario = {
      rol: 'ADMIN_ROLE',
      nombre: '',
      correo: '',
      password: '',
      uid: '',
    };
  }

  crearUsuario() {
    this.usuariosService.crearUsuario(this.nuevoUsuario).subscribe({
      next: (data: any) => {
        this.nuevoUsuario = {
          rol: 'ADMIN_ROLE',
          nombre: '',
          correo: '',
          password: '',
          uid: '',
        };
      },
      error: (url: any) => {
        alert('Error al crear usuario: ' + url.error.errors[0].msg);

        /* console.log(url.error.errors[0].msg); */
      },
      complete: () => {
        alert('El usuario ha sido creado correctamente');
        this.router.navigate(['/login']);
      },
    });
  }
}
