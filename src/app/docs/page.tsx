import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          TaskFlow Documentation
        </h1>
        <p className="text-xl text-gray-600">
          A comprehensive guide to our implementation and Next.js concepts
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
        <nav className="space-y-2">
          <a
            href="#routing"
            className="block text-indigo-600 hover:text-indigo-700"
          >
            1. Next.js Routing
          </a>
          <a
            href="#rendering"
            className="block text-indigo-600 hover:text-indigo-700"
          >
            2. Rendering Strategies
          </a>
          <a
            href="#components"
            className="block text-indigo-600 hover:text-indigo-700"
          >
            3. Components & State Management
          </a>
          <a
            href="#styling"
            className="block text-indigo-600 hover:text-indigo-700"
          >
            4. Styling with Tailwind CSS
          </a>
          <a
            href="#features"
            className="block text-indigo-600 hover:text-indigo-700"
          >
            5. Implemented Features
          </a>
        </nav>
      </div>

      {/* Next.js Routing */}
      <section id="routing" className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Next.js Routing</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-xl font-medium">App Router</h3>
          <p className="text-gray-600">
            Our application uses Next.js 13+ App Router, which provides a more
            intuitive and powerful routing system:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              File-system based routing in the{" "}
              <code className="bg-gray-100 px-1 rounded">app</code> directory
            </li>
            <li>
              Nested routes with{" "}
              <code className="bg-gray-100 px-1 rounded">layout.tsx</code> for
              shared UI
            </li>
            <li>
              Dynamic routes with{" "}
              <code className="bg-gray-100 px-1 rounded">[param]</code> folders
            </li>
            <li>
              Route groups with{" "}
              <code className="bg-gray-100 px-1 rounded">(group)</code> folders
            </li>
          </ul>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Our Routes:</p>
            <ul className="space-y-1 text-sm">
              <li>
                <code className="bg-gray-100 px-1 rounded">/</code> - Home page
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">/dashboard</code> -
                Dashboard with stats
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">/tasks</code> - Task
                management
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">/categories</code> -
                Category management
              </li>
              <li>
                <code className="bg-gray-100 px-1 rounded">/docs</code> - This
                documentation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rendering Strategies */}
      <section id="rendering" className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Rendering Strategies</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-xl font-medium">Server Components (Default)</h3>
          <p className="text-gray-600">
            Next.js 13+ uses React Server Components by default. Our
            implementation includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>
              Server-side data fetching in{" "}
              <code className="bg-gray-100 px-1 rounded">page.tsx</code>
            </li>
            <li>Immediate content rendering without client-side JavaScript</li>
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

      {/* Components & State Management */}
      <section id="components" className="space-y-4">
        <h2 className="text-2xl font-semibold">
          3. Components & State Management
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-xl font-medium">Component Architecture</h3>
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
              <code className="bg-gray-100 px-1 rounded">useEffect</code> for
              side effects
            </li>
            <li>Server state for initial data</li>
            <li>Client state for real-time updates</li>
          </ul>
        </div>
      </section>

      {/* Styling */}
      <section id="styling" className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Styling with Tailwind CSS</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
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

      {/* Features */}
      <section id="features" className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Implemented Features</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
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

      {/* Getting Started */}
      <section className="bg-indigo-50 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-gray-600 mb-4">To run the application locally:</p>
        <div className="bg-white p-4 rounded-lg">
          <code className="block text-sm">npm run dev</code>
        </div>
        <p className="text-gray-600 mt-4">
          Visit{" "}
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">
            the home page
          </Link>{" "}
          to start exploring the application.
        </p>
      </section>
    </div>
  );
}
