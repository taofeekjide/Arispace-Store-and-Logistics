import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

export default function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>
        <AdminSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md sticky top-0 z-20">
          <AdminHeader setOpenSidebar={setOpenSidebar} />
        </header>

        <main className="flex-1 flex-col p-4 md:p-6">
          <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
