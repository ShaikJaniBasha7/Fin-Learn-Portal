import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import Calculator from './pages/Calculator';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Personal Finance Learning Portal | College CSE Assignment</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
