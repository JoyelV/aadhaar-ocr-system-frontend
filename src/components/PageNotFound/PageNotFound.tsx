import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
      <h2 className="text-2xl mb-2">Oops! Page Not Found</h2>
      <p className="mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved. But don't worry, we’ll get you back on track.
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition duration-300"
      >
        Go to Dashboard
      </Link>

      <div className="mt-10">
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Not found illustration"
          className="w-80"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
