"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Section = {
  title: string;
  content: JSX.Element;
};

type Sections = {
  [key: string]: Section;
};

export default function DocumentationPage() {
  const [activeSection, setActiveSection] =
    useState<keyof Sections>("overview");

  const sections: Sections = {
    overview: {
      title: "Overview",
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              TaskFlow Documentation
            </h2>
            <p className="text-xl text-gray-600">
              A comprehensive guide to our implementation and Next.js concepts
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Getting Started
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <p className="text-gray-600">To run the application locally:</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-800">npm run dev</pre>
              </div>
              <p className="text-gray-600 mt-4">
                Visit{" "}
                <Link
                  href="/"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  the home page
                </Link>{" "}
                to start exploring the application.
              </p>
            </div>
          </section>
        </div>
      ),
    },
    routing: {
      title: "Routing",
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Next.js Routing
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-medium">App Router</h3>
              <p className="text-gray-600">
                Our application uses Next.js 13+ App Router, which provides a
                more intuitive and powerful routing system:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  File-system based routing in{" "}
                  <code className="bg-gray-100 px-1 rounded">app</code>{" "}
                  directory
                </li>
                <li>
                  Nested routes with{" "}
                  <code className="bg-gray-100 px-1 rounded">layout.tsx</code>{" "}
                  for shared UI
                </li>
                <li>
                  Dynamic routes with{" "}
                  <code className="bg-gray-100 px-1 rounded">[param]</code>{" "}
                  folders
                </li>
                <li>
                  Route groups with{" "}
                  <code className="bg-gray-100 px-1 rounded">(group)</code>{" "}
                  folders
                </li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Our Routes:</p>
                <ul className="space-y-1 text-sm">
                  <li>
                    <code className="bg-gray-100 px-1 rounded">/</code> - Home
                    page
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded">/dashboard</code>{" "}
                    - Dashboard with stats
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded">/tasks</code> -
                    Task management
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded">
                      /categories
                    </code>{" "}
                    - Category management
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 rounded">/docs</code> -
                    This documentation
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    rendering: {
      title: "Rendering",
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Rendering Strategies
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-medium">
                Server Components (Default)
              </h3>
              <p className="text-gray-600">
                Next.js 13+ uses React Server Components by default. Our
                implementation includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  Server-side data fetching in{" "}
                  <code className="bg-gray-100 px-1 rounded">page.tsx</code>
                </li>
                <li>
                  Immediate content rendering without client-side JavaScript
                </li>
                <li>Better SEO and initial page load performance</li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Client Components</h3>
              <p className="text-gray-600">
                We use client components for interactive features:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  Marked with{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    &apos;use client&apos;
                  </code>{" "}
                  directive
                </li>
                <li>Used for state management and interactivity</li>
                <li>Real-time updates in TaskFeed component</li>
                <li>Dynamic progress bars in TaskStats</li>
              </ul>

              <h3 className="text-xl font-medium mt-6">
                Suspense & Loading States
              </h3>
              <p className="text-gray-600">
                We implement loading states using React Suspense:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Loading spinners during data fetching</li>
                <li>Smooth transitions between states</li>
                <li>Better user experience during loading</li>
              </ul>
            </div>
          </section>
        </div>
      ),
    },
    api: {
      title: "API Documentation",
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              API Implementation
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Creating API Routes
              </h3>
              <p className="text-gray-600">
                API routes are created in the{" "}
                <code className="bg-gray-100 px-1 rounded">app/api</code>{" "}
                directory:
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {`// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, categoryId } = body;

    if (!title || !categoryId) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}`}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                API Endpoints
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Tasks API</h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>GET /api/tasks - Fetch all tasks</li>
                    <li>POST /api/tasks - Create a new task</li>
                    <li>PATCH /api/tasks/[id] - Update a task</li>
                    <li>DELETE /api/tasks/[id] - Delete a task</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Categories API</h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>GET /api/categories - Fetch all categories</li>
                    <li>POST /api/categories - Create a new category</li>
                    <li>PATCH /api/categories/[id] - Update a category</li>
                    <li>DELETE /api/categories/[id] - Delete a category</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Statistics API</h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>GET /api/stats - Fetch task statistics</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              API Integration
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Custom Hooks
              </h3>
              <p className="text-gray-600">
                We use custom hooks to manage API interactions:
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {`// hooks/useTasks.ts
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskData) => {
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
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  // ... other methods (update, delete, etc.)

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    // ... other methods
  };
}`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    components: {
      title: "Components",
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Component Architecture
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-medium">Component Structure</h3>
              <p className="text-gray-600">
                Our application follows a modular component structure:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Layout components for shared UI</li>
                <li>Page components for route-specific content</li>
                <li>Reusable UI components in feature directories</li>
                <li>Type-safe components with TypeScript</li>
              </ul>

              <h3 className="text-xl font-medium mt-6">State Management</h3>
              <p className="text-gray-600">
                We use React&apos;s built-in state management:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  <code className="bg-gray-100 px-1 rounded">useState</code> for
                  local component state
                </li>
                <li>
                  <code className="bg-gray-100 px-1 rounded">useEffect</code>{" "}
                  for side effects
                </li>
                <li>Server state for initial data</li>
                <li>Client state for real-time updates</li>
              </ul>
            </div>
          </section>
        </div>
      ),
    },
    styling: {
      title: "Styling",
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Styling with Tailwind CSS
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <p className="text-gray-600">
                Our application uses Tailwind CSS for styling:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Utility-first CSS framework</li>
                <li>Responsive design with mobile-first approach</li>
                <li>Custom animations and transitions</li>
                <li>Consistent color scheme and spacing</li>
              </ul>
            </div>
          </section>
        </div>
      ),
    },
    features: {
      title: "Features",
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Implemented Features
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-medium">Task Management</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Create, read, update, and delete tasks</li>
                <li>Task categorization</li>
                <li>Completion status tracking</li>
                <li>Real-time activity feed</li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Dashboard</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Server-rendered statistics</li>
                <li>Real-time task feed</li>
                <li>Progress tracking by category</li>
                <li>Interactive charts and graphs</li>
              </ul>

              <h3 className="text-xl font-medium mt-6">Category Management</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Create and manage categories</li>
                <li>Custom color coding</li>
                <li>Task count tracking</li>
                <li>Category-based filtering</li>
              </ul>
            </div>
          </section>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-gray-900">Documentation</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key as keyof Sections)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeSection === key
                      ? "border-b-2 border-indigo-500 text-indigo-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">{sections[activeSection].content}</div>
        </div>
      </div>
    </div>
  );
}
