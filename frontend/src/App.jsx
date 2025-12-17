import { useEffect, useState } from 'react';
import './App.css';

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [greeting, setGreeting] = useState('...');
  const [dbStatus, setDbStatus] = useState('checking...');

  useEffect(() => {
    fetch(`${apiBase}/api/greeting`)
      .then((res) => res.json())
      .then((data) => setGreeting(data.message))
      .catch(() => setGreeting('Error calling backend'));

    fetch(`${apiBase}/api/db-check`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setDbStatus(`Connected, server time: ${data.now}`);
        } else {
          setDbStatus(`DB error: ${data.error}`);
        }
      })
      .catch((err) => setDbStatus(`DB error: ${err.message}`));
  }, []);

  return (
    <main className="container">
      <header>
        <p className="eyebrow">Project 1 – React + Node + Postgres</p>
        <h1>Fullstack demo</h1>
        <p className="sub">
          Frontend (React/Vite) gọi API Node/Express và kiểm tra kết nối Postgres.
        </p>
      </header>

      <section className="panel">
        <h2>Backend status</h2>
        <p className="status">{greeting}</p>
      </section>

      <section className="panel">
        <h2>Database check</h2>
        <p className="status">{dbStatus}</p>
      </section>

      <section className="panel">
        <h2>Cách chạy nhanh</h2>
        <ol>
          <li>Chạy backend: <code>npm run dev</code> tại thư mục backend.</li>
          <li>Chạy frontend: <code>npm run dev</code> tại thư mục frontend.</li>
          <li>Hoặc: <code>docker compose up --build</code> ở thư mục gốc.</li>
        </ol>
      </section>
    </main>
  );
}

export default App;
