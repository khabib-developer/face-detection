import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaceDetecion } from "./pages/face-detection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FaceDetecion />} />
      </Routes>
    </Router>
  );
}
export default App;
