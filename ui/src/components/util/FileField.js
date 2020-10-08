import React, { useState } from "react";
import PropTypes from "prop-types";

const FileField = ({label, name, className}) => {
  return (
    <div className={"file has-name " + className}>
      <label className="file-label">
        <input className="file-input" type="file" name={name}/>
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">{label}</span>
        </span>
      </label>
    </div>
  );
};

FileField.propTypes = {};

export default FileField;
