import React, { useEffect } from "react";
import "./App.css";
import Header from "./todo/Header";
import Add from "./todo/Add";
import List from "./todo/List";
import { useDispatch } from "react-redux";
import { setTodosRedux } from "./redux/todoSlice";
import { FloatButton } from "antd";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = () => {
      fetch("https://jsonplaceholder.typicode.com/todos/")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json) => dispatch(setTodosRedux(json.slice(0, 10))))
        .catch((error) => {
          console.error("Fetch error:", error);
          alert("There was a network issue. Please refresh the page.");
        });
    };
  
    fetchTodos();
  }, []);
  

  return (
    <div className="App">
      <Header />
      <Add />
      <List />
      <FloatButton.BackTop />
    </div>
  );
}

export default App;
