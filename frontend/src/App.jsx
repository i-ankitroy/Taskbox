import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchTasks = () => {
    fetch('http://localhost:5000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching Tasks', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingId) {
      fetch(`http://localhost:5000/api/tasks/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => res.json())
        .then(() => {
          resetForm();
          fetchTasks();
        })
        .catch((error) => console.error('Error Updating Task:', error));
    } else {
      fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
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
    setTitle('');
    setDescription('');
    setEditingId(null);
  };

  const handleEditClick = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task._id);
  };

  // Opens the confirmation modal for a given task
  const confirmDelete = (task) => {
    setDeleteTarget(task);
  };

  // Actually performs the delete once confirmed in the modal
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/tasks/${deleteTarget._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setDeleteTarget(null);
        fetchTasks();
      })
      .catch((err) => console.error('Error deleting task:', err));
  };

  const toggleComplete = (task) => {
    fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error('Error updating task:', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">TaskBox</h1>
        <p className="text-gray-500 mb-6">Stay on top of what matters.</p>

        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-sm mb-8 space-y-3">
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
            <li
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start gap-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  className="mt-1 h-5 w-5 accent-blue-600 cursor-pointer"
                />
                <div className={task.completed ? 'opacity-50' : ''}>
                  <p
                    className={`font-semibold ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-gray-500 text-sm">{task.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(task)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {deleteTarget && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <p className="text-gray-800 mb-4">
                Delete "<span className="font-semibold">{deleteTarget.title}</span>"?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;