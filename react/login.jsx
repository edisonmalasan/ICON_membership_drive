"use client"; // required if you're in Next.js app/ router

import React, { useState } from "react";
import { ChevronRight, Users, Shield, CreditCard } from "lucide-react";

export default function LoginPage({ onNavigate }) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const safeNavigate = (page) => {
    if (typeof onNavigate === "function") onNavigate(page);
    // else silently no-op to avoid "onNavigate is not a function" crashes
  };

  //TODO 
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload on form submit
    setLoading(true);
    setMessage("");

    try {
    //add get method here for handlin
      // Simulate login API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple admin check
      if (
        loginForm.email === "admin@college.edu" &&
        loginForm.password === "admin123"
      ) {
        safeNavigate("admin");// navigate to admin page
      } else {
        setMessage("Invalid credentials. Try admin@college.edu / admin123");
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-white/80">Sign in to access your organization</p>
          </div>

          {/* Use a form so Enter key works and preventDefault is meaningful */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-white/90 font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white/90 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          {message && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {message}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-white/70 mb-4">New to our organization?</p>
            <button
              type="button"
              onClick={() => safeNavigate("register")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Users size={20} />
              Join Our Organization
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/20">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white/80 text-sm font-medium">Community</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/20">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-white/80 text-sm font-medium">Secure</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/20">
            <CreditCard className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-white/80 text-sm font-medium">Easy Pay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
