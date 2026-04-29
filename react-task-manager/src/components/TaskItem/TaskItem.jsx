import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeTask,
  editTask,
} from "../../redux/slices/taskSlice";
import DeleteDialoug from "../others/Dialoug";

export default function TaskItem({ item }) {
  const [isEditing, setIsEditing] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();

    { /* Call complete from redux to store that the task is completed or not completed */ }
  function complete(itemId) {
    dispatch(completeTask(itemId));
    }

    { /* Here you send the edited data to the store in redux with the id of the task */ }
  function edit(itemId) {
    dispatch(
      editTask({
        id: itemId,
        taskName: taskName,
        priority: priority,
      }),
    );
    setIsEditing(false);
  }

  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-6 flex items-center gap-5">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => complete(item.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-400 rounded w-full p-1"
          />
        ) : (
          <h3>{item.taskName}</h3>
        )}
      </div>
      {isEditing ? (
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-400 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      ) : (
        <p>{item.priority}</p>
      )}
      <div className="flex gap-3">
        {isEditing ? (
          <button
            onClick={() => {
              edit(item.id);
            }}
            className="border border-gray-400 hover:bg-green-800 hover:text-white duration-150 rounded-md px-2 py-1"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              setTaskName(item.taskName);
              setPriority(item.priority);
            }}
            className="border border-gray-400 hover:bg-black hover:text-white duration-150 rounded-md px-2 py-1"
          >
            Edit
          </button>
        )}
        <DeleteDialoug itemId={item.id} />
      </div>
    </div>
  );
}
