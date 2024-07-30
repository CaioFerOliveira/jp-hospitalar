import { Routes } from '@angular/router';
import { Rotas } from './core/enums/rotas.enum';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: Rotas.PAGINA_INICIAL, pathMatch: 'prefix' },
      {
        path: Rotas.MENU,
        title: 'Menu',
        loadComponent: () =>
          import('./pages/menu/menu.component').then(
            (componente) => componente.MenuComponent
          ),
      },
      {
        path: Rotas.FILA_ATENDIMENTO,
        title: 'Fila Atendimento',
        loadComponent: () =>
          import('./pages/fila-atendimento/fila-atendimento.component').then(
            (componente) => componente.FilaAtendimentoComponent
          ),
      },
      {
        path: '**',
        title: 'Página não encontrada',
        loadComponent: () =>
          import(
            './shared/pagina-nao-encrontrada/pagina-nao-encrontrada.component'
          ).then((c) => c.PaginaNaoEncrontradaComponent),
      },
    ],
  },
];
