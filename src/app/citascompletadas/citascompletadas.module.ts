import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitascompletadasPageRoutingModule } from './citascompletadas-routing.module';

import { CitascompletadasPage } from './citascompletadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitascompletadasPageRoutingModule
  ],
  declarations: [CitascompletadasPage]
})
export class CitascompletadasPageModule {}
