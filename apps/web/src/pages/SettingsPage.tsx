import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SealTick from "@/assets/seal.svg"
import { Image, Camera, Eye, EyeSlash, Clock } from "iconsax-reactjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  const [enabled, setEnabled] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

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
    { value: "security", label: "Account Security" },
    { value: "verification", label: "Indigene Verification" },
    { value: "notifications", label: "Notifications" },
  ];

  return (
    <div className="w-full h-auto">
      <h2 className="text-xl font-semibold text-grey-950 mb-6">Settings</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <TabsList className="p-0 gap-3 shadow-none bg-transparent">
            {tabs.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="bg-transparent shadow-none text-sm font-normal text-grey-900 pb-3 rounded-none border-b-2 data-[state=active]:border-b-primary-500 data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab contents use same spacing style as ForumsPage */}
        <TabsContent value="profile" className="">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex flex-col gap-6">
              <label
                className="cursor-pointer flex items-center gap-3"
                htmlFor="forum-image"
              >
                {/* Image Preview or Placeholder */}
                <div className="bg-[#E6E6E6] rounded-lg h-24 w-24 flex justify-center items-center overflow-hidden">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-md"
                    />
                  ) : (
                    <Image size="32" color="#292D32" variant="Bold" />
                  )}
                </div>

                {/* Upload Text */}
                <div className="flex gap-2 items-center text-sm text-primary-600">
                  <Camera size="16" />
                  <p>Upload profile picture</p>
                </div>

                {/* Hidden File Input */}
                <input
                  id="forum-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <div className="flex w-full flex-wrap gap-4 justify-between">
                <div className="w-[49%] flex flex-col gap-1">
                  <label
                    htmlFor="firstName"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="First Name"
                  />
                </div>

                <div className="w-[49%] flex flex-col gap-1">
                  <label
                    htmlFor="lastName"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Last Name"
                  />
                </div>

                <div className="w-[49%] flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Email"
                  />
                </div>

                <div className="w-[49%] flex flex-col gap-1">
                  <label
                    htmlFor="phone"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="w-[49%] flex flex-col gap-1">
                  <label
                    htmlFor="dob"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    Date of Birth (optional)
                  </label>
                  <input
                    type="date"
                    id="dob"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 text-grey-950 text-sm outline-none focus:outline-none"
                  />
                </div>

                <div className="w-[49%] flex flex-col gap-1">
                  <label
                    htmlFor="gender"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    Gender (optional)
                  </label>
                  <select
                    id="gender"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 text-grey-950 text-sm outline-none focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="bg-primary-500 py-3 px-6 rounded-full text-white text-base font-normal cursor-pointer">
                Save Changes
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex flex-col gap-6">
              <label
                className="cursor-pointer flex items-center gap-3"
                htmlFor="forum-image"
              >
                {/* Image Preview or Placeholder */}
                <div className="bg-[#E6E6E6] rounded-lg h-24 w-24 flex justify-center items-center overflow-hidden">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="object-cover h-full w-full rounded-md"
                    />
                  ) : (
                    <Image size="32" color="#292D32" variant="Bold" />
                  )}
                </div>

                {/* Upload Text */}
                <div className="flex gap-2 items-center text-sm text-primary-600">
                  <Camera size="16" />
                  <p>Upload profile picture</p>
                </div>

                {/* Hidden File Input */}
                <input
                  id="forum-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <div className="flex w-full flex-wrap gap-4 justify-between items-end">
                {/* Current Password (NO toggle) */}
                <div className="w-[49%] flex flex-col gap-1">
                  <label
                    htmlFor="currentPassword"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
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

                {/* Create New Password with toggle */}
                <div className="w-[49%] flex flex-col gap-1 relative">
                  <label
                    htmlFor="newPassword"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    Create New Password
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 pr-10 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Create a new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-9 text-grey-500"
                  >
                    {showNewPassword ? <EyeSlash size="18" /> : <Eye size="18" />}
                  </button>
                </div>

                {/* Confirm Password with toggle */}
                <div className="w-[49%] flex flex-col gap-1 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[#4E4E4E] text-xs font-normal"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 pr-10 placeholder:text-grey-300 text-grey-950 text-sm outline-none focus:outline-none"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-grey-500"
                  >
                    {showConfirmPassword ? <EyeSlash size="18" /> : <Eye size="18" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button className="bg-primary-500 py-3 px-6 rounded-full text-white text-base font-normal cursor-pointer">
                Update Password
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-b-grey-100 pb-4">
                <p className="text-[#4E4E4E] text-xs font-normal">Current Status:</p>
                <button className="bg-error-50 border border-error-600 text-error-600 text-base font-normal rounded-full py-3 px-6">Not Verified</button>
              </div>

              <div className="flex flex-col gap-2 w-80">
                <label className="text-sm font-normal text-grey-500">
                  What Local Government Area are you from?
                </label>
                <Select>
                  <SelectTrigger className="w-full rounded-full bg-white border border-grey-100 py-2 px-3 text-grey-950 text-sm">
                    <SelectValue placeholder="Select LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agege">Agege</SelectItem>
                    <SelectItem value="ajeromi-ifelodun">Ajeromi-Ifelodun</SelectItem>
                    <SelectItem value="alimosho">Alimosho</SelectItem>
                    <SelectItem value="amuwo-odofin">Amuwo-Odofin</SelectItem>
                    <SelectItem value="apapa">Apapa</SelectItem>
                    <SelectItem value="badagry">Badagry</SelectItem>
                    <SelectItem value="epe">Epe</SelectItem>
                    <SelectItem value="eti-osa">Eti-Osa</SelectItem>
                    <SelectItem value="ibeju-lekki">Ibeju-Lekki</SelectItem>
                    <SelectItem value="ifako-ijaiye">Ifako-Ijaiye</SelectItem>
                    <SelectItem value="ikeja">Ikeja</SelectItem>
                    <SelectItem value="ikorodu">Ikorodu</SelectItem>
                    <SelectItem value="kosofe">Kosofe</SelectItem>
                    <SelectItem value="lagos-island">Lagos Island</SelectItem>
                    <SelectItem value="lagos-mainland">Lagos Mainland</SelectItem>
                    <SelectItem value="mushin">Mushin</SelectItem>
                    <SelectItem value="ojo">Ojo</SelectItem>
                    <SelectItem value="oshodi-isolo">Oshodi-Isolo</SelectItem>
                    <SelectItem value="shomolu">Shomolu</SelectItem>
                    <SelectItem value="surulere">Surulere</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-start">
                <button className="bg-primary-500 py-3 px-6 rounded-full text-white text-base font-normal cursor-pointer">
                  Submit for veriication
                </button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="">
          <div className="flex flex-col gap-8">
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex gap-2 items-center">
              <p className="text-[#4E4E4E] text-xs font-normal">Current Status:</p>
              <button className="bg-primary-50 border border-primary-600 text-primary-600 text-base font-normal rounded-full py-3 px-6 flex items-center gap-2">
                <Clock
                  size="20"
                  variant="Bold"
                />
                Verification in progress
              </button>
            </div>
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex gap-2 items-center">
              <p className="text-[#4E4E4E] text-xs font-normal">Current Status:</p>
              <button className="bg-success-50 border border-success-600 text-success-600 text-base font-normal rounded-full py-3 px-6 flex items-center gap-2">
                <div className="w-5">
                  <img src={SealTick} alt="verification-icon" />
                </div>
                Verification in progress
              </button>
            </div>
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex gap-2 items-center">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-normal text-grey-500">
                  Preferred Notification Method
                </label>
                <Select>
                  <SelectTrigger className="w-80 rounded-full bg-white border border-grey-100 py-2 px-3 text-grey-950 text-sm">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex gap-2 items-center">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${enabled ? "bg-primary-600" : "bg-gray-200"
                  }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
              <h3 className="text-grey-500 font-medium text-lg">Order Updates</h3>
            </div>
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex gap-2 items-center">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${enabled ? "bg-primary-600" : "bg-gray-200"
                  }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
              <h3 className="text-grey-500 font-medium text-lg">Promotions & Discounts</h3>
            </div>
            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex gap-2 items-center">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${enabled ? "bg-primary-600" : "bg-gray-200"
                  }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
              <h3 className="text-grey-500 font-medium text-lg">Rewards Notifications</h3>
            </div>
            <div className="flex items-center justify-end">
              <button className="bg-primary-500 py-3 px-6 rounded-full text-white text-base font-normal cursor-pointer">
                Save Changes
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
