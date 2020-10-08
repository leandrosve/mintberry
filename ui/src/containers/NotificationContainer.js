import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Alert from "../components/layout/Alert";
import { selectSuccessNotifications } from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccessNotifications } from "../redux/actions/notification";
import { useTranslation } from "react-i18next";

const NotificationContainer = ({ concerns }) => {
  const {t} = useTranslation();
  const successMessage = useSelector((state) =>
    selectSuccessNotifications(state, concerns)
  );
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState({
    open: false,
    message: null,
    type: "info",
  });
  useEffect(() => {
    if (successMessage) {
      setShowNotification({
        open: true,
        message: successMessage,
        type: "success",
      });
      dispatch(clearSuccessNotifications(concerns));
    }
  }, [successMessage, setShowNotification, dispatch, concerns]);
  return (
    <>
      {showNotification.open && (
        <Alert
          type={showNotification.type}
          message={t(showNotification.message)}
          handleClose={() =>
            setShowNotification({
              ...showNotification,
              open: false,
            })
          }
        />
      )}
    </>
  );
};

NotificationContainer.propTypes = {};

export default NotificationContainer;
