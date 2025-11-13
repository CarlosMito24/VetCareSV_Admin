import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitascompletadasPage } from './citascompletadas.page';

const routes: Routes = [
  {
    path: '',
    component: CitascompletadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitascompletadasPageRoutingModule {}
