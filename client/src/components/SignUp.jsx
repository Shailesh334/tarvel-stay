import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import {API_URL} from '../api.js';


const SignUp = ({isloggedIn}) => {
    const [isLogin, setIsLogin] = useState(isloggedIn);
    const { login } = useContext(AuthContext);
    const { saveCurrUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });


    const handleLogin = async()=>{
        
        const { email , password} = formData

        if( email == '' || password == ''){
            toast.error("Enter all the details" , {duration : 3000})
            return
        }
        try{
            const data = await fetch(`${API_URL}/auth/login`, {
                method:"POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                        email : formData.email ,
                        password : formData.password
                })

            })
            const response = await data.json();

            if(response.token){
                login(response.token , response.user.id)
                saveCurrUser(response.user.id);
                console.log(response);
                toast.success("Logged In Successfully !");
                navigate("/")
            }
            else{

                toast.error(response.message)
            }
            
  

        }
        catch(err){
            console.log(err);
        }

    }

    const handleSignUp = async()=>{
        
        const {username , email , password} = formData

        if(username == '' || email == '' || password == ''){
            toast.error("Enter all the details" , {duration : 3000})
            return
        }

        try{
            const data = await fetch(`${API_URL}/auth/register`, {
                method:"POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                        username : formData.username,
                        email : formData.email ,
                        password : formData.password
                })

            })
            const response = await data.json();

            if(response.token){
                login(response.token , response.user.id)
                saveCurrUser(response.user.id)
                console.log(response)
                toast.success("Account created Successfully !")
                navigate("/")
            }
            else{
                
                toast.error(response.message)
            }
        }
        catch(err){
            console.log(err);
        }
    }


    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        
        if(formData.username === ""){
            handleLogin();
        }
        else{
            handleSignUp();
        }
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
