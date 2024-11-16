"use client";
import Menu from "@/Assets/icons/Menu";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Sidebar = ({ onFilter }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleFilterClick = (filter) => {
    onFilter(filter);
    setCollapsed(true); // Close sidebar when a filter is selected
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev); // Toggle sidebar state
  };

  // Close sidebar when clicking outside
  const handleClickOutside = (event) => {
    if (
      !event.target.closest("#sidebar") &&
      !event.target.closest("#menu-button")
    ) {
      setCollapsed(true);
    }
  };

  // Add event listener for clicks outside the sidebar
  useEffect(() => {
    if (!collapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed]);

  return (
    <div>
      <div id="menu-button" className="fixed top-4 left-4 z-50">
        <Menu
          onClick={toggleSidebar}
          className="cursor-pointer text-white hover:text-gray-400"
        />
      </div>

      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-40 z-40 flex flex-col items-start px-5 py-10 space-y-2 bg-[#212121] text-white transition-transform duration-300 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Link href="/all">
          <button
            onClick={() => handleFilterClick("all")}
            className="text-left w-full p-2 hover:bg-gray-700 rounded"
          >
            All Notes
          </button>
        </Link>
        <Link href="/favorites">
          <button
            onClick={() => handleFilterClick("favorites")}
            className="text-left w-full p-2 hover:bg-gray-700 rounded"
          >
            Favorites
          </button>
        </Link>
        <Link href="/locked">
          <button
            onClick={() => handleFilterClick("locked")}
            className="text-left w-full p-2 hover:bg-gray-700 rounded"
          >
            Locked Notes
          </button>
        </Link>
        <Link href="/deleted">
          <button
            onClick={() => handleFilterClick("deleted")}
            className="text-left w-full p-2 hover:bg-gray-700 rounded"
          >
            Deleted Notes
          </button>
        </Link>
        <Link href="/create-folder">
          <button
            onClick={() => handleFilterClick("createFolder")}
            className="text-left w-full p-2 hover:bg-gray-700 rounded"
          >
            Create Folder
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
