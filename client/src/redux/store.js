import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import roomReducer from './rooms/roomSlice';
import singleRoomReducer from './rooms/singleRoomSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    singleRoom : singleRoomReducer
  },
});