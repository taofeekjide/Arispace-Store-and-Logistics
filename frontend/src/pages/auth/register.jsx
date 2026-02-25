import Form from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  username: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/auth/login");
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
          Register an account
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Have an account?{" "}
          <Link
            to="/auth/login"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      <Form
        formControls={registerFormControls}
        formData={formData}
        buttonText={"Register"}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}
