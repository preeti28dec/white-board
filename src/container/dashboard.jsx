import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
export default function Dashboard() {
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
        navigate('/login')
        clearInterval(timer);
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
      <div className="my-6">
        <div className="maine_login_page">
          <div className="my-4 text-end">
            <button
              className={
                clock <= "0:10"
                  ? " w-16 h-16 bg-red-600 rounded-full font-bold "
                  : "font-bold w-16 h-16 bg-slate-600  rounded-full"
              }
            >
              {clock}
            </button>
          </div>
        </div>
        <div className="text-end logout_button">
          <button className="py-2 px-2 text-sm rounded-md bg-slate-300">
            <Link to="/login">Logout</Link>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-6 font-bold">
        <div>
          <Link to="/pen">Pen</Link>
        </div>
        <div>
          <Link to="/reactangle">Reactangle</Link>
        </div>
        <div>
          <Link to="/circle">Circle</Link>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.div`
  /* max-width: 1400px;
  width: 95%;
  margin: auto;
  .konvajs-content {
    width: 100% !important;
    height: auto !important;
  }
  canvas {
    width: 100% !important;
    height: auto !important;
    margin: auto !important;
    border: 2px solid !important;
  } */
`;
