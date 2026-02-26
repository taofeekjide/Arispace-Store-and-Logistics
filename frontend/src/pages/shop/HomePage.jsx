import React, { useEffect, useState } from "react";
import bannerOne from "../../assets/bannerOne.jpg";
import bannerTwo from "../../assets/bannerTwo.jpg";
import { Button } from "@/components/ui/button";
import {
  Baby,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  Shirt,
  Watch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/productsSlice";
import ShoppingProductTile from "@/components/shop/productTile";
import { useNavigate } from "react-router-dom";
import { addToCart, getCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shop/productDetails";

const categoriesWithIcon = [
  { id: "clothes", label: "Clothes", icon: Shirt },
  { id: "accessories", label: "Accessories", icon: Watch },
  { id: "footwears", label: "Footwears", icon: Footprints },
  { id: "kids", label: "Kids", icon: Baby },
];

export default function ShoppingHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const slides = [bannerOne, bannerTwo];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/products");
  }

  function handleGetProductDetails(id) {
    dispatch(getProductDetails(id));
  }

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

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      getFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }),
    );
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden rounded-xl">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="banner"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 
              ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length,
            )
          }
          className="
            absolute left-3 top-1/2 -translate-y-1/2 
            bg-black/60 text-yellow-500 border-yellow-500 
            hover:bg-yellow-500 hover:text-black
          "
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="
            absolute right-3 top-1/2 -translate-y-1/2 
            bg-black/60 text-yellow-500 border-yellow-500 
            hover:bg-yellow-500 hover:text-black
          "
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full 
                ${currentSlide === i ? "bg-yellow-500" : "bg-white/60"}
              `}
            />
          ))}
        </div>
      </div>

      <section className="mt-10 px-4 sm:px-6 lg:px-10">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">
          Shop by Category
        </h2>

        <div
          className="
            grid grid-cols-2 sm:grid-cols-4 gap-4 
          "
        >
          {categoriesWithIcon.map((category) => (
            <Card
              onClick={() => handleNavigateToListingPage(category, "category")}
              key={category.id}
              className="
                bg-black text-yellow-500 border-yellow-500 
                hover:bg-yellow-500 hover:text-black 
                cursor-pointer transition rounded-xl shadow-md
              "
            >
              <CardContent className="flex flex-col items-center justify-center py-6">
                <category.icon className="w-8 h-8 mb-2" />
                <span className="text-sm sm:text-base font-semibold">
                  {category.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {productList?.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}
