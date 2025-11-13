import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarservicioPageRoutingModule } from './editarservicio-routing.module';

import { EditarservicioPage } from './editarservicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarservicioPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [EditarservicioPage]
})
export class EditarservicioPageModule {}
