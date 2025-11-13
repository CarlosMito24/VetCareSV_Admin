import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitaspendientesPage } from './citaspendientes.page';

const routes: Routes = [
  {
    path: '',
    component: CitaspendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitaspendientesPageRoutingModule {}
