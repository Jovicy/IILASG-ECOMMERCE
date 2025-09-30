import { clearAuth } from "@/store/authStore/authSlice";
import { useDispatch } from "react-redux";

const LogoutPage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  return <div onClick={handleLogout}>LogoutPage</div>;
};

export default LogoutPage;
