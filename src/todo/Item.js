import React from "react";

function Item({ todo }) {
  const deleteHandler = () => {

  };
  const editHandler = () => {
  };
console.log(todo)
  return (
    <li>
      <span>
      {todo.title}-(id):{todo.id}
      </span>
      <button onClick={editHandler}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
}

export default Item;
