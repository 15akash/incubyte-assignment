import React, { useState } from 'react';
import './App.css';
import { StringCalculator } from './services/StringCalculator';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const calculator = new StringCalculator();

  const handleCalculate = () => {
    try {
      setError(null);
      const sum = calculator.add(input);
      setResult(sum);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError(null);
    setResult(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold mb-8">String Calculator</h1>
        <div className="max-w-2xl w-full">
          <div className="mb-5">
            <label className="block mb-2.5 text-lg">
              Enter numbers:
            </label>
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Enter any string with numbers - all numbers will be extracted and summed (e.g., '1,2,3' or 'a1b2c3' or '//[;]\n1;2')"
              className="w-full h-24 p-2.5 text-base border-2 border-gray-300 rounded resize-y text-gray-800"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="px-6 py-3 text-base bg-cyan-400 text-gray-800 border-none rounded cursor-pointer mb-5 hover:bg-cyan-500 transition-colors"
          >
            Calculate Sum
          </button>

          {result !== null && (
            <div className="p-4 bg-green-500 text-white rounded text-lg font-bold mb-4">
              Result: {result}
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-500 text-white rounded text-base mb-4">
              Error: {error}
            </div>
          )}

          <div className="mt-8 text-left text-sm">
            <h3 className="text-lg font-semibold mb-3">Examples - Numbers are extracted from any string:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Empty string: "" → 0</li>
              <li>Single number: "5" → 5</li>
              <li>Basic delimiters: "1,2,3" → 6</li>
              <li>Mixed characters: "a1b2c3d" → 6</li>
              <li>Any delimiters: "1;2|3" → 6</li>
              <li>Custom format: "//[;]\n1;2" → 3</li>
              <li>Complex string: "abc1def2ghi3" → 6</li>
              <li>Multi-char delims: "1***2***3" → 6</li>
            </ul>
            <p className="mt-4 italic text-gray-400">
              The calculator extracts all numbers from any string and sums them!
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
