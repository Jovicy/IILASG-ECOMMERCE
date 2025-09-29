import React, { useState } from "react";
import { orders } from "@/data/database";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Clock,
  DocumentText1,
  BoxTick,
  Barcode,
  I3DCubeScan,
  ArrowUp2,
  ArrowDown2,
  TickCircle,
} from "iconsax-reactjs";

const statusColors: Record<string, string> = {
  "Order pending": "bg-grey-100 text-grey-900",
  "Pending Order": "bg-grey-100 text-grey-900",
  "Awaiting Pickup": "bg-primary-50 text-primary-600",
  "With Delivery": "bg-[#EAF6FF] text-[#0088FF]",
  Delivered: "bg-success-50 text-success-600",
};

const iconSteps = [
  { label: "Order Placed", icon: BoxTick },
  { label: "Processing", icon: Clock },
  { label: "Shipped", icon: I3DCubeScan },
  { label: "Delivered", icon: DocumentText1 },
];

type Order = {
  id: string;
  buyer: string;
  products: string[];
  total: string;
  status: string;
  date: string;
};

const OrdersTable = ({
  orders,
  emptyLabel,
  onViewOrder,
  onConfirmPickup,
  onTrackDelivery,
}: {
  orders: Order[];
  emptyLabel: string;
  onViewOrder: (order: Order) => void;
  onConfirmPickup: (order: Order) => void;
  onTrackDelivery: (order: Order) => void;
}) => {
  return (
    <section className="mt-6">
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
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-grey-100">
                <td className="px-4 py-3 font-normal text-grey-700">
                  #{order.id}
                </td>
                <td className="px-4 py-3 text-grey-700">{order.buyer}</td>
                <td className="px-4 py-3 text-primary-600 underline">
                  [{order.products.length}{" "}
                  {order.products.length > 1 ? "items" : "item"}]
                </td>
                <td className="px-4 py-3 text-grey-700">{order.total}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-sm text-xs font-medium ${statusColors[order.status] || "bg-grey-100 text-grey-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-grey-700">{order.date}</td>
                <td className="px-4 py-3 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-grey-100">
                        <MoreVertical className="w-5 h-5 text-grey-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 rounded-lg shadow-lg border border-grey-200">
                      <div className="flex flex-col">
                        {/* Always show View Order */}
                        <button
                          onClick={() => onViewOrder(order)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                        >
                          <DocumentText1 className="w-4 h-4 text-grey-500" />
                          View order
                        </button>

                        {/* Pending Order → Ready for pickup */}
                        {order.status === "Order pending" && (
                          <button
                            onClick={() => onConfirmPickup(order)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                          >
                            <BoxTick className="w-4 h-4 text-grey-500" />
                            Ready for pickup
                          </button>
                        )}

                        {/* Awaiting Pickup → Get pickup code */}
                        {order.status === "Awaiting Pickup" && (
                          <button
                            onClick={() => onConfirmPickup(order)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                          >
                            <Barcode className="w-4 h-4 text-grey-500" />
                            Get pickup code
                          </button>
                        )}

                        {/* With Delivery → Track Delivery */}
                        {order.status === "With Delivery" && (
                          <button
                            onClick={() => onTrackDelivery(order)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-grey-700 hover:bg-grey-100 rounded-md"
                          >
                            <I3DCubeScan className="w-4 h-4 text-grey-500" />
                            Track delivery
                          </button>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-6 text-center text-grey-500 text-sm"
              >
                No orders found for{" "}
                <span className="font-medium">{emptyLabel}</span>.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

const OrderActivity = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-6 bg-[#F6F6F699] rounded-xl p-4 flex flex-col gap-6">
      {/* Header with dropdown toggle */}
      <div
        className="flex items-center justify-between pb-4 border-b border-b-grey-100 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-medium text-lg text-grey-950">Order Activity</h3>
        <div>
          {open ? (
            <ArrowUp2 size="20" className="text-grey-600" />
          ) : (
            <ArrowDown2 size="20" className="text-grey-600" />
          )}
        </div>
      </div>

      {/* Activity List */}
      {open && (
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 pb-4 border-b border-b-grey-100">
            <div>
              <TickCircle size="32" variant="Bold" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-medium text-base text-grey-950">
                May 25, 2025
              </p>
              <p className="text-grey-950 text-sm">Out for delivery</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4">
            <div>
              <TickCircle size="32" color="#B0B0B0" variant="Bold" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-medium text-base text-grey-300">
                May 24, 2025
              </p>
              <p className="text-grey-300 text-sm">Received at [LOS-WH1]</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalStep, setModalStep] = useState<
    "details" | "confirmPickup" | "showCode" | "trackDelivery"
  >("details");

  const [currentStep, setCurrentStep] = useState(0);

  const tabs = [
    "All",
    "Pending Order",
    "Awaiting Pickup",
    "With Delivery",
    "Delivered",
  ];

  const filteredOrders = () => {
    if (activeTab === "All") return orders;
    if (activeTab === "Pending Order") {
      return orders.filter(
        (order) =>
          order.status === "Order pending" || order.status === "Pending Order"
      );
    }
    return orders.filter((order) => order.status === activeTab);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalStep("details");
  };

  return (
    <div className="w-full">
      <section className="flex flex-col gap-1 mb-6">
        <h1 className="text-lg font-medium text-gray-950">
          Order Management
        </h1>
        <p className="text-sm text-gray-500 font-normal">
          Manage all your orders from request to delivery
        </p>
      </section>
      {/* Tabs */}
      <section className="py-4 px-6 bg-grey-50 rounded-lg flex items-center gap-3">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-1 pb-3 text-sm font-normal cursor-pointer ${activeTab === tab
                ? "text-grey-900 border-b-2 border-b-primary-500"
                : "text-grey-500"
              }`}
          >
            {tab}
          </p>
        ))}
      </section>

      {/* Orders Table */}
      <OrdersTable
        orders={filteredOrders()}
        emptyLabel={activeTab}
        onViewOrder={(order) => {
          setSelectedOrder(order);
          setModalStep("details");
        }}
        onConfirmPickup={(order) => {
          setSelectedOrder(order);
          setModalStep("confirmPickup");
        }}
        onTrackDelivery={(order) => {
          setSelectedOrder(order);
          setModalStep("trackDelivery");
        }}
      />

      {/* Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={handleCloseModal}>
        <DialogContent
          className={`flex flex-col gap-4 py-5 px-4 rounded-xl border-none transition-all duration-300 
          ${modalStep === "trackDelivery" ? "w-[793px]! max-w-[793px]!" : "max-w-lg w-full!"}`}
        >
          <DialogHeader>
            <DialogTitle className="text-sm font-medium text-grey-950">
              {modalStep === "details" && "Order Details"}
              {modalStep === "confirmPickup" && ""}
              {modalStep === "showCode" && ""}
              {modalStep === "trackDelivery" && "Track Delivery"}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && modalStep === "details" && (
            <>
              <div className="flex flex-col gap-2">
                <div className="rounded-xl bg-[#F6F6F6] p-4 flex flex-col gap-4">
                  <span className="flex items-center justify-between">
                    <p className="text-grey-700 text-xs">Buyer</p>
                    <p className="text-grey-950 text-xs">
                      {selectedOrder.buyer}
                    </p>
                  </span>
                  <span className="flex items-center justify-between">
                    <p className="text-grey-700 text-xs">Date</p>
                    <p className="text-grey-950 text-xs">
                      {selectedOrder.date}
                    </p>
                  </span>
                </div>
                <div className="rounded-xl bg-[#F6F6F6] p-4 flex flex-col gap-4">
                  <span className="flex items-center justify-between">
                    <p className="text-grey-700 text-xs">Order ID</p>
                    <p className="text-grey-950 text-xs">#1045</p>
                  </span>
                  {selectedOrder.products.map((p, i) => (
                    <span key={i} className="flex items-center justify-between">
                      <p className="text-grey-700 text-xs">Item [{i + 1}]</p>
                      <p className="text-grey-950 text-xs">{p} x [1]</p>
                    </span>
                  ))}
                </div>
                <div className="rounded-xl bg-[#F6F6F6] p-4 flex items-center justify-between">
                  <p className="text-grey-700 text-xs">Total Price</p>
                  <p className="text-grey-950 text-xs">{selectedOrder.total}</p>
                </div>
                <div className="rounded-xl bg-[#F6F6F6] p-4 flex flex-col gap-4">
                  <span className="flex items-center justify-between">
                    <p className="text-grey-700 text-xs">Status</p>
                    <p className="text-grey-950 text-xs">[Order Pending]</p>
                  </span>
                  <span className="flex items-center justify-between">
                    <p className="text-grey-700 text-xs">Delivery Agent</p>
                    <p className="text-grey-950 text-xs">[Agent Full Name]</p>
                  </span>
                  <span className="flex items-center justify-between">
                    <p className="text-grey-700 text-xs">Agent Phone Number</p>
                    <p className="text-grey-950 text-xs">[08123456789]</p>
                  </span>
                </div>
              </div>

              {/* Hide buttons if Delivered */}
              {selectedOrder.status !== "Delivered" && (
                <div>
                  {selectedOrder.status === "With Delivery" ? (
                    <button
                      onClick={() => setModalStep("trackDelivery")}
                      className="bg-primary-500 py-3 px-6 text-white text-base font-normal rounded-full w-full"
                    >
                      Track Delivery
                    </button>
                  ) : (
                    <button
                      onClick={() => setModalStep("confirmPickup")}
                      className="bg-primary-500 py-3 px-6 text-white text-base font-normal rounded-full w-full flex items-center justify-center gap-2"
                    >
                      {selectedOrder.status === "Awaiting Pickup"
                        ? "Get pickup code"
                        : "Items are ready for pickup"}

                      <ArrowRight />
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Confirm Pickup Modal */}
          {selectedOrder && modalStep === "confirmPickup" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-center">
                <h1 className="text-lg font-medium text-[#202020]">
                  Items Ready for Pickup?
                </h1>
                <p className="text-grey-400 text-sm font-normal">
                  A pickup code will be generated and a delivery agent <br />
                  assigned to pick up the products.
                </p>
              </div>
              <button
                onClick={() => setModalStep("showCode")}
                className="bg-primary-500 py-3 px-6 text-white text-base font-normal rounded-full w-full"
              >
                Confirm and generate pickup code
              </button>
            </div>
          )}

          {/* Show Code Modal */}
          {selectedOrder && modalStep === "showCode" && (
            <div className="flex flex-col gap-6 rounded-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex justify-center items-center">
                  <Clock variant="Bold" color="#E09200" />
                </div>
                <div className="flex flex-col text-center items-center gap-1">
                  <h1 className="text-base text-[#202020] font-medium">
                    Waiting for delivery agent
                  </h1>
                  <p className="text-grey-400 font-normal text-sm">
                    A pickup code will be generated and a delivery agent <br />
                    assigned to pick up items.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-center">
                <div className="bg-success-50 w-full py-3 rounded-xl">
                  <p className="text-sm font-semibold text-success-700">
                    Pickup Code: A7F9C3
                  </p>
                </div>
                <p className="text-grey-400 font-normal text-sm">
                  Only release items when delivery agent shows this exact <br />
                  code.
                </p>
              </div>
            </div>
          )}

          {/* Track Delivery Modal */}
          {selectedOrder && modalStep === "trackDelivery" && (
            <div className="flex flex-col gap-4">
              <div className="py-6 flex justify-center">
                <div className="relative w-[90%] flex justify-between items-center">
                  {/* Background Track */}
                  <div className="absolute top-7 left-1 right-1 h-2 bg-success-100 z-0 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-success-600 rounded-full transition-transform duration-700 ease-out origin-left"
                      style={{
                        transform: `scaleX(${currentStep / (iconSteps.length - 1)})`,
                      }}
                    />
                  </div>

                  {iconSteps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.label}
                        className="flex flex-col items-center z-10 flex-1 relative"
                      >
                        <div
                          className={`border-8 border-white w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                ${isCompleted || isCurrent
                              ? "bg-success-600 text-white"
                              : "bg-success-100 text-success-600"
                            }`}
                        >
                          <Icon size="20" variant="Bold" />
                        </div>
                        <span className="mt-2 text-sm text-center text-black">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#FAFAF8] rounded-lg p-6 flex flex-col gap-2">
                <h1 className="text-xl text-grey-900 font-normal">
                  #{selectedOrder.id}
                </h1>
                <div className="flex items-center gap-2 text-sm text-grey-700 font-normal capitalize">
                  <span className="underline">
                    {selectedOrder.products.length} products
                  </span>
                  |<span>Order Date: {selectedOrder.date}</span>|
                  <span>Delivery Date: June 04 - June 05, 2025</span>
                </div>
              </div>

              {/* Collapsible Order Activity */}
              <OrderActivity />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
