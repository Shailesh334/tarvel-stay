import React, { useState } from 'react'

const SignUp = ({isloggedIn}) => {
    const [isLogin, setIsLogin] = useState(isloggedIn);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
    };
    return (
            <div className="container">
            <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>

            <div>
            {!isLogin && (
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter the username"
                />
                </div>
            )}

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter the mail"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter the password"
                />
            </div>

            <button onClick={handleSubmit} className="submit-btn">
                Submit
            </button>
            </div>

            <div className="toggle-section">
            <p className="toggle-text">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                {isLogin ? 'Sign Up' : 'Log In'}
            </button>
            </div>
        </div>
    )
}

export default SignUp
