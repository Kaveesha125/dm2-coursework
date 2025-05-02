import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login';

import Register from './components/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <h1 style={{ textAlign: 'center', color: '#007bff', fontSize: '3rem', margin: '20px 0' }}>
  Welcome to UrbanFoods
</h1>
        </header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
