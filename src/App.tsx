
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import RoutePlanner from "./pages/RoutePlanner";
import RouteSuggestions from "./pages/RouteSuggestions";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [routePreferences, setRoutePreferences] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route 
                path="/planner" 
                element={
                  <RoutePlanner 
                    onPreferencesSubmit={setRoutePreferences} 
                  />
                } 
              />
              <Route 
                path="/suggestions" 
                element={
                  <RouteSuggestions 
                    preferences={routePreferences} 
                  />
                } 
              />
              <Route path="/community" element={<Community />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
