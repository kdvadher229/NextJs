"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/dashboard") return true;
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              TaskFlow
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`${
                isActive("/")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`${
                isActive("/dashboard")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/tasks"
              className={`${
                isActive("/tasks")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Tasks
            </Link>
            <Link
              href="/categories"
              className={`${
                isActive("/categories")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
