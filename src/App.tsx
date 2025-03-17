import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomePage from "./screens/Home.tsx";
import Spells from "./screens/Spells.tsx";

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/spells" element={<Spells/>} />
        </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;