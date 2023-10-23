import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./todo/Header";
import Add from "./todo/Add";

import List from "./todo/List";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => setTodos(json.slice(0, 10)));
  };

  return (
    <div className="App">
      <Header />
      <Add setTodos={setTodos} />

      <List todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
