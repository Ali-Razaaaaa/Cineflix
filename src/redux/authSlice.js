import { createSlice } from '@reduxjs/toolkit';

// Scaffold for Firebase Auth integration.
// Wire Firebase's onAuthStateChanged to dispatch setUser/clearUser from Setter.js.
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null, // shape: { uid, email, displayName, photoURL }
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
