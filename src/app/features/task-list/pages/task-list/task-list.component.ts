import { Component, inject } from '@angular/core';
import { ITask } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../service/tasks.service';
import { TaskFormComponent } from '../../component/task-form/task-form.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskComponent {
  formVisible: boolean = false;

  taskService = inject(TasksService);

  tasks = this.taskService.tasks$;

  taskToEdit: ITask | null = null;

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
