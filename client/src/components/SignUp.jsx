import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const {authUser, setAuthUser} = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `/api/user/signUp`,
        formData,
        { withCredentials: true }
      );

      setSuccess("Account created successfully");
      console.log("Signup response:", res.data);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Signup successful! You can now log in.");
      localStorage.setItem("messenger", JSON.stringify(res.data));
      setAuthUser(res.data); // Update auth context with new user data
        
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Account
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"  
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">
              Log in
            </a>
          </p>
        </div>
      </form>
      
    </div>
  );
}

export default SignUp;
