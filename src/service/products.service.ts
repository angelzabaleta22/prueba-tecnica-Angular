import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../app/models/nuevoProducto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  tokenKey = environment.tokenKey;

  constructor(private http: HttpClient) {}

  getProducts(page: number = 0, pageSize: number = 50) {
    const desde = page - 1 * pageSize;
    const url = `${this.apiUrl}/productos?desde=${page}&limite=${pageSize}`;
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get(url, { params });
  }

  crearProducto(producto: Producto) {
    const url = `${this.apiUrl}/productos`;
    console.log(url);

    return this.http.post(url, producto);
  }
}
