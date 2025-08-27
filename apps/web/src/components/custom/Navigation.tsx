import React, { useState } from "react";
import Logo from "@/assets/Main-logo.svg";
import { Link } from "react-router-dom";
import CartModal from "./CartModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  SearchNormal1,
  ShoppingCart,
  NotificationBing,
  User,
  ArrowDown2,
  Trash,
  ArrowUp2,
  Gift,
  TruckFast,
  Card,
  Send2,
} from "iconsax-reactjs";

import { UserRole } from "@/types/types";

interface NavigationProps {
  role: UserRole;
}

const Navigation: React.FC<NavigationProps> = ({ role }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // add somewhere at top or as clsx
  const navLinkClass = "font-normal text-sm text-grey-900 hover:text-primary-500 transition-all duration-300";
  const navIconBtnClass = "text-grey-800 hover:text-bodies border transition-all duration-300 border-grey-100 rounded-full p-2 hover:bg-primary-500 hover:border-bodies";


  return (
    <div className="sticky top-0 bg-bodies z-40 border-b border-b-grey-100 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <div>
            <img src={Logo} alt="Oja Eko Logo" />
          </div>

          {role === "buyer" ? (
            <>
              {/* Shop dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 font-normal text-sm text-grey-900 hover:text-primary-500 transition-all duration-300 focus:outline-none">
                    Shop <ArrowDown2 className="text-xs mt-0.5 h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/buyer/shop/men">Men</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/buyer/shop/women">Women</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/buyer/shop/kids">Kids</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/buyer/orders" className={navLinkClass}>My Orders</Link>
              <Link to="/buyer/forums" className={navLinkClass}>Forums</Link>
            </>
          ) : (
            <>
              <Link to="/vendor" className={navLinkClass}>Dashboard</Link>
              <Link to="/vendor/products" className={navLinkClass}>Products</Link>
              <Link to="/vendor/orders" className={navLinkClass}>Orders</Link>
              <Link to="/vendor/messages" className={navLinkClass}>Messages</Link>
            </>
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search input stays same for both */}
          <div className="flex items-center bg-bodies border border-grey-100 rounded-full px-4 py-2 w-[280px] transition-all duration-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100">
            <SearchNormal1 className="text-grey-800 text-sm mr-2 w-5 h-5" />
            <input
              type="text"
              placeholder={role === "buyer" ? "Search products and categories" : "Search products or orders"}
              className="bg-transparent text-xs text-grey-800 placeholder-grey-300 focus:outline-none w-full"
            />
          </div>

          {role === "buyer" && (
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-1 ${navIconBtnClass}`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-base font-normal">(0)</span>
            </button>
          )}

          <Link to={`/${role}/notifications`} className={navIconBtnClass}>
            <NotificationBing className="w-5 h-5" />
          </Link>

          <Link to="/signin" className={navIconBtnClass}>
            <User className="w-5 h-5" />
          </Link>

        </div>
      </div>

      {/* Cart Modal only for buyers */}
      {role === "buyer" && (
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
};

export default Navigation;
