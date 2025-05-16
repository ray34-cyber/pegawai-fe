// services/taskService.ts
import axios from "axios";
import { Task, TaskMeta } from "@/types/task";

export const getTasks = async (
  page = 1
): Promise<{ tasks: Task[]; meta: TaskMeta }> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks?page=${page}`
  );
  const data = res.data;

  const tasks = data.data.map(
    (task: any): Task => ({
      id: task.id,
      taskName: task.task_name,
      taskDate: task.task_date,
      totalRemuneration: Number(task.total_remuneration),
    })
  );

  return {
    tasks,
    meta: {
      current_page: data.current_page,
      last_page: data.last_page,
    },
  };
};

export const deleteTaskById = (id: number) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
};
