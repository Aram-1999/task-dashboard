import type { TaskStatus, TaskPriority } from "../types";

export function dateDisplay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isTaskStatus(status: string): status is TaskStatus {
  return (
    status === "pending" || status === "in-progress" || status === "completed"
  );
}

export function isTaskPriority(priority: string): priority is TaskPriority {
  return priority === "low" || priority === "medium" || priority === "high";
}