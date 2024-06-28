import { useState } from "react";

const Counter = ({initialCount}) => {
  const [count, setCount] = useState(initialCount);

  const dicrease = () => {
    setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };
  return (
    <div className="counter">
      <button onClick={dicrease}>-</button>
      <span>{count}</span>
      <button onClick={increase}>+</button>
    </div>
  );
};
export default Counter;