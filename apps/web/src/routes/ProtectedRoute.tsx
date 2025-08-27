import { tokenService } from "@/api/tokenService";
import { UserRole } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ role }: { role: UserRole }) => {
  const isAuthenticated = !!tokenService.getAccessToken();

  const userRole = tokenService.getRole?.() as UserRole | null;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={`/${userRole ?? "signin"}`} replace />;
  }

  return <Outlet />;
};
