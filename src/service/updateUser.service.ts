import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { VerUsuario } from '../app/models/ver-usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  apiUrl = environment.apiUrl;
  tokenKey = environment.tokenKey;

  constructor(private http: HttpClient) {}
  actualizarUsuario(uid: string, usuario: VerUsuario) {
    const url = `${this.apiUrl}/usuarios/${uid}`;
    return this.http.put(url, usuario);
  }
}
