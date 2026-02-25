import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="md:w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-yellow-600 to-yellow-400 text-black">
          <h1 className="text-3xl font-extrabold mb-4 text-center">
            Welcome to <span className="text-black">AriSpace</span>
          </h1>
          <p className="text-lg text-black/80 text-center">
            Store & Logistics made simple, elegant, and reliable.
          </p>
        </div>

        <div className="md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md space-y-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
