import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import React, { useEffect } from "react";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Missing from "./pages/Missing";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useAuth from "./hooks/useAuth";
import checkTokenExpiration from "./actions/checkTokenExpiration";

function App() {
  const { logout, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (checkTokenExpiration()) {
      logout();
      navigate('/');
    }
  }, [ logout, navigate ]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
