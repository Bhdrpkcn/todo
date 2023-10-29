import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addTodoRedux } from "../redux/todoSlice";

function Add() {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");


 const submitHandler = (e) => {
   e.preventDefault();

   dispatch(
     addTodoRedux({
       title: todo,
       completed: false,
       id: nanoid(),
      })
      );
      setTodo("");
    };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="write a todo task"
      ></input>
      <button disabled={!todo} type="submit">
        Ekle
      </button>
    </form>
  );
}

export default Add;
