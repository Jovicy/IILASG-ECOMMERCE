import React, { useEffect, useState } from "react";
import {
  Send2,
  ExportCurve,
  ImportCurve,
  Calendar2,
  TrendUp,
  Edit,
  CloseSquare,
  TickCircle,
  Image,
  ArrowUp2,
  SearchNormal1,
} from "iconsax-reactjs";

// Popular Nigerian Banks
const banks = [
  "Access Bank",
  "Zenith Bank",
  "First Bank",
  "UBA",
  "GTBank",
  "Fidelity Bank",
  "Ecobank",
  "Union Bank",
  "Polaris Bank",
  "Stanbic IBTC",
  "Sterling Bank",
  "Wema Bank",
  "Keystone Bank",
];

// Card Component
const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  variant,
  className,
}: any) => (
  <div
    className={`bg-grey-50 border border-grey-50 shadow-sm rounded-lg p-4 flex flex-col justify-between ${className ?? ""
      }`}
  >
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-sm text-grey-600">{title}</h3>
      <div
        className={`bg-white h-12 w-12 p-2 rounded-full flex items-center justify-center ${iconColor}`}
      >
        <Icon size="24" variant={variant} />
      </div>
    </div>
    <div className="flex items-center justify-between gap-3">
      <p className="text-[32px] font-medium text-grey-950">{value}</p>
      {subtitle && (
        <p className="text-sm text-grey-900 font-normal underline cursor-pointer">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const EarningsPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Bank modal states
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  // Payout Modal States
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isWithdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);

  // Dropdown state
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // OTP states
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const filteredBanks = banks.filter((b) =>
    b.toLowerCase().includes(search.toLowerCase())
  );

  // handle sending OTP
  const handleSendOtp = () => {
    setOtpSent(true);
    setTimer(60); // start 1-minute countdown
  };

  // countdown effect
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Mock Stats
  const mockStats = [
    {
      title: "Total Earnings (This Month)",
      value: "₦120,000",
      subtitle: "",
      icon: ImportCurve,
      iconColor: "text-success-600",
      variant: "Bold",
    },
    {
      title: "Available for Withdrawal",
      value: "₦110,000",
      subtitle: "",
      icon: ExportCurve,
      iconColor: "text-grey-700",
      variant: "Bold",
    },
    {
      title: "Pending Payouts",
      value: "12",
      subtitle: "",
      icon: Calendar2,
      iconColor: "text-primary-600",
      variant: "Bold",
    },
    {
      title: "Growth Rate",
      value: "+12%",
      subtitle: "",
      icon: TrendUp,
      iconColor: "text-success-600",
      variant: "Bold",
    },
  ];

  // Mock Earnings
  const earnings = [
    { id: 1, date: "2025-08-15", payoutId: "#0001", amount: "₦20,000", status: "Pending" },
    { id: 2, date: "2025-08-10", payoutId: "#0002", amount: "₦15,000", status: "Active" },
    { id: 3, date: "2025-08-07", payoutId: "#0003", amount: "₦15,000", status: "Active" },
    { id: 4, date: "2025-08-05", payoutId: "#0004", amount: "₦15,000", status: "Active" },
  ];

  const filteredEarnings = earnings.filter((earning) => {
    if (activeTab === "All") return true;
    if (activeTab === "Paid") return earning.status === "Active";
    if (activeTab === "Pending") return earning.status === "Pending";
    return true;
  });

  const isFormFilled = bank && accountNumber && accountName && otp;

  return (
    <div className="w-full">
      {/* Header */}
      <section className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">Sales & Earnings</h1>
          <p className="text-grey-500 text-sm font-normal">
            Track your sales performance and manage payouts
          </p>
        </div>
        <button
          className="bg-primary-500 rounded-full flex gap-2 items-center text-white text-base font-normal py-3 px-6"
          onClick={() => setIsPayoutModalOpen(true)}
        >
          <Send2 />
          <p>Request Payout</p>
        </button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <DashboardCard
            key={index}
            {...stat}
            className="col-span-1 h-[175px]"
          />
        ))}
      </div>

      {/* Bank Information */}
      <div className="w-full bg-grey-50 rounded-lg p-4 flex flex-col gap-10">
        <div className="gap-3 flex items-center">
          <div className="bg-white text-grey-900 h-12 w-12 p-2 rounded-full flex items-center justify-center">
            <TrendUp size="20" />
          </div>
          <h3 className="text-sm text-grey-600 font-semibold">
            Payout Settings
          </h3>
        </div>
        <div className="bg-white w-full rounded-sm py-3 px-4 flex justify-between items-center">
          <div className="flex-col flex gap-2 text-sm text-grey-600">
            <p>{bank || "[Bank Name]"}</p>
            <p>{accountNumber || "[Account Number]"}</p>
          </div>
          <div>
            <button
              className="flex gap-2 items-center text-grey-900 text-sm"
              onClick={() => setIsBankModalOpen(true)}
            >
              <Edit />
              <p className="underline">Edit Bank Information</p>
            </button>
          </div>
        </div>
      </div>

      {/* Earning History */}
      <div className="flex flex-col gap-4 mt-8">
        <div className="w-full bg-grey-50 py-5 px-6 rounded-t-lg flex justify-between items-center">
          <h1 className="text-lg text-grey-950">Earning History</h1>
          <div className="flex gap-6 text-sm font-normal">
            {["All", "Paid", "Pending"].map((tab) => (
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
        </div>

        {/* Table */}
        <table className="min-w-full text-sm text-left">
          <thead className="bg-grey-900 text-white font-medium text-sm capitalize">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Payout ID</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-grey-50 text-grey-700">
            {filteredEarnings.map((earning) => (
              <tr key={earning.id} className="border-t border-grey-200">
                <td className="px-6 py-5">{earning.date}</td>
                <td className="px-6 py-5">{earning.payoutId}</td>
                <td className="px-6 py-5">{earning.amount}</td>
                <td className="px-6 py-5">
                  {earning.status === "Active" ? (
                    <span className="text-green-600 bg-green-100 text-xs px-2 py-0.5 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="text-yellow-600 bg-yellow-100 text-xs px-2 py-0.5 rounded">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bank Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-[748px]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-grey-950">Bank Information</h2>
              <button onClick={() => setIsBankModalOpen(false)}>
                <CloseSquare size={20} color="#4E4E4E" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Bank Select */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm text-grey-800">Bank Name *</label>
                <div
                  onClick={() => setOpen(!open)}
                  className="w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2 flex justify-between items-center cursor-pointer"
                >
                  <span>{bank || "Select bank"}</span>
                  <span className="text-grey-500"><ArrowUp2 /></span>
                </div>

                {/* Dropdown */}
                {open && (
                  <div className="absolute mt-1 w-full bg-white border border-grey-100 rounded-md shadow-md max-h-60 overflow-y-auto z-50">
                    {/* Search */}
                    <div className="p-2 relative">
                      <SearchNormal1 size="16" className="absolute left-3.5 top-1/2 -translate-y-1/2" color="#706A6B" />
                      <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-grey-200 rounded-md pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-0"
                      />
                    </div>

                    {/* Bank List */}
                    <ul className="flex flex-col">
                      {filteredBanks.map((b, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setBank(b);
                            setOpen(false);
                            setSearch("");
                          }}
                          className="flex items-center gap-2 p-3 cursor-pointer hover:bg-grey-50"
                        >
                          <div className="bg-grey-50 rounded-full w-10 h-10 flex justify-center items-center">
                            <Image size={18} className="text-grey-600" />
                          </div>
                          <span className="text-sm text-grey-800">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Account Number */}
              {bank && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-grey-800">
                    Account Number *
                  </label>
                  <input
                    type="number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2"
                    placeholder="Enter Account Number"
                  />
                </div>
              )}

              {/* Account Name */}
              {accountNumber && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-grey-800">Account Name *</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2"
                    placeholder="[Olugbade Michael]"
                  />
                </div>
              )}

              {/* OTP */}
              {accountName && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-grey-800">OTP *</label>
                  <div className="flex justify-between w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="border-none w-[65%] focus:outline-none focus:ring-0"
                      placeholder="000000"
                    />
                    {otpSent ? (
                      <button
                        disabled={timer > 0}
                        onClick={handleSendOtp}
                        className={`text-sm w-[35%] text-end ${timer > 0
                          ? "text-grey-400 cursor-not-allowed"
                          : "text-primary-600"
                          }`}
                      >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                      </button>
                    ) : (
                      <button
                        onClick={handleSendOtp}
                        className="text-primary-600 text-end text-sm w-[35%]"
                      >
                        Send OTP to email
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {isFormFilled && (
              <div className="flex justify-end gap-5">
                <button
                  className="bg-transparent text-sm font-normal text-grey-600"
                  onClick={() => setIsBankModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 rounded-full text-base bg-primary-500 text-white"
                  onClick={() => {
                    setIsBankModalOpen(false);
                    setIsSuccessModalOpen(true);
                  }}
                >
                  Save Bank Information
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-6 w-[481px] text-center">
            <div className="bg-success-100 rounded-full w-12 h-12 flex items-center justify-center">
              <TickCircle size="20" color="#00BD59" variant="Bold" />
            </div>
            <h2 className="text-lg font-medium text-[#202020]">
              Updates Saved Successfully
            </h2>
            <button
              className="text-sm bg-transparent text-grey-500"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-[625px]">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium text-grey-950">Withdraw Your Earnings</h2>
                <p className="text-grey-600 text-sm font-normal w-[373px]">Enter the amount you’d like to withdraw. You can withdraw any amount up to your available balance.</p>
              </div>
              <button onClick={() => setIsPayoutModalOpen(false)}>
                <CloseSquare size={20} color="#4E4E4E" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Withdraw Amount */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-grey-800">Withdraw Amount *</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2"
                  placeholder="₦"
                />
              </div>

              {/* OTP Field (appears if amount entered) */}
              {withdrawAmount && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-grey-800">OTP *</label>
                  <div className="flex justify-between w-full border border-grey-100 text-grey-800 rounded-full px-3 py-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="border-none w-[65%] focus:outline-none focus:ring-0"
                      placeholder="000000"
                    />
                    {otpSent ? (
                      <button
                        disabled={timer > 0}
                        onClick={handleSendOtp}
                        className={`text-sm w-[35%] text-end ${timer > 0 ? "text-grey-400 cursor-not-allowed" : "text-primary-600"
                          }`}
                      >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP to email"}
                      </button>
                    ) : (
                      <button
                        onClick={handleSendOtp}
                        className="text-primary-600 text-end text-sm w-[35%]"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            {withdrawAmount && otp && (
              <div className="flex justify-end gap-5">
                <button
                  className="bg-transparent text-sm font-normal text-grey-600"
                  onClick={() => setIsPayoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 rounded-full text-base bg-primary-500 text-white"
                  onClick={() => {
                    setIsPayoutModalOpen(false);
                    setIsWithdrawSuccessOpen(true);
                  }}
                >
                  Withdraw Amount
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Withdrawal Success Modal */}
      {isWithdrawSuccessOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-6 w-[420px] text-center">
            <div className="bg-success-100 rounded-full w-12 h-12 flex items-center justify-center">
              <TickCircle size="20" color="#00BD59" variant="Bold" />
            </div>
            <h2 className="text-lg font-medium text-[#202020]">
              Withdrawal Request Submitted 🎉Your payout of {withdrawAmount ? `₦${Number(withdrawAmount).toLocaleString()}` : "₦0"} will be processed shortly.
            </h2>
            <button
              className="text-sm bg-transparent text-grey-500"
              onClick={() => setIsWithdrawSuccessOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningsPage;