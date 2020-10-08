import React from "react";
import PropTypes from "prop-types";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import IconButton from "../../util/IconButton";

const FinishTaskButton = () => {
  const { t } = useTranslation();
  return (
    <IconButton
      className="m-1"
      isColor="success"
      data-tip={t("actions.finish")}
      isOutlined
    >
      <Icon className="fas fa-flag-checkered" />
    </IconButton>
  );
};

FinishTaskButton.propTypes = {};

export default FinishTaskButton;
