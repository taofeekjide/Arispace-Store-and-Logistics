import React, { useEffect, useState } from "react";
import img from "@/assets/account.png";
import Address from "@/components/shop/address";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shop/cartItemsContent";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    try {
      setIsProcessing(true); // Start loading

      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/create`,
        {
          userId: user.id,
          addressInfo: selectedAddress,
          deliveryFee,
          paymentMethod: "paystack",
        },
      );

      if (!orderResponse.data.success) {
        setIsProcessing(false);
        return;
      }

      const { orderId, totalAmount } = orderResponse.data.data;

      const initResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/paystack/initialize`,
        {
          email: user.email,
          amount: totalAmount * 100,
          orderId,
        },
      );

      const { authorization_url } = initResponse.data.data;

      window.location.href = authorization_url;
    } catch (err) {
      console.log(err);
      alert("Payment initialization failed");
      setIsProcessing(false); // Stop loading if error
    }
  };

  useEffect(() => {
    if (selectedAddress?.state) {
      if (selectedAddress.state.toLowerCase() === "lagos") {
        setDeliveryFee(4000);
      } else {
        setDeliveryFee(8000);
      }
    }
  }, [selectedAddress]);

  const cartTotal =
    cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (total, item) =>
            total +
            (item?.salesPrice > 0 ? item.salesPrice : item.price) *
              item.quantity,
          0,
        )
      : 0;

  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Banner ===== */}
      <div className="relative h-[200px] md:h-[280px] w-full overflow-hidden">
        <img
          src={img}
          alt="Checkout banner"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Checkout
          </h1>
        </div>
      </div>

      {/* ===== Main Container ===== */}
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== Left: Address ===== */}
          <div className="lg:col-span-2 space-y-6">
            <Address
              setSelectedAddress={setSelectedAddress}
              selectedAddress={selectedAddress}
            />
          </div>

          {/* ===== Right: Order Summary ===== */}
          <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                cartItems.items.map((item) => (
                  <UserCartItemsContent key={item.id} cartItem={item} />
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* Total */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Cart Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>

              <div className="border-t my-3" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full mt-6 font-semibold py-3 rounded-lg transition-all duration-200 ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-yellow-500 hover:bg-yellow-600 text-black"
              }`}
            >
              {isProcessing
                ? "Processing Payment..."
                : "Checkout with Paystack"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
