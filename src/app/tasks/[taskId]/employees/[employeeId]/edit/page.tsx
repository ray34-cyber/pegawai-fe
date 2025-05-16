'use client';

import { useRouter } from 'next/navigation';
import { EditEmployeeForm } from '@/components/TaskForm/EditEmployeeForm';

export default function EditEmployeePage() {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-6 px-4 py-2 rounded border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        aria-label="Kembali ke halaman sebelumnya"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-semibold mb-6">Edit Pegawai</h1>
      <EditEmployeeForm />
    </main>
  );
}
