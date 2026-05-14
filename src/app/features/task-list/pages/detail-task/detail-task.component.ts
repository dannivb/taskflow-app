import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskApiService } from '../../service/task-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-detail-task',
  imports: [],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.scss',
})
export class DetailTaskComponent implements OnInit {
  serviceApiTask = inject(TaskApiService);

  router = inject(Router);

  activeRouter = inject(ActivatedRoute);

  taskDetail = signal<ITask | null>(null);

  idTask = signal<string | null>(null);

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
      this.idTask.set(id)
      this.taskDetail.set(res);
    });
  }

  redirecToList(): void {
    this.router.navigate(['/tasks']);
  }

  redirecToUpdate(): void {
    this.router.navigate([`/tasks/${this.idTask()}/edit`]);
  }

  onDelete() {
    this.serviceApiTask.delete(this.idTask() || '').subscribe((res) => {
      this.redirecToList();
    });
  }
}
