import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTemplate from "./pages/AddTemplate";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route index element={<Home />} /> */}

        <Route path="/add-template" element={<AddTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;
