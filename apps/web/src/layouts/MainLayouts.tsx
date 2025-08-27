// src/layouts/MainLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "@/components/custom/Navigation";
import Sidebar from "@/components/custom/Sidebar";
import Footer from "@/components/custom/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();
  const role = pathname.startsWith("/vendor") ? "vendor" : "buyer";

  return (
    <>
      <Navigation role={role} />
      <div className="flex min-h-screen">
        <Sidebar role={role} />
        <main className="flex-1 py-6 px-5">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
