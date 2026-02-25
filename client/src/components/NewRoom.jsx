import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function NewRoom({ setIsnewOpen }) {
  const [inputValue, setInputValue] = useState("");
  const { token, user_id } = useSelector((state) => state.user);

  const handlesubmit = async (e, room) => {
    e.preventDefault();
    if (room !== "") {
      try {
        const res = await axios.post(
          "http://localhost:3000/rooms",
          {
            id: user_id,
            name: room,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if ((res.status = 200)) {
          document.querySelector(".form-msg").textContent = res.data.message + "✔";
        }
      } catch (error) {
        document.querySelector(".form-msg").textContent = error.response.data.message;
      }
      setInputValue("");
      setTimeout(() => {
        setIsnewOpen((newOpen) => !newOpen);
      }, 700);
    } else {
      document.querySelector(".form-msg").textContent =
        "Please enter valid a room name";
    }
  };

  return (
    <form
      onSubmit={(e) => handlesubmit(e, inputValue)}
      className="flex flex-col items-center gap-3"
    >
      <input
        type="text"
        id=""
        className="w-auto border rounded-lg p-2 bg-neutral-50 border-neutral-800 placeholder:text-gray-500 text-black outline-none"
        placeholder="Type the room name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="cursor-pointer p-3 bg-red-600 rounded-lg hover:scale-105"
        title="add room"
      >
        create room
      </button>
      <button
        type="button"
        className="cursor-pointer py-2 px-5 bg-red-600 rounded-lg hover:scale-105"
        title="add room"
        onClick={()=> setIsnewOpen((newOpen)=>!newOpen)}
      >
        cancel
      </button>
    </form>
  );
}

export default NewRoom;
