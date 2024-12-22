import React, { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import {
  HomeIcon,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  User,
  PersonStanding
} from "lucide-react";

const Sidebar = ({setIsSidebarOpen}) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, setError } = useUserStore();

  const handleLogout = () => {
    alert("Logged out successfully");
    localStorage.removeItem("authToken");
    setUser(null);
    setError(null);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-[240px] bg-[#e0e0e0] border-r border-gray-300 flex flex-col h-screen">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.2s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.2s ease-out forwards;
        }

        .menu-item {
          transition: all 0.2s ease;
        }

        .menu-item:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Header */}
      <div className="p-4">
        <h2 className="text-xl font-medium text-gray-800 px-2">Dashboard</h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2">
        <div className="space-y-1">
          {/* Favorites Section */}
          <div className="pb-4">
            <p className="px-3 text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
              Favorites
            </p>
            <button
              onClick={() => handleNavigate("/home")}
              className={`menu-item flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg group ${
                isActiveRoute("/home") ? "bg-[#00000014]" : ""
              }`}
            >
              <HomeIcon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
              Home
            </button>
            <button
              onClick={() => handleNavigate("/templates")}
              className={`menu-item flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg group ${
                isActiveRoute("/templates") ? "bg-[#00000014]" : ""
              }`}
            >
              <FileText className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
              Templates
            </button>
          </div>

          {/* Settings Section */}
          <div className="pb-4">
            <p className="px-3 text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
              Guide
            </p>
            <button
              // onClick={() => handleNavigate("/")}
              className={`menu-item flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg group ${
                isActiveRoute("/settings") ? "bg-[#00000014]" : ""
              }`}
            >
              <PersonStanding className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="border-t border-gray-300 p-2">
        <div className="relative">
          <button
            onClick={() => setShowPopup(!showPopup)}
            className="menu-item flex items-center w-full px-3 py-2 rounded-lg justify-between"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-center">
              {user?.name?.charAt(0)}
            </div>
            <div className="text-left ml-0 max-w-32">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-600 truncate">{user?.email}</p>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                showPopup ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Profile Popup */}
          {showPopup && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => {setShowPopup(false);setIsSidebarOpen(false)}}
              />
              <div className="absolute bottom-full left-2 right-2 mb-2 bg-white rounded-lg shadow-lg border border-gray-300 animate-slide-up z-20">
                <div className="p-2">
                  <button
                    onClick={() => {
                      handleNavigate("/profile");
                      setShowPopup(false);
                      setIsSidebarOpen(false)

                    }}
                    className={`menu-item flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg ${
                      isActiveRoute("/profile") ? "bg-[#00000014]" : ""
                    }`}
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="menu-item flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-lg"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-red-500" />
                    Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);