import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import IconButton from "../../util/IconButton";
import { useTranslation } from "react-i18next";
import RestartTaskDialog from "../RestartTaskDialog";

const RestartTaskButton = ({id}) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
    <IconButton
      className="m-1"
      isColor="info"
      data-tip={t("actions.taskRestart")}
      isOutlined
      onClick={()=>{setIsDialogOpen(true)}}
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
