import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomersPage from "./pages/CustomersPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/clientes" />} />
          <Route path="/clientes" element={<CustomersPage />} />
          <Route path="/citas" element={<AppointmentsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
