import React from "react";
import "../styles/Spinner.css";
function Spinner() {
  return (
    <div style={{ marginTop: "100px", marginLeft: "200px", height: "80vh" }}>
      <div class="lds-dual-ring"></div>
    </div>
  );
}

export default Spinner;
