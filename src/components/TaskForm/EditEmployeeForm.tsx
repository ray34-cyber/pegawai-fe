'use client';

import { useEditEmployeeForm } from '@/hooks/useEditEmployeeForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function EditEmployeeForm() {
  const {
    employeeName,
    employeeRate,
    employeeHours,
    extraCost,
    taskDescription,
    isSubmitting,
    loading,
    setEmployeeHours,
    setExtraCost,
    setTaskDescription,
    handleSubmit,
  } = useEditEmployeeForm();

  if (loading) return <p>Loading data...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-xl mx-auto space-y-6 bg-white rounded shadow"
    >
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Nama Pegawai
        </label>
        <Input placeholder="Nama Pegawai" value={employeeName} disabled />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Tarif per Jam
        </label>
        <Input placeholder="Tarif per Jam" value={employeeRate} disabled />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Jam Kerja
          </label>
          <Input
            type="number"
            min="0"
            placeholder="Masukkan jam kerja"
            value={employeeHours}
            onChange={(e) => setEmployeeHours(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Biaya Tambahan
          </label>
          <Input
            type="number"
            min="0"
            placeholder="Masukkan biaya tambahan"
            value={extraCost}
            onChange={(e) => setExtraCost(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Deskripsi Tugas
        </label>
        <Textarea
          placeholder="Masukkan deskripsi tugas"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          rows={5}
        />
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          <strong>Note:</strong> <br />
          - Jam Kerja: Lama waktu anda bekerja hari ini <br />
          - Biaya Tambahan: Biaya tambahan selama jam kerja <br />
          - Deskripsi Tugas: Progress & Tugas Kecil yang sudah selesai <br />
          <br />
          <em>
            Jam kerja dan biaya tambahan yang akan anda isi saat ini akan
            diakumulasikan dengan jam kerja dan biaya tambahan hari sebelumnya.
          </em>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 cursor-pointer text-white px-4 py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
      </button>
    </form>
  );
}
