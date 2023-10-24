import React, { useState } from "react";
//Testing to only update main branch
function Item({ setTodos, todo }) {
  const [editTodo, setEditTodo] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const deleteHandler = () => {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
  };
  const editHandler = () => {
    setEditTodo(true);
  };

  const saveHandler = () => {
    const updatedTodo = { ...todo, title: editedTitle };
    // api den gelmeyen todo lar için if else blok :
    if (typeof todo.id === "string" && !todo.id.startsWith("api_")) {
      setTodos((todos) =>
        todos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
      setEditTodo(false);
    } else {
      // API den gelen todoların editi için put methodu ile müdahele :
      fetch(`https://jsonplaceholder.typicode.com/todos//${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("API request failed.");
          }
          return response.json();
        })
        .then((data) => {
          // Güncellediğim api den gelen todo yu Todos dizisine ekliyorum
          setTodos((todos) => todos.map((t) => (t.id === data.id ? data : t)));
          setEditTodo(false);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const toggleCompleted = () => {
    // todo'nun `completed` durumunu tersine çevir
    const updatedTodo = { ...todo, completed: !todo.completed };
    setTodos((todos) => todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
  };

  const closeHandler = () => {
    setEditTodo(false);
  };

  console.log(todo);
  return (
    <div className="todoList">
      {editTodo ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={saveHandler}>Save</button>
          <button onClick={closeHandler}>close</button>
        </div>
      ) : (
        <div className={`todo ${todo.completed ? "completed" : ""}`}>
          <input
            className="checkBox"
            type="checkbox"
            checked={todo.completed}
            onChange={toggleCompleted}
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
