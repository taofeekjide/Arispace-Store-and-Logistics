import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export default function ImageUpload({
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  setImageLoading,
  imageLoading,
  isEditMode,
}) {
  const inputRef = useRef(null);

  function handleImageFIleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setImageFile(droppedFile);
      setImagePreview(URL.createObjectURL(droppedFile));
    }
  }

  async function uploadImageToCloudinary(imageFile) {
    setImageLoading(true);

    const formData = new FormData();
    formData.append("my_file", imageFile);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
        formData
      );

      if (response.data?.success && response.data?.data?.secure_url) {
        setImagePreview(response.data.data.secure_url);
        setImageLoading(false);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageLoading(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="space-y-3 mt-4">
      <Label className="text-sm font-semibold text-yellow-600">
        Upload Image
      </Label>

      <div
        onDragOver={!isEditMode ? handleDragOver : undefined}
        onDrop={!isEditMode ? handleDrop : undefined}
        onClick={() => {
          if (!isEditMode) inputRef.current.click();
        }}
        className={`border-2 border-dashed border-yellow-500 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
          isEditMode
            ? "bg-white cursor-not-allowed"
            : "bg-yellow-50/20 hover:bg-yellow-50/40 cursor-pointer"
        }`}
      >
        {/* Hidden Input */}
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFIleChange}
          disabled={isEditMode}
        />

        {/* Show preview image if in edit mode */}
        {isEditMode ? (
          <div className="flex flex-col items-center gap-3">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Current Image"
                  className="w-32 h-32 object-cover rounded-lg shadow-md border border-yellow-500"
                />
                <p className="text-sm text-gray-600 font-medium">
                  Current Image
                </p>
              </>
            ) : (
              <span className="text-gray-400 text-sm">You can't edit the image</span>
            )}
          </div>
        ) : (
          // Normal Upload View (when not editing)
          <>
            {!imageFile ? (
              <div className="flex flex-col items-center gap-2 text-yellow-600">
                <UploadCloudIcon className="w-10 h-10 opacity-80" />
                <p className="text-sm font-medium">
                  Drag & drop or click to upload an image
                </p>
              </div>
            ) : imageLoading ? (
              <Skeleton className="h-10 bg-gray-100" />
            ) : (
              <div className="flex flex-col items-center gap-3">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md border border-yellow-500"
                  />
                )}
                <div className="flex items-center gap-2">
                  <FileIcon className="text-yellow-600 w-5 h-5" />
                  <p className="text-sm text-gray-800 font-medium">
                    {imageFile.name}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Remove Image</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
