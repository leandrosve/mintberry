import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import IconButton from "../../util/IconButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openEditTaskForm } from "../../../redux/actions/modal";
import ReactTooltip from "react-tooltip";

const EditTaskButton = ({id}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>ReactTooltip.hide()})
  return (
    <IconButton
      className="m-1"
      isColor="info"
      data-tip={t("actions.edit")}
      isOutlined
      onClick={()=>dispatch(openEditTaskForm(id))}
    >
      <Icon className="fas fa-pen" />
    </IconButton>
  );
};

EditTaskButton.propTypes = {
  id: PropTypes.number.isRequired,
};

export default EditTaskButton;
