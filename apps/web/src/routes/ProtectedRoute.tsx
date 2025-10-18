import { tokenService } from "@/api/tokenService";
import { UserRole } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ pageRole }: { pageRole: UserRole }) => {
  const token = tokenService.getAccessToken();
  const role = tokenService.getRole();

  if (!token || !role) {
    return <Navigate to="/signin" replace />;
  }

  if (role && pageRole !== role) {
    return <Navigate to={`/${role}`} replace />;
  }

  return <Outlet />;
};
