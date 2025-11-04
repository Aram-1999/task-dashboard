import type { TaskFilterProps } from "../../types";
import { useState } from "react";
import type { TaskStatus } from "../../types";

function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }>({});

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (value === "all-statuses") {
      const newFilters = { ...filters };
      delete newFilters.status;
      setFilters(newFilters);
      onFilterChange(newFilters);
    }

    if (value === "all-priorities") {
      const newFilters = { ...filters };
      delete newFilters.priority;
      setFilters(newFilters);
      onFilterChange(newFilters);
    }

    if (value !== "all-statuses" && value !== "all-priorities") {
      const newFilters = { ...filters, [name]: value };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };
  return (
    <div className="flex justify-around my-5 px-5 py-1 ">
      <div>
        <label className="text-green-800" htmlFor="status-filter">
          Status Filter
        </label>
        <select
          className="mx-5 border rounded p-1"
          name="status"
          id="status-filter"
          value={filters.status}
          onChange={handleFilter}
        >
          <option value="all-statuses">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="text-green-800" htmlFor="priority-filter">
          Priority Filter
        </label>
        <select
          className="mx-5 border rounded p-1"
          name="priority"
          id="priority-filter"
          value={filters.priority}
          onChange={handleFilter}
        >
          <option value="all-priorities">All Priorities</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;