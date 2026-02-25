import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold">404</h1>
        <p className="mt-4 text-2xl font-semibold">Oops! Page Not Found</p>
        <p className="mt-2 text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 rounded-lg bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
