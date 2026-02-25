import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  onSelect,
  isSelected, // new prop
}) {
  return (
    <Card
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-200 rounded-lg border p-1
    ${
      isSelected
        ? "border-black bg-gray-100 shadow-md scale-[1.02]"
        : "border-gray-200 hover:border-black hover:shadow-sm"
    }
  `}
    >
      {isSelected && (
        <span className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded">
          Selected
        </span>
      )}
      <CardContent className={"grid gap-4"}>
        <Label> Address: {addressInfo?.address}</Label>
        <Label> City: {addressInfo?.city}</Label>
        <Label> State: {addressInfo?.state}</Label>
        <Label> Zip Code: {addressInfo?.zipCode}</Label>
        <Label> Phone: {addressInfo?.phone}</Label>
        <Label> Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className={"flex justify-around"}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
