import React from "react";
import { Select } from "bloomer/lib/elements/Form/Select";
import { ACTIVE, FINISHED, PAUSED, STOPPED } from "./states";
import { useDispatch, useSelector } from "react-redux";
import { selectTasksVisibilityFilter } from "../../redux/reducers";
import { setVisibilityFilter } from "../../redux/actions/task";
import { useTranslation } from "react-i18next";

const TaskFilter = () => {
  const value = useSelector((state) => selectTasksVisibilityFilter(state));
  const dispatch = useDispatch();
  const {t} = useTranslation();
  return (
      <Select
        onChange={(e) => dispatch(setVisibilityFilter(e.target.value))}
        value={value}
        className="mb-2"
      >
        <option value="ALL">{t("all")}</option>
        <option value={ACTIVE}>{t(ACTIVE)}</option>
        <option value={PAUSED}>{t(PAUSED)}</option>
        <option value={FINISHED}>{t(FINISHED)}</option>
        <option value={STOPPED}>{t(STOPPED)}</option>
      </Select>
  );
};

TaskFilter.propTypes = {};

export default TaskFilter;
