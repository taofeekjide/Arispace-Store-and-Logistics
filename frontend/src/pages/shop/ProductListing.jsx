import React, { useEffect, useState } from "react";
import ProductFilter from "@/components/shop/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/productsSlice";
import ShoppingProductTile from "@/components/shop/productTile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shop/productDetails";
import { addToCart, getCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";

function createSearchParamsHelper(filters) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

export default function ShoppingProductListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOptions) {
    console.log(getSectionId, getCurrentOptions, "handlefilter");

    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOptions);

      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOptions);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
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
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Product added to cart successfully");
        dispatch(getCartItems(user?.id));
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        getFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      <div className="hidden md:block">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </div>

      <div className="md:col-span-3 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">All Products</h2>
            <span className="text-sm text-gray-500">
              {productList?.length} Products
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowUpDownIcon className="h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortOption) => (
                  <DropdownMenuRadioItem
                    value={sortOption.id}
                    key={sortOption.id}
                  >
                    {sortOption.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}
