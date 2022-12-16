import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./container/login";
import { useEffect, useState } from "react";
import DashBoard from "./container/dashboard";
import Signup from "./container/singup";
function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("userRegister");
    const user = !!auth ? JSON.parse(auth) : undefined;
    setUser(user);
  }, []);
  console.log(user);

  return (
    <>
      <Routes>
        {user ? (
          <Route path="/" element={<DashBoard />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
