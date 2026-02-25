import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import Form from "../common/form";
import { SeparatorHorizontal } from "lucide-react";

const initialFormData = {
  status: "pending",
};

export default function AdminOrderDetails() {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(e) {
    e.preventDefault();
  }

  return (
    <DialogContent  className="max-w-3xl p-0 rounded-2xl max-h-[90vh] flex flex-col">
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
            <p className="font-semibold text-gray-800">#123456</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-800">2024-06-15</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-semibold text-gray-800">₦120,000</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Status</p>

            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              Delivered
            </span>
          </div>
        </div>

        <hr className="h-px w-24 bg-black border-0 mx-auto" />

        {/* ===== Order Items ===== */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center border rounded-xl p-4">
              <div>
                <p className="font-medium text-gray-800">Product 1</p>
                <p className="text-sm text-gray-500">Quantity: 1</p>
              </div>

              <p className="font-semibold text-gray-800">₦120</p>
            </div>
          </div>
        </div>

        <hr className="h-px w-24 bg-black border-0 mx-auto" />

        {/* ===== Address Info ===== */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>

          <div className="border rounded-xl p-4 bg-gray-50 text-sm text-gray-700 space-y-1">
            <p className="font-medium text-gray-800">Taofeek Temitayo</p>
            <p>123 Main Street</p>
            <p>Lagos, Nigeria</p>
            <p>10001</p>
            <p>Phone: 08012345678</p>
            <p className="italic text-gray-500">
              Notes: Customer prefers evening delivery
            </p>
          </div>
        </div>

        <hr className="h-px w-24 bg-black border-0 mx-auto" />

        {/* ===== Update Status ===== */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            Update Order Status
          </h3>

          <div className="border rounded-xl p-4">
            <Form
              formControls={[
                {
                  label: "Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
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
        </div>
      </div>
    </DialogContent>
  );
}
