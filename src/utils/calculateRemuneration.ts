import { EmployeeTask } from "@/types/employeeTask";

export function calculateRemuneration(employee: EmployeeTask): number {
  return employee.hours * employee.rate + employee.additional_fee;
}
