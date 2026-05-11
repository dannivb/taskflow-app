import { Injectable, signal } from '@angular/core';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<ITask[]>([
    {
      id: '1',
      title: 'Tarea 1',
      description: 'Descripcion de la tarea 1',
      status: 'new',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: ' Tarea 2',
      description: 'Descripcion de la tarea 2',
      status: 'pending',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Tarea 3',
      description: 'Descripcion de la tarea 1',
      status: 'new',
      createdAt: new Date(),
    },
    {
      id: '4',
      title: ' Tarea 4',
      description: 'Descripcion de la tarea 2',
      status: 'pending',
      createdAt: new Date(),
    },
  ]);

  readonly tasks$ = this.tasks.asReadonly();

  getAll(): ITask[] {
    return this.tasks();
  }

  add(taskIncome: Omit<ITask, 'id' | 'createdAt'>): void {
    const taskTemp: ITask = {
      ...taskIncome,
      id: String(new Date()),
      createdAt: new Date(),
    };
    this.tasks.update((t) => [...t, taskTemp]);
  }

  update(id: string, taskIncome: Omit<ITask, 'id' | 'createdAt'>) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, ...taskIncome } : task)),
    );
  }

  delete(id: string) {
    this.tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  getById(id: string): ITask | undefined {
    return this.tasks().find((t) => t.id == id);
  }
}
