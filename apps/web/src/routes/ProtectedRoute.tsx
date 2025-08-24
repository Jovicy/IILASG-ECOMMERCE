import { tokenService } from "@/api/tokenService";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthenticated = !!tokenService.getAccessToken(); // or however you check auth

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};
