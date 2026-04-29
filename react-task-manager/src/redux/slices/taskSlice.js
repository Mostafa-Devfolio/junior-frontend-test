import { createSlice } from "@reduxjs/toolkit";

{
  /* Here we start searching the tasks if exists on the localhost and if no old tasks so it will be
     an empty array */
}
const loadTasks = () => {
  const availableTasks = localStorage.getItem("tasks");
  return availableTasks ? JSON.parse(availableTasks) : [];
};

{
  /* The initial where the redux start to fetch the old tasks if exists and initial filter by All */
}
const initialState = {
  items: loadTasks(),
  filtering: "All",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    /* Add a new task */
    addTask: (state, action) => {
      const { id, taskName, priority } = action.payload;
      state.items.push({ id, taskName, priority, completed: false });
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },

    /* Remove a task by ID and save to localhost */
    removeTask: (state, action) => {
      const taskId = action.payload;
      state.items = state.items.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },

    /* Editing the task using its ID and it change only what the user change */
    editTask: (state, action) => {
      const { id, taskName, priority } = action.payload;
      const findTask = state.items.find((task) => task.id === id);
      if (findTask) {
        if (taskName) {
          findTask.taskName = taskName;
        }
        if (priority) {
          findTask.priority = priority;
        }
      }
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },

    /* Change the status to completed or not by ID */
    changeStatus: (state, action) => {
      const taskId = action.payload;
      const findTask = state.items.find((task) => task.id === taskId);
      if (findTask) {
        findTask.completed = !findTask.completed;
        localStorage.setItem("tasks", JSON.stringify(state.items));
      }
    },

    filterTasks: (state, action) => {
      state.filtering = action.payload;
    },

    completeTask: (state, action) => {
      const taskId = action.payload;
      const complete = state.items.find((task) => task.id == taskId);
      complete.completed = !complete.completed;
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
  },
});

export const {
  addTask,
  removeTask,
  editTask,
  changeStatus,
  filterTasks,
  completeTask,
} = taskSlice.actions;
export default taskSlice.reducer;
