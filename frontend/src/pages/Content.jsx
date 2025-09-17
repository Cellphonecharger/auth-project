import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ContentPage() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/login");
        console.log("Logged out successfully");
      }
      console.log("Response:", response.status, response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/quotes", {
        withCredentials: "include",
      })
      .then((res) => setQuote(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-row mt-6 p-4 gap-4 items-center">
      <div className="flex-1">
        <img
          src="/images/wisdom.jpg"
          alt="Widsom"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 p-4 rounded-lg">
        <div className="flex flex-col gap-4  items-center">
          <div className="bg-yellow-100 p-6 rounded-lg">
            {quote ? (
              <>
                <p className="text-2xl italic">"{quote.quote}"</p>
                <p className="mt-2 font-semibold  ">— {quote.author}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div>
            <div className="flex flex-row gap-4 items-center">
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2"
              >
                New Quote
              </button>
              <button onClick={handleLogOut} className="mt-4 px-4 py-2">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
