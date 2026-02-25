import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function AdminProductTile({
  product,
  setCurrentEditedId,
  setCreateProductOpen,
  setFormData,
  handleDelete,
}) {
  const hasDiscount = product?.salesPrice && product.salesPrice > 0;

  return (
    <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div>
        {/* Image Section */}
        <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
          {product?.image ? (
            <img
              src={product.image}
              alt={product?.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product?.title || "Untitled Product"}
          </h2>

          <div className="flex items-center gap-2">
            {/* Regular Price */}
            <span
              className={`text-sm ${
                hasDiscount
                  ? "line-through text-gray-400"
                  : "text-gray-800 font-medium"
              }`}
            >
              ₦{product?.price || "0"}
            </span>

            {/* Sale Price (if available) */}
            {hasDiscount && (
              <span className="text-sm font-semibold text-green-600">
                ₦{product.salesPrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className={"flex justify-between items-center"}>
          <Button
            onClick={() => {
              setCurrentEditedId(product?._id);
              setCreateProductOpen(true);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}
