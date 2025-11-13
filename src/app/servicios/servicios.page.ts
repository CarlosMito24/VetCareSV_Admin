import { Component, OnInit } from '@angular/core';
import { Controlador } from '../../app/services/controlador';
import { catchError, finalize } from 'rxjs/operators';
import { of, forkJoin, Observable} from 'rxjs';
import { AlertController, ToastController, LoadingController} from '@ionic/angular';

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
}
