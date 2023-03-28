import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  tokenKey = environment.tokenKey;

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number) {
    const url = `${this.apiUrl}/productos`;
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get(url, { params });
  }
}
