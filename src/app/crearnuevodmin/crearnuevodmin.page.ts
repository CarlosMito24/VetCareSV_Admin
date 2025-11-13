import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Controlador } from '../services/controlador';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-crearnuevodmin',
  templateUrl: './crearnuevodmin.page.html',
  styleUrls: ['./crearnuevodmin.page.scss'],
  standalone: false,
})
export class CrearnuevodminPage implements OnInit {
  admin = {
    nombres: '',
    apellidos: '',
    telefono: '',
    fecha_nacimiento: '',
    email: '',
    password: '',
  };

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private controladorService: Controlador
  ) {}

  ngOnInit() {}

  async crearUsuario() {
    if (
      !this.admin.nombres ||
      !this.admin.apellidos ||
      !this.admin.telefono ||
      !this.admin.fecha_nacimiento ||
      !this.admin.email ||
      !this.admin.password
    ) {
      await this.mostrarToast(
        'Por favor, completa todos los campos requeridos.',
        'warning'
      );
      return;
    }

    const adminData = {
      nombres: this.admin.nombres,
      apellidos: this.admin.apellidos,
      telefono: this.admin.telefono,
      fecha_nacimiento: this.admin.fecha_nacimiento,
      email: this.admin.email,
      password: this.admin.password,
    };
    this.controladorService
      .registrarAdmin(adminData)
      .pipe(
        catchError((error) => {
          const errorMessage =
            error.error?.message ||
            (error.status === 401
              ? 'Error de autenticación. Por favor, inicia sesión de nuevo.'
              : 'Error de conexión o del servidor. Intente más tarde.');
          this.mostrarToast(`Fallo en el registro: ${errorMessage}`, 'danger');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.mostrarToast('Admin creado correctamente', 'success');
          this.router.navigate(['/configuraciones']);

          this.admin = {
            nombres: '',
            apellidos: '',
            telefono: '',
            fecha_nacimiento: '',
            email: '',
            password: '',
          };
        }
      });
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
