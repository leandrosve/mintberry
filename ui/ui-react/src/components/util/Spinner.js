import React from "react";

const Spinner = ({ isVisible = false }) => (
  <>{isVisible && <div className="loader"></div>}</>
);

export default Spinner;
