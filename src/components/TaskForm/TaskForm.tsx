import type { Task } from "../../types";
import { useState } from "react";
import { dateDisplay, isTaskPriority, isTaskStatus } from "../../utils/taskUtils"; 
interface FormProps {
  onSubmit: (task: Task) => void;
}

function TaskForm({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    dueDate: dateDisplay(new Date()),
    id: "",
    priority: "low",
    status: "pending",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((f) => {
      const [year, month, day] = event.target.value.split("-");
      return {
      ...f,
      dueDate: dateDisplay(new Date(Number(year), Number(month)-1, Number(day))),
    }});
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (isTaskStatus(value)) {
      setFormData((f) => ({
        ...f,
        status: value,
      }));
    } else if (isTaskPriority(value)) {
      setFormData((f) => ({
        ...f,
        priority: value,
      }));
    }
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
    });
    setFormData({
      title: "",
      description: "",
      dueDate: dateDisplay(new Date()),
      id: "",
      priority: "low",
      status: "pending",
    });
  };

  const timeNow = Date.now().toString();
  const formIDs = {
    title: `title-${timeNow}`,
    description: `description-${timeNow}`,
    dueDate: `dueDate-${timeNow}`,
    priority: `priority-${timeNow}`,
    status: `status-${timeNow}`,
  };

  return (
    <form className="border rounded-lg shadow-xl p-5" onSubmit={handleForm}>
      <label className="text-lg font-semibold" htmlFor={formIDs.title}>
        Title
      </label>
      <br />
      <input
        className="border border-gray-500 hover:border-black rounded-lg mt-2 py-1 px-3"
        type="text"
        name="title"
        id={formIDs.title}
        value={formData.title}
        onChange={handleChange}
      />
      <br />
      <label className="text-lg font-semibold" htmlFor={formIDs.description}>
        Description
      </label>
      <br />
      <textarea
        className="border border-gray-500 hover:border-black rounded-lg mt-2 py-1 px-3"
        cols={50}
        rows={3}
        name="description"
        id={formIDs.description}
        value={formData.description}
        onChange={handleChange}
      />
      <div className='mt-5'>
        <label className="text-lg font-semibold" htmlFor={formIDs.dueDate}>
          Due Date
        </label>
        <input
          className="border rounded-sm mx-5 px-2 py-1"
          type="date"
          id={formIDs.dueDate}
          name="dueDate"
          value={formData.dueDate}
          onChange={handleDateChange}
        />
        <label className="ml-8 text-lg font-semibold" htmlFor={formIDs.priority}>
          Priority
        </label>
        <select
          className="ml-5 border rounded p-1 px-2"
          name="priority"
          id={formIDs.priority}
          value={formData.priority}
          onChange={handleSelectChange}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <label className="ml-8 text-lg font-semibold" htmlFor={formIDs.status}>
          Status
        </label>
        <select
          className="ml-5 border rounded p-1 px-2"
          name="status"
          id={formIDs.status}
          value={formData.status}
          onChange={handleSelectChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button className="mt-5 border px-50 block mx-auto bg-blue-300 p-1 rounded-lg hover: cursor-pointer" type="submit">
        Add!
      </button>
    </form>
  );
}

export default TaskForm;