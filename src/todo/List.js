import React from "react";
import Item from "./Item";

function List({ todos }) {

  return (
    <ul>
     {todos.map((todo, key) => <Item key={key} todo={todo} />)}
    </ul>
  );
}

export default List;
