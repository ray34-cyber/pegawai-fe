import axios from "axios";
import { EmployeeTask } from "@/types/employeeTask";

export interface GetEmployeeTasksResponse {
  task_name: string;
  employees: EmployeeTask[];
}

export async function getEmployeeTasks(
  taskId: string
): Promise<GetEmployeeTasksResponse> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/employees`
  );

  const mappedEmployees: EmployeeTask[] = data.employees.map(
    (emp: any, index: number) => ({
      employeeTaskId: emp.employee_id,
      employeeName: emp.employee_name,
      taskDescription: emp.task_description,
      hours: emp.employee_hours,
      rate: emp.employee_rate,
      extraCost: emp.extra_cost,
    })
  );

  return {
    task_name: data.task_name,
    employees: mappedEmployees,
  };
}
