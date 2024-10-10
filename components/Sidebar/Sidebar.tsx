import UserAvatar from "../UserAvatar/UserAvatar";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import NavItem from "../NavItem/NavItem";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";

type SidebarProps = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ sidebarOpen, toggleSidebar }: SidebarProps) => {
  const { logout } = useAuth();
  const { user } = useUser();
  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } bg-white shadow-lg transition-all duration-300 ease-in-out`}
    >
      {!sidebarOpen && (
        <div className="flex justify-between items-center p-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <UserAvatar className="h-10 w-10 mt-8" />
          </Button>
        </div>
      )}

      {sidebarOpen && (
        <div className="flex flex-row justify-between p-4">
          <div>
            <UserAvatar className="h-20 w-20" />
            <div className="px-2 pt-2">{user?.displayName}</div>

            <div className="px-2">{user?.email}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <XIcon className="h-6 w-6" />
          </Button>
        </div>
      )}

      <nav
        className={`${
          sidebarOpen ? "mt-4 " : "items-center mt-20"
        } flex flex-col`}
      >
        <NavItem
          label="Profile"
          icon={<CgProfile className="w-8 h-8" />}
          open={sidebarOpen}
          href="/profile"
        />

        <NavItem
          label="Settings"
          icon={<IoMdSettings className="h-8 w-8" />}
          open={sidebarOpen}
          href="#"
        />

        <button
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          onClick={logout}
        >
          <FiLogOut className="h-6 w-6" />
          {sidebarOpen && <span className={`ml-2`}>Logout</span>}
        </button>
      </nav>

    </div>
  );
};

export default Sidebar;
