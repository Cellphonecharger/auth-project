import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message); // show backend error
        return;
      }

      setError("✅");
      navigate("/verify-email");
      console.log("Token:", data.token);
      // store token in localStorage, then redirect
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.error("SignUP error:", err);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-10 rounded-xl shadow-xl w-96 flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-orange-400 ">
          Sign Up
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        {/* error message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button className="p-3  text-black font-semibold rounded-lg  transition">
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
