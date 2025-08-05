import { useState } from "react";
import { Eye, EyeSlash, Gift } from "iconsax-reactjs";
import { pointsRecord } from "@/data/database";

const PointsPage = () => {
  const [showBalance, setShowBalance] = useState(true);

  const toggleVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-grey-950 mb-6">My Shopping Points</h2>

      <div className="w-full mb-6">
        <div
          className="w-[630px] h-[210px] rounded-xl p-6 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #00BD59 0%, #005729 100%)",
          }}
        >
          {/* Icon and Conversion Info */}
          <div className="flex items-center gap-4 text-lg font-medium">
            <div className="bg-success-50 p-3 rounded-2xl">
              <Gift size="24" color="#00BD59" />
            </div>
            <span>1 point = ₦100</span>
          </div>

          {/* Balance */}
          <div className="bottom-0 absolute pb-5">
            <p className="text-sm text-success-50 mb-1">Available Balance</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium">
                {showBalance ? "0 points = ₦0.00" : "***"}
              </p>
              <button onClick={toggleVisibility}>
                {showBalance ? (
                  <Eye size="16" color="white" />
                ) : (
                  <EyeSlash size="16" color="white" />
                )}
              </button>
            </div>
          </div>

          {/* Background Gift Icon */}
          <div className="absolute right-4 top-10 text-white opacity-60 pointer-events-none">
            <Gift size="222" color="#01A652" />
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-grey-50 rounded-xl h-[604px] p-6 overflow-y-auto scrollbar-hide">
        <h2 className="text-lg font-normal text-grey-600 mb-6">Points History</h2>

        {pointsRecord.length === 0 ? (
          <section className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-grey-100 rounded-full p-6">
                <Gift size="64" color="#B0B0B0" />
              </div>
              <p className="text-grey-900 font-normal text-lg">
                You have no shopping points record
              </p>
              <p className="text-grey-400 font-normal text-sm">
                Verify your indigenous status and shop to earn points
              </p>
            </div>
          </section>
        ) : (
          <div className="flex flex-col gap-4">
            {pointsRecord.map((record, index) => (
              <div
                key={index}
                className="pb-4 border-b border-b-grey-100 last:border-none flex items-center justify-between"
              >
                <div className="flex gap-3 items-center">
                  <div className="bg-primary-500 p-3 rounded-2xl text-white">
                    <Gift />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base text-grey-900 font-medium">
                      {record.description}
                    </p>
                    <p className="text-xs font-normal text-grey-600">
                      {record.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <p
                    className={`text-sm font-medium ${
                      record.points < 0
                        ? "text-error-600"
                        : "text-success-700"
                    }`}
                  >
                    {showBalance
                      ? record.points > 0
                        ? `+${record.points}`
                        : record.points
                      : "***"}
                  </p>
                  <p className="bg-white rounded-full px-2 text-xs font-normal">
                    {showBalance ? record.remaining : "***"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsPage;
