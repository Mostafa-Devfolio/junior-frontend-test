const { configureStore } = require("@reduxjs/toolkit");
import userSlice from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});