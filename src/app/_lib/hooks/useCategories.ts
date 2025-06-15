import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
  color: string;
  taskCount: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError("Failed to load categories");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (categoryData: {
    name: string;
    color: string;
  }) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) throw new Error("Failed to create category");
      const newCategory = await response.json();
      setCategories((prev) => [...prev, { ...newCategory, taskCount: 0 }]);
      return newCategory;
    } catch (err) {
      setError("Failed to create category");
      console.error(err);
      throw err;
    }
  };

  const updateCategory = async (
    id: number,
    categoryData: Partial<Category>
  ) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) throw new Error("Failed to update category");
      const updatedCategory = await response.json();
      setCategories((prev) =>
        prev.map((category) =>
          category.id === id
            ? { ...updatedCategory, taskCount: category.taskCount }
            : category
        )
      );
      return updatedCategory;
    } catch (err) {
      setError("Failed to update category");
      console.error(err);
      throw err;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      setError("Failed to delete category");
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: fetchCategories,
  };
}
