import { Usuario } from '../../models/usuario';
import { ApiService } from '../../api/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  UsuarioData: any = [];
  dataSource!: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'nombre',
    'apellido',
    'edad',
    'email',
    'telefono',
    'action',
  ];
  constructor(private usuarioApi: ApiService) {
    this.usuarioApi.ListarUsuarios().subscribe((data:any) => {
      this.UsuarioData = data.data;
      this.dataSource = new MatTableDataSource<Usuario>(this.UsuarioData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }
  ngOnInit() {}
  deleteUsuario(index: number, e: { _id: String; }) {
    if (window.confirm('¿Seguro que deseas eliminar usuario?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.usuarioApi.EliminarUsuario(e._id).subscribe();
    }
  }
}
