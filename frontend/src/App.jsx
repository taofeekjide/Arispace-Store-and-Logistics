import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import ShoppingLayout from "./components/shop/layout";
import NotFound from "./pages/notFound/NotFound";
import ShoppingProductListing from "./pages/shop/ProductListing";
import ShoppingHomePage from "./pages/shop/HomePage";
import ShoppingCheckout from "./pages/shop/Checkout";
import ShoppingAccount from "./pages/shop/Account";
import Unauthorized from "./pages/unauthorized";
import AuthCheck from "./components/common/AuthCheck";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import { Skeleton } from "./components/ui/skeleton";
import CheckoutSuccess from "./pages/shop/CheckoutSuccess";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black p-6 space-y-8">
        <Skeleton className="h-10 w-48 rounded-lg bg-yellow-600/60" />

        <div className="w-full max-w-2xl space-y-6">
          <Skeleton className="h-64 w-full rounded-xl bg-yellow-700/40" />

          <div className="space-y-3">
            <Skeleton className="h-5 w-3/4 rounded bg-yellow-600/70" />
            <Skeleton className="h-5 w-1/2 rounded bg-yellow-700/50" />
            <Skeleton className="h-5 w-5/6 rounded bg-yellow-700/30" />
          </div>
        </div>

        <Skeleton className="h-12 w-40 rounded-lg bg-yellow-600/80" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col bg-white">
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthCheck isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </AuthCheck>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AuthCheck isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </AuthCheck>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          <Route
            path="/shop"
            element={
              <AuthCheck isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </AuthCheck>
            }
          >
            <Route path="products" element={<ShoppingProductListing />} />
            <Route path="home" element={<ShoppingHomePage />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
          </Route>

          <Route path="checkout-success" element={<CheckoutSuccess />} />

          <Route path="*" element={<NotFound />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
