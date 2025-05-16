import axios from "axios";

export const fetchEmployeeDetail = async (
  taskId: string,
  employeeId: string
) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/employees/${employeeId}`
  );
  return data.data;
};

export const updateEmployeeTask = async (
  taskId: string,
  employeeId: string,
  payload: {
    employee_hours: number;
    extra_cost: number;
    task_description: string;
  }
) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/employees/${employeeId}`,
    payload
  );
  return data;
};
