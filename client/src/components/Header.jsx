import React from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import './Header.css'
import { useContext } from "react";

const Header = () => {



    const { isAuthenticated ,  logout} = useContext(AuthContext);

    

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
                    {!isAuthenticated ? (
                    <>
                    
                        <Link to="/login">
                            <button className="btn btn-login" >
                                Sign In
                            </button>
                        </Link>
                    </>
                    ) : (
                    <button className="btn btn-logout" onClick={logout}>
                        Log out
                    </button>
                    )}
                </div>
            </nav>


    </header>

    );
};

export default Header;
