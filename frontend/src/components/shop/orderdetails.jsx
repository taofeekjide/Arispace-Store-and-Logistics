import React from "react";
import { DialogContent } from "../ui/dialog";

export default function ShoppingOrderdetailsView({ order }) {

  const subTotal =
  order.totalAmount - order.deliveryFee;

  return (
    <DialogContent className="max-w-3xl p-0 rounded-2xl max-h-[90vh] flex flex-col">
      {/* ===== Header ===== */}
      <div className="px-6 py-4 border-b bg-gray-50 shrink-0">
        <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>
        <p className="text-sm text-gray-500">Manage and update this order</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ===== Order Summary ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold text-gray-800">
              #{order._id.slice(-8)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">SubTotal</p>
            <p className="font-semibold text-gray-800">
              ₦{subTotal.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Delivery Fee</p>
            <p className="font-semibold text-gray-800">
              ₦{order.deliveryFee?.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-800">
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-semibold text-gray-800">
              ₦{order.totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Status</p>

            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              {order.orderStatus}
            </span>
          </div>
        </div>

        <hr className="h-px w-24 bg-black border-0 mx-auto" />

        {/* ===== Order Items ===== */}
        {order.cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between items-center border rounded-xl p-4"
          >
            <div>
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            <p className="font-semibold text-gray-800">
              ₦
              {(
                (item.salesPrice > 0 ? item.salesPrice : item.price) *
                item.quantity
              ).toLocaleString()}
            </p>
          </div>
        ))}

        <hr className="h-px w-24 bg-black border-0 mx-auto" />

        {/* ===== Address Info ===== */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>

          <div className="border rounded-xl p-4 bg-gray-50 text-sm text-gray-700 space-y-1">
            <p>{order.addressInfo.address}</p>
            <p>{order.addressInfo.city}</p>
            <p>{order.addressInfo.state}</p>
            <p>{order.addressInfo.zipCode}</p>
            <p>Phone: {order.addressInfo.phone}</p>
            <p className="italic text-gray-500">
              Notes: {order.addressInfo.notes}
            </p>
          </div>
        </div>

        <hr className="h-px w-24 bg-black border-0 mx-auto" />
      </div>
    </DialogContent>
  );
}
