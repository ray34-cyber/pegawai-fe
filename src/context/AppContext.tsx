"use client";

import { TaskProvider } from "./TaskContext";
import { EmployeeTasksProvider } from "./EmployeeTasksContext";
import { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <TaskProvider>
      <EmployeeTasksProvider>
        {children}
      </EmployeeTasksProvider>
    </TaskProvider>
  );
};
