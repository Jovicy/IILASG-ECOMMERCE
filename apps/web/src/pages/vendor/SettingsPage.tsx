import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Image, Camera, Eye, EyeSlash } from "iconsax-reactjs";
import SealCheck from "../../assets/icons/sealCheck.svg";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // separate toggles for working hours and shipping
  const [workingHours, setWorkingHours] = useState(
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(() => ({
      enabled: true,
      start: "09:00",
      end: "18:00",
    }))
  );

  const [shippingOptions, setShippingOptions] = useState([
    { name: "Home Delivery", enabled: true },
    { name: "Pickup from store", enabled: false },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { value: "profile", label: "Profile" },
    { value: "store", label: "Store & Business Info" },
    { value: "hours", label: "Working Hours" },
    { value: "shipping", label: "Shipping" },
    { value: "verification", label: "Indigene Verification" },
    { value: "security", label: "Account Security" },
    { value: "policies", label: "Policies" },
  ];

  // Toggle handler for each working day
  const toggleWorkingDay = (index: number) => {
    const updated = [...workingHours];
    updated[index].enabled = !updated[index].enabled;
    setWorkingHours(updated);
  };

  // Update start/end time
  const updateTime = (index: number, field: "start" | "end", value: string) => {
    const updated = [...workingHours];
    updated[index][field] = value;
    setWorkingHours(updated);
  };

  // Toggle for shipping options
  const toggleShipping = (index: number) => {
    const updated = [...shippingOptions];
    updated[index].enabled = !updated[index].enabled;
    setShippingOptions(updated);
  };

  return (
    <div className="w-full h-auto">
      <h2 className="text-xl font-semibold text-grey-950 mb-6">Settings</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs Header */}
        <div className="flex items-center justify-between w-full mb-4">
          <TabsList className="p-0 gap-3 shadow-none bg-transparent">
            {tabs.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="bg-transparent shadow-none text-sm font-normal text-grey-900 pb-3 rounded-none border-b-2
                  data-[state=active]:border-b-primary-500 data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  cursor-pointer">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] p-6 rounded-lg flex w-full flex-wrap gap-4 justify-between">
              {[
                { label: "First Name *", type: "text", placeholder: "First Name" },
                { label: "Last Name *", type: "text", placeholder: "Last Name" },
                { label: "Email *", type: "email", placeholder: "Email Address" },
                { label: "Phone Number *", type: "tel", placeholder: "08123456789" },
                { label: "Date of Birth (optional)", type: "date" },
              ].map((field, i) => (
                <div key={i} className="w-[49%] flex flex-col gap-1">
                  <label className="text-xs text-[#4E4E4E]">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder || ""} className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 text-sm" />
                </div>
              ))}

              {/* Gender Field */}
              <div className="w-[49%] flex flex-col gap-1">
                <label className="text-xs text-[#4E4E4E]">Gender (optional)</label>
                <select className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 text-sm">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-yellow-500 text-white py-3 px-6 rounded-full text-base font-normal">Save Changes</button>
            </div>
          </div>
        </TabsContent>

        {/* STORE TAB */}
        <TabsContent value="store">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex flex-col gap-6">
              {/* Upload Logo */}
              <label className="cursor-pointer flex items-center gap-3" htmlFor="store-image">
                <div className="bg-[#E6E6E6] rounded-lg h-24 w-24 flex justify-center items-center overflow-hidden">
                  {uploadedImage ? <img src={uploadedImage} alt="Preview" className="object-cover h-full w-full rounded-md" /> : <Image size="32" color="#292D32" variant="Bold" />}
                </div>

                <div className="flex gap-2 items-center text-sm text-primary-600">
                  <Camera size="16" />
                  <p>Upload store logo</p>
                </div>

                <input id="store-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {/* Store Info Fields */}
              <div className="flex w-full flex-wrap gap-4 justify-between items-end">
                {[
                  { label: "Store Name *", placeholder: "Sammy Fashion Store" },
                  { label: "Business Name *", placeholder: "Sammy Wears" },
                  { label: "Business Phone Number *", placeholder: "08123456789" },
                  { label: "CAC Registration Number (optional)", placeholder: "01234567" },
                ].map((f, i) => (
                  <div key={i} className="w-[49%] flex flex-col gap-1">
                    <label className="text-[#4E4E4E] text-xs font-normal">{f.label}</label>
                    <input
                      type="text"
                      className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-primary-500 py-3 px-6 rounded-full text-white text-base font-normal cursor-pointer">Save Changes</button>
            </div>
          </div>
        </TabsContent>

        {/* WORKING HOURS */}
        <TabsContent value="hours">
          <div className="flex flex-col gap-8">
            <div className="p-6 w-2/5 bg-[#F6F6F6] rounded-lg flex flex-col gap-5">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className="flex justify-between items-center">
                  <p>{day}</p>
                  <div className="flex items-center gap-6">
                    <input type="time" value={workingHours[i].start} onChange={(e) => updateTime(i, "start", e.target.value)} className="bg-white border border-grey-200 rounded-xl p-2 text-sm w-24" />
                    <p>to</p>
                    <input type="time" value={workingHours[i].end} onChange={(e) => updateTime(i, "end", e.target.value)} className="bg-white border border-grey-200 rounded-xl p-2 text-sm w-24" />
                  </div>

                  {/* Toggle */}
                  <div
                    onClick={() => toggleWorkingDay(i)}
                    className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${workingHours[i].enabled ? "bg-grey-900" : "bg-gray-300"}`}>
                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${workingHours[i].enabled ? "translate-x-6" : "translate-x-0"}`}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button className="bg-yellow-500 text-white py-3 px-6 rounded-full text-base font-normal">Save Changes</button>
            </div>
          </div>
        </TabsContent>

        {/* SHIPPING */}
        <TabsContent value="shipping">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              {shippingOptions.map((option, i) => (
                <div key={i} className="p-6 bg-[#F6F6F6] rounded-lg flex gap-6 items-center">
                  <div
                    onClick={() => toggleShipping(i)}
                    className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${option.enabled ? "bg-grey-900" : "bg-gray-300"}`}>
                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${option.enabled ? "translate-x-6" : "translate-x-0"}`}></div>
                  </div>
                  <p className="text-grey-500 text-lg font-medium">{option.name}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button className="bg-yellow-500 text-white py-3 px-6 rounded-full text-base font-normal">Save Changes</button>
            </div>
          </div>
        </TabsContent>

        {/* OTHER TABS */}
        <TabsContent value="verification">
          <div className="py-5 px-4 bg-[#F6F6F6] rounded-lg flex flex-col gap-6 relative">
            {(() => {
              const [isOpen, setIsOpen] = React.useState(false);
              const [selectedLGA, setSelectedLGA] = React.useState("");
              const [verificationStatus, setVerificationStatus] = React.useState<"not_verified" | "in_progress" | "verified">("not_verified");

              const lagosLGAs = [
                "Agege",
                "Ajeromi-Ifelodun",
                "Alimosho",
                "Amuwo-Odofin",
                "Apapa",
                "Badagry",
                "Epe",
                "Eti-Osa",
                "Ibeju-Lekki",
                "Ifako-Ijaiye",
                "Ikeja",
                "Ikorodu",
                "Kosofe",
                "Lagos Island",
                "Lagos Mainland",
                "Mushin",
                "Ojo",
                "Oshodi-Isolo",
                "Shomolu",
                "Surulere",
              ];

              const handleSubmit = () => {
                if (!selectedLGA) {
                  alert("Please select your LGA before submitting.");
                  return;
                }

                // Step 1: Change to "in progress"
                setVerificationStatus("in_progress");

                // Step 2: After 3 seconds, change to "verified"
                setTimeout(() => {
                  setVerificationStatus("verified");
                }, 3000);
              };

              const renderStatusButton = () => {
                switch (verificationStatus) {
                  case "not_verified":
                    return <button className="py-3 px-6 bg-error-50 border border-error-600 rounded-full text-error-600 font-normal text-base">Not Verified</button>;
                  case "in_progress":
                    return (
                      <button className="py-3 px-6 bg-yellow-50 border border-yellow-600 rounded-full text-yellow-700 font-normal text-base flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin text-yellow-600" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Verification in Progress
                      </button>
                    );
                  case "verified":
                    return (
                      <button className="py-3 px-6 bg-success-50 border border-success-600 rounded-full text-success-700 font-normal text-base flex items-center gap-2">
                        <div>
                          <img src={SealCheck} className="h-5" />
                        </div>
                        You are a verified Indigene!
                      </button>
                    );
                }
              };

              return (
                <>
                  {/* Status Section */}
                  <div className="border-b border-b-grey-100 pb-4 flex items-center gap-6">
                    <p>Current Status:</p>
                    {renderStatusButton()}
                  </div>

                  {/* LGA Dropdown */}
                  <div className="flex flex-col gap-2 w-[318px] relative">
                    <label className="text-grey-500 text-sm">What Local Government Area are you from?</label>

                    <div className="relative">
                      {/* Input-like button */}
                      <div onClick={() => setIsOpen(!isOpen)} className="bg-white border border-grey-100 rounded-full py-2 px-3 text-gray-700 cursor-pointer flex justify-between items-center">
                        <span>{selectedLGA || "Select LGA"}</span>
                        <span className="text-gray-400 text-xs">▼</span>
                      </div>

                      {/* Dropdown list */}
                      {isOpen && (
                        <div className="absolute top-[44px] left-0 w-full bg-white border border-grey-100 rounded-lg shadow-md z-10 overflow-y-auto" style={{ maxHeight: "276px" }}>
                          {lagosLGAs.map((lga) => (
                            <div
                              key={lga}
                              onClick={() => {
                                setSelectedLGA(lga);
                                setIsOpen(false);
                              }}
                              className="px-4 py-2 hover:bg-yellow-50 cursor-pointer text-sm">
                              {lga}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="bg-yellow-500 text-white py-3 px-6 rounded-full text-base font-normal"
                      disabled={verificationStatus === "in_progress" || verificationStatus === "verified"}>
                      Submit for verification
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex flex-col gap-6">
              <label className="cursor-pointer flex items-center gap-3" htmlFor="forum-image">
                {/* Image Preview or Placeholder */}
                <div className="bg-[#E6E6E6] rounded-lg h-24 w-24 flex justify-center items-center overflow-hidden">
                  {uploadedImage ? <img src={uploadedImage} alt="Preview" className="object-cover h-full w-full rounded-md" /> : <Image size="32" color="#292D32" variant="Bold" />}
                </div>

                {/* Upload Text */}
                <div className="flex gap-2 items-center text-sm text-primary-600">
                  <Camera size="16" />
                  <p>Upload profile picture</p>
                </div>

                {/* Hidden File Input */}
                <input id="forum-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              <div className="flex w-full flex-wrap gap-4 justify-between items-end">
                {/* Current Password */}
                <div className="w-[49%] flex flex-col gap-1">
                  <label htmlFor="currentPassword" className="text-[#4E4E4E] text-xs font-normal">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Enter your current password"
                  />
                </div>

                <div className="w-[49%] flex flex-col gap-1"></div>

                {/* Create New Password */}
                <div className="w-[49%] flex flex-col gap-1 relative">
                  <label htmlFor="newPassword" className="text-[#4E4E4E] text-xs font-normal">
                    Create New Password
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 pr-10 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Create a new password"
                  />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-9 text-grey-500">
                    {showNewPassword ? <EyeSlash size="18" /> : <Eye size="18" />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="w-[49%] flex flex-col gap-1 relative">
                  <label htmlFor="confirmPassword" className="text-[#4E4E4E] text-xs font-normal">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 pr-10 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Re-enter password"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9 text-grey-500">
                    {showConfirmPassword ? <EyeSlash size="18" /> : <Eye size="18" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button className="bg-primary-500 py-3 px-6 rounded-full text-white text-base font-normal cursor-pointer">Update Password</button>
            </div>
          </div>
        </TabsContent>

        {/* Policies */}
        <TabsContent value="policies">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label>Return & Policy</label>
                <textarea
                  placeholder="We accept returns within 7 days of delivery. Items must be in original condition with tags attached. Refunds will be processed within 3-5 business days."
                  className="bg-white border border-grey-100 py-2 px-3 rounded-2xl h-[77px]"></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="bg-primary-500 py-3 px-6 rounded-full text-white text-base font-normal cursor-pointer">Update Policies</button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
