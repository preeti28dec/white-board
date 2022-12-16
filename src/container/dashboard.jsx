import React, { useEffect, useState } from "react";
import DrawingPage from "../components/drawingPage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DashBoard() {
  const [clock, setClock] = useState(0);
  let navigate = useNavigate();
  const timeDifference = (date1) => {
    let difference = date1 - new Date().getTime();

    let minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    let secondsDifference = Math.floor(difference / 1000);

    return `${minutesDifference}:${secondsDifference}`;
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("key"));
    const timer = setInterval(() => {
      if (new Date().getTime() > data) {
        clearInterval(timer);
        // navigate("/login");
      } else {
        setClock(timeDifference(data));
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <Root>
      <div className="flex justify-end items-center p-4">
      <div className="maine_login_page">
           <div className="my-4">
             <button
               className={
                 clock < "0:10"
                   ? " w-16 h-16 bg-red-600 rounded-full text-white font-bold "
                   : "font-bold w-16 h-16 bg-slate-400  rounded-full"
               }
             >
               {clock}
             </button>
           </div>
         </div>
      </div>
      <div>
        <div>
          <DrawingPage />
        </div>
      </div>
    </Root>
  );
}


const Root = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: auto;
 `