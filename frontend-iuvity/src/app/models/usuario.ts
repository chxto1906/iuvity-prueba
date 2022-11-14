import { EmailValidator } from "@angular/forms";

export class Usuario {
  "_id": String;
  "nombre": String;
  "apellido": String;
  "edad": Number;
  "email": EmailValidator;
  "telefono": String;
  "fecha_creacion": Date;
  "fecha_actualizacion": Date;
}
