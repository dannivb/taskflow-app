import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task-list.component';
import { ITask } from '../../models/task.model';
import { signal } from '@angular/core';
import { TasksService } from '../../service/tasks.service';
import { TaskApiService } from '../../service/task-api.service';
import { of } from 'rxjs';

const mockTasks: ITask[] = [
  {
    id: '1',
    title: 'Test Alpha',
    description: 'descripcion',
    status: 'new',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Test Beta',
    description: 'descripcion',
    status: 'new',
    createdAt: new Date(),
  },
];

const mockTaskService = {
  getAll: () => of(mockTasks),
  tasks$: signal<ITask[]>(mockTasks),
  delete: jasmine.createSpy('delete'),
};

describe('TaskListComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [
        {
          provide: TaskApiService,
          useValue: mockTaskService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe rendenderizar el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar los titulos de las tareas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Alpha');
    expect(compiled.textContent).toContain('Test Beta');
  });

  it('Debe de mostrar el numero total de tareas (2)', () => {
    const h2 = fixture.nativeElement.querySelector('h2');

    expect(h2?.textContent).toContain('2');
  });

  it('Debe llamar al boton Eliminar', () => {
    const button = fixture.nativeElement.querySelector('.delete');

    button.click();

    fixture.detectChanges();

    expect(mockTaskService.delete).toHaveBeenCalled()
  });
  
});
