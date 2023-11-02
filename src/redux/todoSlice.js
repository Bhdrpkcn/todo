import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const todoSlice = createSlice({
  name: "todosRedux",
  initialState: {
    todos: [],
    isEditing: false,
    idToEdit: null,
  },
  reducers: {
    setTodosRedux: (state, action) => {
      state.todos = action.payload;
    },

    addTodoRedux: (state, action) => {
      const localTodo = {
        ...action.payload,
        source: "local",
      };
      state.todos = [...state.todos, localTodo];
    },

    toggleCompletedRedux: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    editTodoRedux: (state, action) => {
      state.isEditing = !state.isEditing;
      if (action.payload) {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (todoIndex !== -1) {
          state.todos[todoIndex].title = action.payload.title;
        }
      }
    },

    deleteTodoRedux: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setIdToEdit: (state, action) => {
      state.idToEdit = action.payload;
    },
  },
});

export const {
  setTodosRedux,
  addTodoRedux,
  toggleCompletedRedux,
  editTodoRedux,
  deleteTodoRedux,
  setIdToEdit,
} = todoSlice.actions;

export const editTodoAsync = createAsyncThunk(
  "todosRedux/editTodoAsync",
  async (editedTodo, { getState, dispatch }) => {
    try {
      console.log("Attempting to edit todo:", editedTodo);
      const state = getState();
      const todoIndex = state.todosRedux.todos.findIndex(
        (todo) => todo.id === editedTodo.id
      );
      //edit locally created Todo
      if (state.todosRedux.todos[todoIndex].source === "local") {
        dispatch(editTodoRedux(editedTodo));
      }
      //edit Todo from API
      else {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${editedTodo.id}`,
          {
            method: "PUT",
            body: JSON.stringify(editedTodo),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("API request failed.");
        }
        const data = await response.json();
        // Dispatch the edited todo from the API
        dispatch(editTodoRedux(data));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
);

export default todoSlice.reducer;
