import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "lista-usuarios"},
  { path: "agregar-usuario", component: AgregarUsuarioComponent},
  { path: "editar-usuario/:id", component: EditarUsuarioComponent },
  { path: "lista-usuarios", component: ListaUsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
