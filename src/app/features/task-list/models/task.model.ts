export type TTaskStatus = 'new' | 'pending' | 'in-progress' | 'done';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TTaskStatus;
  createdAt: Date;
  dueDate?: Date;
}
