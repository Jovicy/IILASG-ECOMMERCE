import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Layout
import MainLayout from "@/layouts/MainLayouts";

// Buyer Pages
import Homepage from "@/pages/HomePage";
import OrdersPage from "@/pages/OrdersPage";
import OrderDetailsPage from "@/pages/OrderDetailsPage";
import PointsPage from "@/pages/PointsPage";
import SavedItemsPage from "@/pages/SavedItemsPage";
import ForumsPage from "@/pages/ForumsPage";
import ForumChatPage from "@/pages/ForumChatPage";
import SettingsPage from "@/pages/SettingsPage";
import SupportPage from "@/pages/SupportPage";
import LogoutPage from "@/pages/LogoutPage";

// Vendor Pages
import VendorDashboard from "@/pages/vendor/DashboardPage";
import VendorOrders from "@/pages/vendor/OrdersPage";
import VendorProducts from "@/pages/vendor/ProductsPage";

// Auth Pages
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
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

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

      {/* Buyer routes */}
      <Route path="/buyer" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route element={<ProtectedRoute role="buyer" />}>
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

      {/* Vendor routes */}
      <Route path="/vendor" element={<MainLayout />}>
        <Route element={<ProtectedRoute role="vendor" />}>
          <Route index element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="orders" element={<VendorOrders />} />
        </Route>
      </Route>
    </Routes>
  );
}
