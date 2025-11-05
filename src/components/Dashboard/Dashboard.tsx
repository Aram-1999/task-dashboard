import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import type { Task, TaskStatus } from "../../types";
import TaskFilter from "../TaskFilter/TaskFilter";

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }>({});

  const handleDelete = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    handleFiltering(filters, newTasks);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(newTasks);
    setFilteredTasks(newTasks);
    handleFiltering(filters, newTasks);
  };

  const handleSubmit = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setFilteredTasks(newTasks);
    handleFiltering(filters, newTasks);
  };

  const handleFiltering = (
    newFilters: {
      status?: TaskStatus;
      priority?: "low" | "medium" | "high";
    },
    newTasksFiltered?: Task[]
  ) => {
    setFilters(newFilters);
    setFilteredTasks(() => {
      let newTasks;
      if (newTasksFiltered) {
        newTasks = [...newTasksFiltered];
      } else {
        newTasks = [...tasks];
      }

      if (newFilters.status) {
        newTasks = newTasks.filter((task) => task.status === newFilters.status);
      }

      if (newFilters.priority) {
        newTasks = newTasks.filter(
          (task) => task.priority === newFilters.priority
        );
      }
      return newTasks;
    });
  };

  return (
    <div className="m-3">
      <h1 className="text-3xl font-bold text-center mb-5">Task Manager App</h1>
      <div className='bg-pink-100 rounded-3xl p-3 my-2 w-fit mx-auto '>
        <h2 className="text-xl font-semibold text-center">Priority</h2>
        <div className="flex justify-center my-3 text-center">
          <div className="px-20 py-1 bg-green-300">
            <h2>Low</h2>
            <p className="font-bold text-xl">
              {tasks.filter((task) => task.priority === "low").length}
            </p>
          </div>
          <div className="px-20 py-1 bg-orange-300">
            <h2>Medium</h2>
            <p className="font-bold text-xl">
              {tasks.filter((task) => task.priority === "medium").length}
            </p>
          </div>
          <div className="px-20 py-1 bg-red-800">
            <h2>High</h2>
            <p className="font-bold text-xl">
              {tasks.filter((task) => task.priority === "high").length}
            </p>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center">Status</h2>
        <div className="flex justify-center my-3 text-center">
          <div className="px-20 py-1 bg-yellow-500">
            <h2>Pending</h2>
            <p className="font-bold text-xl">
              {tasks.filter((task) => task.status === "pending").length}
            </p>
          </div>
          <div className="px-20 py-1 bg-blue-500">
            <h2>In Progress</h2>
            <p className="font-bold text-xl">
              {tasks.filter((task) => task.status === "in-progress").length}
            </p>
          </div>
          <div className="px-20 py-1 bg-green-500">
            <h2>Completed</h2>
            <p className="font-bold text-xl">
              {tasks.filter((task) => task.status === "completed").length}
            </p>
          </div>
        </div>
      </div>
      <TaskForm onSubmit={handleSubmit} />
      <TaskFilter onFilterChange={handleFiltering} />
      {filteredTasks.length === 0 ? (
        <p className="text-center">No Tasks to Display</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default Dashboard;
