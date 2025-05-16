"use client";

import { createContext, useContext, useState } from "react";
import { EmployeeTask } from "@/types/employeeTask";

interface EmployeeTaskCache {
  employees: EmployeeTask[];
  taskName: string;
}

interface EmployeeTasksContextType {
  taskCache: Record<string, EmployeeTaskCache>;
  setTaskData: (taskId: string, data: EmployeeTaskCache) => void;
}

const EmployeeTasksContext = createContext<EmployeeTasksContextType | undefined>(undefined);

const MAX_CACHE = 10;

export const EmployeeTasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [taskCache, setTaskCache] = useState<Record<string, EmployeeTaskCache>>({});

  const setTaskData = (taskId: string, data: EmployeeTaskCache) => {
    setTaskCache(prev => {
      const newCache = { ...prev };

      // LRU-style eviction: hapus cache terlama jika melebihi MAX_CACHE
      if (!newCache[taskId] && Object.keys(newCache).length >= MAX_CACHE) {
        const oldestKey = Object.keys(newCache)[0];
        delete newCache[oldestKey];
      }

      newCache[taskId] = data;
      return newCache;
    });
  };

  return (
    <EmployeeTasksContext.Provider value={{ taskCache, setTaskData }}>
      {children}
    </EmployeeTasksContext.Provider>
  );
};

export const useEmployeeTasksContext = () => {
  const context = useContext(EmployeeTasksContext);
  if (!context) throw new Error("useEmployeeTasksContext harus digunakan dalam EmployeeTasksProvider");
  return context;
};
