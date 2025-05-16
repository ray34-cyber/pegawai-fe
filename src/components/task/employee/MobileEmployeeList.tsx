"use client";

import Link from "next/link";
import { calculateRemuneration } from "@/utils/calculateRemuneration";
import { EmployeeTask } from "@/types/employeeTask";

interface Props {
  employees: EmployeeTask[];
  taskId: number;
}

export default function MobileEmployeeList({ employees, taskId }: Props) {
  if (employees.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        Tidak ada data employee.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {employees.map((emp) => {
        const remuneration = calculateRemuneration(emp);
        return (
          <div
            key={emp.id}
            className="border border-gray-300 rounded-lg shadow-sm bg-white p-6 font-serif"
          >
            <p className="mb-2 text-lg font-semibold text-gray-800">
              {emp.name}
            </p>
            <p className="mb-2 text-gray-600 italic">{emp.description}</p>
            <p className="mb-4 font-semibold text-gray-700">
              Remunerasi: Rp {remuneration.toLocaleString("id-ID")}
            </p>
            <Link
              href={`/tasks/${taskId}/employees/${emp.id}/edit`}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm px-5 py-2 rounded shadow-sm font-semibold transition-colors duration-150 inline-block text-center"
            >
              Edit
            </Link>
          </div>
        );
      })}
    </div>
  );
}
