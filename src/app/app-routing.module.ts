import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './no-ingresado-guard';
import { IngresadoGuard } from './ingresado-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [NoIngresadoGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
    canActivate: [IngresadoGuard],
  },
  {
    path: 'crearnuevodmin',
    loadChildren: () => import('./crearnuevodmin/crearnuevodmin.module').then( m => m.CrearnuevodminPageModule), canActivate: [IngresadoGuard],
  },
  {
    path: 'citaspendientes',
    loadChildren: () => import('./citaspendientes/citaspendientes.module').then( m => m.CitaspendientesPageModule), canActivate: [IngresadoGuard],
  },
  {
    path: 'citascompletadas',
    loadChildren: () => import('./citascompletadas/citascompletadas.module').then( m => m.CitascompletadasPageModule), canActivate: [IngresadoGuard],
  },
  {
    path: 'actualizarperfil',
    loadChildren: () => import('./actualizarperfil/actualizarperfil.module').then( m => m.ActualizarperfilPageModule), canActivate: [IngresadoGuard],
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'editarcita',
    loadChildren: () => import('./editarcita/editarcita.module').then( m => m.EditarcitaPageModule)
  },
  {
    path: 'editarservicio/:id',
    loadChildren: () => import('./editarservicio/editarservicio.module').then( m => m.EditarservicioPageModule)
  },
  {
    path: 'crearservicio',
    loadChildren: () => import('./crearservicio/crearservicio.module').then( m => m.CrearservicioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
