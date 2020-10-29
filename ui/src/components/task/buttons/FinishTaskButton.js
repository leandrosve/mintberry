import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";
import { useDispatch } from "react-redux";
import { finishTask } from "../../../redux/actions/task";

const FinishTaskButton = ({taskId}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <IconButton
      className="m-1"
      isColor="secondary"
      data-tip={t("actions.finish")}
      isOutlined
      onClick={()=>dispatch(finishTask(taskId))}
    >
      <Icon className="fas fa-flag-checkered" />
    </IconButton>
  );
};

FinishTaskButton.propTypes = {
  taskId: PropTypes.number.isRequired
};

export default FinishTaskButton;
