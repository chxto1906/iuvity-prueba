import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface Subject {
  name: string;
}
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {

  @ViewChild('resetUsuarioForm') myNgForm: any;
  usuarioForm!: FormGroup;

  ngOnInit() {
    this.updateForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private usuarioApi: ApiService
  ) {
    var id: any = this.actRoute.snapshot.paramMap.get('id');
    this.usuarioApi.ObtenerUsuario(id).subscribe((data:any) => {
      this.usuarioForm = this.fb.group({
        nombre: [data.data.nombre, [Validators.required]],
        apellido: [data.data.apellido, [Validators.required]],
        edad: [data.data.edad, [Validators.required]],
        email: [data.data.email, [Validators.required]],
        telefono: [data.data.telefono, [Validators.required]]
      });
    });
  }
  /* Reactive book form */
  updateForm() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };
  /* Update book */
  updateUsuarioForm() {
    console.log(this.usuarioForm.value);
    var id: any = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('¿Estás seguro de actualizar el usuario?')) {
      this.usuarioApi
        .ActualizarUsuario(id, this.usuarioForm.value)
        .subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/'));
        },error => {
          alert(error);
        });
    }
  }
}
