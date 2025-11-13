import { Component, OnInit } from '@angular/core';
import { Controlador } from '../../app/services/controlador';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearservicio',
  templateUrl: './crearservicio.page.html',
  styleUrls: ['./crearservicio.page.scss'],
  standalone: false,
})
export class CrearservicioPage implements OnInit {
  apiUrl = 'http://127.0.0.1:8000/api/admin/servicios';

  servicio = {
    nombre: '',
    descripcion: '',
    precio: null as unknown as number | null,
  };

  imagen: File | null = null;
  imagenPreview: string | null = null;

  constructor(
    private controladorService: Controlador,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagen = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      this.imagen && reader.readAsDataURL(this.imagen);
    }
  }

  crearServicio() {
    if (!this.servicio.nombre || !this.servicio.descripcion) {
      this.mostrarToast(
        'El nombre y la descripción son obligatorios.',
        'warning'
      );
      return;
    }
    const formData = new FormData();

    formData.append('nombre', this.servicio.nombre);

    formData.append('descripcion', this.servicio.descripcion);
    if (
      this.servicio.precio !== null &&
      this.servicio.precio !== undefined &&
      String(this.servicio.precio) !== ''
    ) {
      formData.append('precio', String(this.servicio.precio));
    }

    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }
    this.controladorService
      .subirServicio(formData)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error de conexión o al procesar la solicitud.';

          if (error.error?.errors) {
            const firstErrorKey = Object.keys(error.error.errors)[0];
            errorMessage = error.error.errors[firstErrorKey][0];
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 401) {
            errorMessage =
              'Error de autenticación. Por favor, inicia sesión de nuevo.';
          }

          this.mostrarToast(`Fallo en el registro: ${errorMessage}`, 'danger');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.mostrarToast('Servicio creado correctamente', 'success');
          this.router.navigate(['/servicios']);

          this.imagen = null;
          this.imagenPreview = null;
          this.servicio = {
            nombre: '',
            descripcion: '',
            precio: null,
          };
        }
      });
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
