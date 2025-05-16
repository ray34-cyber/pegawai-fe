export interface EmployeeTask {
  id: number;
  name: string;
  description: string;
  hours: number;
  rate: number;
  additional_fee: number;
  remuneration: number; // ini dihitung: (hours * rate) + additional_fee
}