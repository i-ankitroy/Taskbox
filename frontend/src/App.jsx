import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch((err) => console.log('Error fetching Tasks',err));
  }, []);

    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">TaskBox</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 rounded shadow">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;