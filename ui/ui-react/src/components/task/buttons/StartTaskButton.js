import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";
import { useDispatch } from "react-redux";
import { startTask } from "../../../redux/actions/task";
import ReactTooltip from "react-tooltip";

const StartTaskButton = ({taskId}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(()=>ReactTooltip.rebuild())
  return (
    <IconButton
      className="m-1"
      isColor="primary"
      data-tip={t("actions.start")}
      isOutlined
      onClick={()=>dispatch(startTask(taskId))}
    >
      <Icon className="fas fa-play" />
    </IconButton>
  );
};

StartTaskButton.propTypes = {
  taskId: PropTypes.number.isRequired
};

export default StartTaskButton;
