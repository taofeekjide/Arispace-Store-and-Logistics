import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";
import AdminProductsSlice from "./admin/products-slice/index.js";
import ShoppingProductSlice from "./shop/productsSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shoppingAddressSlice from "./shop/addressSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: ShoppingProductSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shoppingAddressSlice,
  },
});

export default store;
