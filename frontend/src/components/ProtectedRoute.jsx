import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function ProtectedRoute({ children }) {
  //children is the prop of ProtectedRoute
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    // Ask backend if user is authenticated
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/check-auth", {
          withCredentials: true, //
        });
        if (res.status === 200) {
          setAuthorized(true);
        }
      } catch (err) {
        setAuthorized(false);
        console.log(err.message); // not authorized
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) return <p>Loading...</p>; // optional loading state
  if (!authorized) return <Navigate to="/login" replace />; // redirect if not logged in

  // Authorized → render the protected page
  return children;
}
