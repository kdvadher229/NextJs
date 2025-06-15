"use client";

import { useState } from "react";
import Link from "next/link";

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete project proposal",
      description: "Write and submit the project proposal for the new client",
      category: "Work",
      completed: false,
    },
    {
      id: 2,
      title: "Buy groceries",
      description: "Get milk, eggs, and bread from the store",
      category: "Personal",
      completed: true,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Personal",
  });

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now(),
      ...newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", category: "Personal" });
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <Link
          href="/categories"
          className="text-indigo-600 hover:text-indigo-700"
        >
          Manage Categories
        </Link>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={addTask}
        className="bg-white p-6 rounded-xl shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
        <textarea
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-6 rounded-xl shadow-sm flex items-start justify-between"
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mt-1 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <div>
                <h3
                  className={`text-lg font-medium ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-1">{task.description}</p>
                <span className="inline-block mt-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
                  {task.category}
                </span>
              </div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-600 hover:text-red-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
