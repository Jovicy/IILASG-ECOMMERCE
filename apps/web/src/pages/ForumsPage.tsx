import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { forums } from "@/data/database";
import { Link } from "react-router-dom";
import { Camera, CloseSquare, Image, Link2, People, Trash } from "iconsax-reactjs";

const yourForums = forums.filter((forum) => forum.createdBy === "currentUser");
const joinedForums = forums.filter(
  (forum) => forum.joined && forum.createdBy !== "currentUser"
);
const exploreForums = forums.filter((forum) => !forum.joined);

const ForumCard = ({
  id,
  imgSrc,
  type,
  title,
  member,
}: {
  id: string;
  imgSrc: string;
  title: string;
  member: number;
  type: "your" | "joined" | "explore";
}) => (
  <Link to={`/forums/${id}`}>
    <div className="bg-grey-50 rounded-lg flex justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="w-36 h-36">
          <img
            src={imgSrc}
            alt="Forum"
            className="object-cover rounded-md h-full"
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <h3 className="font-medium text-grey-950 text-lg">{title}</h3>
          <div className="text-base text-grey-700 flex items-center gap-2">
            <People />
            <p>{member}</p>
          </div>
          {type === "explore" && (
            <Button
              size="sm"
              variant="outline"
              className="w-[151px] mt-6 h-12 rounded-full py-3 px-4 text-base text-white border-primary-500 bg-primary-500 hover:bg-primary-600"
            >
              Join
            </Button>
          )}
        </div>
      </div>
      {(type === "your" || type === "joined") && (
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 focus:!bg-transparent hover:!bg-transparent"
              >
                <MoreVertical className="h-5 w-5 text-[#4E4E4E]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="w-[175px] rounded-xl shadow-lg p-3 flex flex-col gap-1 z-50"
            >
              <DropdownMenuItem className="gap-2">
                <Link2 size="16" color="#4E4E4E" />
                <p className="text-xs font-normal text-[#4E4E4E]">
                  Copy link to forum
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-error-700 hover:!bg-error-50 hover:!text-error-700">
                <Trash size="16" color="#E60007" />
                <p className="text-xs font-normal">
                  {type === "joined" ? "Leave forum" : "Delete"}
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  </Link>
);

const ForumsPage = () => {
  const [activeTab, setActiveTab] = useState("your-forums");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [forumName, setForumName] = useState("");
  const [forumDesc, setForumDesc] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-grey-950 mb-6">Forums</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <TabsList className="p-0 gap-3 shadow-none bg-transparent">
            {[
              { value: "your-forums", label: "Your Forums" },
              { value: "joined-forums", label: "Joined Forums" },
              { value: "explore", label: "Explore" },
            ].map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="bg-transparent shadow-none text-sm font-normal text-grey-900 pb-3 rounded-none border-b-2 data-[state=active]:border-b-primary-500 data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {activeTab === "your-forums" && (
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(true)}
              className="py-3 px-6 rounded-full bg-primary-50 border-primary-500 text-primary-700 text-base font-normal text-nowrap cursor-pointer hover:border-primary-50"
            >
              Create Forum
            </Button>
          )}
        </div>

        <TabsContent value="your-forums" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yourForums.map((forum) => (
              <ForumCard key={forum.id} id={forum.id} imgSrc={forum.image} title={forum.name} member={forum.members} type="your" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="joined-forums" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedForums.length ? (
              joinedForums.map((forum) => (
                <ForumCard key={forum.id} id={forum.id} imgSrc={forum.image} title={forum.name} member={forum.members} type="joined" />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                You have not joined any forums yet.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="explore" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exploreForums.length ? (
              exploreForums.map((forum) => (
                <ForumCard key={forum.id} id={forum.id} imgSrc={forum.image} title={forum.name} member={forum.members} type="explore" />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No new forums available to explore.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#00000066] flex items-center justify-center">
          <div className="bg-white w-full max-w-md mx-auto rounded-xl px-4 py-6 relative shadow-lg overflow-auto max-h-[90vh] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-grey-950">
                Create Forum
              </h2>

              <button
                onClick={() => setShowCreateModal(false)}
                className="cursor-pointer"
              >
                <CloseSquare size="32" color="#292D32" />
              </button>
            </div>

            <div className="bg-[#F6F6F6] py-5 px-4 rounded-lg flex flex-col gap-6">
              <label className="cursor-pointer flex items-center gap-3" htmlFor="forum-image">
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
                  <p>Upload photo</p>
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


              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-normal text-[#4E4E4E]">Forum Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Market Thrift"
                    value={forumName}
                    onChange={(e) => setForumName(e.target.value)}
                    className="w-full bg-white border border-grey-100 rounded-full px-3 py-2 text-sm text-grey-900 placeholder:text-grey-300 focus:outline-none focus:ring-1 focus:ring-grey-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-normal text-[#4E4E4E]">Description *</label>
                  <textarea
                    placeholder="What is the purpose of this forum"
                    value={forumDesc}
                    onChange={(e) => setForumDesc(e.target.value)}
                    className="w-full bg-white border border-grey-100 rounded-[20px] px-3 py-2 text-sm text-grey-900 placeholder:text-grey-300 focus:outline-none focus:ring-1 focus:ring-grey-500"
                  />
                </div>

              </div>
            </div>


            <Button
              disabled={!forumName || !forumDesc}
              className="w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white py-3 text-base font-normal disabled:bg-grey-100 disabled:text-grey-300 disabled:opacity-100 disabled:cursor-not-allowed"
            >
              Add Forum
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumsPage;
