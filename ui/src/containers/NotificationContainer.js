import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Alert from "../components/layout/Alert";
import {
  selectSuccessNotifications,
  selectErrorNotifications,
} from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorNotifications,
  clearSuccessNotifications,
} from "../redux/actions/notification";
import { useTranslation } from "react-i18next";

const NotificationContainer = ({
  concerns = [],
  onlyErrors = false,
  onlySuccess = false,
}) => {
  const { t } = useTranslation();
  const successMessage = useSelector(
    (state) => !onlyErrors && selectSuccessNotifications(state, concerns)
  );

  const errorMessage = useSelector(
    (state) => !onlySuccess && selectErrorNotifications(state, concerns)
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
    if (errorMessage) {
      setShowNotification({
        open: true,
        message: errorMessage,
        type: "danger",
      });

      dispatch(clearErrorNotifications(concerns));
    }
  }, [errorMessage, successMessage, setShowNotification, dispatch, concerns]);
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

NotificationContainer.propTypes = {
  concerns: PropTypes.arrayOf(String),
  onlyErrors: PropTypes.bool,
  onlySuccess: PropTypes.bool,
};

export default NotificationContainer;
