import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const reference = query.get("reference");

    if (!reference) {
      navigate("/");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/paystack/verify/${reference}`,
        );

        if (res.data.success) {
          setVerifying(false);
          await dispatch(getCartItems(user.id));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Payment verification failed");
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {verifying ? (
        <h2 className="text-xl font-semibold">Verifying payment, please wait...</h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful.
          </h2>
          <p className="mt-2">Your order has been confirmed, and is now being processed.</p>

          <button
            onClick={() => navigate("/shop/account")}
            className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-800 transition"
          >
            Go to My Orders
          </button>
        </>
      )}
    </div>
  );
}
