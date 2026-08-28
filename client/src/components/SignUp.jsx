import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { API_URL } from '../api.js';

const SignUp = ({ isloggedIn }) => {
    const [isLogin, setIsLogin] = useState(isloggedIn ?? true);
    const { login, saveCurrUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        const { email, password } = formData;
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        setLoading(true);
        try {
            const data = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            const response = await data.json();

            if (response.token) {
                login(response.token, response.user.id);
                saveCurrUser(response.user.id);
                toast.success("Welcome back!");
                navigate("/");
            } else {
                toast.error(response.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong during login");
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        const { username, email, password } = formData;
        if (!username || !email || !password) {
            toast.error("Please fill in all registration fields");
            return;
        }

        setLoading(true);
        try {
            const data = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });
            const response = await data.json();

            if (response.token) {
                login(response.token, response.user.id);
                saveCurrUser(response.user.id);
                toast.success("Account created successfully!");
                navigate("/");
            } else {
                toast.error(response.message || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            toast.error("Could not complete registration");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin();
        } else {
            handleSignUp();
        }
    };

    return (
        <div className="form-page-container" style={{ maxWidth: '440px', marginTop: '40px' }}>
            {/* Segmented Switch */}
            <div className="auth-segmented-switch">
                <button
                    type="button"
                    className={`auth-segment-btn ${isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(true)}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    className={`auth-segment-btn ${!isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(false)}
                >
                    Create Account
                </button>
            </div>

            <div className="form-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
                <p>{isLogin ? 'Sign in to access your stays and reviews' : 'Join TravelStay to book and host destinations'}</p>
            </div>

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} color="var(--slate-400)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                required={!isLogin}
                            />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} color="var(--slate-400)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            style={{ paddingLeft: '38px' }}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} color="var(--slate-400)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            style={{ paddingLeft: '38px' }}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: '100%', padding: '12px', marginTop: '10px' }}
                >
                    {loading ? (
                        <span>Processing...</span>
                    ) : isLogin ? (
                        <>
                            <LogIn size={17} />
                            <span>Sign In</span>
                        </>
                    ) : (
                        <>
                            <UserPlus size={17} />
                            <span>Create Account</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
