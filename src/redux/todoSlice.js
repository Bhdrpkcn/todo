import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todosRedux",
  initialState: [],
  reducers: {
    setTodosRedux: (state, action) => {
      return action.payload;
    },
    addTodoRedux: (state, action) => {
        return [...state, action.payload]; // Yeni bir dizi oluşturarak görevi ekleyin
      },
  },
});

export const { setTodosRedux, addTodoRedux } = todoSlice.actions;
export default todoSlice.reducer;