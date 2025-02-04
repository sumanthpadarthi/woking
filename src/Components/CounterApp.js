import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => prev > 0 ? prev - 1 : 0);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <div 
        className="background-fill"
        style={{ height: `${count * 10}vh` }}
      />
      <div className="counter-content">
        <h1 className="count-display">{count}</h1>
        <div className="button-group">
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement}>Decrement</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
