import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Controlador } from '../services/controlador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  constructor(
    private menuCtrl: MenuController,
    private controladorService: Controlador,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  async logout() {
    const controller = await this.loadingCtrl.create({
      message: 'Cerrando sesión',
      spinner: 'crescent',
    });
    await controller.present();
    this.controladorService.logout().subscribe(
      (res) => {
        this.controladorService.limpiarSesionLocal();
        controller.dismiss();
        this.router.navigateByUrl('/login');
        localStorage.removeItem('ingresado');
        localStorage.removeItem('token');
      },
      (error) => {
        this.controladorService.limpiarSesionLocal();
        controller.dismiss();
        this.router.navigateByUrl('/login');
      }
    );
  }
}