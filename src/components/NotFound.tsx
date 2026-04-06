import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold text-gray-50">404</h1>
      <p className="text-gray-400">Page not found.</p>
      <Link to="/" className="text-primary-500 hover:underline">
        Back to catalog
      </Link>
    </div>
  );
}
