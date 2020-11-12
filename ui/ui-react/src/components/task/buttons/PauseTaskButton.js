import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";
import { pauseTask } from "../../../redux/actions/task";
import { useDispatch } from "react-redux";

const PauseTaskButton = ({taskId}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <IconButton
      className="m-1"
      isColor="warning"
      data-tip={t("actions.pause")}
      isOutlined
      onClick={()=>dispatch(pauseTask(taskId))}
    >
      <Icon className="fas fa-pause" />
    </IconButton>
  );
};

PauseTaskButton.propTypes = {
  taskId: PropTypes.number.isRequired,
};

export default PauseTaskButton;
