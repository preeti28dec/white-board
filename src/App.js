import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./container/login";
import Singup from "./container/singup";
import Pen from "./components/pen";
import Circledrow from "./components/circle";
import Layout from "./container/layout";
import Rectangle from "./components/reactangle";
function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("userRegister");
    const user = !!auth ? JSON.parse(auth) : undefined;
    setUser(user);
  }, []);
  return (
    <>
      <div className="">
        <Routes>
          {user ? (
            <Route path="/" element={<Layout />} />
          ) : (
            <Route exact path="/login" element={<Login />} />
          )}
          <Route path="/singup" element={<Singup />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/pen"
            element={
              <Layout>
                <Pen />
              </Layout>
            }
          />
          <Route
            path="/reactangle"
            element={
              <Layout>
                <Rectangle/>
              </Layout>
            }
          />
          <Route
            path="/circle"
            element={
              <Layout>
                <Circledrow />
              </Layout>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
