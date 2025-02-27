import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import CreateSubscription from "./pages/CreateSubscription";
import EditSubscription from "./pages/EditSubscription";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import LandingPage from "./pages/LandingPage"; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions/create" element={<CreateSubscription />} />
        <Route path="/subscriptions/edit/:id" element={<EditSubscription />} />
        <Route path="/subscriptions/details/:id" element={<SubscriptionDetails />} />

        {/* Fallback Route */}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;