import React, { useState } from 'react';

function TestComponent() {
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState('');

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="test-component">
      <h2>Test Component</h2>
      
      {/* Counter section */}
      <div className="counter-section">
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>
          Increment
        </button>
      </div>

      {/* Input test section */}
      <div className="input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type something..."
        />
        <p>You typed: {inputText}</p>
      </div>
    </div>
  );
}

export default TestComponent; 