import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNumbers = async () => {
    const urls = [
      'http://20.244.56.144/numbers/primes',
      'http://20.244.56.144/numbers/fibo',
      'http://20.244.56.144/numbers/odd'
    ];

    setIsLoading(true);
    try {
      const responses = await Promise.all(
        urls.map(url => axios.get(`http://localhost:8008/numbers?url=${encodeURIComponent(url)}`))
      );

      const mergedNumbers = Array.from(new Set(responses.flatMap(response => response.data.numbers)));
      setNumbers(mergedNumbers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Number Management Frontend</h1>
      <button onClick={fetchNumbers} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Numbers'}
      </button>
      <div>
        <h2>Result:</h2>
        {numbers.length === 0 ? (
          <p>No numbers found.</p>
        ) : (
          <ul>
            {numbers.map(number => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;