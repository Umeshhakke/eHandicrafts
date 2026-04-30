import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Splash.css";

function Logo() {
  return (
    <svg viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="47" stroke="#c8902a" strokeWidth="1.2" />

      <path
        d="M34 62 C32 56 32 46 36 40 C39 35 45 32 50 32 C55 32 61 35 64 40 C68 46 68 56 66 62 Z"
        fill="#c8902a"
      />

      <ellipse cx="50" cy="40" rx="10" ry="4" fill="#e8b96a" />
      <rect x="40" y="39" width="20" height="5" rx="1" fill="#a8721e" />

      <path d="M37 50 Q50 47 63 50" stroke="#a8721e" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M36 55 Q50 52 64 55" stroke="#a8721e" strokeWidth="0.8" strokeDasharray="2 2" />

      <path d="M30 58 C28 55 27 52 29 50 C30 49 32 50 33 52 L35 60" fill="#faf7f2" />
      <path d="M70 58 C72 55 73 52 71 50 C70 49 68 50 67 52 L65 60" fill="#faf7f2" />

      <path
        d="M29 62 C29 60 31 58 34 58 L34 62 C34 64 38 66 42 66 L58 66 C62 66 66 64 66 62 L66 58 C69 58 71 60 71 62 L71 66 C71 70 65 72 58 72 L42 72 C35 72 29 70 29 66 Z"
        fill="#faf7f2"
      />

      <ellipse cx="44" cy="43" rx="3" ry="5" fill="white" opacity="0.15" />
    </svg>
  );
}

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login"); // redirect after 5 sec
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">

      <div className="splash-logo">
        <Logo />
      </div>

      <div className="splash-divider" />

      <div className="brand-wrapper">
        <h1 className="brand">
          e<span>Handicrafts</span>
        </h1>
        <p className="tagline">Made by Hands, Not Machines</p>
      </div>

      <div className="splash-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  );
}