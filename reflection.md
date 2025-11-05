# Reflection

This project uses React components and the useState hook. The Dashboard component unifies all other components and serves as the main hub of the application. It displays statistics about task priority and status at the top of the page using the tasks state. The tasks state is updated whenever the user interacts with the tasks — such as adding, updating, or deleting them.

The app includes a form with built-in validation, which is triggered upon submission. The title field must not be empty, and the due date cannot be set in the past.

The app also features several filters. Users can filter tasks by status or priority using dropdown menus. Additionally, tasks can be sorted by due date, either from oldest to newest or vice versa. A search bar allows users to filter tasks by comparing the input text to task titles.

One of the main challenges was implementing filtering. Initially, it was difficult to handle all user interactions — such as adding or deleting tasks — while maintaining accurate filters. I solved this by carefully planning how data flows through the components.

Another issue I faced was using a useEffect hook in the TaskList component when it wasn’t necessary. I spent a lot of time trying to make it work with useEffect, but after revisiting the problem the next day, I realized it wasn’t needed. The class helped me understand that useEffect is primarily used for handling external data, not props. Once I recognized that, the solution became much clearer and simpler.

The Dashboard component connects all parts of the app. It includes a statistics dashboard, manages all task data via state, and handles updates such as adding, editing, or deleting tasks. Callback functions are used to update the tasks from child components like TaskFilter, TaskForm, and TaskList.

The TaskFilter component filters tasks based on status and priority, updating the filtered task list in the Dashboard via callbacks. The TaskList component displays all tasks, using TaskItem to render each task’s UI. It also includes buttons for sorting tasks and a search bar for filtering by title. Finally, the TaskForm component creates new tasks, featuring validation and fields for title, description, due date, priority, and status, all managed through the formData state variable.