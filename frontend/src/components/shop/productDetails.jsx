import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/productsSlice";

export default function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product added to cart successfully", {
          duration: 4000,
          style: {
            padding: "15px",
            fontSize: "15px",
            fontWeight: "600",
            borderRadius: "12px",
            backgroundColor: "green",
            color: "#fff",
          },
        });
        dispatch(getCartItems(user?.id));
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="max-w-xl sm:max-w-2xl md:max-w-4xl w-full p-4 sm:p-6 rounded-2xl 
        bg-black text-white border border-yellow-500 shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* IMAGE */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-full max-h-72 sm:max-h-80 md:max-h-[420px] object-cover 
              rounded-xl border border-yellow-600"
            />
          </div>

          {/* RIGHT SECTION */}
          <div className="md:w-1/2 flex flex-col justify-between space-y-4">
            {/* TITLE + DESCRIPTION */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 leading-tight">
                {productDetails?.title}
              </h1>
              <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                {productDetails?.description}
              </p>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-extrabold text-yellow-400">
                ₦{productDetails?.salesPrice || productDetails?.price}
              </span>

              {productDetails?.salesPrice && (
                <span className="line-through text-gray-500 text-sm sm:text-base">
                  ₦{productDetails?.price}
                </span>
              )}
            </div>

            {/* RATING STARS */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
              </div>
              <span className="text-gray-300 text-sm">4.5</span>
            </div>

            {/* ADD TO CART BUTTON */}
            <Button
              className="w-full py-3 font-bold rounded-lg 
              bg-yellow-500 text-black hover:bg-yellow-400 transition"
              onClick={() => handleAddToCart(productDetails?._id)}
            >
              Add to Cart
            </Button>

            {/* REVIEWS */}
            <hr className="border-yellow-600" />
            <div className="max-h-64 overflow-y-auto pr-2">
              <h2 className="text-xl font-bold text-yellow-400 mb-4">
                Customer Reviews
              </h2>

              {/* REVIEW LIST */}
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar className="w-10 h-10 border border-yellow-600">
                      <AvatarFallback className="text-yellow-400 font-bold">
                        TM
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-yellow-300 text-sm">
                        Taofeek
                      </h3>
                      <div className="flex gap-1 mt-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              className="w-4 h-4 fill-yellow-500 text-yellow-500"
                            />
                          ))}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Awesome product.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* INPUT REVIEW */}
              <div className="mt-5 flex gap-2">
                <Input
                  placeholder="Write a review..."
                  className="bg-black border-yellow-600 text-white"
                />
                <Button className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
