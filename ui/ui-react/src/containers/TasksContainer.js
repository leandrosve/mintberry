import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/actions/task';
import TaskList from '../components/task/TaskList';
import ReactTooltip from 'react-tooltip';
 
const TasksContainer = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchTasks());
        return ()=>{ReactTooltip.hide()};
    })
    return (
        <TaskList/>
    );
}
 
TasksContainer.propTypes = {};
 
export default TasksContainer;