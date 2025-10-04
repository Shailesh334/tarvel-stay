import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import './Header.css'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleAuth = () => {
        setIsLoggedIn(!isLoggedIn);
    };
    return (
            
        <header className="header">
            <nav className="nav-container">
                <div>
                    <Link to="/" className="logo">
                        <span>Travel Stay</span>
                    </Link>
                </div>
            

                <div className="nav-links">
                    <Link to="/addlisting" className="nav-link">Add Listing</Link>
                    {!isLoggedIn ? (
                    <>
                        <Link to="/signup">
                            <button className="btn btn-signup">
                            Sign up
                            </button>
                        </Link>

                        <Link to="/login">
                            <button className="btn btn-login" >
                            Log in
                            </button>
                        </Link>
                    </>
                    ) : (
                    <button className="btn btn-logout" onClick={toggleAuth}>
                        Log out
                    </button>
                    )}
                </div>
            </nav>


    </header>

    );
};

export default Header;
