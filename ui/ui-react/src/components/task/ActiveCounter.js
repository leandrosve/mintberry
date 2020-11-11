import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveTasksCount } from "../../redux/reducers";
import { Tag } from "bloomer/lib/elements/Tag";
import { useTranslation } from "react-i18next";
import { setVisibilityFilter } from "../../redux/actions/task";
import { ACTIVE } from "./states";

const ActiveCounter = () => {
  const count = useSelector((state) => selectActiveTasksCount(state));
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Tag
      className="is-rounded"
      style={{cursor:"pointer"}}
      onClick={()=>dispatch(setVisibilityFilter(ACTIVE))}
      data-tip={t("activeTasksCount", { count })}
      isColor="primary"
    >
      {count}
    </Tag>
  );
};

export default ActiveCounter;
