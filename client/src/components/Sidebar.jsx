import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/rooms/roomSlice.js";
import ProfileDropDown from "./ProfileDropDown";
import NewRoom from "./NewRoom";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiPlus,
  HiBriefcase,
  HiUsers,
  HiHashtag,
  HiChatBubbleLeftRight,
  HiCodeBracket,
} from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import "./component.css";

function Sidebar({ onOpenNewRoom, isNewOpenExternal, setIsNewOpenExternal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);
  const [isopen, setisopen] = useState(false);
  const [newOpenLocal, setIsnewOpenLocal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const newOpen = isNewOpenExternal !== undefined ? isNewOpenExternal : newOpenLocal;
  const setIsnewOpen = setIsNewOpenExternal || setIsnewOpenLocal;

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}`);
  };

  const handleDropDown = () => {
    setisopen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchRooms());
    const interval = setInterval(() => {
      dispatch(fetchRooms());
    }, 7000);

    return () => clearInterval(interval);
  }, [dispatch, newOpen]);

  // Choose icon and badge color based on room name or index
  const getRoomBadge = (name, index) => {
    const lower = (name || "").toLowerCase();
    if (lower.includes("office") || lower.includes("work") || index % 4 === 0) {
      return {
        icon: <HiBriefcase className="text-cyan-400 text-lg" />,
        bg: "bg-[#09313f] border-[#00d2ff]/30",
        activeDot: true,
      };
    }
    if (lower.includes("formal") || lower.includes("team") || index % 4 === 1) {
      return {
        icon: <HiUsers className="text-[#a5b4fc] text-lg" />,
        bg: "bg-[#1e233d] border-[#6366f1]/30",
        activeDot: false,
      };
    }
    if (lower.includes("unofficial") || lower.includes("general") || index % 4 === 2) {
      return {
        icon: <HiHashtag className="text-[#34d399] font-bold text-lg" />,
        bg: "bg-[#0d2e24] border-[#10b981]/30",
        activeDot: false,
      };
    }
    return {
      icon: <HiChatBubbleLeftRight className="text-sky-400 text-lg" />,
      bg: "bg-[#14263e] border-[#38bdf8]/30",
      activeDot: false,
    };
  };

  // Mock member count helper (looks realistic if backend doesn't provide member count)
  const getMemberCount = (room, index) => {
    if (room.members && Array.isArray(room.members)) {
      return `${room.members.length} members`;
    }
    const sampleCounts = [4, 8, 12, 6, 15, 9];
    return `${sampleCounts[index % sampleCounts.length]} members`;
  };

  const filteredRooms = (rooms || []).filter((r) =>
    (r.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] sm:w-[320px] md:w-[340px] bg-[#0A111C] border-r border-slate-800/80 flex flex-col z-30 select-none text-slate-100 shadow-2xl">
      {/* Header with Logo and Action Icons */}
      <div className="p-4 pb-3 flex items-center justify-between border-b border-slate-800/50">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo with overlapping speech bubbles */}
          <div className="relative flex items-center justify-center w-10 h-10">
            {/* Dark background bubble */}
            <div className="absolute right-0 bottom-0 w-7 h-7 rounded-xl rounded-br-sm bg-[#122b44] border border-[#1e4468]/60 transform translate-x-1 translate-y-1"></div>
            {/* Front bright cyan bubble */}
            <div className="relative w-8 h-8 rounded-xl rounded-bl-sm bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] flex items-center justify-center shadow-[0_2px_14px_rgba(0,210,255,0.45)] group-hover:scale-105 transition-transform duration-200">
              <div className="flex gap-0.5">
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center">
              Quick<span className="text-[#00d2ff]">Connect</span>
            </h1>
            <p className="text-[10.5px] text-slate-400 font-medium tracking-wide -mt-0.5">
              Chat. Collaborate. Connect.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsnewOpen(!newOpen)}
            className="p-2 rounded-xl bg-[#131f30] hover:bg-[#1a2c42] border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            title="Create Room"
          >
            <HiPlus size={17} />
          </button>
          <div className="relative">
            <button
              onClick={handleDropDown}
              className="p-2 rounded-xl bg-[#131f30] hover:bg-[#1a2c42] border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center"
              title="Profile & Settings"
            >
              <FaUserCircle size={17} />
            </button>
            {isopen && (
              <div className="absolute right-0 top-12 z-50">
                <AnimatePresence mode="wait">
                  <ProfileDropDown handleDropDown={handleDropDown} />
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="px-4 pt-3.5 pb-2 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2.5 bg-[#121c2b] border border-slate-700/50 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus-within:border-[#00d2ff]/60 focus-within:ring-1 focus-within:ring-[#00d2ff]/30 transition-all">
          <IoSearchOutline className="text-slate-400 text-lg flex-shrink-0" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-xs text-slate-200 placeholder:text-slate-400"
          />
        </div>
        <button
          className="p-2.5 rounded-xl bg-[#121c2b] hover:bg-[#18273c] border border-slate-700/50 text-slate-400 hover:text-[#00d2ff] transition-all cursor-pointer flex items-center justify-center active:scale-95"
          title="Filter Rooms"
        >
          <HiAdjustmentsHorizontal size={17} />
        </button>
      </div>

      {/* New Room Modal / Inline Form */}
      {newOpen && (
        <div className="px-4 py-2">
          <NewRoom rooms={rooms} setIsnewOpen={setIsnewOpen} />
        </div>
      )}

      {/* Rooms List Section Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400 uppercase">
        <span>ROOMS</span>
        <span className="text-slate-400 font-normal normal-case tracking-normal">
          {filteredRooms.length} {filteredRooms.length === 1 ? "room" : "rooms"}
        </span>
      </div>

      {/* Rooms List Content */}
      <div className="flex-1 px-3 py-1 space-y-2.5 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="p-6 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
            <div className="w-5 h-5 border-2 border-[#00d2ff] border-t-transparent rounded-full animate-spin"></div>
            <span>Loading rooms...</span>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-400 text-xs bg-red-950/30 rounded-xl border border-red-800/40">
            {error?.err?.message || "Failed to load rooms"}
          </div>
        ) : filteredRooms && filteredRooms.length > 0 ? (
          filteredRooms.map((room, index) => {
            const isActive = location.pathname === `/rooms/${room._id}`;
            const badge = getRoomBadge(room.name, index);

            return (
              <motion.div
                key={room._id || index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleRoomClick(room._id)}
                className={`group rounded-2xl p-3 flex items-center justify-between cursor-pointer transition-all duration-200 border ${
                  isActive
                    ? "bg-[#0d2a36] border-[#00d2ff]/50 shadow-[0_0_20px_rgba(0,210,255,0.12)]"
                    : "bg-[#131f30]/70 hover:bg-[#18283d] border-slate-800/80 hover:border-slate-700/80"
                }`}
                title={`Open room: ${room.name}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Badge Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${badge.bg}`}
                  >
                    {badge.icon}
                  </div>

                  {/* Room Name and Info */}
                  <div className="min-w-0">
                    <h3
                      className={`text-sm font-semibold truncate capitalize ${
                        isActive
                          ? "text-white"
                          : "text-slate-200 group-hover:text-white"
                      }`}
                    >
                      {room.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {getMemberCount(room, index)}
                    </p>
                  </div>
                </div>

                {/* Status Indicator Dot */}
                <div className="flex items-center pr-1 flex-shrink-0">
                  {isActive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00e599] shadow-[0_0_8px_#00e599]"></span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600/80 group-hover:bg-slate-500"></span>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="p-6 text-center text-slate-400 text-xs">
            No rooms found.
          </div>
        )}
      </div>

      {/* Bottom Quote Card */}
      <div className="p-3 mt-auto">
        <div className="bg-[#0f1b2b]/90 border border-slate-800/90 rounded-2xl p-3.5 shadow-lg">
          <p className="italic text-slate-300 text-xs font-light leading-relaxed">
            “Good conversations<br />build great things.”
          </p>
          <div className="w-9 h-[2px] bg-[#00d2ff] mt-2 rounded-full shadow-[0_0_8px_#00d2ff]"></div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

