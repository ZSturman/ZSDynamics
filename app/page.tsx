"use client";
import LandingPage from "@/components/LandingPage/LandingPage";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import Dashboard from "@/components/Dashboard/Dashboard";
import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <AuthProvider>
      <LandingPageWithUserProvider />
    </AuthProvider>
  );
}
const LandingPageWithUserProvider = () => {
  const { loading, user, isDemoUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedAuthState = localStorage.getItem("isAuthenticated");
      return storedAuthState === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isAuthenticated) {
        console.log("User is authenticated");
      } else {
        console.log("User is not authenticated");
      }
    }
  }, [isAuthenticated]);

  // Update the local state when `loading` changes and user info is available
  useEffect(() => {
    if (!loading && user) {
      setIsAuthenticated(true);
    } else if (!loading && !user) {
      setIsAuthenticated(false);
    }
  }, [loading, user]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <UserProvider authUser={user} isDemoUser={isDemoUser}>
      <Dashboard />
    </UserProvider>
  );
};