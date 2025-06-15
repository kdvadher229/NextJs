"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalTasks: number;
  completedTasks: number;
  totalCategories: number;
  tasksByCategory: Array<{
    name: string;
    color: string;
    _count: { tasks: number };
  }>;
  recentTasks: Array<{
    id: number;
    title: string;
    completed: boolean;
    category: {
      name: string;
      color: string;
    };
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError("Failed to load dashboard statistics");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
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

  if (!stats) return null;

  const completionRate = stats.totalTasks
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {stats.totalTasks}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Completion Rate</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {completionRate}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {stats.totalCategories}
          </p>
        </div>
      </div>

      {/* Tasks by Category */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Tasks by Category</h2>
        <div className="space-y-4">
          {stats.tasksByCategory.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`inline-block px-3 py-1 text-sm ${category.color} rounded-full`}
                >
                  {category.name}
                </span>
              </div>
              <span className="text-gray-600">
                {category._count.tasks} tasks
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Tasks</h2>
          <Link
            href="/tasks"
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {stats.recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`inline-block px-3 py-1 text-sm ${task.category.color} rounded-full`}
                >
                  {task.category.name}
                </span>
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <span
                className={`text-sm ${
                  task.completed ? "text-green-600" : "text-gray-500"
                }`}
              >
                {task.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
