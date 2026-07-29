import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/Auth/AuthGuard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChatInterface from './components/Chat/ChatInterface';
import PricingPlans from './components/Billing/PricingPlans';
import UserProfile from './components/Profile/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={
              <AuthGuard>
                <ChatInterface />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <UserProfile />
              </AuthGuard>
            }
          />
          <Route
            path="/plans"
            element={
              <AuthGuard>
                <PricingPlans />
              </AuthGuard>
            }
          />
          <Route path="/" element={<Navigate to="/chat" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
