import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");
    let navigate = useNavigate();
    function onSignUp() {
      const obj = {
        email: email,
        password: password,
        token: password + email,
      };
      if (email && password === conformPassword) {
        localStorage.setItem("userRegister", JSON.stringify(obj));
        navigate('/');
      }
    }
    function onsubmit(){
      var timestamp = new Date().getTime()+(5* 60* 1000)
        localStorage.setItem("key", JSON.stringify(timestamp));
    }
  return (
    <div className="relative flex flex-col justify-center  ">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
          Singup account
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Conform Password
            </label>
            <input
                onChange={(e) => setConformPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                placeholder="Enter your password"
            />
          </div>

          <button className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </button>
          <div className="mt-6">
            <button
              onClick={()=>{onSignUp();onsubmit()}}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Singup
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>  
      </div>
    </div>
  );
}
