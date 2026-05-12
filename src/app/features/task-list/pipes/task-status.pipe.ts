import { Pipe, PipeTransform } from '@angular/core';
import { TTaskStatus } from '../models/task.model';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  private labels: Record<TTaskStatus, string> = {
    new: 'Nuevo',
    pending: 'Pendiente',
    'in-progress': 'En Progreso',
    done: 'Terminado',
  };

  transform(value: TTaskStatus, ...args: unknown[]): unknown {
    return this.labels[value] || value;
  }
}
