import { TaskForm } from "@/components/TaskForm/TaskForm";

export default function CreateTaskPage() {

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tambah Tugas</h1>
      <TaskForm />
    </main>
  );
}
