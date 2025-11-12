// src/LoginPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // register state
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState("user"); // user | vendor
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regShowPassword, setRegShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  // Helpers / validation
  const emailIsValid = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());
  const passwordIsStrong = (p) => p.length >= 8;
  const phoneIsValid = (p) =>
    p === "" || /^[0-9()+\s-]{7,20}$/.test(p.trim()); // optional basic check

  const registerFormIsValid = () => {
    return (
      regFullName.trim().length >= 2 &&
      emailIsValid(regEmail) &&
      passwordIsStrong(regPassword) &&
      regPassword === regConfirm &&
      phoneIsValid(regPhone) &&
      agreeTerms
    );
  };

  // LOGIN handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      // Simulate API call for now (no backend required)
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Store user data in localStorage
      const user = {
        email,
        name: email.split('@')[0],
        loggedIn: true
      };
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log("Logged in:", user);
      // Redirect to dashboard on successful login
      navigate("/dashboard");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // REGISTER handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");
    if (!registerFormIsValid()) {
      setRegError("Please fix the validation errors before submitting.");
      return;
    }

    setRegLoading(true);
    try {
      const payload = {
        name: regFullName.trim(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim() || undefined,
        role: regRole,
        password: regPassword,
      };

      const res = await axios.post("/api/register", payload);
      setRegSuccess("Account created successfully! You can now log in.");
      // clear form (optional)
      setRegFullName("");
      setRegEmail("");
      setRegPhone("");
      setRegRole("user");
      setRegPassword("");
      setRegConfirm("");
      setAgreeTerms(false);

      // switch to login after a short delay so user can see success
      setTimeout(() => setTab("login"), 1200);
      console.log("Registered:", res.data);
    } catch (err) {
      setRegError(err.response?.data?.message || "Registration failed. Try again.");
      console.error(err);
    } finally {
      setRegLoading(false);
    }
  };

  // small effect to reset messages when switching tabs
  useEffect(() => {
    setLoginError("");
    setRegError("");
    setRegSuccess("");
  }, [tab]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* LEFT HERO (Full Height, Full Width on Left Side) */}
      <aside className="hidden lg:flex flex-col justify-between bg-[#174f48] text-white p-10 w-1/2 h-screen">
        <div className="flex items-center gap-3 text-lg font-medium">
          <MapPin className="h-5 w-5" />
          <span className="text-white">KhoojLocal</span>
        </div>

        <div className="max-w-lg">
          <blockquote className="text-lg leading-relaxed">
            "KhoojLocal has transformed how I discover and interact with local
            businesses. The trust-based ranking system ensures I always find
            quality services."
          </blockquote>
          <div className="mt-6 text-sm">Sofia Davis</div>
        </div>
      </aside>

      {/* RIGHT FORM SECTION */}
      <main className="flex flex-1 items-center justify-center bg-gray-50 h-screen overflow-auto">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Welcome to KhoojLocal</h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your account or create a new one
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 w-fit mx-auto bg-transparent rounded-md">
            <button
              onClick={() => setTab("login")}
              className={`px-6 py-2 rounded-md text-sm font-medium border ${
                tab === "login"
                  ? "bg-white border-black shadow-[0_0_0_3px_rgba(0,0,0,0.12)]"
                  : "bg-gray-100 border-gray-200 text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("register")}
              className={`px-6 py-2 rounded-md text-sm font-medium border ${
                tab === "register"
                  ? "bg-white border-black shadow-[0_0_0_3px_rgba(0,0,0,0.12)]"
                  : "bg-gray-100 border-gray-200 text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-1">
                {tab === "login" ? "Login" : "Create an account"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {tab === "login"
                  ? "Enter your credentials to access your account"
                  : "Fill out the fields below to create your account"}
              </p>

              {tab === "login" ? (
                <>
                  {loginError && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
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

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:opacity-95 disabled:opacity-60"
                    >
                      {loading ? "Logging in..." : "Sign In"}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-gray-500 underline hover:text-black">Forgot your password?</a>
                  </div>
                </>
              ) : (
                /* Advanced Register form */
                <>
                  {regError && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{regError}</div>
                  )}
                  {regSuccess && (
                    <div className="mb-4 text-sm text-green-700 bg-green-50 p-3 rounded">{regSuccess}</div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full border rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                      {regFullName && regFullName.trim().length < 2 && (
                        <p className="text-xs text-red-500 mt-1">Please enter your full name (min 2 characters).</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                          className="w-full border rounded-md px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>
                      {regEmail && !emailIsValid(regEmail) && (
                        <p className="text-xs text-red-500 mt-1">Please enter a valid email.</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone (optional)</label>
                      <input
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+1 555 555 5555"
                        className="w-full border rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      />
                      {regPhone && !phoneIsValid(regPhone) && (
                        <p className="text-xs text-red-500 mt-1">Please enter a valid phone number.</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <select
                        value={regRole}
                        onChange={(e) => setRegRole(e.target.value)}
                        className="w-full border rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                      >
                        <option value="user">User</option>
                        <option value="vendor">Vendor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type={regShowPassword ? "text" : "password"}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Create a password"
                          required
                          className="w-full border rounded-md px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                        <button
                          type="button"
                          onClick={() => setRegShowPassword(!regShowPassword)}
                          aria-label={regShowPassword ? "Hide password" : "Show password"}
                          className="absolute right-2 top-2 h-8 w-8 flex items-center justify-center text-gray-500"
                        >
                          {regShowPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters.</p>
                      {!passwordIsStrong(regPassword) && regPassword.length > 0 && (
                        <p className="text-xs text-red-500 mt-1">Password is too short.</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type={regShowPassword ? "text" : "password"}
                          value={regConfirm}
                          onChange={(e) => setRegConfirm(e.target.value)}
                          placeholder="Confirm your password"
                          required
                          className="w-full border rounded-md px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                      </div>
                      {regConfirm && regConfirm !== regPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>
                      )}
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <a href="#" className="underline text-sm">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline text-sm">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!registerFormIsValid() || regLoading}
                      className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:opacity-95 disabled:opacity-60"
                    >
                      {regLoading ? "Creating account..." : "Create Account"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
