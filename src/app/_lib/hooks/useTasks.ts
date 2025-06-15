import { useState, useEffect } from "react";

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

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: {
    title: string;
    description?: string;
    categoryId: number;
  }) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to create task");
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError("Failed to create task");
      console.error(err);
      throw err;
    }
  };

  const updateTask = async (id: number, taskData: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
      throw err;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
      throw err;
    }
  };

  const toggleTaskComplete = async (task: Task) => {
    return updateTask(task.id, { completed: !task.completed });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    refreshTasks: fetchTasks,
  };
}
