import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const PublicRoute = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && role) {
    return <Navigate to={`/${role}`} replace />;
  }

  return <Outlet />;
};
