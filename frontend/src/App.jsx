import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/components/pages/LoginPage";
import SignupPage from "@/components/pages/SignupPage";
import PaymentPage from "@/components/pages/PaymentPage";
import ForgotPasswordPage from "@/components/pages/ForgotPasswordPage";
import AdminPaymentPage from "./components/pages/AdminPaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/test" element={<AdminPaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
