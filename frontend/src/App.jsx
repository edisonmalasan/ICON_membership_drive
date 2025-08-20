import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/components/pages/LoginPage";
import SignupPage from "@/components/pages/SignupPage";
import PaymentPage from "@/components/pages/PaymentPage";
import ForgotPasswordPage from "@/components/pages/ForgotPasswordPage";
import ManagePaymentsPage from "@/components/pages/ManagePaymentsPage";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/payments" element={<ManagePaymentsPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
