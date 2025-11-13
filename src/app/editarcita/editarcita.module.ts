import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarcitaPageRoutingModule } from './editarcita-routing.module';

import { EditarcitaPage } from './editarcita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarcitaPageRoutingModule
  ],
  declarations: [EditarcitaPage]
})
export class EditarcitaPageModule {}
