import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../app/models/nueva-categoria.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(page: number = 0, pageSize: number = 50) {
    const desde = (page - 1) * pageSize;
    const url = `${this.apiUrl}/categorias?desde=${page}&limite=${pageSize}`;
    const params = { page: page.toString(), pageSize: pageSize.toString() };

    return this.http.get(url, { params });
  }

  crearCategoria(categoria: Categoria) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-token', token || '');
    const url = `${this.apiUrl}/categorias`;
    return this.http.post(url, categoria, { headers });
  }
}
