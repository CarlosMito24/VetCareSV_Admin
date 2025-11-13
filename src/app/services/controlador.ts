import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../interfaces/loginResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Controlador {
  path_server: string = 'http://127.0.0.1:8000/api/';

  constructor(public http: HttpClient) {}

  //Pasar Token a pagina login
  login(email: string, password: string) {
    let datos = {
      email: email,
      password: password,
    };

    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    var url = this.path_server + 'loginadmin';
    return this.http.post<LoginResponse>(url, JSON.stringify(datos), options);
  }

  //Pasar Token para logout (perfil)
  logout() {
    const token = localStorage.getItem('token');

    let options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    var url = this.path_server + 'logoutadmin';

    return this.http.post(url, {}, options);
  }

  limpiarSesionLocal() {
    localStorage.removeItem('token');
  }

  //Obtener datos usuario
  getUserProfile(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = this.path_server + 'admin/user/profile';
    return this.http.get<any[]>(url, options);
  }

  //Actualizar datos del usuario
  updateUserProfile(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const url = this.path_server + 'admin/user/profile';

    return this.http.put(url, userData, options);
  }

  registrarAdmin(adminData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };

    const url = this.path_server + 'registraradmin';
    return this.http.post(url, adminData, options);
  }

  //Mostrar servicios
  getServiciosAdmin(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = this.path_server + 'admin/servicios';
    return this.http.get<any[]>(url, options);
  }

  //Mostrar mascotas
  getMascotasAdmin(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = this.path_server + 'admin/mascotas';
    return this.http.get<any[]>(url, options);
  }

  //Mostrar Citas Pendientes
  getCitasPendientesAdmin() {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = this.path_server + 'admin/citas/pendientes';
    return this.http.get<any[]>(url, options);
  }

  // Función de ayuda para generar los encabezados con el token
  private getAuthOptions(contentType: 'json' | 'form' = 'json'): {
    headers: HttpHeaders;
  } {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Solo se añade 'application/json' si se requiere (para peticiones que no llevan FormData)
    if (contentType === 'json') {
      headers = headers.set('Content-Type', 'application/json');
    }

    return { headers };
  }

  //Editar Citas
  getCitaPorId(id: number): Observable<any> {
    const url = this.path_server + `citas/${id}`;
    return this.http.get<any>(url, this.getAuthOptions());
  }

  editarCita(id: number, citaData: any): Observable<any> {
    const url = this.path_server + `citas/${id}`;
    return this.http.put<any>(url, citaData, this.getAuthOptions());
  }

  cancelarCita(id: number): Observable<any> {
    const url = this.path_server + `admin/citas/${id}/cancelar`;

    const datosCancelacion = {
      estado_id: 3,
    };

    return this.http.patch<any>(url, datosCancelacion, this.getAuthOptions());
  }

  completarCita(id: number): Observable<any> {
    const url = this.path_server + `admin/citas/${id}/completar`;

    const datosCancelacion = {
      estado_id: 2,
    };

    return this.http.patch<any>(url, datosCancelacion, this.getAuthOptions());
  }

    //Mostrar Citas Completadas (Historial)
  getHistorialCitas() {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = this.path_server + 'admin/citascompletadas';
    return this.http.get<any[]>(url, options);
  }

  //Función para crear un nuevo servicio
  subirServicio(servicioData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    const url = this.path_server + 'admin/servicios';
    return this.http.post<any>(url, servicioData, options);
  }

  eliminarServicio(id: number): Observable<any> {
    const url = this.path_server + `admin/servicios/${id}`
    return this.http.delete<any>(url, this.getAuthOptions());
  }

  getServicioPorId(id: number): Observable<any> {
    const url = this.path_server + `admin/servicios/${id}`;
    return this.http.get<any>(url, this.getAuthOptions('json'));
  }

    /**
   * Actualiza los datos de una mascota específica (PUT /mascotas/{id}).
   * NOTA: Esta función debe recibir FormData si incluye una imagen.
   * @param id El ID de la mascota a actualizar.
   * @param mascotaData Los datos de la mascota (puede ser JSON o FormData).
   */
  editarServicio(id: number, servicioData: any): Observable<any> {
    const url = this.path_server + `admin/servicios/${id}`;
    return this.http.post<any>(url, servicioData, this.getAuthOptions('form'));
  }
}
