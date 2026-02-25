import React, { useEffect, useState } from "react";
import { RiChatNewFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";
import { AnimatePresence } from "framer-motion";
import "./component.css";
import NewRoom from "./NewRoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/rooms/roomSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);
  const [isopen, setisopen] = useState(false);
  const [newOpen, setIsnewOpen] = useState(false);

  const handleRoomClick = (event) => {
    setTimeout(() => {
      navigate(`/rooms/${event.target.id}`);
    }, 300);
  };

  const handleDropDown = () => {
    setisopen((isopen) => !isopen);
  };

  useEffect(() => {
    dispatch(fetchRooms());
    const interval = setInterval(() => {
      dispatch(fetchRooms());
    }, 7000); 

    return () => clearInterval(interval);
  }, [dispatch, newOpen]);

  return (
    <div className="fixed left-0 bg-[#3E505B] h-screen w-[20%] border-r text-white border-neutral-800">
      <div className="flex relative items-center w-full h-[55px] p-2 shadow-border-bottom">
        <h1 className="text-3xl ml-2"> Chats </h1>
        <span
          title="create room"
          className="absolute right-15 cursor-pointer"
          onClick={() => setIsnewOpen((newOpen) => !newOpen)}
        >
          <RiChatNewFill size={32} />
        </span>
        <span
          className="absolute right-4 cursor-pointer"
          onClick={handleDropDown}
          title="view profile"
        >
          <FaUserCircle size={32} />
        </span>

        {isopen && (
          <div className="h-full w-full" onClick={handleDropDown}>
            <AnimatePresence mode="wait">
              <ProfileDropDown handleDropDown={handleDropDown} />
            </AnimatePresence>
          </div>
        )}
      </div>
      {newOpen ? (
        <div className="mt-10 h-auto text-center">
          <NewRoom rooms={rooms} setIsnewOpen={setIsnewOpen} />
          <h1 className=" text-lg form-msg"></h1>
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.err.message}</p>
      ) : rooms ? (
        <div className="mt-10 flex flex-col h-[90%] overflow-y-auto pb-20 rooms">
          {rooms.map((room, index) => (
            <button
              key={index}
              id={room._id}
              className="p-2 border-b w-full h-auto border-neutral-800 cursor-pointer text-lg hover:shadow-[inset_0_-20px_15px_-10px_#12191c] hover:bg-[#324049] hover:scale-105"
              onClick={(e) => handleRoomClick(e)}
              title="open room"
            >
              {room.name}
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Sidebar;
