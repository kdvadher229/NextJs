"use client";

import { useState } from "react";

interface Category {
  id: number;
  name: string;
  color: string;
  taskCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Personal",
      color: "bg-blue-100 text-blue-800",
      taskCount: 5,
    },
    { id: 2, name: "Work", color: "bg-green-100 text-green-800", taskCount: 3 },
    {
      id: 3,
      name: "Shopping",
      color: "bg-purple-100 text-purple-800",
      taskCount: 2,
    },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "bg-blue-100 text-blue-800",
  });

  const colorOptions = [
    { value: "bg-blue-100 text-blue-800", label: "Blue" },
    { value: "bg-green-100 text-green-800", label: "Green" },
    { value: "bg-purple-100 text-purple-800", label: "Purple" },
    { value: "bg-red-100 text-red-800", label: "Red" },
    { value: "bg-yellow-100 text-yellow-800", label: "Yellow" },
  ];

  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    const category: Category = {
      id: Date.now(),
      ...newCategory,
      taskCount: 0,
    };

    setCategories([...categories, category]);
    setNewCategory({ name: "", color: "bg-blue-100 text-blue-800" });
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Categories</h1>

      {/* Add Category Form */}
      <form
        onSubmit={addCategory}
        className="bg-white p-6 rounded-xl shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Category name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={newCategory.color}
            onChange={(e) =>
              setNewCategory({ ...newCategory, color: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Category
        </button>
      </form>

      {/* Categories List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full ${category.color}`}>
                {category.name}
              </span>
              <span className="text-gray-600">
                {category.taskCount}{" "}
                {category.taskCount === 1 ? "task" : "tasks"}
              </span>
            </div>
            <button
              onClick={() => deleteCategory(category.id)}
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
