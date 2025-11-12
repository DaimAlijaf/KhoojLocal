import React, { useState } from "react";
import axios from "axios";
import { MapPin, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [tab, setTab] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/login", { email, password });
      console.log("Login successful:", response.data);
      alert("Login successful!");
      // redirect or set user state here
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT HERO */}
      <div className="hidden lg:flex flex-col justify-between bg-[#174f48] text-white p-10">
        <div className="flex items-center gap-3 text-lg font-medium">
          <MapPin className="h-5 w-5" />
          <span className="text-white">KhoojLocal</span>
        </div>

        <div className="max-w-lg">
          <blockquote className="text-lg leading-relaxed">
            "KhoojLocal has transformed how I discover and interact with local businesses.
            The trust-based ranking system ensures I always find quality services."
          </blockquote>
          <div className="mt-6 text-sm">Sofia Davis</div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center p-8">
  <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Welcome to KhoojLocal</h1>
            <p className="mt-2 text-sm text-gray-500">Sign in to your account or create a new one</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 text-sm font-medium ${tab === "login" ? "bg-white text-black" : "text-gray-500 bg-gray-50"}`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 text-sm font-medium ${tab === "register" ? "bg-white text-black" : "text-gray-500 bg-gray-50"}`}
            >
              Register
            </button>
          </div>

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-1">{tab === "login" ? "Login" : "Create an account"}</h2>
              <p className="text-sm text-gray-500 mb-6">
                {tab === "login"
                  ? "Enter your credentials to access your account"
                  : "Enter your information to create an account"}
              </p>

              {tab === "login" ? (
                <>
                  {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                          className="w-full border rounded-md px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>

                      <div className="text-xs text-gray-400 mt-3">
                        Try these demo accounts:
                        <div className="mt-1 space-y-1 text-gray-500">
                          <div>admin@example.com (Admin access)</div>
                          <div>vendor@example.com (Vendor access)</div>
                          <div>user@example.com (Regular user)</div>
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          className="w-full border rounded-md px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-2 top-2 h-8 w-8 flex items-center justify-center text-gray-500"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Sign In */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:opacity-95 disabled:opacity-60"
                    >
                      {loading ? "Logging in..." : "Sign In"}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-gray-500 underline">
                      Forgot your password?
                    </a>
                  </div>
                </>
              ) : (
                /* Register form */
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input placeholder="John Doe" className="w-full border rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input placeholder="name@example.com" className="w-full border rounded-md px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input type="password" placeholder="Create a password" className="w-full border rounded-md px-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
                    </div>
                  </div>

                  <button className="w-full bg-black text-white py-3 rounded-md text-sm font-medium">
                    Create Account
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="underline">Terms of Service</a> and{" "}
                    <a href="#" className="underline">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
