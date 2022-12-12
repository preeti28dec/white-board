import React from "react";
import styled from "styled-components";
import Dashboard from "./dashboard";

function Layout({ children }) {
  return (
    <Root>
      <Dashboard />
      <main>{children}</main>
    </Root>
  );
}

export default Layout;

const Root = styled.div`
  max-width: 1400px;
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
  }
`;
