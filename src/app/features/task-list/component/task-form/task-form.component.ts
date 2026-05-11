import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    status: ['new', Validators.required],
  });

  taskToEdit = input<ITask | null>(null);

  formSubmit = output<Partial<ITask>>();

  formCancelar = output<void>();

  ngOnInit(): void {
    if (this.taskToEdit()) {
      this.form.patchValue(this.taskToEdit()!);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as Partial<ITask>);
      this.form.reset({
        status: 'new',
      });
    }
  }

  onCancel(): void {
    this.formCancelar.emit();
    this.form.reset({
      status: 'new',
    });
  }

}
