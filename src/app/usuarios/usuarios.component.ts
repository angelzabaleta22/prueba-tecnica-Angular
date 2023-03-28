import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/logout.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario;
  paginaActual = 1;
  totalPaginas = 0;

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      this.router.navigate(['/login']);
    } else {
      this.obtenerUsuarios();
    }
  }

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

  obtenerUsuarios(pagina: number = 1, limitePorPagina: number = 5) {
    this.usuariosService
      .obtenerUsuarios(pagina, limitePorPagina)
      .subscribe((data: any) => {
        this.usuarios = data.usuarios;
        this.totalPaginas = Math.ceil(data.totalUsuarios / limitePorPagina);
        this.paginaActual = pagina;
      });
  }

  cambiarPagina(pagina: number) {
    this.obtenerUsuarios(pagina);
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
      error: (error: any) => {
        alert(
          'Error al crear usuario. Verifica los datos o que el usuario no esté creado '
        );
        console.log('Error al crear usuario:', error);
      },
      complete: () => {
        alert('El usuario ha sido creado correctamente');
      },
    });
  }

  verUsuario(uid: string) {
    this.usuariosService.obtenerUsuario(uid).subscribe((response: any) => {
      const usuario = response.results[0];

      if (usuario && usuario.uid) {
        this.router.navigate(['/usuarios', usuario.uid]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
