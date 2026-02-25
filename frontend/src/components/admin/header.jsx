import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ setOpenSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser()).then(() => {
      navigate("/auth/login");
    });
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black text-white border-b border-yellow-600">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden sm:flex text-yellow-500 hover:bg-yellow-600/20 cursor-pointer"
        onClick={() => setOpenSidebar(true)}
      >
        <AlignJustify className="h-6 w-6" />
        <span className="sr-only">Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="inline-flex gap-2 border-yellow-600 text-yellow-500 hover:bg-yellow-600/20 justify-end cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}
