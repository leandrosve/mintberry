import React from "react";
import PropTypes from "prop-types";
import { ACTIVE, PAUSED, READY } from "./states";
import StopTaskButton from "./buttons/StopTaskButton";
import PauseTaskButton from "./buttons/PauseTaskButton";
import FinishTaskButton from "./buttons/FinishTaskButton";
import StartTaskButton from "./buttons/StartTaskButton";


const TaskActions = ({ status, taskId }) => {
  return (
    <div onClick={(e)=>e.stopPropagation()}>
     
      {[READY, PAUSED].includes(status) && <StartTaskButton taskId={taskId} />}

      {status === ACTIVE && <PauseTaskButton taskId={taskId} />}

      {status === ACTIVE && <StopTaskButton taskId={taskId}/>}

      {status === ACTIVE && <FinishTaskButton taskId={taskId} />}
    </div>
  );
};

TaskActions.propTypes = {
  status: PropTypes.string.isRequired,
};

export default TaskActions;
