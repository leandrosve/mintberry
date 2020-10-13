import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";
import { pauseTask } from "../../../redux/actions/task";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";

const PauseTaskButton = ({taskId}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(()=>ReactTooltip.rebuild())
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

PauseTaskButton.propTypes = {};

export default PauseTaskButton;
