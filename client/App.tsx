import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import HistoricalReturns from "./pages/HistoricalReturns";
import Portfolio from "./pages/Portfolio";
import VillagePartner from "./pages/VillagePartner";
import Goals from "./pages/Goals";
import Payment from "./pages/Payment";
import EmergencyWithdrawal from "./pages/EmergencyWithdrawal";
import RoundUpDemo from "./pages/RoundUpDemo";

const queryClient = new QueryClient();

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.error("Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.");
  // For development, you can use a placeholder key (this won't work for authentication)
  // In production, this should throw an error
  if (import.meta.env.DEV) {
    console.warn("Running in development mode without Clerk key. Authentication features will not work.");
  }
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut><RedirectToSignIn /></SignedOut>
  </>
);

const App = () => (
  <ErrorBoundary>
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/historical-returns"
                element={
                  <ProtectedRoute>
                    <HistoricalReturns />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/village-partner"
                element={
                  <ProtectedRoute>
                    <VillagePartner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goals"
                element={
                  <ProtectedRoute>
                    <Goals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emergency-withdrawal"
                element={
                  <ProtectedRoute>
                    <EmergencyWithdrawal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roundup-demo"
                element={
                  <ProtectedRoute>
                    <RoundUpDemo />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </ErrorBoundary>
);

createRoot(document.getElementById("root")!).render(<App />);
