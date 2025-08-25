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
import VerificationPendingPage from "./components/pages/VerificationPage";
import { RestrictAdmin } from "./util/RestrictAdmin";
import RedirectPaid from "./util/RedirectPaid";
import { RedirectMemberFilled } from "./util/RequireMemberData";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RedirectPaid><RedirectMemberFilled><SignupPage /></RedirectMemberFilled></RedirectPaid>} />
        <Route path="/renewal" element={<RedirectPaid><RedirectMemberFilled><SignupPage type="renewal" /></RedirectMemberFilled></RedirectPaid>} />
        <Route path="/payment-option" element={<RequireMemberData><PaymentOptionPage /></RequireMemberData>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/manage-payments" element={<RestrictAdmin><ManagePaymentsPage /></RestrictAdmin>} />
        <Route path="/dashboard" element={<RestrictAdmin><Dashboard /></RestrictAdmin>} />
        <Route path="/account-creation" element={<RestrictAdmin><AccountCreationPage /></RestrictAdmin>} />
        <Route path="/home" element={<Home />} />
        <Route path="/terms-policy" element={<TermsPolicyPage />} />
        <Route path="/check-your-email" element={<VerificationPendingPage/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
