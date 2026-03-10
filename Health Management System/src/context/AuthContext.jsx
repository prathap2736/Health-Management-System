import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user/token
        const storedUser = localStorage.getItem("hms_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === "demo@hms.com" && password === "password123") {
                    const userData = {
                        id: 1,
                        name: "Dr. Sarah Mitchell",
                        email: email,
                        role: "doctor",
                        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                    };
                    setUser(userData);
                    localStorage.setItem("hms_user", JSON.stringify(userData));
                    resolve(userData);
                } else if (email === "admin@hms.com" && password === "admin123") {
                    const userData = {
                        id: 2,
                        name: "System Admin",
                        email: email,
                        role: "admin",
                        avatar: null
                    };
                    setUser(userData);
                    localStorage.setItem("hms_user", JSON.stringify(userData));
                    resolve(userData);
                } else if (email === "patient@hms.com" && password === "patient123") {
                    const userData = {
                        id: 3,
                        name: "John Doe",
                        email: email,
                        role: "patient",
                        avatar: null
                    };
                    setUser(userData);
                    localStorage.setItem("hms_user", JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject("Invalid email or password");
                }
            }, 1500);
        });
    };

    const register = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Determine dashboard based on role or default to patient
                const role = data.role || "patient";
                const userData = { ...data, id: Date.now(), role };
                setUser(userData);
                localStorage.setItem("hms_user", JSON.stringify(userData));
                resolve(userData);
            }, 1500);
        });
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("hms_user");
        toast.success("Logged out successfully");
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem("hms_user", JSON.stringify(updatedUser));
        toast.success("Profile updated!");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
