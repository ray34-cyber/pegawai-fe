import Link from "next/link";

interface TaskTableRowProps {
  id: number;
  taskName: string;
  taskDate: string;
  totalRemuneration: number;
  onDelete: (id: number) => void;
}

export default function TaskTableRow({
  id,
  taskName,
  taskDate,
  totalRemuneration,
  onDelete,
}: TaskTableRowProps) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-2">{taskName}</td>
      <td className="px-4 py-2">{taskDate}</td>
      <td className="px-4 py-2">Rp {totalRemuneration.toLocaleString("id-ID")}</td>
      <td className="px-4 py-2">
        <div className="flex gap-2">
          <Link
            href={`/tasks/${id}/employees`}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Lihat
          </Link>
          <button
            onClick={() => onDelete(id)}
            className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}
