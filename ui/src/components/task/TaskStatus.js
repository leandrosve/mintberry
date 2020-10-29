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
const TaskStatus = ({status, ...props}) => {
  const { t } = useTranslation();
  return (
    <Tag isColor={tagClassName[status]} isSize="small" {...props}>
      {t(status)}
    </Tag>
  );
};

TaskStatus.propTypes = {
  status: PropTypes.string.isRequired,
  
};

export default TaskStatus;
