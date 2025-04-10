import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    userLoggedInDetails: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    userLoggedOutDetails: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUserPremium: (state, action) => {
      if (state.user) {
        state.user.isPremium = action.payload.isPremium;
        state.user.premiumType = action.payload.premiumType;
      }
    },
  },
});

export default UserSlice;

// Action creators
const userActions = UserSlice.actions;
export { userActions };
