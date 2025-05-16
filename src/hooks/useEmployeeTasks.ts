import { useState, useEffect } from "react";
import { useEmployeeTasksCache } from "./useEmployeeTasksCache";
import { useFetchEmployeeTasks } from "./useFetchEmployeeTasks";
import { EmployeeTask } from "@/types/employeeTask";

interface UseEmployeeTasksResult {
  loading: boolean;
  employees: EmployeeTask[];
  taskName: string;
}

export function useEmployeeTasks(taskId: string): UseEmployeeTasksResult {
  const {
    cachedEmployees,
    cachedTaskName,
    isCached,
    setCache,
  } = useEmployeeTasksCache(taskId);

  const [loading, setLoading] = useState(!isCached);
  const [employees, setEmployees] = useState<EmployeeTask[]>(cachedEmployees);
  const [taskName, setTaskName] = useState(cachedTaskName);

  const {
    loading: serverLoading,
    employees: fetchedEmp,
    taskName: fetchedName,
  } = useFetchEmployeeTasks(taskId);

  useEffect(() => {
    if (!isCached && !serverLoading) {
      setEmployees(fetchedEmp);
      setTaskName(fetchedName);
      setCache(fetchedEmp, fetchedName);
      setLoading(false);
    }
  }, [isCached, serverLoading, fetchedEmp, fetchedName, setCache]);

  return { loading, employees, taskName };
}
