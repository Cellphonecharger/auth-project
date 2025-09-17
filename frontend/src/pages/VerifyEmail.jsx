import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const VerifyEmail = async (e) => {
    e.preventDefault();
    const code = e.target.code.value;

    if (!code) {
      setError("Please fill in the verification code");
      return;
    }

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message); // show backend error
        return;
      }

      setError("✅");
      navigate("/login");

      // store token in localStorage, then redirect
    } catch (err) {
      setError("Something went wrong. Try again later.");
      console.error("Verify error:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className=" mb-8 font-bold text-red-300">Verify your email</h1>
      <form onSubmit={VerifyEmail} className="flex gap-4 mt-3">
        <div className="flex gap-4 mt-3">
          <input
            type="code"
            name="code"
            placeholder="verification code"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <button className="p-3 font-semibold rounded-lg hover:bg-blue-600 transition transform hover:-translate-y-0.5">
            Verify
          </button>
        </div>
      </form>
      {error && (
        <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
      )}
    </div>
  );
}
