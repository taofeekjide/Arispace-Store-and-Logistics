import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Form from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/addressSlice";
import AddressCard from "./addressCard";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  notes: "",
};

export default function Address({ selectedAddress, setSelectedAddress }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(e) {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error(
        "You can only have up to 3 saved addresses. Please delete an existing address before adding a new one.",
        {
          style: {
            border: "1px solid #f87171",
          },
        },
      );

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully!");
          }
        })
      : dispatch(
          addNewAddress({
            formData,
            userId: user?.id,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
          }
        });
    toast.success("Address added successfully!");
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
      }
    });
    toast.success("Address deleted successfully!");
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      state: getCurrentAddress?.state,
      zipCode: getCurrentAddress?.zipCode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "Address");

  return (
    <Card className="bg-white border border-black/10 shadow-sm rounded-xl">
      {/* Address List Header */}
      <div className="px-6 py-4 border-b border-black/10">
        <h2 className="text-lg font-semibold text-black">Saved Addresses</h2>
        <p className="text-sm text-gray-500">Manage your delivery addresses</p>
      </div>

      {/* Empty Address State (for now) */}
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((address) => (
              <AddressCard
                key={address._id}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={address}
                handleEditAddress={handleEditAddress}
                onSelect={() => setSelectedAddress(address)}
                isSelected={selectedAddress?._id === address._id} // highlight selected
                
              />
            ))
          : "No saved addresses found."}
      </div>

      {/* Add New Address */}
      <CardHeader className="border-t border-black/10">
        <CardTitle className="text-lg font-semibold text-black">
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={
            currentEditedId !== null ? "Update Address" : "Add Address"
          }
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}
