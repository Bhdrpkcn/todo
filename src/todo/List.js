import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

function List({ todos, setTodos }) {
  const todosFromRedux = useSelector((state) => state.todosRedux);
console.log(todosFromRedux)
  return (
    <div>
      <ul>
        {todosFromRedux.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      {todos.map((todo, key) => (
        <Item key={key} setTodos={setTodos} todo={todo} />
      ))}
    </div>
  );
}

export default List;
