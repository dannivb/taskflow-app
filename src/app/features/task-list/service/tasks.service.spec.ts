import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Retorna todas las tareas', () => {
    const tasks = service.getAll();
    expect(tasks.length).toBe(4);
  });

  it('Debe agregar una nueva tarea', () => {
    service.add({
      title: 'nueva tarea',
      description: 'nuesva descripcion',
      status: 'new',
    });
    expect(service.getAll().length).toBe(5);
  });

  it('Debe actualizar la tarea', () => {
    const taskToUpdate = service.getAll()[0];

    service.update(taskToUpdate.id, {
      title: 'Tarea actualizada',
      description: 'Descripcion actualizada',
      status: 'pending',
    });

    const taskUpdated = service.getById(taskToUpdate.id);

    expect(taskUpdated?.title).toBe('Tarea actualizada');
  });

  it('Debe borrar un registro', () => {
    const longitudInicial = service.getAll().length;

    const taskToDelete = service.getAll()[0];

    service.delete(taskToDelete.id);

    expect(service.getAll().length).toBe(longitudInicial - 1);
  });

  it('Debe haber algun item', () => {
    const taskToFind = service.getAll()[0];

    const taskFind = service.getById(taskToFind.id);

    expect(taskFind).toBe(taskToFind);
  });

  it('No Debe haber algun item', () => {
    const taskFind = service.getById('ejemplo');
    expect(taskFind).toBeUndefined();
  });

});
