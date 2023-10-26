import React from "react";
import { useSelector } from "react-redux"; //to select effected data from Redux actions.(from Slice)

export default function TestCounter() {
  const counterNameAnything = useSelector((state) => state.counter.value);

  return <div>{counterNameAnything}</div>;
}
