import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitaspendientesPageRoutingModule } from './citaspendientes-routing.module';

import { CitaspendientesPage } from './citaspendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitaspendientesPageRoutingModule
  ],
  declarations: [CitaspendientesPage]
})
export class CitaspendientesPageModule {}
