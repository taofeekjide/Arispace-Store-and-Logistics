import React, { useState } from "react";
import axios from "axios";
import { DialogContent, DialogTitle, Dialog } from "../ui/dialog";
import Form from "../common/form";

export default function AdminOrderDetails({ order, fetchOrders }) {
  const [formData, setFormData] = useState({
    status: order.orderStatus,
  });

  async function handleUpdateStatus(e) {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${order._id}`,
        { status: formData.status },
        { withCredentials: true },
      );

      if (res.data.success) {
        alert("Order updated successfully");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const subTotal = order.totalAmount - order.deliveryFee;

  return (

      <DialogContent className="max-w-3xl p-0 rounded-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <DialogTitle className="sr-only">Order Details</DialogTitle>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Order summary */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">#{order._id.slice(-8)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p>{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Subtotal</p>
              <p>₦{subTotal.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Delivery Fee</p>
              <p>₦{order.deliveryFee.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-semibold">
                ₦{order.totalAmount.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Order Status</p>
              <p>{order.orderStatus}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p>{order.paymentStatus}</p>
            </div>
          </div>

          <hr />

          {/* Order items */}
          {order.cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between border p-4 rounded-lg"
            >
              <div>
                <p>{item.title}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p>
                ₦
                {(
                  (item.salesPrice > 0 ? item.salesPrice : item.price) *
                  item.quantity
                ).toLocaleString()}
              </p>
            </div>
          ))}

          <hr />

          {/* Update status */}
          <Form
            formControls={[
              {
                label: "Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "processing", label: "Processing" },
                  { id: "shipped", label: "Shipped" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
          />
        </div>
      </DialogContent>
  );
}
