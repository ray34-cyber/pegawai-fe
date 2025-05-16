export type TaskFormState = {
  taskName: string;
  taskDate: string;
  extraCost: string;
  employeeName: string;
  employeeHours: string;
  employeeRate: string;
  taskDescription: string;
};

type TaskFormAction =
  | { type: "SET_TASK_NAME"; payload: string }
  | { type: "SET_TASK_DATE"; payload: string }
  | { type: "SET_EXTRA_COST"; payload: string }
  | { type: "SET_EMPLOYEE_NAME"; payload: string }
  | { type: "SET_EMPLOYEE_HOURS"; payload: string }
  | { type: "SET_EMPLOYEE_RATE"; payload: string }
  | { type: "SET_TASK_DESCRIPTION"; payload: string }
  | { type: "RESET_FORM" };

export const initialTaskFormState: TaskFormState = {
  taskName: "",
  taskDate: "",
  extraCost: "",
  employeeName: "",
  employeeHours: "",
  employeeRate: "",
  taskDescription: "",
};

export const taskFormReducer = (
  state: TaskFormState,
  action: TaskFormAction
): TaskFormState => {
  switch (action.type) {
    case "SET_TASK_NAME":
      return { ...state, taskName: action.payload };
    case "SET_TASK_DATE":
      return { ...state, taskDate: action.payload };
    case "SET_EXTRA_COST":
      return { ...state, extraCost: action.payload };
    case "SET_EMPLOYEE_NAME":
      return { ...state, employeeName: action.payload };
    case "SET_EMPLOYEE_HOURS":
      return { ...state, employeeHours: action.payload };
    case "SET_EMPLOYEE_RATE":
      return { ...state, employeeRate: action.payload };
    case "SET_TASK_DESCRIPTION":
      return { ...state, taskDescription: action.payload };
    case "RESET_FORM":
      return initialTaskFormState;
    default:
      return state;
  }
};
