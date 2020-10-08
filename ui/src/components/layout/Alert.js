import React from "react";
import PropTypes from "prop-types";
import { Delete } from "bloomer/lib/elements/Delete";
import { Notification } from "bloomer/lib/elements/Notification";
import { Icon } from "bloomer/lib/elements/Icon";

const renderIconClass = (type) => {
  switch (type) {
    case "success":
      return "fas fa-check-circle";
    case "danger":
    case "warning":
      return "fas fa-exclamation-triangle";
    case "info":
      return "fas fa-exclamation-circle";
    default:
      return null;
  }
};

const Alert = ({ type, message, className, handleClose, ...props }) => {
  return (
    <Notification
      isColor={type}
      className={"is-light "+className}
      {...props}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Delete onClick={handleClose}/>
      <Icon
        isSize="large"
        className={renderIconClass(type)}
        style={{ fontSize: "25px" }}
      />
      {message}
    </Notification>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Alert;
