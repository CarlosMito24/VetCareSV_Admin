import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Controlador } from '../services/controlador';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  admin = { email: '', password: '' };

  constructor(
    private menuCtrl: MenuController,
    private controladorService: Controlador,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'custom');
  }

  async login() {
    const controller = await this.loadingCtrl.create({
      message: 'Espere por favor',
      spinner: 'crescent',
    });

    await controller.present();
    this.controladorService
      .login(this.admin.email, this.admin.password)
      .subscribe(
        (res) => {
          controller.dismiss();
          localStorage.setItem('token', res.token);
          localStorage.setItem('ingresado', 'true');
          this.router.navigate(['/home']);

          this.admin = {
            email: '',
            password: '',
          };
        },
        (error) => {
          controller.dismiss();
          this.mostrarToast('Credenciales inválidas', 'Error');
        }
      );
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: 'warning',
    });
    toast.present();
  }
}
