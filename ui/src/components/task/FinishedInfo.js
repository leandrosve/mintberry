import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Icon } from "bloomer/lib/elements/Icon";

const FinishedInfo = ({ startedAt, finishedAt }) => {
  //const minutes = (finishedAt  - startedAt) /1000;
  const started = moment(startedAt);
  const finished = moment(finishedAt);
  const {t} = useTranslation();
  const renderTime = (start, finish) => {
    const timeDiff = finish - start;
    const unit =
      timeDiff < 60000
        ? "seconds"
        : timeDiff < 3600000
        ? "minutes"
        : timeDiff < 86400000
        ? "hours"
        : "days";
    return (
      <>
        <>{finish.diff(start, unit)} {t("dates."+unit)}</>
      </>
    );
  };
  return (
    <div>
      <p>
      <Icon className="fas fa-flag-checkered has-text-secondary"/>
        <strong className="has-text-secondary"> {t("finishedIn")} </strong>
        {renderTime(started, finished)}
      </p>
    </div>
  );
};

FinishedInfo.propTypes = {
  startedAt: PropTypes.any.isRequired,
  finishedAt: PropTypes.any.isRequired,
};

export default FinishedInfo;
