import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";

const StartTaskButton = () => {
  const { t } = useTranslation();
  return (
    <IconButton
      className="m-1"
      isColor="primary"
      data-tip={t("actions.start")}
      isOutlined
    >
      <Icon className="fas fa-play" />
    </IconButton>
  );
};

StartTaskButton.propTypes = {};

export default StartTaskButton;
