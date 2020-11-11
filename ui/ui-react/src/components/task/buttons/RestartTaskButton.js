import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import IconButton from "../../util/IconButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openEditTaskForm } from "../../../redux/actions/modal";
import ReactTooltip from "react-tooltip";
import RestartTaskDialog from "../RestartTaskDialog";

const RestartTaskButton = ({id}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(()=>{
    return ()=>ReactTooltip.hide()})
  return (
    <>
    <IconButton
      className="m-1"
      isColor="info"
      data-tip={t("actions.taskRestart")}
      isOutlined
      onClick={(e)=>{setIsDialogOpen(true); e.stopPropagation()}}
    >
      <Icon className="fas fa-redo-alt" />
    </IconButton>
    {isDialogOpen && <RestartTaskDialog handleClose={()=>setIsDialogOpen(false)} id={id}/>}
    </>
  );
};

RestartTaskButton.propTypes = {
  id: PropTypes.number.isRequired,
};

export default RestartTaskButton;
