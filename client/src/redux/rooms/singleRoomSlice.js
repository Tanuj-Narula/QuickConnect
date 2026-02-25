import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  id: null,
  room: null,
  loading: false,       
  error: null,          
};

export const fetchRoom = createAsyncThunk(
  'rooms/fetchRoom',
  async (_, {getState, rejectWithValue }) => {
    const { id } = getState().singleRoom
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/rooms/getone/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch room');
    }
  }
);

const singleRoomSlice = createSlice({
  name: 'SingleRoom',
  initialState,
  reducers: {
    setId: (state,action) =>{
        const {Id} = action.payload;
        state.id = Id; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(fetchRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch rooms';
      });
  },
});


export const { setId } =  singleRoomSlice.actions
export default singleRoomSlice.reducer;
