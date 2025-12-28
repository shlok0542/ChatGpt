import { Plus, MessageSquare } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-50 md:w-72 h-full bg-black/50 border-r border-white/10 flex flex-col z-20 fixed left-0 top-14"> 
      {/* New Chat */}
      <div className="p-4">
        <button
      
          className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {/* {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-left hover:bg-white/10"
          >
            <MessageSquare size={16} className="text-slate-400" />
            <span className="truncate">{chat.title}</span>
          </button>
        ))} */}
      </div>
    </aside>
  );
};

export default Sidebar;
