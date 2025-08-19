import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/components/pages/LoginPage";
import SignupPage from "@/components/pages/SignupPage";
import PaymentPage from "@/components/pages/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
