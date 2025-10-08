import { createContext , useState , useEffect } from "react";
import toast from "react-hot-toast";



export const AuthContext = createContext();



export const AuthProvider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currUserId , setCurrUserId] = useState(null);


    // Store current user id 
    const saveCurrUser = (id) => {
        localStorage.setItem("currUserId", id);
        setCurrUserId(id);
    }




    // Check token on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUserId = localStorage.getItem("currUserId");
    
        if (savedUserId && token) {
            setCurrUserId(savedUserId);

        }

        setIsAuthenticated(!!token);
    }, []);

        // Call this after login/signup
    const login = (token  , id) => {
        localStorage.setItem("token", token);
        localStorage.setItem("currUserId", id);
        setCurrUserId(id)
        setIsAuthenticated(true);
    };

    // Call this to logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currUserId");
        toast.success("Logged Out successfully" , {duration :3000})
        setIsAuthenticated(false);
        setCurrUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout , currUserId , saveCurrUser}}>
            {children}
        </AuthContext.Provider>
);

}