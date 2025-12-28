import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { UserContext } from "../Context/Usercontext";

const Navbar = ({onMenuClick}) => {
  const navigate = useNavigate();
  const {userData}= React.useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login", { replace: true });
    toast.success("Logged out successfully");
  };

  return (
    <>
      <Toaster position="top-right" />
      <nav className="h-14 px-6 flex items-center justify-between border-b border-white/10 bg-slate-800 backdrop-blur absolute top-0 left-0 w-full z-20">
        {/* Logo */}
        <div className="flex items-center">
          <Menu onClick={onMenuClick} size={24} className="text-white mr-6 cursor-pointer" />

          <span
            className="text-3xl font-extrabold tracking-wide text-white select-none"
            style={{
              textShadow:
                "0 0 5px rgba(34, 197, 94, 0.7), 0 0 10px rgba(34, 197, 94, 0.5)",
            }}
          >
            {userData?userData.username: ""}
            </span>
          </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl hover:bg-white/10 text-red-400 transition-colors duration-200 flex items-center justify-center"
          >
            <LogOut size={20} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
