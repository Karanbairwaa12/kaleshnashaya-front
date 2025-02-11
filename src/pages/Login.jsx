import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../utils/allapi/auth";
import { useUserStore } from "../store/userStore";
import { FaSpinner } from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();
  const { setLoading } = useUserStore();
  const [error, setError] = useState();

  // Formik configuration for Login form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      const { email, password } = values;
      const status = await loginApi(email, password, setError, setLoading);
      if (status === 200) {
        navigate("/profile");
      } else {
        setError("Login failed, please check your credentials.");
      }
    },
  });

  useEffect(() => {
    setError(null);
  }, [formik.values]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 transform transition-all">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-200 z-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-medium text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to continue</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 border transition-all duration-200 
                  ${formik.touched.email && formik.errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                placeholder="you@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 border transition-all duration-200 
                  ${formik.touched.password && formik.errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                placeholder="••••••••"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl
                hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 transform transition-all duration-200 font-medium
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2 h-5 w-5" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? {" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
