import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompletedRedux,
  deleteTodoRedux,
  editTodoAsync,
  setIdToEdit,
} from "../redux/todoSlice";

function Item({ todo }) {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.todosRedux.isEditing);
  const [editedTitle, setEditedTitle] = useState(todo.title); //çalışıyor todoların title larını çekiyor edit etmek için
  const idToEdit = useSelector((state) => state.todosRedux.idToEdit); // Add this line to get idToEdit from Redux state

  const deleteHandler = () => {
    dispatch(deleteTodoRedux(todo.id));
  };

  const editHandler = () => {
    dispatch(setIdToEdit(todo.id)); // Set the id of the todo to edit
    dispatch(
      editTodoAsync({ id: todo.id, title: editedTitle, isEditing: !isEditing })
    );
  };

  const saveHandler = () => {
    dispatch(
      editTodoAsync({ id: todo.id, title: editedTitle, isEditing: !isEditing })
    );
  };
  
    const closeHandler = () => {
      dispatch(editTodoAsync({ id: todo.id, title:todo.title, isEditing: !isEditing }));
    };

  const toggleCompletedHandler = () => {
    dispatch(toggleCompletedRedux(todo.id));
  };
  return (
    <div className="todoList">
      {isEditing && todo.id === idToEdit ? ( // Check if isEditing is true for this specific todo
        <div>
          <input
            key={todo.id}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={saveHandler}>Save</button>
          <button onClick={closeHandler}>Close</button>
        </div>
      ) : (
        <div className={`todo ${todo.completed ? "completed" : ""}`}>
          <input
            key={todo.id}
            className="checkBox"
            type="checkbox"
            checked={todo.completed}
            onChange={toggleCompletedHandler}
          />
          {todo.title} - (id): {todo.id}
          <div>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
