import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompletedRedux,
  deleteTodoRedux,
  editTodoAsync,
  setIdToEdit,
} from "../redux/todoSlice";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch, Space, Divider, List, Button, Rate } from "antd";

function Item({ todo }) {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.todosRedux.isEditing);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const idToEdit = useSelector((state) => state.todosRedux.idToEdit);

  const deleteHandler = () => {
    dispatch(deleteTodoRedux(todo.id));
  };

  const editHandler = () => {
    dispatch(setIdToEdit(todo.id));
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
    dispatch(
      editTodoAsync({ id: todo.id, title: todo.title, isEditing: !isEditing })
    );
  };

  const toggleCompletedHandler = () => {
    dispatch(toggleCompletedRedux(todo.id));
  };



  return (
    <>
      <Divider orientation="left"></Divider>
      <Rate
        count={10} // Define the number of stars
      />
      <List className="todo" bordered>
        {isEditing && todo.id === idToEdit ? ( // Check if isEditing is true for this specific todo
          <div className="todo">
            <input
              key={todo.id}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{
                height: "1.5rem",
                margin: "1rem",
              }}
            />
            <Button onClick={saveHandler}>Save</Button>
            <Button onClick={closeHandler}>Close</Button>
          </div>
        ) : (
          <div
            style={{
              margin: ".25rem",
            }}
            className={`todo ${todo.completed ? "completed" : ""}`}
          >
            <div className="todoItem">
              <Space direction="vertical">
                <Switch
                  style={{
                    margin: ".5rem",
                  }}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={todo.completed}
                  onChange={toggleCompletedHandler}
                />
              </Space>
              {todo.title} - (id): {todo.id}
            </div>
            <div>
              <Button onClick={editHandler}>Edit</Button>
              <Button onClick={deleteHandler}>Delete</Button>
            </div>
          </div>
        )}
      </List>
    </>
  );
}

export default Item;
