import { useState, useEffect } from 'react';

function App() {
  const [tasks,setTasks] = useState([]);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = () => {
    fetch('http://localhost:5000/api/tasks')
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch((error) => console.error('Error fetching Tasks',error));
  };

  useEffect(() => {
    fetchTasks();
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingId) {
    fetch(`http://localhost:5000/api/tasks/${editingId}`,{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description }),
    })
    .then((res) => res.json())
    .then(() => {
      resetForm();
      fetchTasks();
    })
    .catch((error) => console.error('Error Updating Task:', error));
    } else {
      fetch('http://localhost:5000/api/tasks',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description }),
    })
    .then((res) => res.json())
    .then(() => {
      resetForm();
      fetchTasks();
    })
    .catch((error) => console.error('Error Creating Task:', error));
    }
  };
  const resetForm = () => {
    setTitle(''),
    setDescription(''),
    setEditingId(null);
  };

  const handleEditClick = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task._id);
  };

    const handleDelete = (id) => {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) return;

    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error('Error deleting task:', err));
  };


    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">TaskBox</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <p className="font-semibold">{task.title}</p>
              {task.description && <p className="text-gray-500 text-sm">{task.description}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(task)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;