import "./scss/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Nav";
import Home from "./Home";
import CountryDetail from "./Details";

function App() {
  return (
    <Router>
      {/* The Navbar stays on top of every page */}
      <Navbar />

      <main>
        <Routes>
          {/* Route for the main page with all countries */}
          <Route path="/" element={<Home />} />

          {/* Route for the specific country details */}
          <Route path="/country/:countryName" element={<CountryDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
