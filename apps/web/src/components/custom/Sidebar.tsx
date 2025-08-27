import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// import icons
import { ArrowRight2, Home2, Box, Gift, Heart, Messages2, Setting2, Call, LoginCurve } from "iconsax-reactjs";

import { UserRole } from "@/types";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  danger?: boolean;
}

interface SidebarProps {
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Define menus for buyer
  const buyerItemsTop = [
    { icon: Home2, label: "Home", to: "/buyer" },
    { icon: Box, label: "My Orders", to: "/buyer/orders" },
    { icon: Gift, label: "Shopping Points", to: "/buyer/points" },
    { icon: Heart, label: "Saved Items", to: "/buyer/saved" },
    { icon: Messages2, label: "Forums", to: "/buyer/forums" },
  ];

  const buyerItemsBottom = [
    { icon: Setting2, label: "Settings", to: "/buyer/settings" },
    { icon: Call, label: "Help & Support", to: "/buyer/support" },
    { icon: LoginCurve, label: "Log out", to: "/buyer/logout", danger: true },
  ];

  // Define menus for vendor
  const vendorItemsTop = [
    { icon: Home2, label: "Dashboard", to: "/vendor" }, // <-- matches Route index
    { icon: Box, label: "Products", to: "/vendor/products" },
    { icon: Gift, label: "Orders", to: "/vendor/orders" },
    { icon: Messages2, label: "Messages", to: "/vendor/messages" },
    { icon: Setting2, label: "Analytics", to: "/vendor/analytics" },
  ];

  const vendorItemsBottom = [
    { icon: Setting2, label: "Settings", to: "/vendor/settings" },
    { icon: Call, label: "Help & Support", to: "/vendor/support" },
    { icon: LoginCurve, label: "Log out", to: "/vendor/logout", danger: true },
  ];

  // Pick correct items based on role
  const itemsTop = role === "buyer" ? buyerItemsTop : vendorItemsTop;
  const itemsBottom = role === "buyer" ? buyerItemsBottom : vendorItemsBottom;

  return (
    <aside
      className={`sticky top-[70px] bg-bodies border-r border-grey-100 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        collapsed ? "w-[72px]" : "w-[260px]"
      } max-h-[calc(100vh-70px)]`}>
      {/* Collapse Button */}
      <div className="px-2 py-4">
        <button onClick={toggleSidebar} className={`group w-full px-3 py-2 mb-4 text-grey-400 text-sm transition-all duration-300 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          <ArrowRight2 size={18} className={`text-grey-400 transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"}`} />
          {!collapsed && <p className="text-sm sm:text-base">Collapse</p>}
        </button>

        {/* Top Items */}
        <div className="space-y-4">
          {itemsTop.map(({ icon, label, to }) => (
            <SidebarItem key={label} icon={icon} label={label} to={to} collapsed={collapsed} />
          ))}
        </div>
      </div>

      {/* Bottom Items */}
      <div className="px-2 py-4 space-y-4">
        {itemsBottom.map(({ icon, label, to, danger }) => (
          <SidebarItem key={label} icon={icon} label={label} to={to} collapsed={collapsed} danger={danger} />
        ))}
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon: Icon, label, to, collapsed, danger }: SidebarItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  // Classes for normal vs danger
  const baseClasses = danger
    ? "border-white text-error-600 hover:text-error-600 hover:bg-error-50 hover:border-error-500"
    : "border-white text-grey-900 hover:text-primary-500 hover:bg-primary-50 hover:border-primary-500";

  const activeClasses = danger ? "bg-error-50 border-error-500 text-error-600" : "bg-primary-50 border-primary-500 text-primary-500";

  return (
    <Link
      to={to}
      className={`
        group flex items-center px-3 py-2 transition-all duration-300 
        border rounded-[100px]
        ${collapsed ? "justify-center" : "gap-3"}
        ${isActive ? activeClasses : baseClasses}
      `}>
      {/* ✅ Icon now changes color dynamically */}
      <Icon
        size={20}
        className={`
          transition-colors duration-300 
          ${isActive ? (danger ? "text-error-600" : "text-primary-500") : danger ? "text-error-600 group-hover:text-error-500" : "text-grey-900 group-hover:text-primary-500"}
        `}
      />

      {!collapsed && (
        <span
          className={`whitespace-nowrap text-sm sm:text-base font-normal transition-colors duration-300 ${
            isActive ? (danger ? "text-error-600" : "text-primary-500") : danger ? "group-hover:text-error-600" : "group-hover:text-primary-500"
          }`}>
          {label}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;
