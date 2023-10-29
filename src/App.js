import React, { useEffect } from "react";
import "./App.css";
import Header from "./todo/Header";
import Add from "./todo/Add";
import List from "./todo/List";
import TestCounter from "./todo/TestCounter";
import TestCounterButtons from "./todo/TestCounterButtons";
import { useDispatch } from "react-redux";
import { setTodosRedux } from "./redux/todoSlice";
//test to main 
function App() {

  const dispatch = useDispatch();


  
  const fetchTodos = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
    .then((response) => response.json())
    .then((json) => dispatch(setTodosRedux(json.slice(0, 10))));
  };
  
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <div className="App">
      <Header />
      <TestCounter />
      <TestCounterButtons />
      <Add />
      <List  />
    </div>
  );
}

export default App;
