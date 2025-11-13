import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarservicioPage } from './editarservicio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarservicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarservicioPageRoutingModule {}
