import { RootState } from "@/store/store";
import { UserRole } from "@/types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ pageRole }: { pageRole: UserRole }) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (role && pageRole !== role) {
    return <Navigate to={`/${pageRole ?? "signin"}`} replace />;
  }

  return <Outlet />;
};
