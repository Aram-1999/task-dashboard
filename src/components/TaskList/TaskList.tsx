import { useState } from "react";
import type { Task, TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onStatusChange }: TaskListProps) {
  const [newToOld, setNewToOld] = useState(false);
  const [oldToNew, setOldToNew] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  let sortedTasks : Task[] = []
  if (searchWord) {
    sortedTasks = [...tasks].filter((task) =>
      task.title.includes(searchWord))
  } else {
    sortedTasks = [...tasks];
  }

  const handleSorting = (nto: boolean, otn: boolean) => {
    if (nto) {
      sortedTasks = [...sortedTasks].sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
    }

    if (otn) {
      sortedTasks = [...sortedTasks].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }
  };

  const handleNewestToOldest = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    if (button.classList.contains("bg-green-300")) {
      if (button.nextElementSibling?.classList.contains("bg-blue-500")) {
        button.nextElementSibling?.classList.remove("bg-green-300");
        button.nextElementSibling?.classList.add("bg-green-300");
        setOldToNew(false);
      }
      button.classList.remove("bg-green-300");
      button.classList.add("bg-blue-500");
      setNewToOld(true);
      handleSorting(true, false);
    } else {
      button.classList.remove("bg-blue-500");
      button.classList.add("bg-green-300");
      setNewToOld(false);
      handleSorting(false, false);
      const searchedTasks = [...tasks].filter((task) =>
        task.title.includes(searchWord)
      );
      sortedTasks = [...searchedTasks];
    }
  };

  const handleOldestToNewest = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    if (button.classList.contains("bg-green-300")) {
      if (button.previousElementSibling?.classList.contains("bg-blue-500")) {
        button.previousElementSibling?.classList.remove("bg-green-300");
        button.previousElementSibling?.classList.add("bg-green-300");
        setNewToOld(false);
      }
      button.classList.remove("bg-green-300");
      button.classList.add("bg-blue-500");
      setOldToNew(true);
      handleSorting(false, true);
    } else {
      button.classList.remove("bg-blue-500");
      button.classList.add("bg-green-300");
      setOldToNew(false);
      handleSorting(false, false);
      const searchedTasks = [...tasks].filter((task) =>
        task.title.includes(searchWord)
      );
      sortedTasks = [...searchedTasks];
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    sortedTasks = [...tasks].filter((task) =>
      task.title.includes(event.target.value)
    );
  };

  if (newToOld) {
    handleSorting(true, false);
  }
  if (oldToNew) {
    handleSorting(false, true);
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="mx-5 text-center">
          <p>Sort by Due Date</p>
          <button
            className="block border bg-green-300 p-1 my-2 hover:cursor-pointer"
            onClick={handleNewestToOldest}
          >
            Newest ➡️ Oldest
          </button>
          <button
            className="block border bg-green-300 p-1 my-2 hover:cursor-pointer"
            onClick={handleOldestToNewest}
          >
            Oldest ➡️ Newest
          </button>
        </div>
        <div className="mx-5 text-center">
          <label htmlFor="searchWord">Filter by Title</label>
          <br />
          <input
            className="border border-gray-500 hover:border-black rounded-lg mt-2 py-1 px-3"
            type="text"
            id="searchWord"
            value={searchWord}
            onChange={handleSearch}
          />
        </div>
      </div>

      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
