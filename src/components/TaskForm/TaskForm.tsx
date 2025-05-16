"use client";

import { useReducer, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { taskFormReducer, initialTaskFormState } from "./taskFormReducer";
import { errorsReducer } from "./errorsReducer";
import { validateTaskForm } from "@/validators/taskFormValidator";
import { mapFormToPayload } from "@/lib/mappers/taskFormMapper";
import axios from "axios";
import Swal from "sweetalert2";

export function TaskForm() {
  // Reducer untuk form state
  const [state, dispatch] = useReducer(taskFormReducer, initialTaskFormState);

  // Reducer untuk errors
  const [errors, dispatchErrors] = useReducer(errorsReducer, {});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi form
    const validationErrors = validateTaskForm(state);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) =>
        dispatchErrors({ type: "SET_ERROR", payload: { field, message } })
      );
      setIsSubmitting(false);
      return;
    }

    // Mapping data form ke payload untuk dikirim ke backend
    const payload = mapFormToPayload(state);

    try {
      // Simulasi pengiriman ke backend menggunakan axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        payload
      );
      console.log("Task saved:", response.data);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form dan errors setelah sukses
      dispatch({ type: "RESET_FORM" });
      dispatchErrors({ type: "RESET_ERRORS" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.message,
        timer: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Input
            placeholder="Nama Tugas"
            value={state.taskName}
            onChange={(e) =>
              dispatch({ type: "SET_TASK_NAME", payload: e.target.value })
            }
          />
          {errors.taskName && (
            <p className="text-sm text-red-500 mt-1">{errors.taskName}</p>
          )}
        </div>

        <div>
          <Input
            type="date"
            value={state.taskDate}
            onChange={(e) =>
              dispatch({ type: "SET_TASK_DATE", payload: e.target.value })
            }
          />
          {errors.taskDate && (
            <p className="text-sm text-red-500 mt-1">{errors.taskDate}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Biaya Tambahan"
            value={state.extraCost}
            onChange={(e) =>
              dispatch({ type: "SET_EXTRA_COST", payload: e.target.value })
            }
          />
          {errors.extraCost && (
            <p className="text-sm text-red-500 mt-1">{errors.extraCost}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Input
            placeholder="Nama Pegawai"
            value={state.employeeName}
            onChange={(e) =>
              dispatch({ type: "SET_EMPLOYEE_NAME", payload: e.target.value })
            }
          />
          {errors.employeeName && (
            <p className="text-sm text-red-500 mt-1">{errors.employeeName}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Jam Kerja"
            value={state.employeeHours}
            onChange={(e) =>
              dispatch({ type: "SET_EMPLOYEE_HOURS", payload: e.target.value })
            }
          />
          {errors.employeeHours && (
            <p className="text-sm text-red-500 mt-1">{errors.employeeHours}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Tarif per Jam"
            value={state.employeeRate}
            onChange={(e) =>
              dispatch({ type: "SET_EMPLOYEE_RATE", payload: e.target.value })
            }
          />
          {errors.employeeRate && (
            <p className="text-sm text-red-500 mt-1">{errors.employeeRate}</p>
          )}
        </div>
      </div>

      <div>
        <Textarea
          placeholder="Deskripsi Tugas"
          value={state.taskDescription}
          onChange={(e) =>
            dispatch({ type: "SET_TASK_DESCRIPTION", payload: e.target.value })
          }
        />
        {errors.taskDescription && (
          <p className="text-sm text-red-500 mt-1">{errors.taskDescription}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 cursor-pointer py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
              />
            </svg>
            Menyimpan...
          </div>
        ) : (
          "Simpan Tugas"
        )}
      </button>
      <Link
        href="/"
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-center ml-[1vw]"
      >
        Kembali ke Beranda
      </Link>
    </form>
  );
}
