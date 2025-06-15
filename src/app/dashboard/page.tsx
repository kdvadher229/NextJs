import { Suspense } from "react";
import TaskStats from "./components/TaskStats";
import TaskFeed from "./components/TaskFeed";
import LoadingSpinner from "./components/LoadingSpinner";

// This is a server component (default in Next.js 13+)
export default async function DashboardPage() {
  // Simulate server-side data fetching
  const stats = await fetchStats();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Server-side rendered stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {stats.totalTasks}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Completed Tasks</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.completedTasks}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.totalCategories}
          </p>
        </div>
      </div>

      {/* Client-side rendered task feed with suspense */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <TaskFeed />
        </Suspense>
      </div>

      {/* Client-side rendered stats with suspense */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Task Progress</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <TaskStats />
        </Suspense>
      </div>
    </div>
  );
}

// Simulated server-side data fetching
async function fetchStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    totalTasks: 12,
    completedTasks: 5,
    totalCategories: 4,
  };
}
