import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint: String = environment.API_URL /*'http://localhost:3000/api/user'*/;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Add student
  AgregarUsuario(data: Usuario): Observable<any> {
    let API_URL = `${this.endpoint}`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }
  // Get all students
  ListarUsuarios() {
    return this.http.get(`${this.endpoint}`);
  }
  // Get student
  ObtenerUsuario(id: String): Observable<any> {
    let API_URL = `${this.endpoint}/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update student
  ActualizarUsuario(id: String, data: Object): Observable<any> {
    let API_URL = `${this.endpoint}/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Delete student
  EliminarUsuario(id: String): Observable<any> {
    var API_URL = `${this.endpoint}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
