import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./container/login";
import Singup from "./container/singup";
import { useEffect, useState } from "react";
import DashBoard from "./container/dashboard";
function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem("userRegister");
    const user = JSON.parse(auth);
    if(user.token){
      setUser(true);
    }
  });
  console.log(user, "auth");
  return (
    <>
      <div className="">
        <Routes>
          {user? (
            <Route path="/" element={<DashBoard/>} />
          ) : (
            <Route exact path="/login" element={<Login />} />
          )}
          <Route exact path="/login" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
