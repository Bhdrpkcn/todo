import React from "react";
import Item from "./Item";

function List({ todos, setTodos }) {

  return (
    <div>
     {todos.map((todo, key) => <Item key={key} setTodos={setTodos} todo={todo} />)}
    </div>
  );
}

export default List;
