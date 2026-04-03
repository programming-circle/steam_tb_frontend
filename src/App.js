import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [games, setGames] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7219/api/Game/get-all-games')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setGames(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {error && <p>Error: {error}</p>}
        {games ? (
          <pre>{JSON.stringify(games, null, 2)}</pre>
        ) : (
          <p>Loading games...</p>
        )}
      </header>
    </div>
  );
}

export default App;
