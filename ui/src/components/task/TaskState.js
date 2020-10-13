import React from "react";
import PropTypes from "prop-types";
import { Tag } from "bloomer/lib/elements/Tag";
import { useTranslation } from "react-i18next";
import { ACTIVE, FINISHED, PAUSED, STOPPED } from "./states";


const tagClassName = {
  [PAUSED]: "warning",
  [ACTIVE]: "primary",
  [STOPPED]: "danger",
  [FINISHED]: "secondary",
};
const TaskState = ({state, ...props}) => {
  const { t } = useTranslation();
  return (
    <Tag isColor={tagClassName[state]} isSize="small" {...props}>
      {t(state)}
    </Tag>
  );
};

TaskState.propTypes = {};

export default TaskState;
