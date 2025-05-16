// context/TaskContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getTasks, deleteTaskById } from "@/services/taskService";
import { Task, TaskMeta } from "@/types/task";

interface TaskContextProps {
  tasks: Task[];
  meta: TaskMeta;
  loading: boolean;
  fetchTasks: (page?: number) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<TaskMeta>({ current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (page = 1) => {
    setLoading(true);
    try {
      const { tasks: fetchedTasks, meta } = await getTasks(page);
      setTasks(fetchedTasks);
      setMeta(meta);
    } catch (error) {
      console.error("Gagal mengambil data tugas:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus tugas ini?",
      text: "Tugas yang dihapus akan disembunyikan tapi tidak benar-benar hilang.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteTaskById(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      Swal.fire({
        title: "Berhasil!",
        text: "Tugas berhasil dihapus (soft delete).",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal hapus tugas:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menghapus tugas.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  };

  useEffect(() => {
    fetchTasks(1);
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, meta, loading, fetchTasks, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext harus digunakan dalam TaskProvider");
  }
  return context;
};
