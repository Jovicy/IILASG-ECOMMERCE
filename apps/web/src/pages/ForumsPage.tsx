import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoreVertical, Copy, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ForumCard = ({ imgSrc }: { imgSrc: string }) => (
  <div className="bg-[#F9F9F9] rounded-lg flex items-center justify-between p-4">
    <div className="flex items-center gap-4">
      <img
        src={imgSrc}
        alt="Forum"
        className="w-16 h-16 object-cover rounded-md"
      />
      <div>
        <h3 className="font-semibold text-gray-900">[Forum Name]</h3>
        <p className="text-sm text-gray-500">👥 [Members]</p>
      </div>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>
          <Copy className="w-4 h-4 mr-2" />
          Copy link to forum
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const ForumsPage = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-grey-950 mb-6">Forums</h2>

      {/* Top Tabs + Create Forum */}
      <div className="flex items-center justify-between mb-6">
        <Tabs defaultValue="your-forums" className="w-full">
          <TabsList className="p-0 gap-3 shadow-none bg-transparent">
            <TabsTrigger
              value="your-forums"
              className="bg-transparent shadow-none text-sm font-normal pb-2 data-[state=active]:border-b-2 data-[state=active]:text-gray-900 data-[state=active]:border-yellow-500"
            >
              Your Forums
            </TabsTrigger>
            <TabsTrigger
              value="joined-forums"
              className="bg-transparent shadow-none text-sm font-normal pb-2 data-[state=active]:border-b-2 data-[state=active]:text-gray-900 data-[state=active]:border-yellow-500"
            >
              Joined Forums
            </TabsTrigger>
            <TabsTrigger
              value="explore"
              className="bg-transparent shadow-none text-sm font-normal pb-2 data-[state=active]:border-b-2 data-[state=active]:text-gray-900 data-[state=active]:border-yellow-500"
            >
              Explore
            </TabsTrigger>
          </TabsList>
        </Tabs>


        <Button variant="outline" className="rounded-full border-yellow-500 text-yellow-600 hover:bg-yellow-50 ml-auto">
          Create Forum
        </Button>
      </div>

      {/* Tab Content */}
      <Tabs defaultValue="your-forums" className="w-full">
        <TabsContent value="your-forums">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ForumCard imgSrc="/images/market1.jpg" />
            <ForumCard imgSrc="/images/market2.jpg" />
            <ForumCard imgSrc="/images/market3.jpg" />
            <ForumCard imgSrc="/images/market4.jpg" />
          </div>
        </TabsContent>

        <TabsContent value="joined-forums">
          <p className="text-sm text-gray-500">You have not joined any forums yet.</p>
        </TabsContent>

        <TabsContent value="explore">
          <p className="text-sm text-gray-500">Explore new forums here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumsPage;
