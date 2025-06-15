"use client";

import { useState, useEffect } from "react";

interface Activity {
  id: number;
  type: "created" | "completed" | "deleted";
  taskTitle: string;
  timestamp: Date;
}

export default function TaskFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: ["created", "completed", "deleted"][
          Math.floor(Math.random() * 3)
        ] as Activity["type"],
        taskTitle: `Task ${Math.floor(Math.random() * 100)}`,
        timestamp: new Date(),
      };

      setActivities((prev) => [newActivity, ...prev].slice(0, 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "created":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "deleted":
        return "text-red-600";
    }
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "created":
        return (
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );
      case "completed":
        return (
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "deleted":
        return (
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
        );
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg animate-fade-in"
        >
          <div className={`${getActivityColor(activity.type)}`}>
            {getActivityIcon(activity.type)}
          </div>
          <div>
            <p className="text-gray-900">
              Task <span className="font-medium">{activity.taskTitle}</span> was{" "}
              {activity.type}
            </p>
            <p className="text-sm text-gray-500">
              {activity.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
