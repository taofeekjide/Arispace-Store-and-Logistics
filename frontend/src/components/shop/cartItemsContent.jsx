import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, editCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";

export default function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function handleCartItemDelete(item) {
    dispatch(
      deleteCartItems({ productId: item.productId, userId: user?.id })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item deleted successfully");
      }
    });
  }

  function handleupdateQuantity(item, typeOfAction) {
    dispatch(
      editCartItems({
        userId: user?.id,
        productId: item?.productId,
        quantity:
          typeOfAction === "plus" ? item?.quantity + 1 : item?.quantity - 1,
      })
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem.title}</h3>
        <div className="flex items-center mt-1 gap-3">
          <Button
            variant={"outline"}
            size={"icon"}
            className={"h-8 w-8 rounded-full"}
            disabled={cartItem?.quantity === 1}
            onClick={() => handleupdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant={"outline"}
            size={"icon"}
            className={"h-8 w-8 rounded-full"}
            onClick={() => handleupdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₦
          {(
            (cartItem?.salesPrice > 0
              ? cartItem?.salesPrice
              : cartItem?.price) * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer mt-1"
          size={20}
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
}
