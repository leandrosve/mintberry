import React from "react";
import PropTypes from "prop-types";
import { ACTIVE, PAUSED, READY } from "./states";
import StopTaskButton from "./buttons/StopTaskButton";
import PauseTaskButton from "./buttons/PauseTaskButton";
import FinishTaskButton from "./buttons/FinishTaskButton";
import StartTaskButton from "./buttons/StartTaskButton";


const TaskActions = ({ state }) => {
  return (
    <>
     
      {[READY, PAUSED].includes(state) && <StartTaskButton />}

      {state === ACTIVE && <PauseTaskButton />}

      {state === ACTIVE && <StopTaskButton />}

      {state === ACTIVE && <FinishTaskButton />}
    </>
  );
};

TaskActions.propTypes = {
  state: PropTypes.string.isRequired,
};

export default TaskActions;
