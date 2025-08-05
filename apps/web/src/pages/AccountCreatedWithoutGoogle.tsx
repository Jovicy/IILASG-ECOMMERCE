import React from 'react';
import Logo from "@/assets/Main-logo.svg";
import ModalImg from "@/assets/modal-img.svg";
import { ArrowRight, ShoppingCart } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

const AccountCreatedWithoutGoogle = () => {
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        isLagosian: "",
        localGovernment: "",
    });

    const lagosLGAs = [
        "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
        "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
        "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
        "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
    ];

    const isStepFilled =
        form.isLagosian === "yes"
            ? form.localGovernment.trim() !== ""
            : form.isLagosian.trim() !== "";

    const handleFinalAction = () => {
        if (form.isLagosian === "yes") {
            setShowModal(true);
        } else {
            navigate("/");
        }
    };

    return (
        <div className='h-auto flex justify-center py-16'>
            <div className="flex flex-col items-center gap-16 relative">
                {/* Logo */}
                <div>
                    <img src={Logo} alt="logo" />
                </div>

                {/* Title */}
                <div className='flex flex-col gap-1 w-xl text-center'>
                    <h1 className='text-2xl font-semibold text-grey-900'>
                        Your Account Has Been Created
                    </h1>
                    <p className='text-grey-500 font-normal text-lg'>
                        Welcome aboard! Just one more step, let’s complete your profile to tailor your experience.
                    </p>
                </div>

                {/* Card */}
                <div className='w-[666px] bg-grey-50 flex flex-col gap-12 py-8 px-12 rounded-2xl'>
                    {/* Progress Bar */}
                    <div className="w-full h-1 rounded-full overflow-hidden bg-[#D1D1D1]">
                        <div
                            className="h-full transition-all duration-300"
                            style={{
                                width: "100%",
                                backgroundColor: "#FFBF00"
                            }}
                        />
                    </div>

                    {/* Step Content */}
                    <div className='flex flex-col gap-8'>
                        <p className='text-grey-900 text-base font-normal'>
                            Indigenous Lagosians earn extra points and badges. Confirm your status to unlock special benefits.
                        </p>

                        {/* Form */}
                        <form className='flex flex-col gap-6'>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-normal text-grey-800">
                                    Are You an Indigenous Lagosian?
                                </label>
                                <select
                                    value={form.isLagosian}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            isLagosian: e.target.value,
                                            localGovernment: "",
                                        })
                                    }
                                    className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-800 bg-white outline-none"
                                >
                                    <option value="">Select option</option>
                                    <option value="yes">Yes, I’m a Lagosian</option>
                                    <option value="no">No, I’m not a Lagosian</option>
                                </select>
                            </div>

                            {form.isLagosian === "yes" && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-normal text-grey-800">
                                        What Local Government Area are you from?
                                    </label>
                                    <select
                                        value={form.localGovernment}
                                        onChange={(e) =>
                                            setForm({ ...form, localGovernment: e.target.value })
                                        }
                                        className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-800 bg-white outline-none"
                                    >
                                        <option value="">Select LGA</option>
                                        {lagosLGAs.map((lga) => (
                                            <option key={lga} value={lga}>
                                                {lga}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Bottom Action Button */}
                    <div className='flex items-center justify-end'>
                        <button
                            disabled={!isStepFilled}
                            onClick={handleFinalAction}
                            className={`flex items-center gap-2 py-3 px-6 rounded-full text-base font-normal transition ${isStepFilled
                                ? "bg-primary-500 text-white hover:bg-primary-600"
                                : "bg-grey-100 text-grey-300 cursor-not-allowed"
                                }`}
                        >
                            {form.isLagosian === "yes" ? "Verify indigene status" : "Start shopping"}
                            <ArrowRight />
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl p-6 w-[400px] text-center flex flex-col items-center gap-6">
                            <div className='flex gap-6 flex-col'>
                                <div>
                                    <img src={ModalImg} alt="modal img" />
                                </div>
                                <div>
                                    <p className="text-grey-600 text-base">
                                        Thanks for submitting your details. Our team is currently reviewing your verification request. While we verify your information, you can start shopping!
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate("/")}
                                    className="cursor-pointer bg-success-700 text-white text-base rounded-full px-6 py-3 flex items-center gap-2"
                                >
                                    <ShoppingCart />
                                    Start Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountCreatedWithoutGoogle;
