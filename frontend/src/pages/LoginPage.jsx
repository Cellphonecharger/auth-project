import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // include HttpOnly cookie! this step is very important
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message); // show backend error
        return;
      }

      setError("✅");
      navigate("/content"); //
      console.log("Token:", data.token);
      // store token in localStorage, then redirect
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-xl w-96 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-blue-500 ">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <p className="text-gray-400 text-sm">
          Data: lililithjulile@gmail.com 1234
        </p>

        {/* error message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button className="p-3 font-semibold rounded-lg hover:bg-blue-600 transition transform hover:-translate-y-0.5">
          Login
        </button>
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
