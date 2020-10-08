import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";

const PauseTaskButton = () => {
  const { t } = useTranslation();
  return (
    <IconButton
      className="m-1"
      isColor="warning"
      data-tip={t("actions.pause")}
      isOutlined
    >
      <Icon className="fas fa-pause" />
    </IconButton>
  );
};

PauseTaskButton.propTypes = {};

export default PauseTaskButton;
