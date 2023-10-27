import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";
import todosReducer from "../redux/todoSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todosRedux: todosReducer,
  },
});

export default store;
