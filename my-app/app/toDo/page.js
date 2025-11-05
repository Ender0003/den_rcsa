'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">📝 Мої завдання</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Нове завдання..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary/50"
          />
          <Button onClick={addTask}>Додати</Button>
        </div>

        <ul className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500">Немає завдань 😅</p>
          )}

          {tasks.map(task => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer ${task.done ? 'line-through text-gray-400' : ''}`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
