import React from "react";
import bannerOne from "../../assets/bannerOne.jpg";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50">
      
      {/* ===== Hero Image / Left Section ===== */}
      <div className="md:w-1/2 p-6 flex justify-center">
        <img
          src={bannerOne}
          alt="Shop Hero"
          className="w-full max-w-md rounded-xl shadow-lg"
        />
      </div>

      {/* ===== Text + Buttons / Right Section ===== */}
      <div className="md:w-1/2 p-6 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to AriSpace Store & Logistics
        </h1>
        <p className="text-gray-600 text-lg">
          Discover amazing products, enjoy seamless shopping, and get your items delivered fast.
        </p>

        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
          <Button
            onClick={() => window.location.href = "/auth/login"}
            className="bg-yellow-500 text-black hover:bg-yellow-600"
          >
            Login
          </Button>
          <Button
            onClick={() => window.location.href = "/auth/register"}
            className="bg-black text-white hover:bg-gray-800"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}