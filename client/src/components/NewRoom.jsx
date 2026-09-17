import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRooms } from "../redux/rooms/roomSlice.js";
import { HiPlus } from "react-icons/hi2";

function NewRoom({ setIsnewOpen }) {
  const [inputValue, setInputValue] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token, user_id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setStatusMsg("Please enter a valid room name");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${process.env.SERVER_URL}/rooms`,
        {
          id: user_id,
          name: trimmed,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200 || res.status === 201) {
        setStatusMsg("Room created successfully! ✔");
        dispatch(fetchRooms());
        setInputValue("");
        setTimeout(() => {
          setIsnewOpen(false);
        }, 600);
      }
    } catch (error) {
      setStatusMsg(error.response?.data?.message || "Failed to create room");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#121f30] border border-slate-700/70 rounded-2xl p-4 shadow-xl mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-[#0c2e3d] text-[#00d2ff] flex items-center justify-center text-sm font-bold border border-[#00d2ff]/30">
          <HiPlus />
        </div>
        <h3 className="text-sm font-semibold text-white">Create New Room</h3>
      </div>

      <form onSubmit={handlesubmit} className="flex flex-col gap-2.5">
        <input
          type="text"
          className="w-full border border-slate-700/60 rounded-xl px-3 py-2 bg-[#0a1320] placeholder:text-slate-500 text-slate-100 text-xs outline-none focus:border-[#00d2ff]/60 focus:ring-1 focus:ring-[#00d2ff]/30 transition"
          placeholder="e.g. general, office, design"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />

        {statusMsg && (
          <p
            className={`text-xs text-center font-medium ${
              statusMsg.includes("✔") ? "text-[#00e599]" : "text-amber-400"
            }`}
          >
            {statusMsg}
          </p>
        )}

        <div className="flex gap-2 mt-1">
          <button
            type="submit"
            disabled={isSubmitting || !inputValue.trim()}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#22dbff] hover:to-[#1a85ff] text-white text-xs font-semibold shadow-sm hover:scale-[1.02] active:scale-98 transition-all cursor-pointer disabled:opacity-40"
          >
            {isSubmitting ? "Creating..." : "Create Room"}
          </button>
          <button
            type="button"
            className="py-2 px-3 rounded-xl bg-[#16253a] hover:bg-[#1d314c] border border-slate-700/50 text-slate-300 text-xs font-medium hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
            onClick={() => setIsnewOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewRoom;
