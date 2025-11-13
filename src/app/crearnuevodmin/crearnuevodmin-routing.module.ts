import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearnuevodminPage } from './crearnuevodmin.page';

const routes: Routes = [
  {
    path: '',
    component: CrearnuevodminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearnuevodminPageRoutingModule {}
