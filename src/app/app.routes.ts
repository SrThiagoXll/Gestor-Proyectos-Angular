import { Routes } from '@angular/router';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrarComponent } from './registrar/registrar.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: MenuComponent,
  },
  {
    path: 'proyecto',
    component: ProyectoComponent,
  },
  {
    path: 'registrarse',
    component: RegistrarComponent,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];
