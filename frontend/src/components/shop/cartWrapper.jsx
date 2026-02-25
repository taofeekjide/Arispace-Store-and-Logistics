import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cartItemsContent";
import { useNavigate } from "react-router-dom";

export default function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (total, item) =>
            total +
            (item?.salesPrice > 0 ? item.salesPrice : item.price) *
              item.quantity,
          0,
        )
      : 0;

  return (
    <SheetContent className={"sm: max-w-md"}>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
        ) : (
          <p className="text-center">Your cart is empty</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">₦{totalAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          setOpenCartSheet(false);
          navigate("/shop/checkout");
        }}
        className={
          "w-full mt-6 bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold rounded-lg"
        }
      >
        CheckOut
      </Button>
    </SheetContent>
  );
}
