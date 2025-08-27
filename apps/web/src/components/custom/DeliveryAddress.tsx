import { ArrowDown2 } from "iconsax-reactjs";
import React, { useState } from "react";

const DeliveryAddress: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [lga, setLga] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);

  const isFormComplete = phone && stateValue && lga && email && address;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormComplete) {
      setSubmitted(true);
      setEditing(false);
    }
  };

  const handleChange = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 py-5 border-b border-b-grey-100">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium text-grey-950">Delivery Address</h1>
        {submitted && !editing && (
          <div
            onClick={handleChange}
            className="flex items-center gap-2 text-xs text-primary-600 cursor-pointer"
          >
            Change
            <ArrowDown2 size="16"/>
          </div>
        )}
      </div>

      {!submitted || editing ? (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-white text-grey-950 rounded-full border border-grey-100 placeholder:text-grey-300"
            placeholder="Phone Number"
          />
          <div className="gap-2 flex items-center">
            <input
              type="text"
              value={stateValue}
              onChange={(e) => setStateValue(e.target.value)}
              className="w-full p-3 bg-white text-grey-950 rounded-full border border-grey-100 placeholder:text-grey-300"
              placeholder="State"
            />
            <input
              type="text"
              value={lga}
              onChange={(e) => setLga(e.target.value)}
              className="w-full p-3 bg-white text-grey-950 rounded-full border border-grey-100 placeholder:text-grey-300"
              placeholder="LGA"
            />
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white text-grey-950 rounded-full border border-grey-100 placeholder:text-grey-300"
            placeholder="[Email Auto filled]"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 bg-white text-grey-950 rounded-full border border-grey-100 placeholder:text-grey-300"
            placeholder="Address"
          />

          {!submitted ? (
            <button
              type="submit"
              disabled={!isFormComplete}
              className={`rounded-full py-3 px-6 font-normal text-base ${
                isFormComplete
                  ? "bg-primary-500 text-white"
                  : "bg-grey-200 text-grey-400 cursor-not-allowed"
              }`}
            >
              Save Address
            </button>
          ) : (
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-primary-50 border border-primary-600 text-primary-700 rounded-full w-1/2 py-3 px-6 font-normal text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormComplete}
                className={`rounded-full w-1/2 py-3 px-6 font-normal text-base ${
                  isFormComplete
                    ? "bg-primary-500 text-white"
                    : "bg-grey-200 text-grey-400 cursor-not-allowed"
                }`}
              >
                Update
              </button>
            </div>
          )}
        </form>
      ) : (
        <div>
          <p className="text-grey-700 text-sm">
            {address}, {lga}, {stateValue}.{phone},{email}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
