import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriesComponent } from './categorias/categorias.component';
import { ProductsComponent } from './productos/products.component';
import { LandingPageComponent } from './landing/LandingPage.Component';
import { LoginComponent } from './login/Login.component';
import { VerUsuarioComponent } from './detalles-usuario/ver-usuario.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    CategoriesComponent,
    ProductsComponent,
    LandingPageComponent,
    LoginComponent,
    VerUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
