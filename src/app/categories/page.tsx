"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useCategories } from "@/app/_lib/hooks/useCategories";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "bg-blue-100 text-blue-800",
  });

  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
    color: string;
  } | null>(null);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(newCategory);
      setNewCategory({ name: "", color: "bg-blue-100 text-blue-800" });
      toast.success("Category created successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error("Failed to create category", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await updateCategory(editingCategory.id, {
        name: editingCategory.name,
        color: editingCategory.color,
      });
      setEditingCategory(null);
      toast.success("Category updated successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error updating category:", err);
      toast.error("Failed to update category", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully!", {
        duration: 3000,
        position: "top-right",
      });
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete category", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  const colorOptions = [
    { value: "bg-blue-100 text-blue-800", label: "Blue" },
    { value: "bg-green-100 text-green-800", label: "Green" },
    { value: "bg-red-100 text-red-800", label: "Red" },
    { value: "bg-yellow-100 text-yellow-800", label: "Yellow" },
    { value: "bg-purple-100 text-purple-800", label: "Purple" },
    { value: "bg-pink-100 text-pink-800", label: "Pink" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <Link href="/tasks" className="text-indigo-600 hover:text-indigo-700">
          Back to Tasks
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Category Form */}
      <form
        onSubmit={handleCreateCategory}
        className="bg-white p-6 rounded-xl shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              id="color"
              value={newCategory.color}
              onChange={(e) =>
                setNewCategory({ ...newCategory, color: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Category
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between"
          >
            {editingCategory?.id === category.id ? (
              <form
                onSubmit={handleUpdateCategory}
                className="flex-1 flex items-center space-x-4"
              >
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <select
                  value={editingCategory.color}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      color: e.target.value,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm ${category.color} rounded-full`}
                  >
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {category.taskCount} tasks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setEditingCategory({
                        id: category.id,
                        name: category.name,
                        color: category.color,
                      })
                    }
                    className="text-gray-400 hover:text-indigo-500"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
