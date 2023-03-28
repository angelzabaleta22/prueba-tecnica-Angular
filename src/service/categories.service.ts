import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(page: number = 0, pageSize: number = 50) {
    const desde = (page - 1) * pageSize;
    const url = `${this.apiUrl}/categorias`;
    const params = { page: page.toString(), pageSize: pageSize.toString() };

    return this.http.get(url, { params });
  }
}
