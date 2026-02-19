import axios from "axios";
import React, { useState, useCallback } from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {authUser, setAuthUser} = useAuth();// Access auth context for user data and update function
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     const res =  await axios.post(`/api/user/login`, formData, {
        withCredentials: true,
      });

     // save user data in localStorage for session persistence
      localStorage.setItem("messenger", JSON.stringify(res.data));
      setFormData({
        email: "",
        password: "",
      });
      setAuthUser(res.data); // Update auth context with logged-in user data
      toast.success("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-black bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold">Chat App ME</h1>
        <p className="mb-6 text-center text-gray-600">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
