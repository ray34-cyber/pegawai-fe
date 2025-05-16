import { useEmployeeTasksContext } from "@/context/EmployeeTasksContext";
import { EmployeeTask } from "@/types/employeeTask";

export function useEmployeeTasksCache(taskId: string) {
  const { taskCache, setTaskData } = useEmployeeTasksContext();
  const cachedData = taskCache[taskId];

  return {
    cachedEmployees: cachedData?.employees || [],
    cachedTaskName: cachedData?.taskName || "",
    isCached: !!cachedData,
    setCache: (employees: EmployeeTask[], taskName: string) =>
      setTaskData(taskId, { employees, taskName }),
  };
}
