// utils/formatDate.ts
export const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};
