import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'LoginComponent',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent {
  correo: string;
  password: string;
  token = environment.tokenKey;
  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) {
    this.correo = '';
    this.password = '';
    this.token = '';

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (userId && token) {
      this.router.navigate(['/usuarios']);
    }
  }

  login(): void {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-token', this.token);

    const body = { correo: this.correo, password: this.password };
    const url = `${this.apiUrl}/auth/login`;
    this.http.post(url, body, { headers }).subscribe({
      next: (response: any) => {
        this.token = response.token;
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('token', this.token);
        this.router.navigate(['']);
      },
      error: (url) => {
        const errorMsg = url.error.errors
          ? url.error.errors[0].msg
          : url.error.msg;
        alert('Error al iniciar sesión: ' + errorMsg);
      },
    });
  }

  volver(): void {
    this.router.navigate(['']);
  }
}
