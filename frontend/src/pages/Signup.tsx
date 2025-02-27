import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup: React.FC = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.data.token);
      navigate("/dashboard"); 
    }catch (error) {
        console.error(error);
        if (error instanceof Error) {
          alert(error.message); 
        } else {
          alert("An unexpected error occurred");
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
          Create Account
        </h2>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-5 rounded-lg border border-gray-300 border-opacity-20 focus:outline-none focus:border-opacity-40 focus:ring-2 focus:ring-[#FF6B6B]/30 text-gray-600 transition-all"
            required
          />
        </div>

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
          Sign Up
        </motion.button>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link 
            to="/signin" 
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-white font-semibold hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;