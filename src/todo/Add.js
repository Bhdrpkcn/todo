import React, { useState } from "react";
import { nanoid } from "nanoid";

function Add({ setTodos }) {
  const [todo, setTodo] = useState("");

  const submitHandler = e => {
    e.preventDefault()
    setTodos(todos => [{
        title: todo,
        completed: false,
        id: nanoid(),
      }, ...todos,]);
    setTodo('');
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
