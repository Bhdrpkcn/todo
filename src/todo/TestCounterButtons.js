import React from "react";
import { useDispatch } from "react-redux"; //to use exported actions
import { increment, decrement } from "../redux/counterSlice"; // actions from counterSlice (Redux Slice)

export default function TestCounterButtons() {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <button onClick={handleIncrement}>Increase</button>
      <button onClick={handleDecrement}>Decrease</button>
    </div>
  );
}
