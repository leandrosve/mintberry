import React from "react";
import PropTypes from "prop-types";
import { ACTIVE, PAUSED, READY } from "./states";
import StopTaskButton from "./buttons/StopTaskButton";
import PauseTaskButton from "./buttons/PauseTaskButton";
import FinishTaskButton from "./buttons/FinishTaskButton";
import StartTaskButton from "./buttons/StartTaskButton";


const TaskActions = ({ state, taskId }) => {
  return (
    <>
     
      {[READY, PAUSED].includes(state) && <StartTaskButton taskId={taskId} />}

      {state === ACTIVE && <PauseTaskButton taskId={taskId} />}

      {state === ACTIVE && <StopTaskButton taskId={taskId}/>}

      {state === ACTIVE && <FinishTaskButton taskId={taskId} />}
    </>
  );
};

TaskActions.propTypes = {
  state: PropTypes.string.isRequired,
};

export default TaskActions;
