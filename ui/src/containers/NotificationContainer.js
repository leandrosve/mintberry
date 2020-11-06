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
import { Tag } from "bloomer/lib/elements/Tag";

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
    repeatCount: 0,
  });
  useEffect(() => {
    if (successMessage) {
      setShowNotification((prev) => ({
        open: true,
        message: successMessage,
        type: "success",
        repeatCount:
          successMessage === prev.message ? prev.repeatCount + 1 : 1,
      }));
      dispatch(clearSuccessNotifications(concerns));
    }
    if (errorMessage) {
      setShowNotification((prev) => ({
        open: true,
        message: errorMessage,
        type: "danger",
        repeatCount:
          errorMessage === prev.message ? prev.repeatCount + 1 : 1,
      }));

      dispatch(clearErrorNotifications(concerns));
    }
  }, [errorMessage, successMessage, setShowNotification, dispatch, concerns]);
  return (
    <>
      {showNotification.open && (
        <Alert
          type={showNotification.type}
          message={
            <span>
              {t(showNotification.message)}{" "}
              {showNotification.repeatCount > 1 && (
                <Tag  className={`is-rounded has-text-white has-background-${showNotification.type}-dark`}>
                  {showNotification.repeatCount}
                </Tag>
              )}
            </span>
          }
          handleClose={() =>
            setShowNotification({
              ...showNotification,
              repeatCount:0,
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
