import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerUsuario } from '../models/ver-usuario.model';
import { UsuariosService } from '../../service/usuarios.service';
import { UpdateUserService } from '../../service/updateUser.service';
import { AuthenticationService } from '../../service/logout.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css'],
})
export class VerUsuarioComponent implements OnInit {
  usuario: VerUsuario = {} as VerUsuario;
  nombreUsuario: string = '';
  editable: boolean = false;
  puedeEliminar: boolean = false;
  private apiUrl = environment.apiUrl;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private updateUser: UpdateUserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const uid = this.activatedRoute.snapshot.paramMap.get('uid');

    if (uid) {
      this.verUsuario(uid);
    }
  }

  verUsuario(uid: string): void {
    this.usuariosService.obtenerUsuario(uid).subscribe((data: any) => {
      if (data.results && data.results.length > 0) {
        this.usuario = data.results[0];
      } else {
        console.log('Usuario no encontrado');
      }
    });
  }

  actualizarUsuario(uid: string, usuario: VerUsuario): void {
    usuario.uid = uid;

    this.updateUser.actualizarUsuario(uid, usuario).subscribe(
      () => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/usuarios']);
      },
      (error) => {
        console.log('Error al actualizar el usuario', error);
      }
    );
  }
  volver(): void {
    this.router.navigate(['/usuarios']);
  }

  logout() {
    this.authService.logout();
  }

  eliminarUsuario(usuario: VerUsuario): void {
    if (confirm('¿Estás seguro que deseas eliminar este usuario?')) {
      usuario.estado = false;
      this.updateUser.actualizarUsuario(usuario.uid, usuario).subscribe(
        (res: any) => {
          alert(`Usuario ${usuario.nombre} eliminado`);
          this.router.navigate(['/usuarios']);
        },
        (err: any) => {
          console.error(`Error eliminando el usuario ${usuario.nombre}:`, err);
        }
      );
    }
  }
}
