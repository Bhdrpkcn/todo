import React from "react";
import { useDispatch } from "react-redux"; //to use exported actions
import { increment, decrement } from "../redux/counterSlice"; // actions from counterSlice (Redux Slice)
import { Button} from 'antd'
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
      <Button onClick={handleIncrement}>Increase</Button>
      <Button onClick={handleDecrement}>Decrease</Button>
    </div>
  );
}
