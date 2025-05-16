import { showErrorAlert } from "@/lib/alerts/showErrorAlert";

interface ValidateParams {
  employeeHours: string;
  extraCost: string;
  taskDescription: string;
}

export function validateEditEmployeeForm({
  employeeHours,
  extraCost,
  taskDescription,
}: ValidateParams): boolean {
  if (!employeeHours || isNaN(+employeeHours) || +employeeHours < 0) {
    showErrorAlert('Error', 'Jam kerja harus berupa angka ≥ 0');
    return false;
  }

  if (!extraCost || isNaN(+extraCost) || +extraCost < 0) {
    showErrorAlert('Error', 'Biaya tambahan harus berupa angka ≥ 0');
    return false;
  }

  if (!taskDescription || taskDescription.trim().length < 5) {
    showErrorAlert('Error', 'Deskripsi tugas minimal 5 karakter');
    return false;
  }

  return true;
}
