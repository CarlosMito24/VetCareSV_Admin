import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NavController,
  AlertController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { Controlador } from 'src/app/services/controlador'
import { finalize } from 'rxjs';


@Component({
  selector: 'app-editarservicio',
  templateUrl: './editarservicio.page.html',
  styleUrls: ['./editarservicio.page.scss'],
  standalone: false
})
export class EditarservicioPage implements OnInit {

  servicioId!: number;
  servicioForm!: FormGroup;
  servicioActual: any = null;
  imagenSeleccionada: File | null = null;
  imagenURLActual: string | null = null;
  imagenPrevisualizacionUrl: string | ArrayBuffer | null = null;
  servidorUrl: string = 'http://127.0.0.1:8000/images/';
  constructor(
        private route: ActivatedRoute,
    private fb: FormBuilder,
    private controladorService: Controlador,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) {this.initForm(); }

  ngOnInit() {
     this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.servicioId = +id;
        this.cargarServicio(this.servicioId);
      } else {
        this.presentToast('No se encontró el ID del servicio.', 'danger');
        this.navCtrl.back();
      }
    });
  }

    initForm() {
    this.servicioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: [''],
      precio: [
        null as unknown as number | null,
      ],
      imagen: [null],
    });
  }

  async cargarServicio(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cargando datos del servicio...',
      spinner: 'crescent', 
      cssClass: 'custom-loading'
    });
    await loading.present();

    this.controladorService.getServicioPorId(id)
      .pipe(
        finalize(() => {
          loading.dismiss(); 
        })
      )
      .subscribe({
        next: (data) => {
          this.servicioActual = data;
          this.imagenURLActual = this.servidorUrl + data.imagen;
          this.servicioForm.patchValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
          });
        },
        error: (error) => {
          this.presentToast('Error al cargar los datos del servicio.', 'danger');
          this.navCtrl.back();
        },
      });
  }

   onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
      this.servicioForm.get('imagen')?.setValue(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPrevisualizacionUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenSeleccionada = null;
      this.servicioForm.get('imagen')?.setValue(null);
      this.imagenPrevisualizacionUrl = null;
    }
  }

  clearNewImageSelection() {
    this.imagenSeleccionada = null;
    this.imagenPrevisualizacionUrl = null;
    this.servicioForm.get('imagen')?.setValue(null);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    if (this.servicioForm.invalid) {
      this.presentToast(
        'Por favor, completa el formulario correctamente.',
        'warning'
      );
      return;
    }

    const formData = new FormData();
    formData.append('_method', 'PUT');
    Object.keys(this.servicioForm.controls).forEach((key) => {
      if (key !== 'imagen') {
        const value = this.servicioForm.get(key)?.value;
        const finalValue = value === null || value === undefined ? '' : value;
        formData.append(key, String(finalValue));
      }
    });

    if (this.imagenSeleccionada) {
      formData.append(
        'imagen',
        this.imagenSeleccionada,
        this.imagenSeleccionada.name
      );
    }

    this.controladorService.editarServicio(this.servicioId, formData).subscribe({
      next: (res) => {
        this.presentToast(
          res.message || 'Servicio actualizado con éxito.',
          'success'
        );
        this.navCtrl.navigateRoot('/servicios');
      },
      error: (err) => {
        let errorMessage =
          'Error al actualizar el servicio. Verifica los datos.';
        if (err.error?.message) {
          errorMessage = err.error.message;
        }
        this.presentToast(errorMessage, 'danger');
      },
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }

}
