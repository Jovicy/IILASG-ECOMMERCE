import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";

import MainLayout from "@/layouts/MainLayouts";
import ForumChatPage from "@/pages/ForumChatPage";
import ForumsPage from "@/pages/ForumsPage";
import Homepage from "@/pages/HomePage";
import LogoutPage from "@/pages/LogoutPage";
import OrderDetailsPage from "@/pages/OrderDetailsPage";
import OrdersPage from "@/pages/OrdersPage";
import PointsPage from "@/pages/PointsPage";
import SavedItemsPage from "@/pages/SavedItemsPage";
import SettingsPage from "@/pages/SettingsPage";
import SupportPage from "@/pages/SupportPage";

import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import VerifyEmailPage from "@/pages/VerifyPage";
import ResetPasswordConfirmPage from "@/pages/ResetPasswordConfirmPage";
import BuyerSignUpPage from "@/pages/BuyerSignUpPage";
import VendorSignUpPage from "@/pages/VendorSignUpPage";
import AccountCreatedWithGoogle from "@/pages/AccountCreatedWithGoogle";
import AccountCreatedWithoutGoogle from "@/pages/AccountCreatedWithoutGoogle";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes (no layout) */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/new-password" element={<ResetPasswordConfirmPage />} />
      <Route path="/signup/buyer" element={<BuyerSignUpPage />} />
      <Route path="/signup/vendor" element={<VendorSignUpPage />} />
      <Route path="/account-created/google" element={<AccountCreatedWithGoogle />} />
      <Route path="/account-not-created/google" element={<AccountCreatedWithoutGoogle />} />

      {/* Routes using Main Layout */}
      <Route element={<MainLayout />}>
        <Route index element={<Homepage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="points" element={<PointsPage />} />
          <Route path="saved" element={<SavedItemsPage />} />
          <Route path="forums" element={<ForumsPage />} />
          <Route path="forums/:id" element={<ForumChatPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
