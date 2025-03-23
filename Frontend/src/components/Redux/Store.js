import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./Slice/UserSlice";

const makeStore = () => configureStore({
  reducer: {
    user: UserSlice.reducer,
  },
});

export default makeStore;
