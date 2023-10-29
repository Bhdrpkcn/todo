import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

function List() {
  const todosFromRedux = useSelector((state) => state.todosRedux);

  return (
    <div>
      {todosFromRedux.todos.map((todo, key) => (

        <Item key={key} todo={todo} />
      ))}
    </div>
  );
}

export default List;
