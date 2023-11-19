import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; // Import your page components
import ChildPage from './pages/ChildPage/ChildPage';
import ParentPage from './pages/ParentPage/ParentPage';
import ChatPage from './pages/ChatPage/ChatPage'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/child" element={<ChildPage />} />
          <Route path="/parent" element={<ParentPage />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
