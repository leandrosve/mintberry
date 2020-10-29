import React from "react";
import Loader from "react-loader-spinner";

const Spinner = ({ isVisible = false }) => (
  <>
    {isVisible && (
      <div>
        <Loader
          type="TailSpin"
          color="#00d1b2"
          style={{ width: "48px", height: "48px", margin: "auto" }}
          height={48}
          width={48}
        />
      </div>
    )}
  </>
);

export default Spinner;
