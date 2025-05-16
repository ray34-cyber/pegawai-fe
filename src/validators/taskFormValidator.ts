import { TaskFormState } from "@/components/TaskForm/taskFormReducer"

export type TaskFormErrors = Partial<Record<keyof TaskFormState, string>>;

function isEmpty(value: string) {
  return value.trim() === "";
}

function isInvalidNumber(value: string): boolean {
  return value.trim() === "" || isNaN(Number(value));
}

function isNegative(value: string): boolean {
  return Number(value) < 0;
}

export function validateTaskForm(state: TaskFormState): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (isEmpty(state.taskName)) {
    errors.taskName = "Nama tugas wajib diisi";
  }

  if (isEmpty(state.taskDate)) {
    errors.taskDate = "Tanggal wajib diisi";
  }

  if (isInvalidNumber(state.extraCost)) {
    errors.extraCost = "Biaya tambahan harus berupa angka";
  } else if (isNegative(state.extraCost)) {
    errors.extraCost = "Biaya tambahan tidak boleh negatif";
  }

  if (isEmpty(state.employeeName)) {
    errors.employeeName = "Nama pegawai wajib diisi";
  }

  if (isInvalidNumber(state.employeeHours)) {
    errors.employeeHours = "Jam kerja harus berupa angka";
  } else if (isNegative(state.employeeHours)) {
    errors.employeeHours = "Jam kerja tidak boleh negatif";
  }

  if (isInvalidNumber(state.employeeRate)) {
    errors.employeeRate = "Tarif per jam harus berupa angka";
  } else if (isNegative(state.employeeRate)) {
    errors.employeeRate = "Tarif per jam tidak boleh negatif";
  }

  if (isEmpty(state.taskDescription)) {
    errors.taskDescription = "Deskripsi tugas wajib diisi";
  }

  return errors;
}
