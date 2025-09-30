import React from "react";
import { orders } from "@/data/database";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Mock data (replace later with API data)
import { ArrowUp, Box1, TickCircle, InfoCircle, Clock, Truck, ArrowRight2, DocumentText1, BoxTick } from "iconsax-reactjs";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Mock chart data
const salesData = [
  { day: "Mon", sales: 4000 },
  { day: "Tue", sales: 3200 },
  { day: "Wed", sales: 2800 },
  { day: "Thu", sales: 4500 },
  { day: "Fri", sales: 5100 },
  { day: "Sat", sales: 6100 },
  { day: "Sun", sales: 7000 },
];

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

const statusColors: Record<string, string> = {
  "Order pending": "bg-grey-100 text-grey-900",
  "Awaiting pickup": "bg-primary-50 text-primary-600",
  "With Delivery": "bg-[#EAF6FF] text-[#0088FF]",
  Delivered: "bg-success-50 text-success-600",
};

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-full">
      {/* Intro Section */}
      <section className="flex flex-col gap-1 mb-8">
        <h1 className="text-lg font-medium text-gray-950">Hello {user.firstName}, Here's how your store is doing today.</h1>
        <p className="text-sm text-gray-500 font-normal">Manage your orders, track your earnings, and grow your business.</p>
      </section>

      {/* Dashboard Stats + Chart Section */}
      <section className="grid grid-cols-4 gap-6 mb-8">
        {/* First row: 4 cards */}
        {mockStats.slice(0, 4).map((stat, index) => (
          <DashboardCard key={index} {...stat} className="col-span-1 h-[175px]" />
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
                  dy: 25, // pushes the label farther from axis
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
                  dy: 15, // adjust vertical positioning
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {mockStats.slice(4).map((stat, index) => (
          <DashboardCard key={index + 4} {...stat} className="col-span-1 h-[400px] justify-between" />
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center p-4 bg-primary-50 rounded-t-lg">
          <p className="text-lg font-normal text-grey-950">Orders</p>
          <div className="flex items-center gap-1 text-primary-600 text-sm font-normal cursor-pointer">
            <p>View all</p>
            <ArrowRight2 />
          </div>
        </div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-grey-900 text-white font-medium text-sm capitalize">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Buyer</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Total Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y bg-grey-50">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-normal text-grey-700">#{order.id}</td>
                <td className="px-4 py-3 text-grey-700">{order.buyer}</td>
                <td className="px-4 py-3 text-primary-600 underline cursor-pointer">
                  [{order.products.length} {order.products.length > 1 ? "items" : "item"}]
                </td>
                <td className="px-4 py-3 text-grey-700">{order.total}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded-sm text-xs font-medium ${statusColors[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-4 py-3 text-grey-700">{order.date}</td>
                <td className="px-4 py-3 text-right">
                  {/* More menu */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="hover:bg-grey-100">
                        <MoreVertical className="h-5 w-5 text-grey-700" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" sideOffset={6} className="w-40 p-2 flex flex-col gap-2">
                      <button className="w-full flex items-center gap-1 text-left px-2 py-1.5 text-xs text-grey-700">
                        <DocumentText1 size="16" />
                        View order
                      </button>
                      <button className="w-full flex items-center gap-1 text-left px-2 py-1.5 text-xs text-success-600">
                        <BoxTick size="16" />
                        Ready for pickup
                      </button>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DashboardPage;
