"use client";

import { useState, useEffect } from "react";

interface CategoryStats {
  name: string;
  total: number;
  completed: number;
}

export default function TaskStats() {
  const [stats, setStats] = useState<CategoryStats[]>([]);

  useEffect(() => {
    // Simulate fetching category stats
    const fetchStats = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStats([
        { name: "Personal", total: 8, completed: 3 },
        { name: "Work", total: 12, completed: 8 },
        { name: "Shopping", total: 5, completed: 2 },
      ]);
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {stats.map((category) => {
        const percentage = Math.round(
          (category.completed / category.total) * 100
        );

        return (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{category.name}</span>
              <span className="text-sm text-gray-500">
                {category.completed}/{category.total} tasks
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-indigo-600">
                {percentage}% complete
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
