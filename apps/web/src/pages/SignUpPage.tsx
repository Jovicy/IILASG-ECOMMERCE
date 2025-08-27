import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignUp } from "@/hooks/useAuth";
import AccountCreationForm from "@/components/custom/AccountCreationForm";
import { tokenService } from "@/api/tokenService";
import { useEffect } from "react";
import { AccountType } from "./AccountPage";

interface BuyerFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

const BuyerSignUpPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountType = searchParams.get("accountType");
  const { mutate: signUp } = useSignUp();

  useEffect(() => {
    if (!accountType || !AccountType[accountType]) {
      navigate("/account-type");
      return;
    }
  }, [accountType]);

  const handleBuyerSubmit = (formData: BuyerFormData): void => {
    const credentials = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: accountType.toUpperCase(),
    };

    signUp(credentials, {
      onSuccess: (response) => {
        tokenService.setTokens({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
        navigate("/account-not-created/google");
      },
      onError: (err) => {
        console.error("Signup failed:", err);
      },
    });
  };

  return <AccountCreationForm accountType={accountType} onSubmit={handleBuyerSubmit} />;
};

export default BuyerSignUpPage;
