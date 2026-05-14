import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskApiService } from '../../service/task-api.service';
import { ITask } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  serviceApiTask = inject(TaskApiService);

  router = inject(Router);

  activeRouter = inject(ActivatedRoute);

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    status: ['new', Validators.required],
  });

  idTask = signal<string | null>(null);

  taskToEdit = signal<ITask | null>(null);

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((res) => {
      const idTaskTemp = res.get('id');
      if (idTaskTemp) {
        this.fetchDetailTask(idTaskTemp);
      }
    });
  }

  fetchDetailTask(id: string) {
    this.serviceApiTask.getByID(id).subscribe((res) => {
      this.idTask.set(id);
      this.taskToEdit.set(res);
      this.form.patchValue({
        ...res,
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.idTask()) {
        this.onUpdate(this.idTask() || '');
      } else {
        this.onCreate();
      }
    }
  }

  onCreate() {
    this.serviceApiTask.create(this.form.value as ITask).subscribe((res) => {
      this.redirecToList();
    });
  }

  onUpdate(id: string) {
    this.serviceApiTask
      .update(id, this.form.value as ITask)
      .subscribe((res) => {
        this.redirecToDetail();
      });
  }

  redirecToList(): void {
    this.router.navigate(['/tasks']);
  }

  redirecToDetail(): void {
    this.router.navigate([`/tasks/${this.idTask()}`]);
  }
}
