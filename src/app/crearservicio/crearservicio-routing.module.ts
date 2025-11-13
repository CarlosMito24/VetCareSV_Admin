import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearservicioPage } from './crearservicio.page';

const routes: Routes = [
  {
    path: '',
    component: CrearservicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearservicioPageRoutingModule {}
