import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  http = inject(HttpClient);

  urlBase = 'http://localhost:3000/tasks';

  getAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.urlBase);
  }

  getByID(id: string): Observable<ITask | null> {
    return this.http.get<ITask>(`${this.urlBase}/${id}`);
  }

  create(taskIncome: Omit<ITask, 'id' | 'createdAt'>): Observable<ITask> {
    return this.http.post<ITask>(this.urlBase, {
      ...taskIncome,
      id: String(new Date()),
      createdAt: new Date(),
    });
  }

  update(
    id: string,
    taskIncome: Omit<ITask, 'id' | 'createdAt'>,
  ): Observable<ITask> {
    return this.http.put<ITask>(`${this.urlBase}/${id}`, taskIncome);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
