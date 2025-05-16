"use client";

import Link from "next/link";
import { calculateRemuneration } from "@/utils/calculateRemuneration";
import { EmployeeTask } from "@/types/employeeTask";

interface Props {
  employees: EmployeeTask[];
  taskId : number
}

export default function DesktopEmployeeTable({ employees, taskId }: Props) {
  if (employees.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        Tidak ada data employee.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white ">
      <table className="min-w-full text-sm font-serif">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="text-left px-6 py-3 text-gray-700 tracking-wider">
              Nama Pegawai
            </th>
            <th className="text-left px-6 py-3 text-gray-700 tracking-wider">
              Deskripsi Tugas
            </th>
            <th className="text-left px-6 py-3 text-gray-700 tracking-wider">
              Remunerasi
            </th>
            <th className="text-center px-6 py-3 text-gray-700 tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const remuneration = calculateRemuneration(emp);
            return (
              <tr
                key={emp.id}
                className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200"
              >
                <td className="px-6 py-4">{emp.name}</td>
                <td className="px-6 py-4">{emp.description}</td>
                <td className="px-6 py-4">
                  Rp {remuneration.toLocaleString("id-ID")}
                </td>
                <td className="text-center px-6 py-4">
                  <Link
                    href={`/tasks/${taskId}/employees/${emp.id}/edit`}
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-xs px-4 py-1 rounded font-semibold shadow-sm transition-colors duration-150 inline-block"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
