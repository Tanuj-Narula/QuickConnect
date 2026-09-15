import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { IoLogOutOutline, IoTrashOutline, IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../redux/user/userSlice.js";
import axios from "axios";

function ProfileDropDown({ handleDropDown }) {
  const dispatch = useDispatch();
  const { user, loading, error, user_id, token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  function handleLogOut() {
    dispatch(logout());
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3000/users/${user_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        window.alert(response.data.message);
        dispatch(logout());
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-56 bg-[#0E1826]/95 backdrop-blur-xl border border-slate-700/80 p-4 flex flex-col gap-3 z-50 rounded-2xl shadow-2xl text-slate-100"
      onMouseLeave={handleDropDown}
    >
      <div className="flex items-center gap-3 pb-2.5 border-b border-slate-800">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] text-white flex items-center justify-center font-bold text-sm shadow-md">
          {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate capitalize">
            {user?.username || "Account"}
          </p>
          <p className="text-[11px] text-slate-400 truncate">
            {user?.email || "QuickConnect user"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <NavLink
          to="/update"
          onClick={handleDropDown}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-[#18283d] transition-all"
        >
          <IoPersonOutline className="text-cyan-400 text-sm" />
          <span>Update Profile</span>
        </NavLink>

        <button
          onClick={handleLogOut}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-[#18283d] transition-all cursor-pointer text-left"
        >
          <IoLogOutOutline className="text-amber-400 text-sm" />
          <span>Log out</span>
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-all cursor-pointer text-left"
        >
          <IoTrashOutline className="text-red-400 text-sm" />
          <span>Delete Account</span>
        </button>
      </div>
    </motion.div>
  );
}

export default ProfileDropDown;

