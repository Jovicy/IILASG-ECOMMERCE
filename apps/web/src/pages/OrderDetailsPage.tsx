import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sampleOrders } from "@/data/database";
import { Checkbox } from "@/components/ui/checkbox"
import FilterImage from "@/assets/filteredImg.svg"
import {
  SearchStatus,
  CallCalling,
  ArrowLeft,
  TruckFast,
  ShoppingCart,
  Box,
  TickCircle,
  ArrowUp2,
  ArrowDown2,
} from "iconsax-reactjs";

const iconSteps = [
  { label: "Order Placed", icon: ShoppingCart },
  { label: "Processing", icon: Box },
  { label: "Shipped", icon: TruckFast },
  { label: "Delivered", icon: TickCircle },
];

const handleStepClick = (stepIndex) => {
  console.log("Clicked step:", iconSteps[stepIndex].label);
  // You can handle routing or display logic here
};

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const cleanOrderId = decodeURIComponent(orderId || "")
    .split("#")[0]
    .trim();

  const order = sampleOrders.find(
    (o) => o.id.toLowerCase().trim() === cleanOrderId.toLowerCase().trim()
  );


  if (!order) {
    return (
      <section className="h-[90vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-grey-100 rounded-full p-6">
            <SearchStatus size="53" color="#B0B0B0" />
          </div>
          <p className="text-grey-900 font-normal text-lg">Order not found</p>
          <p className="text-grey-400 font-normal text-sm">
            We couldn’t find any order matching your request.
          </p>
        </div>
      </section>
    );
  }
  const activity = order.activity || [];

  const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];

  const getCurrentStep = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep(order.status);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/buyer/orders">
            <ArrowLeft color="#000000" />
          </Link>
          <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
        </div>
        <div className="flex items-center gap-2 text-primary-600 cursor-pointer hover:underline">
          <CallCalling />
          <p className="font-normal text-sm">Contact us</p>
        </div>
      </div>

      <div className="py-10 flex justify-center">
        <div className="relative w-[90%] flex justify-between items-center">
          {/* Background Track */}
          <div className="absolute top-7 left-1 right-1 h-3 bg-success-100 z-0 rounded-full overflow-hidden">
            <div
              className="h-3 bg-success-600 rounded-full transition-transform duration-700 ease-out origin-left"
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
                onClick={() => handleStepClick(index)}
                aria-label={`Step ${index + 1}: ${step.label}`}
                title={step.label}
                className="flex flex-col items-center z-10 flex-1 relative cursor-pointer group"
              >
                <div
                  className={`border-8 border-white w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted
                      ? "bg-success-600 text-white"
                      : isCurrent
                        ? "bg-success-600 text-white scale-105"
                        : "bg-success-100 text-success-600 group-hover:scale-105"
                    }`}
                >
                  <Icon size="20" variant="Bold" />
                </div>
                <span
                  className={`mt-2 text-sm text-center ${isCurrent ? "text-grey-950 font-semibold" : "text-grey-600"
                    }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-grey-50 w-full p-6 rounded-lg flex justify-between items-center mb-5">
        <div className="flex flex-col gap-2">
          <p className="text-grey-900 text-xl font-medium">#{order.id}</p>
          <div className="flex items-center gap-2 text-sm text-grey-700 font-normal capitalize">
            <span className="underline">4 products</span>|
            <span>Order Date: May 28, 2025</span>|
            <span>Delivery Date: June 04 - June 05, 2025</span>
          </div>
        </div>
        <div>
          <p className="text-grey-950 text-xl font-medium">₦{order.total}</p>
        </div>
      </div>
      <div className="bg-grey-50 w-full p-6 rounded-lg flex flex-col gap-5 mb-5">
        <div className="flex items-center justify-between w-full border-b border-b-grey-100 pb-4">
          <p className="text-lg font-medium text-grey-950">Order Activity</p>
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {isOpen ? (
              <ArrowUp2 color="#292D32" />
            ) : (
              <ArrowDown2 color="#292D32" />
            )}
          </button>
        </div>

        {isOpen && activity.length > 0 && (
          <div className="flex flex-col-reverse gap-5">
            {activity.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-b-grey-100 first:border-none pb-4"
              >
                <Checkbox
                  checked
                  className={`h-5 w-5 rounded-full border-2 ${item.isGrey
                    ? "bg-grey-100 border-grey-300 text-grey-300 data-[state=checked]:bg-grey-300 data-[state=checked]:border-grey-300"
                    : "bg-grey-100 border-primary-500 text-primary-600 data-[state=checked]:bg-grey-950 data-[state=checked]:border-grey-950"
                    }`}
                />
                <div
                  className={`flex flex-col gap-3 ${item.isGrey ? "text-grey-300" : "text-grey-950"}`}
                >
                  <h3 className="text-base font-medium">{item.date}</h3>
                  <p className="font-normal text-sm">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-grey-50 w-full p-6 rounded-lg flex flex-col gap-5 mb-10">
        {/* Product Information Table */}
        <p className="text-lg text-grey-950 font-medium">Product Information</p>
        <div className="rounded-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-grey-900 text-white">
              <tr>
                <th className="py-2 px-4 text-sm font-medium">Product</th>
                <th className="py-2 px-4 text-sm font-medium">Qty</th>
                <th className="py-2 px-4 text-sm font-medium">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[1, 2, 3, 4].map((_, i) => (
                <tr key={i} className="border-t last:border-b-none">
                  <td className="p-3 flex items-center gap-3">
                    <div className="w-14 h-14">
                      <img src={FilterImage} alt="product-img" className="h-full" />
                    </div>
                    <span className="text-sm font-medium text-grey-900">[Product Name]</span>
                  </td>
                  <td className="p-3 text-grey-900">x1</td>
                  <td className="p-3 text-grey-950">₦1,200,500</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 flex flex-col items-end gap-1 mt-8 border-b border-grey-100">
            <div className="w-[40%] flex flex-col gap-2">
              <p className="flex justify-between font-medium text-base text-grey-900">Subtotal <span className="text-grey-950">₦3,600,000</span></p>
              <p className="flex justify-between font-medium text-base text-grey-900">Delivery Fee <span className="text-grey-950">₦2,500</span></p>
              <p className="flex justify-between font-medium text-base text-grey-900">Total <span className="text-grey-950">₦1,202,500</span></p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="flex flex-col gap-4 py-4 border-b border-grey-100">
          <h2 className="font-semibold text-lg text-grey-950">Delivery Address</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <strong className="text-grey-900 font-medium text-sm">Name</strong>
              <p className="text-grey-700 text-sm font-normal">First name Last name</p>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="text-grey-900 font-medium text-sm">Address</strong>
              <p className="text-grey-700 text-sm font-normal">15B Adebayo Street, Lekki Phase 1, Lagos, Nigeria</p>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="text-grey-900 font-medium text-sm">Email Address</strong>
              <p className="text-grey-700 text-sm font-normal">Auto filled</p>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="text-grey-900 font-medium text-sm">Phone Number</strong>
              <p className="text-grey-700 text-sm font-normal">08123456789</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-4 py-4 border-b border-grey-100">
          <h2 className="font-semibold text-lg text-grey-950">Payment Method</h2>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-grey-700 text-sm font-normal">Bank Transfer</p>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="flex flex-col gap-4 py-4 border-b border-grey-100">
          <h2 className="font-semibold text-lg text-grey-950">Order Information</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <strong className="text-grey-900 font-medium text-sm">Order ID</strong>
              <p className="text-grey-700 text-sm font-normal">#12345678</p>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="text-grey-900 font-medium text-sm">Order Date</strong>
              <p className="text-grey-700 text-sm font-normal">May 28, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
