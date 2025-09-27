import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sampleOrders } from "@/data/database";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  SearchNormal1,
  Calendar2,
  ArrowRight,
  Box,
  SearchStatus,
} from "iconsax-reactjs";

// optional arrow icon

const OrdersPage = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchStatus = status === "all" || order.status === status;
    const orderDate = new Date(order.date);
    const matchStart = startDate ? new Date(startDate) <= orderDate : true;
    const matchEnd = endDate ? new Date(endDate) >= orderDate : true;
    const matchSearch =
      search === "" || order.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchStart && matchEnd && matchSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-primary-600 bg-primary-50";
      case "shipped":
        return "text-[#FF8500] bg-[#FFEFE8]";
      case "delivered":
        return "text-success-600 bg-success-50";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <section className="h-[90vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-grey-100 rounded-full p-6">
              <Box size="53" color="#B0B0B0" />
            </div>
            <p className="text-grey-900 font-normal text-base">
              You have no orders at this time
            </p>
            <p className="text-grey-400 font-normal text-sm">
              Continue shopping to place an order
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 bg-grey-50 p-4 rounded-t-xl text-xs">
            {/* Search Input */}
            <div className="relative w-[180px]">
              <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search Order ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white rounded-full placeholder:text-gray-300"
              />
            </div>

            {/* Status Dropdown */}
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-[180px] bg-white rounded-full placeholder:text-gray-300">
                <SelectValue placeholder="All statuses" defaultValue="all" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>

            {/* Start Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={clsx(
                    "w-[180px] capitalize flex-row-reverse justify-between text-left rounded-full border text-sm font-normal",
                    startDate ? "text-gray-900" : "text-grey-300",
                    "border-grey-100 bg-white",
                    "py-2 px-3"
                  )}

                >
                  <Calendar2 size={16} variant="Outline" className="text-gray-900" />
                  {startDate ? format(startDate, "PPP") : "start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-grey-100" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={clsx(
                    "w-[180px] capitalize flex-row-reverse justify-between text-left rounded-full border text-sm font-normal",
                    startDate ? "text-gray-900" : "text-grey-300",
                    "border-grey-100 bg-white",
                    "py-2 px-3"
                  )}

                >
                  <Calendar2 size={16} variant="Outline" className="mr-2 text-gray-900" />
                  {endDate ? format(new Date(endDate), "PPP") : "end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-grey-100" align="start">
                <Calendar
                  mode="single"
                  selected={endDate ? new Date(endDate) : undefined}
                  onSelect={(date) => {
                    if (date) setEndDate(format(date, "yyyy-MM-dd"));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow-sm border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-grey-900 text-white font-medium text-sm capitalize">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">No. of Products</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Total Price</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="bg-grey-100 rounded-full p-6">
                            <SearchStatus size="53" color="#B0B0B0" />
                          </div>
                          <p className="text-grey-900 font-normal text-lg">Order not found</p>
                          <p className="text-grey-400 font-normal text-sm">
                            We couldn’t find any order matching your request.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 text-sm font-normal">#{order.id}</td>
                      <td className="px-4 py-3 text-sm font-normal">
                        <span
                          className={`inline-block p-2 rounded-sm text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">
                        {order.date} | {order.time}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">{order.products}</td>
                      <td className="px-4 py-3 text-sm font-normal">{order.qty}</td>
                      <td className="px-4 py-3 text-sm font-normal">
                        ₦{Number(order.total).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal text-right">
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/buyer/orders/${encodeURIComponent(order.id)}`);
                          }}
                          className="cursor-pointer ml-4 text-primary-600 text-sm font-normal flex items-center gap-2 hover:underline"
                        >
                          View Details <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
