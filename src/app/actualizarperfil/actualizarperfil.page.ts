import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Controlador } from '../../app/services/controlador';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-actualizarperfil',
  templateUrl: './actualizarperfil.page.html',
  styleUrls: ['./actualizarperfil.page.scss'],
  standalone: false,
})
export class ActualizarperfilPage implements OnInit {
  admin: any = {
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
    private controladorService: Controlador,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.obtenerDatos();
  }

  async obtenerDatos() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Cargando perfil...',
    });
    await loading.present();

    this.controladorService
      .getUserProfile()
      .pipe(
        catchError((error) => {
          loading.dismiss();
          this.presentToast('Error al cargar los datos del usuario.', 'danger');
          return of({ data: {} });
        })
      )
      .subscribe((response: any) => {
        if (response.data) {
          this.admin = response.data;

          if (this.admin.fecha_nacimiento) {
            this.admin.fecha_nacimiento = new Date(this.admin.fecha_nacimiento)
              .toISOString()
              .substring(0, 10);
          }
        }
        loading.dismiss();
      });
  }

  async guardarDatos() {
    if (this.admin.password && this.admin.password.length < 8) {
      this.presentToast(
        'La contraseña debe tener al menos 8 caracteres.',
        'warning'
      );
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Actualizando perfil...',
    });
    await loading.present();

    let dataToSend: any = { ...this.admin };

    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    this.controladorService
      .updateUserProfile(dataToSend)
      .pipe(
        catchError((error) => {
          loading.dismiss();
          this.handleApiError(error);
          return of(null);
        })
      )
      .subscribe(async (response: any) => {
        if (response) {
          loading.dismiss();

          await this.presentToast(
            response.message || 'Perfil actualizado con éxito.',
            'success'
          );
          this.admin.password = '';
          this.router.navigate(['/perfil']);
        }
      });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: color,
    });
    toast.present();
  }

  handleApiError(error: any) {
    let errorMessage = 'Ocurrió un error desconocido.';
    let color = 'danger';

    if (error.status === 422 && error.error && error.error.errors) {
      const validationErrors = error.error.errors;
      const firstKey = Object.keys(validationErrors)[0];
      errorMessage = validationErrors[firstKey][0];
      color = 'warning';
    } else if (error.status === 401) {
      errorMessage = 'Sesión expirada o no autorizado.';
      this.router.navigate(['/perfil']);
    } else if (error.status === 0) {
      errorMessage = 'Error de conexión con el servidor.';
    }

    this.presentToast(errorMessage, color);
  }
}
