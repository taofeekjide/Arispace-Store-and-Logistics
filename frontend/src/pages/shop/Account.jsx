import React from "react";
import accImg from "../../assets/account.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shop/address";
import ShoppingOrders from "@/components/shop/orders";

export default function ShoppingAccount() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[260px] w-full overflow-hidden mb-10">
        <img
          src={accImg}
          alt="account_image"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            My Account
          </h1>
          <p className="text-sm text-gray-200">
            Manage your orders and delivery addresses
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-14 z-10">
        <div className="bg-white rounded-xl shadow-md border border-black/10 p-6">
          <Tabs defaultValue="orders" className="w-full">
            {/* Tabs Header */}
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 rounded-lg p-1">
              <TabsTrigger
                value="orders"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Address
              </TabsTrigger>
            </TabsList>

            {/* Orders */}
            <TabsContent value="orders" className="mt-2">
              <ShoppingOrders />
            </TabsContent>

            {/* Address */}
            <TabsContent value="address" className="mt-2">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
