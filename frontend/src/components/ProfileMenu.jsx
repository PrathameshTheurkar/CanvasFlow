import { useContext, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { Context } from "../context/ContextProvider";

const ProfileMenu = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { username, canvasId } = useContext(Context);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center p-1.5 rounded-md bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors"
        onClick={toggleProfileMenu}
      >
        <BsPerson size={16} />
      </button>
      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1e1e1e] rounded-md shadow-lg py-1 z-20">
          <div className="px-3 py-2 text-xs border-b border-[#2a2a2a]">
            Signed in as{" "}
            <span className="font-medium">{username || "User"}</span>
          </div>
          <div className="px-3 py-2 text-xs">
            Canvas ID:{" "}
            <span className="font-medium">{canvasId || "Default"}</span>
          </div>
          <button className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-[#2a2a2a]">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
