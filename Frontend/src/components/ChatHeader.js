import { ChevronDown, UserPlus, RotateCcw } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="h-14 border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-1 font-medium">
        ChatGPT 5.1
        <ChevronDown size={16} />
      </div>

      <div className="flex items-center gap-4">
        <UserPlus size={18} />
        <RotateCcw size={18} />
      </div>
    </div>
  );
};

export default ChatHeader;
