"use client";
import { motion } from "framer-motion";
import "./landingPage.css";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); 
  const { loginWithEmail, loginWithGoogle, loginAsDemoUser, registerWithEmail } = useAuth();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    if (isSignUp) {
      const confirmPassword = event.currentTarget.confirmPassword.value;
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        setIsLoading(false);
        return;
      }
      await registerWithEmail(email, password);
    } else {
      await loginWithEmail(email, password);
    }
    
    setIsLoading(false);
  }

  return (
    <div className="landing-page w-full">
      <motion.div
        className="background-animation"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1, y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="content sm-container">
        <h1 className="title ">My Personality</h1>
        <p className="tagline">Discover your true self</p>
        
        <div className="tabs">
          <Button className={`tab ${!isSignUp ? "active" : ""}`} onClick={() => setIsSignUp(false)}>
            Login
          </Button>
          <Button className={`tab ${isSignUp ? "active" : ""}`} onClick={() => setIsSignUp(true)}>
            Sign Up
          </Button>
        </div>

        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input id="email" placeholder="name@example.com" type="email" disabled={isLoading} />
          </div>
          <div className="form-group">
            <Label htmlFor="password" className="sr-only">Password</Label>
            <Input id="password" placeholder="Password" type="password" disabled={isLoading} />
          </div>
          {isSignUp && (
            <div className="form-group">
              <Label htmlFor="confirmPassword" className="sr-only">Confirm Password</Label>
              <Input id="confirmPassword" placeholder="Confirm Password" type="password" disabled={isLoading} />
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="primary-btn">
            {isLoading ? <Loader /> : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="buttons">
          <Button className="social-btn" onClick={loginWithGoogle}><FcGoogle /> Continue with Google</Button>
          <Button className="social-btn" onClick={loginAsDemoUser}>Try Demo</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
