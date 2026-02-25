import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11v2h12v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13h14v6H5z"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-extrabold">Unauthorized</h1>
        <p className="mt-4 text-lg text-gray-300">
          You don’t have permission to view this page.
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
