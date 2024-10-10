"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { app } from "@/firebase/clientApp";
import { getDemoUser } from "@/data/demoUser";

const auth = getAuth(app);

// Type definition for the AuthContext
type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  isDemoUser: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemoUser: () => void;
  logout: () => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
};

// Default context values
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  loading: false,
  user: null,
  isDemoUser: false,
  loginWithEmail: async () => {},
  loginWithGoogle: async () => {},
  loginAsDemoUser: () => {},
  logout: async () => {},
  registerWithEmail: async () => {},
};

// Creating the AuthContext
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Type definition for AuthProvider props
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedAuthState = localStorage.getItem("isAuthenticated");
      return storedAuthState === "true";
    }
    return false;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [isDemoUser, setIsDemoUser] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedDemoUser = localStorage.getItem("isDemoUser");
      return storedDemoUser === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    setLoading(true);

    if (isDemoUser) {
      loginAsDemoUser();
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    // Monitor authentication state and sync with localStorage
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isDemoUser", "false");
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.setItem("isAuthenticated", "false");
        localStorage.setItem("isDemoUser", "false");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoUser, user]);

  

  // Login with Email and Password
  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsAuthenticated(true);
      setUser(userCredentials.user);
      setIsDemoUser(false);
      localStorage.setItem("user", JSON.stringify(userCredentials.user));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isDemoUser", "false");
    } catch (error) {
      console.error("Error signing in with email and password", error);
    } finally {
      setLoading(false);
    }
  };

  // Register with Email and Password
  const registerWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsAuthenticated(true);
      setUser(userCredentials.user);
      setIsDemoUser(false);
      localStorage.setItem("user", JSON.stringify(userCredentials.user));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isDemoUser", "false");
    } catch (error) {
      console.error("Error registering with email and password", error);
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      setUser(userCredentials.user);
      setIsDemoUser(false);
      localStorage.setItem("user", JSON.stringify(userCredentials.user));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isDemoUser", "false");
    } catch (error) {
      console.error("Error signing in with Google", error);
    } finally {
      setLoading(false);
    }
  };

  // Login as Demo User
  const loginAsDemoUser = async () => {
    setIsAuthenticated(true);
    const demoUser = await getDemoUser();
    setUser(demoUser);
    setIsDemoUser(true);
    localStorage.setItem("user", JSON.stringify(demoUser));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isDemoUser", "true");
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      setIsDemoUser(false);
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", "false");
      localStorage.setItem("isDemoUser", "false");
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        isDemoUser,
        loginWithEmail,
        loginWithGoogle,
        loginAsDemoUser,
        logout,
        registerWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
