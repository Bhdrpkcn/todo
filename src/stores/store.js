import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todoSlice";

const store = configureStore({
  reducer: {
    todosRedux: todosReducer,
  },
});

export default store;
