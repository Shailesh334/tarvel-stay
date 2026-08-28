import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Plus, LogOut, User, Sparkles } from "lucide-react";
import './Header.css';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <nav className="nav-container">
                <div>
                    <Link to="/" className="logo-aesthetic">
                        {/* Custom Modern Geometric Prism Logo */}
                        <div className="logo-icon-box">
                            <svg 
                                className="brand-icon-svg" 
                                viewBox="0 0 40 40" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient id="prismGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="50%" stopColor="#4f46e5" />
                                        <stop offset="100%" stopColor="#312e81" />
                                    </linearGradient>
                                    <linearGradient id="prismGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#38bdf8" />
                                        <stop offset="100%" stopColor="#818cf8" />
                                    </linearGradient>
                                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="2" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                
                                {/* Background rounded container */}
                                <rect width="40" height="40" rx="12" fill="#0f172a" />
                                
                                {/* Geometric Facets */}
                                <path 
                                    d="M20 7L32 17L20 33L8 17L20 7Z" 
                                    fill="url(#prismGrad1)" 
                                />
                                <path 
                                    d="M20 7L32 17L20 23L8 17L20 7Z" 
                                    fill="url(#prismGrad2)" 
                                    fillOpacity="0.8" 
                                />
                                {/* Center Star Highlight */}
                                <circle cx="20" cy="17" r="2.2" fill="#ffffff" filter="url(#softGlow)" />
                            </svg>
                            <span className="logo-ambient-glow"></span>
                        </div>

                        {/* Brand Name Typography */}
                        <div className="brand-text-container">
                            <span className="brand-word-primary">Travel</span>
                            <span className="brand-word-secondary">Stay</span>
                            <span className="brand-dot"></span>
                        </div>
                    </Link>
                </div>

                <div className="nav-links">
                    <Link to="/addlisting" className="nav-link-add">
                        <Plus size={15} strokeWidth={2.5} />
                        <span>Host a Stay</span>
                    </Link>

                    {!isAuthenticated ? (
                        <Link to="/login">
                            <button className="btn btn-login-aesthetic">
                                <span>Sign In</span>
                                <Sparkles size={14} />
                            </button>
                        </Link>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="user-profile-badge">
                                <User size={15} />
                                <span>Account</span>
                            </div>
                            <button className="btn btn-logout" onClick={logout} title="Log out">
                                <LogOut size={14} />
                                <span>Exit</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
