import { Component, inject, OnInit, signal } from '@angular/core';
import { ITask } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../service/tasks.service';
import { TaskFormComponent } from '../../component/task-form/task-form.component';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { TaskApiService } from '../../service/task-api.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskStatusPipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskComponent implements OnInit {
  formVisible: boolean = false;

  taskService = inject(TasksService);

  taskServiceApi = inject(TaskApiService);

  tasks = this.taskService.tasks$;

  taskToEdit: ITask | null = null;

  taskList = signal<ITask[]>([]);

  ngOnInit(): void {
    this.taskServiceApi.getAll().subscribe((res) => {
      this.taskList.set(res);
    });
  }

  deleteTask(id: string): void {
    this.taskService.delete(id);
  }

  onCreateNew(task: Partial<ITask>) {
    const taskToReplace = task as ITask;
    if (this.taskToEdit) {
      this.taskService.update(this.taskToEdit.id, taskToReplace);
      this.taskToEdit = null;
    } else {
      this.taskService.add(taskToReplace);
    }
    this.formVisible = false;
  }

  onEditTask(task: ITask) {
    this.taskToEdit = task;
    this.formVisible = true;
  }
}
