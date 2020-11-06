import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Icon } from "bloomer/lib/elements/Icon";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const ExpiracyClock = ({ date }) => {
  const isExpired = Date.parse(date) < new Date();

  const textColor = isExpired ? " has-text-danger " : " has-text-primary ";
  const { t } = useTranslation();

  moment.locale(i18next.language);

  return (
    <span>
      {
        <>
          <Icon
            className={
              "fas fa-hourglass-" + (isExpired ? "end" : "start") + textColor
            }
          />
          <strong className={textColor}>
            {t(isExpired ? "expired" : "expires")}{" "}
          </strong>
        </>
      }
      {moment(date).fromNow()}
    </span>
  );
};

ExpiracyClock.propTypes = {
  date: PropTypes.any.isRequired
};

export default ExpiracyClock;
