import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import IconButton from "../../util/IconButton";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";

const EditTaskButton = ({ handleClick }) => {
  const { t } = useTranslation();
  return (
    <IconButton
      className="m-1"
      isColor="info"
      data-tip={t("actions.edit")}
      isOutlined
      onClick={handleClick}
    >
      <Icon className="fas fa-pen" />
    </IconButton>
  );
};

EditTaskButton.propTypes = {
  id: PropTypes.number.isRequired,
};

export default EditTaskButton;
