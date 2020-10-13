import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectActiveTasksCount } from "../../redux/reducers";
import { Tag } from "bloomer/lib/elements/Tag";
import { useTranslation } from "react-i18next";

const ActiveCounter = () => {
  const count = useSelector((state) => selectActiveTasksCount(state));
  const { t } = useTranslation();
  return (
    <Tag
      className="is-rounded"
      data-tip={t("activeTasksCount", { count })}
      isColor="primary"
    >
      {count}
    </Tag>
  );
};

ActiveCounter.propTypes = {};

export default ActiveCounter;
