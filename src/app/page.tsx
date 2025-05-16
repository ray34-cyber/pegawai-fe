"use client";

import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { formatDate } from "@/utils/formatDate";
import TaskCard from "@/components/task/TaskCard";
import TaskTableRow from "@/components/task/TaskTableRow";
import Pagination from "@/components/task/Pagination";

export default function Home() {
  const { tasks, meta, loading, fetchTasks, deleteTask } = useTasks();

  return (
    <main className="p-4 md:p-6 max-w-[50vmax] mx-auto font-serif">
      <h1 className="text-2xl font-bold mb-6 flex justify-between items-center">
        Selamat datang di Dashboard
        <Link href="/create">
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow-sm transition cursor-pointer">
            Tambah Tugas
          </button>
        </Link>
      </h1>

      {/* Mobile View */}
      <div className="lg:hidden space-y-5">
        {loading ? (
          <p className="text-center text-gray-600 italic">Memuat data...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 italic">Tidak ada tugas tersedia.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              taskName={task.taskName}
              taskDate={formatDate(task.taskDate)}
              totalRemuneration={task.totalRemuneration}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto rounded-md shadow-sm border border-gray-200">
        <table className="min-w-full text-sm font-serif border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="text-left px-4 py-2 text-gray-700">Nama Tugas</th>
              <th className="text-left px-4 py-2 text-gray-700">Tanggal Tugas</th>
              <th className="text-left px-4 py-2 text-gray-700">Total Remunerasi</th>
              <th className="text-center px-4 py-2 text-gray-700 whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-600 italic">
                  Memuat data...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6 italic">
                  Tidak ada tugas tersedia.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <TaskTableRow
                  key={task.id}
                  id={task.id}
                  taskName={task.taskName}
                  taskDate={formatDate(task.taskDate)}
                  totalRemuneration={task.totalRemuneration}
                  onDelete={deleteTask}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={meta.current_page}
        lastPage={meta.last_page}
        onPageChange={fetchTasks}
      />
    </main>
  );
}
