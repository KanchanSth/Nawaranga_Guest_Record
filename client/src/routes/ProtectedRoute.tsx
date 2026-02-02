import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import React from "react";

const ProtectedRoute  = ({ children }: { children: React.ReactNode }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;