import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

export default function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  const hasSales = product?.salesPrice > 0;

  return (
    <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer flex flex-col flex-1"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />

          {hasSales && (
            <Badge className="absolute top-2 left-2 bg-[#D4AF37] text-white">
              Sale
            </Badge>
          )}
        </div>

        <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <h2 className="font-semibold text-lg truncate">{product?.title}</h2>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <span className="text-black font-medium">
                {categoryOptionsMap[product?.category]}
              </span>
              <span className="text-[#D4AF37]">•</span>
              <span className="text-black font-medium">
                {brandOptionsMap[product?.brand]}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              {hasSales ? (
                <>
                  <span className="font-bold text-green-600">
                    ₦{product?.salesPrice}
                  </span>
                  <span className="line-through text-gray-400">
                    ₦{product?.price}
                  </span>
                </>
              ) : (
                <span className="font-bold text-black">₦{product?.price}</span>
              )}
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        <Button
          className="w-full sm:w-auto flex-1 bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold rounded-lg"
          onClick={() => handleAddToCart(product?._id)}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
