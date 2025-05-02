'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeMode, setIframeMode] = useState<'signup' | 'login' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenExists = document.cookie.includes("wisp-token=");
    setIsLoggedIn(tokenExists);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.data?.event) {
        case "OASIS_SIGNUP_SUCCESS":
          setShowIframe(false);
          alert("Signup complete. You can now log in.");
          break;

        case "OASIS_USER_EXISTS":
          setShowIframe(false);
          alert("User already exists. Try logging in instead.");
          break;

        case "OASIS_LOGIN_SUCCESS":
          const token = event.data.data.token;
          document.cookie = `wisp-token=${token}; path=/; max-age=86400; secure; samesite=Strict`;
          setShowIframe(false);
          setIsLoggedIn(true);
          window.location.href = "/dashboard";
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleSignupClick = () => {
    setIframeMode("signup");
    setShowIframe(true);
  };

  const handleLoginClick = () => {
    setIframeMode("login");
    setShowIframe(true);
  };

  const handleLogout = () => {
    document.cookie = "wisp-token=; path=/; max-age=0";
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const iframeSrc =
    iframeMode === "signup"
      ? "http://localhost:8080/signup"
      : iframeMode === "login"
      ? "http://localhost:8080/login"
      : "";

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-white text-black">
      {/* Blurred background overlay */}
      {showIframe && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-md z-40" />
      )}

      {/* Main content */}
      <div className="z-10">
        <h1 className="text-3xl font-bold mb-8">Welcome to TeamWisp</h1>
        <div className="flex space-x-6">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleSignupClick}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
              <button
                onClick={handleLoginClick}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* OAuth-style modal */}
      {showIframe && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-[400px] h-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl transition-all">
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="Auth Flow"
            />
          </div>
        </div>
      )}
    </div>
  );
}
