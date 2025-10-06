import { createContext , useState , useEffect } from "react";



export const AuthContext = createContext();



export const AuthProvider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check token on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

        // Call this after login/signup
    const login = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    // Call this to logout
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
);

}