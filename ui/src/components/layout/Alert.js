import React from "react";
import PropTypes from "prop-types";
import { Delete } from "bloomer/lib/elements/Delete";
import { Notification } from "bloomer/lib/elements/Notification";
import { Icon } from "bloomer/lib/elements/Icon";
import { CSSTransition } from "react-transition-group";

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
    <>
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
    >
      <Notification
        isColor={type}
        className={"is-light " + className}
        {...props}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Delete onClick={handleClose} />
        <Icon
          isSize="large"
          className={renderIconClass(type)}
          style={{ fontSize: "25px" }}
        />
        {message}
      </Notification>
    </CSSTransition>
    </>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Alert;
