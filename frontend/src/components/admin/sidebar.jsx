import {
  ChartNoAxesCombinedIcon,
  LayoutDashboard,
  Package,
  ShoppingBag,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "../ui/sheet";

const adminSidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Package className="h-5 w-5" />,
  },
];

function SidebarItems({ openSidebar, setOpenSidebar }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path);
            openSidebar ? setOpenSidebar(false) : null;
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-300 hover:bg-yellow-600 hover:text-black transition-colors"
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

export default function AdminSidebar({ openSidebar, setOpenSidebar }) {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
        <SheetContent side="left" className="bg-black text-white p-6 w-64">
          <div className="flex items-center gap-3 mb-6">
            <ChartNoAxesCombinedIcon className="h-6 w-6 text-yellow-500" />
            <h1 className="text-xl font-bold text-yellow-500">Admin Panel</h1>
          </div>
          <div className="space-y-2">
            <SidebarItems
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="h-screen w-64 bg-black text-white shadow-lg flex flex-col p-6 lg:block hidden ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="cursor-pointer flex items-center gap-3 text-yellow-500 hover:text-yellow-400 transition-colors"
        >
          <ChartNoAxesCombinedIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <SidebarItems />
      </aside>
    </>
  );
}
