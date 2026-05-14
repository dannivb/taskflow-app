import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/task-list/pages/task-list/task-list.component').then(
        (m) => m.TaskComponent,
      ),
  },
  {
    path: 'tasks/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/task-list/pages/create-task/create-task.component').then(
        (m) => m.CreateTaskComponent,
      ),
  },
  {
    path: 'tasks/:id/edit',
    loadComponent: () =>
      import('./features/task-list/pages/create-task/create-task.component').then(
        (m) => m.CreateTaskComponent,
      ),
  },
  {
    path: 'tasks/:id',
    loadComponent: () =>
      import('./features/task-list/pages/detail-task/detail-task.component').then(
        (m) => m.DetailTaskComponent,
      ),
  },
];
