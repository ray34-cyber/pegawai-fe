import { useEffect, useState } from "react";
import { getEmployeeTasks } from "@/services/employeeTaskService";
import { EmployeeTask } from "@/types/employeeTask";

export function useFetchEmployeeTasks(taskId: string) {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeTask[]>([]);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { employees, task_name } = await getEmployeeTasks(taskId);
        setEmployees(employees);
        setTaskName(task_name);
      } catch (error) {
        console.error("Gagal fetch:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [taskId]);

  return { loading, employees, taskName };
}
