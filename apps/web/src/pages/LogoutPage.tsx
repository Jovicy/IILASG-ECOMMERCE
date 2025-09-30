import { clearAuth } from "@/store/slices/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    dispatch(clearAuth());
    queryClient.removeQueries({ queryKey: ["userProfile"] });
  };

  return <div onClick={handleLogout}>LogoutPage</div>;
};

export default LogoutPage;
