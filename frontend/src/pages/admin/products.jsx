import ImageUpload from "@/components/admin/imageUpload";
import AdminProductTile from "@/components/admin/productTile";
import Form from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { productFormControls } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "@/store/admin/products-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  price: "",
  salesPrice: "",
  brand: "",
  stock: "",
};

export default function AdminProducts() {
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            console.log(data, "edit");
            if (data?.payload?.success) {
              dispatch(getProducts());
              setImageUrl("");
              setImageFile(null);
              setFormData(initialFormData);
              setCreateProductOpen(false);
              setCurrentEditedId(null);
              toast.success("Product edited successfully!");
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: imageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getProducts());
            setImageUrl("");
            setImageFile(null);
            setFormData(initialFormData);
            setCreateProductOpen(false);
            toast.success("Product added successfully!");
          }
        });
  }

  function handleDelete(currentId) {
    dispatch(deleteProduct(currentId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getProducts());
        toast.success("Product deleted successfully!");
      }
    });
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-black text-yellow-500 px-6 py-4 rounded-xl shadow">
        <h4 className=" font-semibold">Products Management</h4>
        <Button
          onClick={() => setCreateProductOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((product) => (
            <AdminProductTile
              setCurrentEditedId={setCurrentEditedId}
              setCreateProductOpen={setCreateProductOpen}
              setFormData={setFormData}
              key={product._id}
              product={product}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center">
            No products found. Please add new products.
          </p>
        )}
      </div>

      <Sheet
        open={createProductOpen}
        onOpenChange={() => {
          setCreateProductOpen(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setImageUrl("");
          setImageFile(null);
        }}
      >
        <SheetContent
          side="right"
          className="bg-gray-50 overflow-y-auto w-full sm:w-[450px] lg:w-[500px]"
        >
          <SheetHeader className="pb-4 border-b border-gray-200">
            <SheetTitle className="text-xl font-semibold text-yellow-600">
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imagePreview={imageUrl}
            setImagePreview={setImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            isEditMode={currentEditedId !== null}
          />

          <div className="mt-6 space-y-4 mb-10 px-4">
            <Form
              formControls={productFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Edit Product" : "Add Product"}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
