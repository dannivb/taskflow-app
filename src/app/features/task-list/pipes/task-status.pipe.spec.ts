import { pipe } from 'rxjs';
import { TaskStatusPipe } from './task-status.pipe';

describe('TaskStatusPipe', () => {
  let pipe: TaskStatusPipe;

  beforeEach(() => {
    pipe = new TaskStatusPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("Debe tranformar de 'pending' a 'Pendiente' ", () => {
    expect(pipe.transform('pending')).toBe('Pendiente');
  });

  it("Debe tranformar de 'done' a 'Terminado' ", () => {
    expect(pipe.transform('done')).toBe('Terminado');
  });
});
