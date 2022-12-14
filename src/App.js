import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./container/login";
import { useEffect, useState } from "react";
import DashBoard from "./container/dashboard";
import Signup from "./container/singup";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => JSON.parse(localStorage.getItem("userRegister")) || false);
  const setAuth = (value) => {
    setIsAuthenticated(value);
  };
  useEffect(()=>{
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  console.log(isAuthenticated);
  return (
    <>
      <Routes>
        <Route path="/" element={ isAuthenticated ? <DashBoard /> : <Navigate to="/login" replace /> }/>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
