import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";

const StopTaskButton = () => {
  const { t } = useTranslation();
  return (
    <IconButton
      className="m-1"
      isColor="danger"
      data-tip={t("actions.stop")}
      isOutlined
    >
      <Icon className="fas fa-stop" />
    </IconButton>
  );
};

StopTaskButton.propTypes = {};

export default StopTaskButton;
