import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { useTransition, animated } from "react-spring";

const HomePage = React.lazy(() => import("./screens/Home.tsx"));
const Spells = React.lazy(() => import("./screens/Spells.tsx"));
const Students = React.lazy(() => import("./screens/Students.tsx"));
const Staff = React.lazy(() => import("./screens/Staff.tsx"));
const House = React.lazy(() => import("./screens/House.tsx"));
const CharacterDetail = React.lazy(
  () => import("./screens/CharacterDetail.tsx")
);

const App = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 200 },
  });

  return (
    <>
      <Header />
      {transitions((props, item) => (
        <animated.div style={props} key={item.key}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes location={item}>
              <Route path="/" element={<HomePage />} />
              <Route path="/spells" element={<Spells />} />
              <Route path="/students" element={<Students />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/house" element={<House />} />
              <Route
                path="/character/:characterId"
                element={<CharacterDetail />}
              />
            </Routes>
          </Suspense>
        </animated.div>
      ))}
      <Footer />
      <ToastContainer />
    </>
  );
};

const RootApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default RootApp;
