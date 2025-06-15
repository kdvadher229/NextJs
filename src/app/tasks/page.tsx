"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTasks } from "@/app/_lib/hooks/useTasks";
import { useCategories } from "@/app/_lib/hooks/useCategories";
import toast from "react-hot-toast";

interface Category {
  id: number;
  name: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  category: Category;
  categoryId: number;
}

interface CreateTaskInput {
  title: string;
  description: string;
  categoryId: number;
}

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const {
    tasks,
    isLoading,
    error,
    createTask,
    deleteTask,
    toggleTaskComplete,
  } = useTasks();
  const { categories } = useCategories();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    try {
      const taskInput: CreateTaskInput = {
        title,
        description,
        categoryId: parseInt(categoryId),
      };
      await createTask(taskInput);
      setTitle("");
      setDescription("");
      setCategoryId("");
      toast.success("Task created successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await toggleTaskComplete(task);
      toast.success("Task status updated!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task status", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

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
        onSubmit={handleCreateTask}
        className="bg-white p-6 rounded-xl shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a category</option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Task
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className="bg-white p-6 rounded-xl shadow-sm flex items-start justify-between"
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
                <p
                  className={`mt-2 text-sm ${
                    task.completed ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>
                {task.category && (
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm ${task.category.color} rounded-full`}
                  >
                    {task.category.name}
                  </span>
                )}
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
