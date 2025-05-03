
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const EMAIL = import.meta.env.VITE_API_EMAIL;
  const PASSWORD = import.meta.env.VITE_API_PASSWORD;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign in failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.data.token);
      toast.success("Signed in successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: EMAIL,
          password: PASSWORD
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Guest sign-in failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.data.token);
      toast.success("Signed in as Guest!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2A2A3A] to-[#1A1A2F]">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-5 p-8 rounded-2xl backdrop-blur-lg border border-white border-opacity-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg border border-gray-300 border-opacity-20 focus:outline-none focus:border-opacity-40 focus:ring-2 focus:ring-[#FF6B6B]/30 text-gray-600 transition-all"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-600 text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg border border-gray-300 border-opacity-20 focus:outline-none focus:border-opacity-40 focus:ring-2 focus:ring-[#FF6B6B]/30 text-gray-600 transition-all"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Sign In
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGuestLogin}
          className="w-full mt-4 bg-gradient-to-r from-[#6B6BFF] to-[#8E53FF] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Enter as Guest
        </motion.button>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text font-semibold hover:opacity-80 transition-opacity text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default SignIn;
