// src/components/task/employee/employeeTaskMapper.ts
import { EmployeeTask } from "@/types/employeeTask";

export function mapToEmployeeTask(raw: any): EmployeeTask {
  return {
    id: raw.employeeTaskId,
    name: raw.employeeName,
    description: raw.taskDescription,
    hours: raw.hours,
    rate: raw.rate,
    additional_fee: raw.extraCost,
    remuneration: raw.hours * raw.rate + raw.additional_fee,
  };
}
