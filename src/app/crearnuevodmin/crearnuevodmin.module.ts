import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearnuevodminPageRoutingModule } from './crearnuevodmin-routing.module';
import { CrearnuevodminPage } from './crearnuevodmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearnuevodminPageRoutingModule
  ],
  declarations: [CrearnuevodminPage]
})
export class CrearnuevodminPageModule {}
