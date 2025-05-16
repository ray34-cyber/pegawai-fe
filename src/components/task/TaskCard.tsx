import Link from "next/link";

interface TaskCardProps {
  id: number;
  taskName: string;
  taskDate: string;
  totalRemuneration: number;
  onDelete: (id: number) => void;
}

export default function TaskCard({
  id,
  taskName,
  taskDate,
  totalRemuneration,
  onDelete,
}: TaskCardProps) {
  return (
    <div className="border rounded-md p-4 shadow-sm">
      <p className="font-semibold">Nama Tugas: {taskName}</p>
      <p className="text-sm text-gray-600">Tanggal: {taskDate}</p>
      <p className="text-sm text-gray-600">
        Total: Rp {totalRemuneration.toLocaleString("id-ID")}
      </p>
      <div className="flex gap-2 mt-3">
        <Link
          href={`/tasks/${id}/employees`}
          className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm text-center hover:bg-blue-700"
        >
          Lihat
        </Link>
        <button
          onClick={() => onDelete(id)}
          className="flex-1 bg-red-600 cursor-pointer text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
