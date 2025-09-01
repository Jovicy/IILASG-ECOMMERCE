import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Mock data (replace later with API data)
import {
  ArrowUp,
  Box1,
  TickCircle,
  InfoCircle,
  Clock,
  Truck,
} from "iconsax-reactjs";

// Mock chart data 
const salesData = [{ day: "Mon", sales: 4000 }, { day: "Tue", sales: 3200 }, { day: "Wed", sales: 2800 }, { day: "Thu", sales: 4500 }, { day: "Fri", sales: 5100 }, { day: "Sat", sales: 6100 }, { day: "Sun", sales: 7000 },];

// Mock data (replace with API later)
const mockStats = [
  {
    title: "Earnings (This Month)",
    value: "₦120,000",
    subtitle: "View Earnings",
    icon: ArrowUp,
    iconColor: "text-green-600",
    variant: "Outline", // 👈 This one bold
  },
  {
    title: "Requested Orders",
    value: "85",
    subtitle: "Manage Orders",
    icon: Box1,
    iconColor: "text-grey-900",
    variant: "Bold",
  },
  {
    title: "Completed Orders",
    value: "72",
    subtitle: "View Completed",
    icon: TickCircle,
    iconColor: "text-success-600",
    variant: "Bold",
  },
  {
    title: "Low Stock Items",
    value: "6",
    subtitle: "Restock Now",
    icon: InfoCircle,
    iconColor: "text-primary-600",
    variant: "Bold",
  },
  {
    title: "Awaiting Pickup",
    value: "12",
    subtitle: "See Pickups",
    icon: Clock,
    iconColor: "text-primary-600",
    variant: "Bold",
  },
  {
    title: "With Delivery",
    value: "19",
    subtitle: "Track Deliveries",
    icon: Truck,
    iconColor: "text-success-600",
    variant: "Bold",
  },
];

// Reusable Card component
const DashboardCard = ({ title, value, subtitle, icon: Icon, iconColor, variant, className }) => (
  <div className={`bg-grey-50 border border-grey-50 shadow-sm rounded-lg p-4 flex flex-col justify-between ${className ?? ""}`}>
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-sm text-grey-600">{title}</h3>
      <div className={`bg-white h-12 w-12 p-2 rounded-full flex items-center justify-center ${iconColor}`}>
        <Icon size="24" variant={variant} /> {/* 👈 variant applied here */}
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-[32px] font-medium text-grey-950">{value}</p>
      <p className="text-sm text-grey-900 font-normal underline cursor-pointer">{subtitle}</p>
    </div>
  </div>
);


const DashboardPage = () => {
  return (
    <div className="w-full">
      {/* Intro Section */}
      <section className="flex flex-col gap-4 mb-8">
        <h1 className="text-base font-medium text-gray-950">
          Hello [First Name], Here's how your store is doing today.
        </h1>
        <p className="text-sm text-gray-500 font-normal">
          Manage your orders, track your earnings, and grow your business.
        </p>
      </section>

      {/* Dashboard Stats + Chart Section */}
      <section className="grid grid-cols-4 gap-6">
        {/* First row: 4 cards */}
        {mockStats.slice(0, 4).map((stat, index) => (
          <DashboardCard
            key={index}
            {...stat}
            className="col-span-1 h-[175px]"
          />
        ))}

        {/* Second row: Chart (2 cols) + 2 cards */}
        <div className="bg-white border border-grey-50 shadow-sm rounded-2xl p-4 gap-5 col-span-2 flex flex-col h-[400px]">
          <h3 className="font-semibold text-sm text-grey-600">Sales Analysis</h3>
          <p className="font-normal text-sm text-grey-600">Daily sales performance this week</p>
          <ResponsiveContainer width="100%" height="100%" className={`text-xs font-normal text-grey-600`}>
            <LineChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }} // extra space for labels + widen graph
            >
              <CartesianGrid stroke="#e5e7eb" horizontal vertical={false} />

              {/* X Axis */}
              <XAxis
                dataKey="day"
                label={{
                  value: "Days",
                  position: "insideBottom",
                  dy: 25 // pushes the label farther from axis
                }}
                tickLine={false}
                axisLine={false}
              />

              {/* Y Axis */}
              <YAxis
                width={70} // add width so label has room
                label={{
                  value: "Amount (₦)",
                  position: "insideLeft",
                  angle: -90,
                  offset: -5, // pushes label away from ticks
                  dy: 15,     // adjust vertical positioning
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {mockStats.slice(4).map((stat, index) => (
          <DashboardCard
            key={index + 4}
            {...stat}
            className="col-span-1 h-[400px] justify-between"
          />
        ))}
      </section>
    </div>
  );
};

export default DashboardPage;
