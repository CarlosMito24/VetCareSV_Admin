import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearservicioPageRoutingModule } from './crearservicio-routing.module';

import { CrearservicioPage } from './crearservicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearservicioPageRoutingModule
  ],
  declarations: [CrearservicioPage]
})
export class CrearservicioPageModule {}
