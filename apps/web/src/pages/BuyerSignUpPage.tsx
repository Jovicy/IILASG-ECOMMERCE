import AccountCreationForm from "@/components/custom/AccountCreationForm";
import { addSignUpCredentials } from "@/store/authStore/signUpSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface BuyerFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

const BuyerSignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const credentials = useSelector((state: RootState) => state.auth);

  const handleBuyerSubmit = (formData: BuyerFormData): void => {
    dispatch(
      addSignUpCredentials({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        isLagosian: false,
        LGA: null,
      })
    );

    if (credentials.email) {
      //TODO: Preloader can be added here
      navigate("/account-not-created/google");
    }
  };

  return <AccountCreationForm accountType={credentials.accountType} onSubmit={handleBuyerSubmit} />;
};

export default BuyerSignUpPage;
