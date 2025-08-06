import { useState } from "react";
import { ArrowLeft, InfoCircle, Paperclip2, Send2 } from "iconsax-reactjs";
import { useParams } from "react-router-dom";
import { forums } from "@/data/database";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import DP from "@/assets/forum-1.svg"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

const ForumChatPage = () => {
    const { id } = useParams();
    const forum = forums.find((f) => f.id === id);
    const [open, setOpen] = useState(false);

    if (!forum) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold text-red-600">Forum not found</h2>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="p-6 bg-[#F6F6F699] rounded-lg mb-6 flex items-center justify-between">
                <div className="flex items-center gap-8 text-grey-950">
                    <Link to="/forums">
                        <ArrowLeft size="20" />
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="h-12 w-12">
                            <img
                                src={forum.image}
                                alt={forum.name}
                                className="h-full w-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-medium">{forum.name}</h3>
                            <p className="text-sm font-normal">{forum.members} members</p>
                        </div>
                    </div>
                </div>

                {/* Description Modal Trigger */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div
                            className="flex items-center text-grey-600 text-xs gap-2 cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            <InfoCircle size="15" />
                            <p>Forum description</p>
                        </div>
                    </DialogTrigger>

                    <DialogContent
                        className="!top-70 !left-auto !-right-50 max-w-sm w-full rounded-xl py-6 px-4 shadow-lg"
                        style={{ position: "absolute" }}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-lg text-grey-950">{forum.name}</DialogTitle>
                            <DialogDescription className="text-sm text-grey-700 mt-2 leading-relaxed">
                                {forum.description}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>

                </Dialog>
            </div>

            {/* Chat messages and input go here */}
            <div className="pl-6 ">
                {/* Map chat messages here */}
                <div>
                    <div className="flex gap-3">
                        <div className="w-9 h-9">
                            <img src={DP} alt="sender-profile" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="bg-[#F6F5F5] py-[7px] px-2 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow text-sm w-[544px] flex flex-col gap-2 mb-10">
                            <h3 className="font-medium">[Sender’s Name]</h3>
                            <p className="font-normal text-sm/7">
                                Lorem ipsum dolor sit amet consectetur. Risus fermentum mi sed viverra nec diam. Diam iaculis ligula tempor congue vitae. Ipsum lectus condimentum dui aenean aliquam lectus. Vitae elit ac scelerisque enim cursus elementum nam in commodo. Eget vulputate pharetra ullamcorper iaculis nulla est aliquet amet. Lectus feugiat facilisis a a eu.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-9 h-9">
                            <img src={DP} alt="sender-profile" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="bg-[#F6F5F5] py-[7px] px-2 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow text-sm w-[544px] flex flex-col gap-2 mb-10">
                            <h3 className="font-medium">[Sender’s Name]</h3>
                            <p className="font-normal text-sm/7">
                                Lorem ipsum dolor sit amet consectetur. Risus fermentum mi sed viverra nec diam. Diam iaculis ligula tempor congue vitae. Ipsum lectus condimentum dui aenean aliquam lectus. Vitae elit ac scelerisque enim cursus elementum nam in commodo. Eget vulputate pharetra ullamcorper iaculis nulla est aliquet amet. Lectus feugiat facilisis a a eu.
                            </p>
                        </div>
                    </div>
                    <div className="bg-grey-800 text-white py-[7px] px-2 rounded-tl-lg rounded-bl-lg rounded-br-lg shadow font-normal text-sm/7 w-[534px] flex flex-col gap-2 mb-10 ml-auto text-left">
                        Lorem ipsum dolor sit amet consectetur. Risus fermentum mi sed viverra nec diam. Diam iaculis ligula tempor congue vitae. Ipsum lectus condimentum dui aenean aliquam lectus. Vitae elit ac scelerisque enim cursus elementum nam in commodo. Eget vulputate pharetra ullamcorper iaculis nulla est aliquet amet. Lectus feugiat facilisis a a eu.
                    </div>
                    {/* Add more dummy or real messages */}
                </div>
            </div>

            {/* Chat Input */}
            <div className="bg-grey-50 rounded-lg px-6 py-4">
                <form className="flex items-center gap-2">
                    <div className="flex-1 flex gap-6 items-center">
                        <Paperclip2 size="24" color="#706A6B" />
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full bg-transparent text-sm font-normal text-grey-950 placeholder:text-grey-400 border-none shadow-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-grey-950"
                    >
                        <Send2 size="24" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForumChatPage;
