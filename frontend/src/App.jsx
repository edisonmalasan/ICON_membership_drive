import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/components/pages/LandingPage";
import LoginPage from "@/components/pages/LoginPage";
import SignupPage from "@/components/pages/SignupPage";
import PaymentOptionPage from "@/components/pages/PaymentOptionPage";
import ForgotPasswordPage from "@/components/pages/ForgotPasswordPage";
import ManagePaymentsPage from "@/components/pages/ManagePaymentsPage";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/HomePage";
import AccountCreationPage from "./components/pages/AccountCreationPage";
import StickyColumnsTableDemo from "./components/table-07";
import TermsPolicyPage from "@/components/pages/TermsPolicyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* will be a default route */}
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment-option" element={<PaymentOptionPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/manage-payments" element={<ManagePaymentsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-creation" element={<AccountCreationPage />} />
        <Route path="/test" element={<StickyColumnsTableDemo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/terms-policy" element={<TermsPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
