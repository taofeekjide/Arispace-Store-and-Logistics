import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // <-- include cookies
      },
    );
    return response?.data;
  },
);

export const getProducts = createAsyncThunk(
  "/products/getProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
      {
        withCredentials: true,
      },
    );
    return response?.data;
  },
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // <-- include cookies
      },
    );
    return response?.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
      {
        withCredentials: true, // <-- include cookies
      },
    );
    return response?.data;
  },
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
