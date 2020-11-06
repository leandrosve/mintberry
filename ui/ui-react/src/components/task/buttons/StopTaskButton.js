import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";
import { useDispatch } from "react-redux";
import { askStopTaskConfirmation } from "../../../redux/actions/task";

const StopTaskButton = ({taskId}) => {
  const { t } = useTranslation();
  const dispatch= useDispatch();
  return (
    <IconButton
      className="m-1"
      isColor="danger"
      data-tip={t("actions.stop")}
      isOutlined
      onClick={()=>dispatch(askStopTaskConfirmation(taskId))}
    >
      <Icon className="fas fa-stop" />
    </IconButton>
  );
};

StopTaskButton.propTypes = {
  taskId: PropTypes.number.isRequired
};

export default StopTaskButton;
