import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "usuarios"},
  { path: "usuario", component: AgregarUsuarioComponent},
  { path: "usuario/:id", component: EditarUsuarioComponent },
  { path: "usuarios", component: ListaUsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
