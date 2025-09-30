import React, { useState } from "react";
import { Add, CloseSquare, Edit, TickCircle, Trash } from "iconsax-reactjs";
import { MoreVertical } from "lucide-react";

const initialCoupons = [
  { code: "SAVE20", discount: "20%", expiry: "2025-09-15", timesUsed: "15 times", status: "Active" },
  { code: "NEWCUSTOMER", discount: "15%", expiry: "2025-09-12", timesUsed: "8 times", status: "Active" },
  { code: "YTsub10", discount: "10%", expiry: "2025-09-12", timesUsed: "25 times", status: "Inactive" },
];

const PromotionPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Popover state
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);

  // Form states
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null); // track if editing

  // Coupons state
  const [coupons, setCoupons] = useState(initialCoupons);

  // Form validity
  const isFormValid =
    couponCode.trim() !== "" && discount.trim() !== "" && expiryDate.trim() !== "";

  // Filtered coupons
  const filteredCoupons = coupons.filter((coupon) => {
    if (activeTab === "All") return true;
    return coupon.status === activeTab;
  });

  // Create or Update coupon
  const handleSaveCoupon = () => {
    if (!isFormValid) return;

    const normalizedDiscount = discount.trim().endsWith("%")
      ? discount.trim()
      : `${discount.trim()}%`;

    const newCoupon = {
      code: couponCode.trim(),
      discount: normalizedDiscount,
      expiry: expiryDate,
      timesUsed: editingIndex !== null ? coupons[editingIndex].timesUsed : "0 times",
      status: isActive ? "Active" : "Inactive",
    };

    if (editingIndex !== null) {
      // update existing coupon
      const updatedCoupons = [...coupons];
      updatedCoupons[editingIndex] = newCoupon;
      setCoupons(updatedCoupons);
      setEditingIndex(null);
    } else {
      // add new coupon
      setCoupons((prev) => [newCoupon, ...prev]);
      setIsSuccessOpen(true);
    }

    setIsModalOpen(false);
    setCouponCode("");
    setDiscount("");
    setExpiryDate("");
    setIsActive(true);
  };

  // Delete coupon
  const handleDelete = (idx) => {
    setCoupons((prev) => prev.filter((_, i) => i !== idx));
    setOpenPopoverIndex(null);
  };

  // Edit coupon
  const handleEdit = (idx) => {
    const coupon = coupons[idx];
    setCouponCode(coupon.code);
    setDiscount(coupon.discount.replace("%", ""));
    setExpiryDate(coupon.expiry);
    setIsActive(coupon.status === "Active");
    setEditingIndex(idx);
    setIsModalOpen(true);
    setOpenPopoverIndex(null);
  };

  return (
    <div className="w-full">
      {/* Intro */}
      <section className="flex flex-col gap-1 mb-6">
        <h1 className="text-lg font-medium text-grey-950">Promotions</h1>
        <p className="text-sm text-grey-500 font-normal">
          Create and manage discount coupons
        </p>
      </section>

      <div className="flex flex-col gap-4 mt-8">
        {/* Tabs + Create */}
        <div className="w-full bg-grey-50 py-4 px-6 rounded-lg flex justify-between items-center">
          <div className="flex gap-6 text-sm font-normal">
            {["All", "Active", "Inactive"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 ${activeTab === tab
                    ? "text-grey-900 border-b-2 border-primary-500"
                    : "text-grey-500"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            className="text-sm font-normal text-yellow-600 flex gap-2 items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <Add />
            Create Coupon
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full text-sm text-left">
          <thead className="bg-grey-900 text-white font-medium text-sm capitalize">
            <tr>
              <th className="py-3 px-6">Coupon Code</th>
              <th className="py-3 px-6">Discount</th>
              <th className="py-3 px-6">Expiry Date</th>
              <th className="py-3 px-6">Times Used</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>

          <tbody className="divide-y bg-grey-50 text-grey-700">
            {filteredCoupons.map((coupon, idx) => (
              <tr key={idx} className="border-b last:border-b-0 relative">
                <td className="py-5 px-6">{coupon.code}</td>
                <td className="py-5 px-6">{coupon.discount}</td>
                <td className="py-5 px-6">{coupon.expiry}</td>
                <td className="py-5 px-6">{coupon.timesUsed}</td>
                <td className="py-5 px-6">
                  <span
                    className={`w-14 px-2 py-1 rounded-sm text-xs font-medium ${coupon.status === "Active"
                        ? "bg-success-50 text-success-700"
                        : "bg-error-50 text-error-700"
                      }`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className="py-5 px-6 text-right relative">
                  <button
                    className="text-grey-700"
                    onClick={() =>
                      setOpenPopoverIndex(openPopoverIndex === idx ? null : idx)
                    }
                  >
                    <MoreVertical size={20} />
                  </button>

                  {/* Popover */}
                  {openPopoverIndex === idx && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-grey-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-grey-700"
                      >
                        <Edit size="16" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error-600"
                      >
                        <Trash size="16" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-[764px]">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium text-grey-950">
                  {editingIndex !== null ? "Edit Coupon" : "Create New Coupon"}
                </h2>
                <p className="text-grey-600 text-sm font-normal w-[373px]">
                  {editingIndex !== null
                    ? "Update the coupon details"
                    : "Set up a new discount coupon for your customers"}
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)}>
                <CloseSquare size={20} color="#4E4E4E" />
              </button>
            </div>

            {/* Coupon Code */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-grey-800">Coupon Code *</label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="e.g SAVE20"
                className="w-full border border-grey-100 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-0"
              />
            </div>

            {/* Discount */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-grey-800">Discount Percentage *</label>
              <div className="flex items-center border border-grey-100 rounded-full px-3 py-2">
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="e.g 20"
                  className="flex-1 border-none focus:outline-none focus:ring-0 text-sm"
                />
                <span className="text-grey-800">%</span>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-grey-800">Expiry Date *</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isActive ? "bg-primary-500" : "bg-grey-900"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-grey-50 transition ${isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
              <label className="text-sm text-grey-800">Active</label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm text-grey-600"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCoupon}
                disabled={!isFormValid}
                className={`px-6 py-3 text-base font-normal text-white rounded-full ${isFormValid
                    ? "bg-primary-500"
                    : "bg-grey-100 cursor-not-allowed"
                  }`}
              >
                {editingIndex !== null ? "Update Coupon" : "Create Coupon"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-6 w-[480px] text-center">
            <div className="bg-success-100 rounded-full w-12 h-12 flex items-center justify-center">
              <TickCircle size="20" color="#00BD59" variant="Bold" />
            </div>
            <h2 className="text-lg font-medium text-[#202020]">
              Coupon Created Successfully
            </h2>
            <button
              className="text-sm bg-transparent text-grey-500"
              onClick={() => setIsSuccessOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionPage;