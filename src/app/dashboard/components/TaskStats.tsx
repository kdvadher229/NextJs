"use client";

import { useEffect, useState } from "react";

interface CategoryStats {
  name: string;
  color: string;
  _count: {
    tasks: number;
  };
}

interface Stats {
  totalTasks: number;
  completedTasks: number;
  totalCategories: number;
  tasksByCategory: CategoryStats[];
}

export default function TaskStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError("Failed to load task statistics");
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <div className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>;
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {Math.round((stats.completedTasks / stats.totalTasks) * 100)}%
              </span>
              <span className="text-sm text-gray-500">
                {stats.completedTasks} of {stats.totalTasks} tasks
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{
                  width: `${(stats.completedTasks / stats.totalTasks) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">
            Tasks by Category
          </h3>
          <div className="mt-2 space-y-2">
            {stats.tasksByCategory.map((category) => (
              <div key={category.name} className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${category.color}`}
                ></span>
                <span className="text-sm text-gray-600">{category.name}</span>
                <span className="ml-auto text-sm font-medium text-gray-900">
                  {category._count.tasks}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
