import { createContext, useState } from "react";
import authService from "../services/auth-service";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, pwd) => {
    // Your login logic here
    const user = await authService.login(email, pwd);
    setIsAuthenticated(true);
    return user;
  };

  const logout = () => {
    // Clear tokens from local storage or cookies
    localStorage.removeItem('accessToken');
    // Clear any other locally stored user-related data
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    // Redirect to the login page or another appropriate location
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
