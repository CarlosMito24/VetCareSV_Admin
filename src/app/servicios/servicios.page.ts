import { Component, OnInit } from '@angular/core';
import { Controlador } from '../../app/services/controlador';
import { catchError, finalize } from 'rxjs/operators';
import { of, forkJoin, Observable} from 'rxjs';
import { AlertController, ToastController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: false
})
export class ServiciosPage implements OnInit {
servicios: any[] = [];
  constructor(
    private controladorService: Controlador,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarDatosConLoading(false); 
  }
    ionViewWillEnter() {
    this.cargarDatosConLoading(true); 
  }

   async cargarDatosConLoading(isRefresh: boolean) {

    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Cargando datos...',
    });
    await loading.present();

    const peticiones: { [key: string]: Observable<any> } = {};

    peticiones['servicios'] = this.controladorService.getServiciosAdmin().pipe(
      catchError((error) => {
        this.mostrarMensaje('No se pudieron cargar los servicios.', 'danger');
        return of([]);
      })
    );
    
    forkJoin(peticiones)
    .pipe(
      finalize(() => { 
        loading.dismiss();
      })
    )
    .subscribe((resultados: any) => {
      this.servicios = resultados.servicios;
    });
  }

    async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: color,
    });
    toast.present();
  }

   /**
   * Muestra un diálogo de confirmación antes de eliminar una mascota.
   * @param mascotaId ID de la mascota a eliminar.
   */
  async confirmarEliminacion(mascotaId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message:
        '¿Estás seguro de que deseas eliminar esta mascota? Esta acción no se puede deshacer y se eliminarán sus datos asociados.',
      buttons: [
        {
          text: 'No, mantener',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí, Eliminar',
          handler: () => {
            this.eliminarServicio(mascotaId); 
          },
        },
      ],
    });
    await alert.present();
  }


  /**
   * Llama al servicio para eliminar la mascota y actualiza la lista.
   * @param id ID de la mascota a eliminar.
   */
  async eliminarServicio(id: number) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Eliminando servicio...',
      spinner: 'crescent',
    });
    await loading.present();

    this.controladorService
      .eliminarServicio(id)
      .pipe(
        finalize(async () => {
          await loading.dismiss();
        }),
        catchError((error) => {
          this.mostrarMensaje(
            'Error al eliminar el servicio. Intente nuevamente.',
            'danger'
          );
          return of(null);
        })
      )
      .subscribe(() => {
        this.mostrarMensaje('Servicio eliminado correctamente.', 'success');
        this.cargarDatosConLoading(true); 
      });
  }
}
