import { Home, LogOut, MenuIcon, ShoppingCart, User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/authSlice";
import UserCartWrapper from "./cartWrapper";
import { getCartItems } from "@/store/shop/cartSlice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="hidden md:flex items-center gap-8">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label
          onClick={() => handleNavigate(item)}
          key={item.id}
          className="text-gray-700 hover:text-yellow-600 font-medium transition cursor-pointer"
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(getCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          className="relative cursor-pointer"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className="w-5 h-5" />

          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-yellow-400 border border-yellow-500 text-xs font-bold px-2 py-[2px] rounded-full">
              {cartItems.items.length}
            </span>
          )}
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(234,179,8,0.7)]">
            <AvatarFallback className="bg-yellow-500 text-white font-semibold transition-all duration-300">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel className="text-sm">
            Logged in as <br />
            <span className="font-medium">{user.userName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User2Icon className="w-4 h-4 mr-2" />
            My Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? "py-2 shadow-lg" : "py-4 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <Home className="text-yellow-600 w-6 h-6" />
          <span
            className={`font-semibold text-gray-800 transition-all duration-300 ${
              isScrolled ? "text-base" : "text-lg"
            }`}
          >
            AriSpace Store & Logistics
          </span>
        </Link>

        {/* Desktop Menu */}
        <MenuItems />

        <div className="hidden md:flex items-center">
          <HeaderRightContent />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-6">
              <div className="flex flex-col gap-6 mt-8">
                {shoppingViewHeaderMenuItems.map((item) => (
                  <Link
                    to={item.path}
                    key={item.id}
                    className="text-lg text-gray-800 hover:text-yellow-600 font-medium"
                  >
                    {item.label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <div className="pt-4 border-t">
                    <HeaderRightContent />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
