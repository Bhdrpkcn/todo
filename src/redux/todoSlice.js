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
      state.todos = [...state.todos, action.payload];
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
        const state = getState();
        const todoIndex = state.todosRedux.todos.findIndex(
          (todo) => todo.id === editedTodo.id
        );
  
        if (todoIndex !== -1) {
          // Perform local edit (not API)
          dispatch(editTodoRedux(editedTodo)); // Dispatch the local edit action
        } else {
          // Perform API edit
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
        throw error;
      }
    }
  );
  
export default todoSlice.reducer;
