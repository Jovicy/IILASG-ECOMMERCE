import { tokenService } from "@/api/tokenService";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  role?: "buyer" | "vendor"; // only allow buyer/vendor for now
}

export const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const isAuthenticated = !!tokenService.getAccessToken();

  // Example: mock role (replace with real token decode or API call later)
  const userRole = tokenService.getRole?.() as "buyer" | "vendor" | undefined;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (role && userRole !== role) {
    // Redirect to home if user tries to access the wrong role section
    return <Navigate to={`/${userRole ?? "signin"}`} replace />;
  }

  return <Outlet />;
};
