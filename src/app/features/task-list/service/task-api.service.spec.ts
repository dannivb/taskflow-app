import { TestBed } from '@angular/core/testing';

import { TaskApiService } from './task-api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ITask } from '../models/task.model';
import { provideHttpClient } from '@angular/common/http';

describe('TaskApiService', () => {
  let service: TaskApiService;
  let httpMock: HttpTestingController;

  const mockListTask: ITask[] = [
    {
      id: '1',
      title: 'Tarea Http',
      description: 'descripción',
      createdAt: new Date(),
      status: 'new',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
