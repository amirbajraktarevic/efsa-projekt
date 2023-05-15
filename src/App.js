import "./App.css";
import Home from "./views/Home";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import NavBar from "./components/NavBar";
import Dashboard from "./views/Dashboard";
import About from "./views/About";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="naslovna" element={<Landing />} />
        <Route path="pregled" element={<Dashboard />} />
        <Route path="oprojektu" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
