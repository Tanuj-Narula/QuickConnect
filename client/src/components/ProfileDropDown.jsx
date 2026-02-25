import React, { use, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/user/userSlice";
import { logout } from "../redux/user/userSlice";
import "./component.css";
import axios from "axios";

function ProfileDropDown({ handleDropDown }) {
  const dispatch = useDispatch();
  const { user, loading, error , user_id , token  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  function handleLogOut() {
    dispatch(logout());
  }

  async function handleDelete(){
    try {
      const response = await axios.delete(`http://localhost:3000/users/${user_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200){
        window.alert(response.data.message);
        dispatch(logout());
      }
    } catch (error) {
      
    }
  }

  return user ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="dropdown p-4 flex-col mt-9 flex items-center justify-center gap-4 z-50 rounded-b-md bg-[#e6e6e6] h-auto text-black"
      onMouseLeave={handleDropDown}
    >
      <p className="text-2xl font-semibold">{user.username}</p>
      <NavLink
        to={"/update"}
        className="cursor-pointer hover:scale-110 hover:font-semibold hover:underline "
      >
        update User
      </NavLink>
      <button
        className="bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:scale-110 hover:font-semibold flex gap-1 items-center"
        onClick={handleLogOut}
      >
        Log out <IoLogOutOutline size={20} />
      </button>
      <button
        className="bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:scale-110 hover:font-semibold"
        onClick={handleDelete}
      >
        Delete Account
      </button>
    </motion.div>
  ) : (
    <></>
  );
}

export default ProfileDropDown;
