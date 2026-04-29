import { useState } from "react";
import TaskItem from "./components/TaskItem/TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { addTask, filterTasks } from "./redux/slices/taskSlice.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function App() {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const { items, filtering } = useSelector((state) => state.task);
  const [toastOpen, setToastOpen] = useState(false);

  const dispatch = useDispatch();

  { /* Add a new task with unique id */ }
  const handleSubmit = (e) => {
    e.preventDefault();

    /* Here I prevented the user from adding empty tasks */
    if (taskName.trim() === "") return;

    dispatch(
      addTask({
        id: Date.now(),
        taskName,
        priority,
      }),
    );
    setTaskName("");
    setPriority("Low");

    /* Here I open the toast after the task is added successfully */
    setToastOpen(true);

    /* Here I close the toast after 3 seconds automatically */
    setTimeout(() => {
      setToastOpen(false);
    }, 3000);
  };

  { /* Here we send the user filter choice to redux to save his choice */ }
  function filter(priority) {
    dispatch(filterTasks(priority));
  }

  {
    /* Here we filtering the original tasks array with the user choice */
  }
  const filteredItems = items.filter((task) => {
    if (filtering == "All") return true;
    return task.priority == filtering;
  });

  return (
    <>
      <div className="w-[80%] mx-auto my-5 flex flex-col gap-5">
        <h2 className="text-3xl">Task Manager</h2>
        <form
          onSubmit={handleSubmit}
          className="rounded-md bg-gray-200 p-3 grid grid-cols-5 gap-5"
        >
          <div className="grid col-span-3">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Title..."
              className="rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="flex justify-between items-center rounded">
            <p>Priority:</p>
            <select
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-300"
              name=""
              id=""
            >
              <option value="Low">
                <p>Low</p>
              </option>
              <option value="Medium">
                <p>Medium</p>
              </option>
              <option value="High">
                <p>High</p>
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded-lg font-bold hover:bg-black/80"
          >
            Save Task
          </button>
        </form>
        <div className="flex gap-5">
          <button
            onClick={() => filter("All")}
            className="border border-gray-400 rounded-md px-2 py-1"
          >
            All
          </button>
          <button
            onClick={() => filter("Low")}
            className="border border-gray-400 rounded-md px-2 py-1"
          >
            Low
          </button>
          <button
            onClick={() => filter("Medium")}
            className="border border-gray-400 rounded-md px-2 py-1"
          >
            Medium
          </button>
          <button
            onClick={() => filter("High")}
            className="border border-gray-400 rounded-md px-2 py-1"
          >
            High
          </button>
        </div>

        {/* Maping on the array of tasks and start to view each of them within the TaskItem Component */}
        <div className="flex flex-col gap-3">
          {filteredItems.map((item) => {
            return <TaskItem item={item} />;
          })}
        </div>
      </div>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Task added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
