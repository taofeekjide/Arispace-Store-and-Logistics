import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

export default function ShoppingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white">
        <ShoppingHeader />
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="bg-black text-yellow-400 text-center py-4 mt-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AriSpace Store & Logistics
        </p>
      </footer>
    </div>
  );
}
