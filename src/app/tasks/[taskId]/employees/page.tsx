"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEmployeeTasks } from "@/hooks/useEmployeeTasks";
import MobileEmployeeList from "@/components/task/employee/MobileEmployeeList";
import DesktopEmployeeTable from "@/components/task/employee/DesktopEmployeeTable";
import { mapToEmployeeTask } from "@/lib/mappers/employeeTaskMapper";


export default function TaskEmployeesPage() {
  const { taskId } = useParams();
  
  const {
    loading,
    taskName,
    employees: rawEmployees,
  } = useEmployeeTasks(taskId as string);

  const employees = rawEmployees.map(mapToEmployeeTask);
  return (
    <main className="p-4 md:p-6 max-w-[90vw] md:max-w-[50vmax] mx-auto">
      <Link
        href="/"
        className="inline-block mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Kembali ke Daftar Tugas
      </Link>

      <h1 className="text-2xl font-bold mb-4">
        Daftar Pegawai untuk Tugas #{taskName}
      </h1>

      {loading ? (
        <p className="text-center">Memuat data...</p>
      ) : (
        <>
          {/* Mobile hanya tampil di bawah lg */}
          <div className="block lg:hidden">
            <MobileEmployeeList taskId={Number(taskId)} employees={employees} />
          </div>

          {/* Desktop hanya tampil di lg ke atas */}
          <div className="hidden lg:block">
            <DesktopEmployeeTable taskId={Number(taskId)} employees={employees} />
          </div>
        </>
      )}
    </main>
  );
}
