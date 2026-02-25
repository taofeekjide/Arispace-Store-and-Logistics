import Form from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);

        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/shop/home");
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          style: {
            border: "1px solid #f87171",
            padding: "16px",
            color: "#fff",
            background: "#dc2626",
          },
          iconTheme: {
            primary: "#f87171",
            secondary: "#fff",
          },
        });
      });
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-yellow-500">
          Login to your account
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      <Form
        formControls={loginFormControls}
        formData={formData}
        buttonText={"Login"}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}
