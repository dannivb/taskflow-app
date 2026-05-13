import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El es invalido cuando esta vacio', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('Debe mostrar un error cuando el titulo tiene menos de 3 caracteres', () => {
    component.form.controls.title.setValue('AB');
    component.form.markAllAsTouched();
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.error');

    expect(error?.textContent).toContain('3 caracteres');
  });

  it('Debe emitir formSubmit cuando el formulario es valido', () => {
    let emit: any = null;

    component.formSubmit.subscribe((val) => (emit = val));

    component.form.patchValue({
      title: 'Tarea valida',
      description: 'Descripcion',
      status: 'new',
    });

    component.onSubmit();

    expect(emit).toBeTruthy();
    expect(emit.title).toBe('Tarea valida');
  });

  it('No debe emitir formSubmit si el formulario es invalido', () => {
    let emit: any = null;

    component.formSubmit.subscribe((val) => (emit = val));

    component.form.patchValue({
      title: '',
      description: '',
      status: 'new',
    });

    component.onSubmit();

    expect(emit).toBe(null)

  });
});
