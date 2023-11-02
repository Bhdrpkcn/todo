import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addTodoRedux } from "../redux/todoSlice";
import { AutoComplete, Button } from "antd";

function Add() {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");
  const [options, setOptions] = useState([]);

  const getPanelValue = (searchText) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addTodoRedux({
        title: todo,
        completed: false,
        id: nanoid(),
        source: "local",
      })
    );
    setTodo(""); 
  };

  const onChange = (data) => {
    setTodo(data); 
  };

  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  return (
    <form onSubmit={submitHandler}>
      <AutoComplete
        options={options}
        style={{
          width: 300,
          height:50,
          margin:".5rem",
        }}
        onSearch={(text) => setOptions(getPanelValue(text))}
        value={todo}
        onChange={onChange}
        placeholder="Write a todo task"
      />
<Button disabled={!todo} type="primary" htmlType="submit">
        Add
      </Button>
    </form>
  );
}

export default Add;
