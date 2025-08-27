import React, { useState } from "react";
import {
    Trash,
    ArrowUp2,
    ArrowDown2,
    Gift,
    TruckFast,
    Card,
    Send2,
    ShoppingCart,
    TickCircle,
    InfoCircle,
    CloseCircle,
} from "iconsax-reactjs";

const CartModal = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Product Name", price: 1200000, qty: 1, available: true },
        { id: 2, name: "Second Product", price: 500000, qty: 2, available: true },
    ]);

    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showPoints, setShowPoints] = useState(false);

    if (!isOpen) return null;

    const incrementQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    const decrementQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.qty > 1
                    ? { ...item, qty: item.qty - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    const deliveryFee = cartItems.length > 0 ? 2500 : 0;
    const total = subtotal + deliveryFee;

    const canPay = cartItems.length > 0 && selectedPayment;

    const handlePay = () => {
        if (!canPay) return;
        setOrderPlaced(true); // show order placed modal first
    };

    return (
        <>
            {/* Cart Modal */}
            <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
                <div className="bg-white w-full max-w-sm h-screen shadow-lg flex flex-col gap-4 animate-slide-in px-4">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between py-6 px-4 border-b">
                        <h2 className="text-lg font-medium text-grey-950">Cart</h2>
                        <button
                            onClick={onClose}
                            className="text-grey-600 hover:text-grey-900 text-xl border-2 border-grey-950 rounded-full h-6 w-6 flex justify-center items-center"
                        >
                            ×
                        </button>
                    </div>

                    {/* Scrollable cart body */}
                    <div className="overflow-y-auto pr-2 pb-6 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        {/* Cart Items */}
                        <div className="flex flex-col">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-4 py-5 border-b border-b-grey-100"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-4 items-center">
                                            <div className="bg-grey-300 h-14 w-14 rounded-sm"></div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-medium text-grey-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-[11px] font-medium text-success-600">
                                                    {item.available ? "Available in stock" : "Out of stock"}
                                                </p>
                                            </div>
                                        </div>
                                        <h1 className="text-base font-medium">
                                            ₦{(item.price * item.qty).toLocaleString()}
                                        </h1>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div
                                            onClick={() => removeItem(item.id)}
                                            className="text-error-600 flex items-center gap-2 cursor-pointer"
                                        >
                                            <Trash size="16" />
                                            <p className="text-sm">Remove</p>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <div
                                                onClick={() => decrementQty(item.id)}
                                                className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium cursor-pointer"
                                            >
                                                -
                                            </div>
                                            <div className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium">
                                                {item.qty}
                                            </div>
                                            <div
                                                onClick={() => incrementQty(item.id)}
                                                className="p-2 bg-grey-50 rounded-sm h-10 w-10 text-center text-base text-grey-950 font-medium cursor-pointer"
                                            >
                                                +
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Delivery Address */} <div className="bg-[#F6F6F699] py-2 px-4 rounded-lg flex flex-col gap-4"> <div> <h1 className="text-base font-medium text-grey-950">Delivery Address</h1> </div> <div className="flex flex-col gap-3"> <div className="flex flex-col gap-1"> <h1 className="text-sm font-medium text-grey-900">Name</h1> <p className="text-xs font-light">[First name] [Last name]</p> </div> <div className="flex flex-col gap-1"> <h1 className="text-sm font-medium text-grey-900">Email Address</h1> <p className="text-xs font-light">[Auto filled]</p> </div> <div className="flex flex-col gap-1"> <h1 className="text-sm font-medium text-grey-900">Phone Number</h1> <p className="text-xs font-light">[08123456789]</p> </div> <div className="flex flex-col gap-1"> <h1 className="text-sm font-medium text-grey-900">Address</h1> <p className="text-xs font-light">[15B Adebayo Street, Lekki Phase 1, Lagos, Nigeria]</p> </div> </div> <div> <p className="text-sm font-normal text-primary-500 cursor-pointer">Change</p> </div> </div> {/* Delivery Date */} <div className="bg-[#F6F6F699] py-2 px-4 rounded-lg flex flex-col gap-4"> <div className="flex items-center justify-between"> <h1 className="text-base font-medium text-grey-950">Delivery Date</h1> <p className="text-xs font-light">[May 24 - May 30]</p> </div> </div>

                        {/* Summary */}
                        <div className="flex flex-col gap-3">
                            <div className="bg-[#F6F6F699] py-2 px-4 rounded-lg flex flex-col gap-4">
                                <h1 className="text-base font-medium text-grey-950">Summary</h1>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-medium text-grey-900">Subtotal</p>
                                        <p className="text-xs font-light">
                                            ₦{subtotal.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-medium text-grey-900">
                                            Delivery Fee
                                        </p>
                                        <p className="text-xs font-light">
                                            ₦{deliveryFee.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-grey-900">Total</p>
                                    <p className="text-xs font-light">
                                        ₦{total.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-[#F6F6F699] py-2 px-4 rounded-lg flex flex-col gap-4">
                                <div
                                    className="justify-between flex items-center cursor-pointer"
                                    onClick={() => setIsPaymentOpen((prev) => !prev)}
                                >
                                    <h1 className="text-base font-medium text-grey-950">
                                        Payment Method
                                    </h1>
                                    {isPaymentOpen ? (
                                        <ArrowUp2 size="16" color="#292D32" />
                                    ) : (
                                        <ArrowDown2 size="16" color="#292D32" />
                                    )}
                                </div>

                                {isPaymentOpen && (
                                    <div className="flex flex-col gap-2">
                                        {[
                                            { id: "bonus", label: "Bonus Points", icon: Gift },
                                            { id: "cod", label: "Cash on Delivery", icon: TruckFast },
                                            { id: "card", label: "Card Payment", icon: Card },
                                            { id: "bank", label: "Bank Transfer", icon: Send2 },
                                        ].map(({ id, label, icon: Icon }) => (
                                            <div
                                                key={id}
                                                onClick={() => setSelectedPayment(id)}
                                                className="bg-white rounded-full py-3 px-4 flex items-center justify-between w-full cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon color="#FDBF0C" variant="Bold" size="24" />
                                                    <p className="font-normal text-sm text-grey-900">
                                                        {label}
                                                    </p>
                                                </div>
                                                <input
                                                    type="radio"
                                                    checked={selectedPayment === id}
                                                    onChange={() => setSelectedPayment(id)}
                                                    className="h-5 w-5"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pay Button */}
                        <div>
                            <button
                                onClick={handlePay}
                                disabled={!canPay}
                                className={`w-full py-3 px-6 rounded-full text-base font-medium transition ${canPay
                                    ? "bg-yellow-400 text-grey-950 hover:bg-yellow-500"
                                    : "bg-grey-100 text-grey-300 cursor-not-allowed"
                                    }`}
                            >
                                Pay ₦{total.toLocaleString()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Placed Modal */}
            {orderPlaced && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl py-4 px-6 shadow-lg max-w-[481px] w-full flex flex-col text-center gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-success-100 text-success-600 h-12 w-12 flex items-center justify-center rounded-full">
                                <TickCircle variant="Bold" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-base font-medium">Order Placed!</h3>
                                <p className="text-grey-400 text-sm">
                                    Your order #12345678 has been placed successfully. We'll send
                                    you a confirmation email once it's confirmed.
                                </p>
                            </div>
                        </div>

                        {/* Shopping Points Section */}
                        <div className="flex flex-col items-center gap-2">
                            {/* Earned points always visible */}
                            <div className="flex items-center justify-center py-3 gap-3 bg-success-50 text-success-700 text-sm rounded-xl w-full">
                                <p>+[20] shopping points earned</p>
                                <InfoCircle
                                    variant="Bold"
                                    className="cursor-pointer"
                                    onClick={() => setShowPoints(true)} // toggle on click
                                />
                            </div>

                            {/* Explanation only visible when showPoints = true */}
                            {showPoints && (
                                <div className="flex justify-between text-grey-700">
                                    <p className="text-left text-xs w-[95%]">
                                        Shopping points are earned by verified indigenous Lagosians
                                        when they shop and can be used to purchase other items.
                                    </p>
                                    <CloseCircle
                                        size="20"
                                        className="w-5 cursor-pointer"
                                        onClick={() => setShowPoints(false)} // hide on click
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer buttons */}
                        <div className="flex items-center gap-4 w-full">
                            <button className="w-1/2 bg-primary-50 py-3 px-4 border border-primary-700 text-primary-700 text-base rounded-full">
                                View my points
                            </button>
                            <button className="w-1/2 bg-primary-500 py-3 px-4 border border-primary-500 text-white text-base rounded-full">
                                View my order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartModal;
