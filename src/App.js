import React, { useState } from "react";
import "./App.css";
import Header from "./todo/Header";
import Add from "./todo/Add";

import List from "./todo/List";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <Header />
      <Add setTodos={setTodos} />

      <List todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
