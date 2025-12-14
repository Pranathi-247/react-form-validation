import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
