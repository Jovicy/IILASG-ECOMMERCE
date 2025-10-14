import { RootState } from "@/store/store";
import { UserRole } from "@/types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ pageRole }: { pageRole: UserRole }) => {
  const { isAuthenticated, role, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  if (role && pageRole !== role) {
    return <Navigate to={`/${role} `} replace />;
  }

  return <Outlet />;
};
