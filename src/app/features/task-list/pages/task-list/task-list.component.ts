import { Component, inject, OnInit, signal } from '@angular/core';
import { ITask } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../component/task-form/task-form.component';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { TaskApiService } from '../../service/task-api.service';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from '../../component/loader/loader.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    TaskFormComponent,
    TaskStatusPipe,
    RouterModule,
    LoaderComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskComponent implements OnInit {
  formVisible: boolean = false;

  // taskService = inject(TasksService);

  taskServiceApi = inject(TaskApiService);

  router = inject(Router);

  // tasks = this.taskService.tasks$;

  taskToEdit: ITask | null = null;

  taskList = signal<ITask[]>([]);

  loading = signal<boolean>(false);

  error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.loading.set(true);
    this.taskServiceApi.getAll().subscribe({
      next: (res) => {
        this.taskList.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.taskList.set([]);
        this.loading.set(false);
        this.error.set('No se Pudo obtener el listado de tareas');
      },
    });
  }

  deleteTask(id: string): void {
    this.taskServiceApi.delete(id).subscribe((res) => {
      this.fetchTasks();
    });
  }

  onEditTask(task: ITask) {
    this.taskToEdit = task;
    this.formVisible = true;
  }

  onCreateTask() {
    this.router.navigate(['/tasks/new']);
  }

  onEditTaskRouter(id: string) {
    this.router.navigate([`tasks/${id}/edit`]);
  }

  onDetailTaskRouter(id: string) {
    this.router.navigate([`tasks/${id}`]);
  }
}
