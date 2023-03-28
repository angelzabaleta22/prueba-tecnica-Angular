import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriesComponent } from './categorias/categorias.component';
import { ProductsComponent } from './productos/products.component';
import { VerUsuarioComponent } from './detalles-usuario/ver-usuario.component';
import { LandingPageComponent } from './landing/LandingPage.Component';
import { LoginComponent } from './login/Login.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/:uid', component: VerUsuarioComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'productos', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
