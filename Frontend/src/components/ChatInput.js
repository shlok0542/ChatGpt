import { Plus, Mic } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 border rounded-full px-4 py-3">
        <Plus size={18} />

        <input
          type="text"
          placeholder="Ask anything"
          className="flex-1 outline-none text-sm"
        />

        <Mic size={18} />
        <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center">
          ●
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
