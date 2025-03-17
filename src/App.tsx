import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

const HomePage = React.lazy(() => import("./screens/Home.tsx"));
const Spells = React.lazy(() => import("./screens/Spells.tsx"));
const Students = React.lazy(() => import("./screens/Students.tsx"));
const Staff = React.lazy(() => import("./screens/Staff.tsx"));
const House = React.lazy(() => import("./screens/House.tsx"));

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/spells" element={<Spells/>} />
          <Route path="/students" element={<Students/>} />
          <Route path="/staff" element={<Staff/>} />
          <Route path="/house" element={<House/>} />
        </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;