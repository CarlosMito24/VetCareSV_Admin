import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Controlador } from '../services/controlador';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-editarcita',
  templateUrl: './editarcita.page.html',
  styleUrls: ['./editarcita.page.scss'],
  standalone: false
})
export class EditarcitaPage implements OnInit {

  citaId: number = 0;
  formularioCita: FormGroup;
  userIdCita: number = 0;
  mascotas: any[] = [];
  servicios: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private controladorService: Controlador,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
     this.formularioCita = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      mascota_id: ['', Validators.required],
      servicios_id: ['', Validators.required],
      estado_id: [1, Validators.required],
    });
   }

  ngOnInit() {
    this.citaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatosIniciales();
  }

  async cargarDatosIniciales() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Cargando datos de la cita...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      
      // 1. CARGAR SERVICIOS (Datos generales, independiente de la cita)
      const serviciosPromise = this.controladorService.getServiciosAdmin().toPromise();
      const serviciosData = await serviciosPromise;
      this.servicios = serviciosData || [];


      // 2. CARGAR LA CITA (Obtener el user_id)
      if (this.citaId) {
        // Usamos .toPromise() para manejar el Observable con async/await
        const citaResponse = await this.controladorService
          .getCitaPorIdAdmin(this.citaId)
          .toPromise();
        
        const cita = citaResponse; 

        if (cita) {
          this.userIdCita = cita.user_id; // <-- Guardamos el ID del usuario
          
          // 3. CARGAR MASCOTAS FILTRADAS POR USER_ID DE LA CITA
          if (this.userIdCita) {
            const mascotasData = await this.controladorService
              .getMascotasDeUsuario(this.userIdCita)
              .toPromise();
            this.mascotas = mascotasData || [];
          }

          // *** CORRECCIÓN CRUCIAL DE FORMATO DE FECHA/HORA ***
          let fechaSimple = cita.fecha;
          let horaSimple = cita.hora;
          
          // Limpiar formato de fecha (de 'YYYY-MM-DD HH:MM:SS' a 'YYYY-MM-DD')
          if (cita.fecha && typeof cita.fecha === 'string' && cita.fecha.includes(' ')) {
              fechaSimple = cita.fecha.split(' ')[0];
          }
          // Limpiar formato de hora (de 'HH:MM:SS' a 'HH:MM')
          if (cita.hora && typeof cita.hora === 'string' && cita.hora.length > 5) {
              horaSimple = cita.hora.substring(0, 5);
          }
          // *** FIN CORRECCIÓN ***

          // 4. Parchear el formulario con los datos cargados
          this.formularioCita.patchValue({
            fecha: fechaSimple, 
            hora: horaSimple,
            mascota_id: cita.mascota_id,
            servicios_id: cita.servicios_id,
            estado_id: cita.estado_id,
          });
        } else {
          throw new Error('Cita no encontrada.');
        }
      }
    } catch (err: any) {
      // Manejo de errores: Si falla la cita o los servicios
      let message = 'No se pudieron cargar los datos de la cita. Vuelva a intentar.';
      
      // Manejar el caso específico de que la llamada a mascotas devuelva un 404 (si el backend lo devuelve así)
      if (err.status === 404 && err.url && err.url.includes('mascotas/por-usuario')) {
          message = 'Cita cargada, pero el usuario no tiene mascotas registradas para el selector.';
          console.warn('Advertencia:', message);
      } else if (err.error?.message) {
          message = err.error.message;
      } else {
          console.error('Error durante la carga inicial:', err);
      }
      
      this.mostrarMensaje(message, 'danger');
      // Redirigir solo si el error es grave (no si es un 404 de mascotas)
      if (err.status !== 404) {
         this.router.navigate(['/citas-admin']);
      }
    } finally {
      loading.dismiss();
    }
  }

  async guardarCambios() {
    if (this.formularioCita.invalid) {
      this.mostrarMensaje(
        'Por favor, revisa todos los campos requeridos.',
        'warning'
      );
      return;
    }

    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
      message: 'Guardando cambios...',
      spinner: 'crescent',
    });
    await loading.present();

    const datosActualizados = this.formularioCita.value;

    this.controladorService
      .editarCitaAdmin(this.citaId, datosActualizados)
      .pipe(
        finalize(async () => {
          await loading.dismiss();
        })
      )
      .subscribe({
        next: (res) => {
          this.mostrarMensaje(
            res.message || 'Cita actualizada con éxito.',
            'success'
          );
          this.router.navigate(['/citaspendientes']);
        },
        error: (err) => {
          let errorMessage =
            'Error al actualizar la cita. Por favor, revisa la consola.';
          
          // Detectar el error de validación 422 de Laravel
          if (err.status === 422) {
             errorMessage = 'Error de validación: La mascota seleccionada NO pertenece al usuario de la cita o hay un campo inválido.';
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          }
          this.mostrarMensaje(errorMessage, 'danger');
          console.error(err);
        },
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
