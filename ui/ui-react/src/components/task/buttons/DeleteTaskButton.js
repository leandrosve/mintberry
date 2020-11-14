import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import IconButton from "../../util/IconButton";
import { askDeleteTaskConfirmation } from "../../../redux/actions/task";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const DeleteTaskButton = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <IconButton
      isColor="black"
      className="m-1"
      data-tip={t("actions.delete")}
      isOutlined
      onClick={() => {
        dispatch(askDeleteTaskConfirmation(id));
      }}
    >
      <Icon className="fas fa-trash" />
    </IconButton>
  );
};

DeleteTaskButton.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DeleteTaskButton;
