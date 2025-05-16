import { TaskFormState } from "@/components/TaskForm/taskFormReducer";

export function mapFormToPayload(state: TaskFormState) {
  return {
    task_name: state.taskName,
    task_date: state.taskDate, // Pastikan ini format "YYYY-MM-DD"
    extra_cost: Number(state.extraCost) || 0,
    employee_name: state.employeeName,
    employee_hours: Number(state.employeeHours) || 0,
    employee_rate: Number(state.employeeRate) || 0,
    task_description: state.taskDescription,
  };
}

