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
import TermsPolicyPage from "./components/pages/TermsPolicyPage";
import RequireMemberData from "./util/RequireMemberData";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/renewal" element={<SignupPage type="renewal" />} />
        <Route path="/payment-option" element={<RequireMemberData><PaymentOptionPage /></RequireMemberData>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/manage-payments" element={<ManagePaymentsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-creation" element={<AccountCreationPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/terms-policy" element={<TermsPolicyPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
