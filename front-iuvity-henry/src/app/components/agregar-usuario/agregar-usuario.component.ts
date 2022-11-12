import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface Subject {
  name: string;
}
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuarioComponent implements OnInit {
  @ViewChild('resetUsuarioForm') myNgForm: any;
  usuarioForm!: FormGroup;

  ngOnInit() {
    this.submitForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private usuarioApi: ApiService
  ) {}
  /* Reactive book form */
  submitForm() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };
  /* Submit book */
  submitUsuarioForm() {
    if (this.usuarioForm.valid) {
      this.usuarioApi.AgregarUsuario(this.usuarioForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      });
    }
  }
}
