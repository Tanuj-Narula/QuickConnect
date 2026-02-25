// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
const user_id = localStorage.getItem('Id');

const initialState = {
  token: token || null,
  user_id: user_id || null,
  user: null,           
  loading: false,       
  error: null,          
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    const { token, user_id } = getState().user;
    try {
      const res = await axios.get(`http://localhost:3000/users/${user_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user_id } = action.payload;
      state.token = token;
      state.user_id = user_id;
      localStorage.setItem('token', token);
      localStorage.setItem('Id', user_id);
    },
    logout: (state) => {
      state.token = null;
      state.user_id = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('Id');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user';
      });
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
