"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchEmployeeDetail, updateEmployeeTask } from "@/services/employeeService";
import { validateEditEmployeeForm } from "@/validators/editEmployeeValidator";
import { showErrorAlert } from "@/lib/alerts/showErrorAlert";
import { showSuccessAlert } from "@/lib/alerts/showSuccessAlert";

interface Params {
  taskId?: string;
  employeeId?: string;
}

export const useEditEmployeeForm = () => {
  const { taskId, employeeId } = useParams() as Params;
  const router = useRouter();

  const [employeeName, setEmployeeName] = useState('');
  const [employeeRate, setEmployeeRate] = useState('');
  const [employeeHours, setEmployeeHours] = useState('');
  const [extraCost, setExtraCost] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId || !employeeId) return;

    const fetchData = async () => {
      try {
        const data = await fetchEmployeeDetail(taskId, employeeId);
        setEmployeeName(data.employee_name ?? '');
        setEmployeeRate(data.employee_rate?.toLocaleString() ?? '');
        setEmployeeHours('');
        setExtraCost('');
        setTaskDescription('');
      } catch {
        showErrorAlert('Gagal memuat data', 'Tidak dapat mengambil data employee dari server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId, employeeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateEditEmployeeForm({
      employeeHours,
      extraCost,
      taskDescription,
    });

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const data = await updateEmployeeTask(taskId!, employeeId!, {
        employee_hours: +employeeHours,
        extra_cost: extraCost ? +extraCost : 0,
        task_description: taskDescription,
      });

      showSuccessAlert(data.message);
      router.back();
    } catch (error: any) {
      showErrorAlert('Gagal', error?.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};
