// types/task.ts
export interface Task {
  id: number;
  taskName: string;
  taskDate: string;
  totalRemuneration: number;
}

export interface TaskMeta {
  current_page: number;
  last_page: number;
}
