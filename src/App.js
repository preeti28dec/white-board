import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./container/login";
import { useEffect, useState } from "react";
import DashBoard from "./container/dashboard";
import Signup from "./container/singup";
function App() {
  const [user, setUser] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("userRegister"));
    if (auth) {
      setUser(true);
      navigate('/');
    }
    else{
      setUser(false)
      navigate('/login')
    }
  },[user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
