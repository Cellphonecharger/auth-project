import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/wisdom.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="flex flex-col  z-10 relative items-center justify-center h-full">
        <h1 className="text-5xl mb-8 font-bold text-red-300">Quotes Website</h1>
        <div className="flex gap-4 mt-3">
          <Link
            to="/signup"
            className="px-6 py-3 bg-pink-300 !text-black font-semibold rounded-lg shadow hover:bg-orange-300 hover:shadow-lg transition duration-300
"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-green-200 !text-black font-semibold rounded-lg shadow hover:bg-orange-300 hover:shadow-lg transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
