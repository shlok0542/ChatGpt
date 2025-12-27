import {
  Plus,
  Search,
  Library,
  LayoutGrid,
  Folder,
} from "lucide-react";

const chats = [
  "Exam preparation help",
  "Keychain photo prompts",
  "Product listing prompts",
  "React login page code",
  "Set background in React",
];

const Sidebar = () => {
  return (
    <aside className="w-[280px] border-r border-gray-200 flex flex-col">
      
      {/* Top */}
      <div className="p-3 space-y-2">
        <button className="flex items-center gap-2 text-sm font-medium">
          <Plus size={18} /> New chat
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Search size={16} /> Search chats
        </div>
      </div>

      {/* Menu */}
      <div className="px-3 py-2 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Library size={16} /> Library
        </div>
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} /> GPTs
        </div>
        <div className="flex items-center gap-2">
          <Folder size={16} /> Projects
        </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="text-xs text-gray-500 mb-2">Your chats</p>
        {chats.map((chat, i) => (
          <div
            key={i}
            className="text-sm py-1 px-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            {chat}
          </div>
        ))}
      </div>

      {/* User */}
      <div className="p-3 border-t flex items-center gap-2 text-sm">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
          S
        </div>
        <span>Shlok Maurya</span>
      </div>
    </aside>
  );
};

export default Sidebar;
