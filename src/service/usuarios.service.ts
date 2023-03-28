import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Usuario } from '../app/models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  apiUrl = environment.apiUrl;
  tokenKey = environment.tokenKey;

  constructor(private http: HttpClient) {}

  obtenerUsuarios(pagina: number = 1, limitePorPagina: number = 5) {
    const desde = (pagina - 1) * limitePorPagina;
    const url = `${this.apiUrl}/usuarios?desde=${desde}&limite=${limitePorPagina}`;
    return this.http.get(url);
  }

  obtenerUsuario(uid: string) {
    const url = `${this.apiUrl}/buscar/usuarios/${uid}`;
    return this.http.get<Usuario>(url);
  }

  crearUsuario(usuario: Usuario) {
    const url = `${this.apiUrl}/usuarios`;
    return this.http.post(url, usuario);
  }

  eliminarUsuario(uid: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem(this.tokenKey) || ''
    );
    const url = `${this.apiUrl}/${uid}`;

    return this.http.delete(url, { headers });
  }
}
