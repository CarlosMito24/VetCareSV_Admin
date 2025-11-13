import { Component, OnInit } from '@angular/core';
import { Controlador } from '../../app/services/controlador';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-citascompletadas',
  templateUrl: './citascompletadas.page.html',
  styleUrls: ['./citascompletadas.page.scss'],
  standalone: false,
})
export class CitascompletadasPage implements OnInit {
 citascompletadas: any[] = [];

  constructor(
    private controladorService: Controlador,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.cargarCitasCompletadas();
  }

  ionViewWillEnter() {
    this.cargarCitasCompletadas();
  }

  async cargarCitasCompletadas() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Cargando historial...',
    });
    await loading.present();

    this.controladorService
      .getHistorialCitas()
      .pipe(
        catchError((error) => {
          let errorMessage =
            'Error de conexión. No se pudo cargar el historial.';
          if (error.status === 401) {
            errorMessage =
              'Sesión expirada. Por favor, inicia sesión de nuevo.';
          }
          this.mostrarToast(errorMessage, 'danger');

          this.citascompletadas = [];
          return of([]);
        }),
        finalize(async () => {
          await loading.dismiss();
        })
      )
      .subscribe((data: any[]) => {
        this.citascompletadas = data;
      });
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

}
